import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const API = 'http://localhost:5000/api/quiz-config'

const pretty = (obj) => JSON.stringify(obj, null, 2)

function SectionEditor({ title, hint, value, onChange }) {
  return (
    <section className="panel-section">
      <div className="section-head">
        <div>
          <h3>{title}</h3>
          {hint ? <p>{hint}</p> : null}
        </div>
      </div>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false} />
    </section>
  )
}

export default function App() {
  const [config, setConfig] = useState(null)
  const [status, setStatus] = useState('Загрузка конфигурации...')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [sections, setSections] = useState({
    property: '',
    zones: '',
    area: '',
    styles: '',
    budgets: '',
    contacts: '',
    ai: '',
  })

  const stats = useMemo(() => {
    if (!config?.steps) return { property: 0, styles: 0, budgets: 0, ai: 0 }
    return {
      property: config.steps.property?.options?.length || 0,
      styles: config.steps.styles?.options?.length || 0,
      budgets: config.steps.budgets?.options?.length || 0,
      ai: Object.values(config.steps.ai?.questionsByProperty || {}).reduce((sum, arr) => sum + arr.length, 0) + (config.steps.ai?.universalQuestions?.length || 0),
    }
  }, [config])

  const syncSectionsFromConfig = (data) => {
    if (!data?.steps) return
    setSections({
      property: pretty(data.steps.property),
      zones: pretty(data.steps.zones),
      area: pretty(data.steps.area),
      styles: pretty(data.steps.styles),
      budgets: pretty(data.steps.budgets),
      contacts: pretty(data.steps.contacts),
      ai: pretty(data.steps.ai),
    })
  }

  const loadConfig = async () => {
    setError('')
    try {
      const response = await fetch(API)
      if (!response.ok) throw new Error('Не удалось получить конфигурацию')
      const data = await response.json()
      setConfig(data)
      syncSectionsFromConfig(data)
      setStatus('Конфигурация загружена из backend')
    } catch (e) {
      setError(e.message)
      setStatus('Ошибка загрузки')
    }
  }

  useEffect(() => {
    loadConfig()
  }, [])

  const buildPayload = () => {
    const parsed = {
      steps: {
        property: JSON.parse(sections.property),
        zones: JSON.parse(sections.zones),
        area: JSON.parse(sections.area),
        styles: JSON.parse(sections.styles),
        budgets: JSON.parse(sections.budgets),
        contacts: JSON.parse(sections.contacts),
        ai: JSON.parse(sections.ai),
      },
    }
    return parsed
  }

  const saveConfig = async () => {
    setError('')
    setSaving(true)
    try {
      const payload = buildPayload()
      const response = await fetch(API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Не удалось сохранить конфигурацию')
      const result = await response.json()
      setConfig(result.config)
      syncSectionsFromConfig(result.config)
      setStatus('Конфигурация сохранена. Основной фронтенд будет читать новые данные.')
    } catch (e) {
      setError(e.message)
      setStatus('Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  const resetConfig = async () => {
    setError('')
    setSaving(true)
    try {
      const response = await fetch(`${API}/reset`, { method: 'POST' })
      if (!response.ok) throw new Error('Не удалось вернуть исходное состояние')
      const result = await response.json()
      setConfig(result.config)
      syncSectionsFromConfig(result.config)
      setStatus('Исходная конфигурация восстановлена')
    } catch (e) {
      setError(e.message)
      setStatus('Ошибка сброса')
    } finally {
      setSaving(false)
    }
  }

  const onSectionChange = (key, value) => setSections((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="page-shell">
      <div className="page-backdrop" />
      <div className="page-content">
        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="hero-card">
          <div>
            <div className="eyebrow">admin configurator</div>
            <h1>Отдельный локалхост для настройки фронтенда</h1>
            <p>
              Здесь редактируются тексты, вопросы, варианты выбора и AI-блоки. Основной локалхост не ломается и не редактируется руками — он просто читает новую конфигурацию.
            </p>
          </div>
          <div className="hero-actions">
            <button className="ghost-btn" onClick={loadConfig}>Обновить из backend</button>
            <button className="primary-btn" onClick={saveConfig} disabled={saving}>Сохранить конфигурацию</button>
            <button className="danger-btn" onClick={resetConfig} disabled={saving}>Вернуть исходное состояние</button>
          </div>
        </motion.header>

        <section className="stats-grid">
          <div className="stat-card"><span>Типы помещений</span><strong>{stats.property}</strong></div>
          <div className="stat-card"><span>Стили</span><strong>{stats.styles}</strong></div>
          <div className="stat-card"><span>Бюджеты</span><strong>{stats.budgets}</strong></div>
          <div className="stat-card"><span>AI-вопросы</span><strong>{stats.ai}</strong></div>
        </section>

        <section className="status-card">
          <div>
            <strong>Статус:</strong> {status}
          </div>
          {config?.meta?.updatedAt ? <div><strong>Последнее обновление:</strong> {config.meta.updatedAt}</div> : null}
          {error ? <div className="error-text">{error}</div> : null}
        </section>

        <div className="editors-grid">
          <SectionEditor title="Шаг: тип помещения" hint="Заголовок шага и карточки типов помещения" value={sections.property} onChange={(v) => onSectionChange('property', v)} />
          <SectionEditor title="Шаг: зоны" hint="Заголовки по типам помещений и списки зон" value={sections.zones} onChange={(v) => onSectionChange('zones', v)} />
          <SectionEditor title="Шаг: площадь" hint="Диапазон, пресеты, подписи и подсказки" value={sections.area} onChange={(v) => onSectionChange('area', v)} />
          <SectionEditor title="Шаг: стили" hint="Карточки стилей и описания" value={sections.styles} onChange={(v) => onSectionChange('styles', v)} />
          <SectionEditor title="Шаг: бюджеты" hint="Варианты бюджета и описания" value={sections.budgets} onChange={(v) => onSectionChange('budgets', v)} />
          <SectionEditor title="Шаг: контакты" hint="Тексты формы, кнопки, согласие и подсказки" value={sections.contacts} onChange={(v) => onSectionChange('contacts', v)} />
          <SectionEditor title="Шаг: AI-вопросы" hint="Вопросы по типам помещения и универсальные AI-вопросы" value={sections.ai} onChange={(v) => onSectionChange('ai', v)} />
        </div>
      </div>
    </div>
  )
}
