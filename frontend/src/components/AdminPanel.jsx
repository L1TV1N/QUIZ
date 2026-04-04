import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function AdminPanel({ onLogout }) {
  const [stats, setStats] = useState(null)
  const [leads, setLeads] = useState([])
  const [filteredLeads, setFilteredLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshInterval, setRefreshInterval] = useState(5000)
  
  // Новые состояния для функций
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLeads, setSelectedLeads] = useState(new Set())
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedLead, setSelectedLead] = useState(null)
  const [showModal, setShowModal] = useState(false)
  
  // Фильтры
  const [filters, setFilters] = useState({
    mode: 'all', // all, ai, normal
    style: 'all',
    minArea: 0,
    maxArea: 500,
    minBudget: 0,
    maxBudget: 10000000,
    startDate: '',
    endDate: '',
    status: 'all', // all, new, contacted, processing, completed
    favorites: false
  })
  
  const [stats2, setStats2] = useState({
    leadsPerDay: []
  })

  // Загружаем статистику и заявки
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [statsRes, leadsRes] = await Promise.all([
          fetch('http://localhost:5000/api/stats'),
          fetch('http://localhost:5000/api/leads')
        ])

        if (!statsRes.ok || !leadsRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const statsData = await statsRes.json()
        const leadsData = await leadsRes.json()

        setStats(statsData)
        setLeads(leadsData)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, refreshInterval)
    return () => clearInterval(interval)
  }, [refreshInterval])

  // Фильтрация, поиск и сортировка
  useEffect(() => {
    let result = [...leads]

    // Поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(lead =>
        lead.name?.toLowerCase().includes(query) ||
        lead.phone?.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query)
      )
    }

    // Фильтры
    if (filters.mode !== 'all') {
      result = result.filter(lead => 
        filters.mode === 'ai' ? lead.ai_mode : !lead.ai_mode
      )
    }

    if (filters.style !== 'all') {
      result = result.filter(lead => lead.style === filters.style)
    }

    result = result.filter(lead => {
      const area = parseInt(lead.area) || 0
      return area >= filters.minArea && area <= filters.maxArea
    })

    result = result.filter(lead => {
      const budget = parseInt(lead.budget) || 0
      return budget >= filters.minBudget && budget <= filters.maxBudget
    })

    if (filters.startDate) {
      result = result.filter(lead => 
        new Date(lead.created_at) >= new Date(filters.startDate)
      )
    }

    if (filters.endDate) {
      result = result.filter(lead => 
        new Date(lead.created_at) <= new Date(filters.endDate)
      )
    }

    // Сортировка
    result.sort((a, b) => {
      let aVal = a[sortBy] || ''
      let bVal = b[sortBy] || ''

      if (sortBy === 'created_at') {
        aVal = new Date(aVal)
        bVal = new Date(bVal)
      } else if (sortBy === 'area' || sortBy === 'budget') {
        aVal = parseInt(aVal) || 0
        bVal = parseInt(bVal) || 0
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    setFilteredLeads(result)
  }, [leads, searchQuery, filters, sortBy, sortOrder])

  const handleExport = async (format, onlySelected = false) => {
    try {
      let dataToExport = onlySelected ? Array.from(selectedLeads).map(id => leads.find(l => l.id === id)) : filteredLeads

      let content, filename

      if (format === 'csv') {
        const headers = ['ID', 'Имя', 'Тип', 'Стиль', 'Площадь', 'Бюджет', 'Телефон', 'Email', 'Режим', 'Дата']
        const rows = dataToExport.map(lead => [
          lead.id,
          lead.name,
          lead.property_type || '',
          lead.style || '',
          lead.area || '',
          lead.budget || '',
          lead.phone || '',
          lead.email || '',
          lead.ai_mode ? 'AI' : 'Normal',
          new Date(lead.created_at).toLocaleString('ru-RU')
        ])
        content = [headers, ...rows].map(row => row.map(v => `"${v}"`).join(',')).join('\n')
        filename = `leads_${new Date().toISOString().split('T')[0]}.csv`
      } else {
        content = JSON.stringify(dataToExport, null, 2)
        filename = `leads_${new Date().toISOString().split('T')[0]}.json`
      }

      const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Export error:', err)
      alert('Ошибка при экспорте')
    }
  }

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Вы уверены? Это действие нельзя отменить!')) return

    try {
      const response = await fetch(`http://localhost:5000/api/leads/${leadId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setLeads(leads.filter(l => l.id !== leadId))
        alert('Заявка удалена')
      } else {
        throw new Error('Failed to delete')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('Ошибка при удалении')
    }
  }

  const toggleSelectLead = (leadId) => {
    const newSelected = new Set(selectedLeads)
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId)
    } else {
      newSelected.add(leadId)
    }
    setSelectedLeads(newSelected)
  }

  const selectAllToggle = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set())
    } else {
      setSelectedLeads(new Set(filteredLeads.map(l => l.id)))
    }
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const bulkDelete = async () => {
    if (!window.confirm(`Удалить ${selectedLeads.size} заявок?`)) return
    
    for (const leadId of selectedLeads) {
      await handleDeleteLead(leadId)
    }
    setSelectedLeads(new Set())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            📊 Админ-панель PRO
          </h1>
          <p className="text-gray-400 mt-2">Всё под контролем • {filteredLeads.length} заявок в фильтре</p>
        </motion.div>

        <div className="flex gap-4">
          <motion.button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Обновить
          </motion.button>
          <motion.button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚪 Выход
          </motion.button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300"
        >
          ⚠️ Ошибка: {error}
        </motion.div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-4xl"
          >
            ⏳
          </motion.div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <StatCard title="Всего заявок" value={stats.total_leads} icon="📋" />
              <StatCard title="AI режим" value={stats.ai_mode} icon="🤖" percentage={stats.ai_mode_percentage} />
              <StatCard title="Обычный режим" value={stats.normal_mode} icon="📝" percentage={100 - stats.ai_mode_percentage} />
              <StatCard title="Средняя площадь" value={`${stats.average_area}м²`} icon="📐" />
            </div>
          )}

          {/* Charts Section */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <ChartsCard title="🎨 Топ стили" data={stats.top_styles} />
              <ChartsCard title="🏠 Топ типы" data={stats.top_properties} />
              <ChartsCard title="💰 Топ бюджеты" data={stats.top_budgets} />
            </div>
          )}

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-700/50 p-6 rounded-lg border border-slate-600 mb-8"
          >
            <h2 className="text-xl font-bold mb-4">🔍 Поиск и фильтры</h2>
            
            {/* Search */}
            <input
              type="text"
              placeholder="Поиск по имени, телефону, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full mb-4 px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />

            {/* Quick Filters */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <motion.button
                onClick={() => setFilters({...filters, mode: 'all'})}
                className={`px-3 py-1 rounded-lg text-sm ${filters.mode === 'all' ? 'bg-blue-600' : 'bg-slate-600'}`}
                whileHover={{ scale: 1.05 }}
              >
                Все режимы
              </motion.button>
              <motion.button
                onClick={() => setFilters({...filters, mode: 'ai'})}
                className={`px-3 py-1 rounded-lg text-sm ${filters.mode === 'ai' ? 'bg-purple-600' : 'bg-slate-600'}`}
                whileHover={{ scale: 1.05 }}
              >
                🤖 AI
              </motion.button>
              <motion.button
                onClick={() => setFilters({...filters, mode: 'normal'})}
                className={`px-3 py-1 rounded-lg text-sm ${filters.mode === 'normal' ? 'bg-blue-600' : 'bg-slate-600'}`}
                whileHover={{ scale: 1.05 }}
              >
                📝 Обычный
              </motion.button>
            </div>

            {/* Advanced Filters */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              <input
                type="number"
                placeholder="Мин. площадь"
                value={filters.minArea}
                onChange={(e) => setFilters({...filters, minArea: parseInt(e.target.value) || 0})}
                className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
              />
              <input
                type="number"
                placeholder="Макс. площадь"
                value={filters.maxArea}
                onChange={(e) => setFilters({...filters, maxArea: parseInt(e.target.value) || 500})}
                className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
              />
              <input
                type="number"
                placeholder="Мин. бюджет"
                value={filters.minBudget}
                onChange={(e) => setFilters({...filters, minBudget: parseInt(e.target.value) || 0})}
                className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
              />
              <input
                type="number"
                placeholder="Макс. бюджет"
                value={filters.maxBudget}
                onChange={(e) => setFilters({...filters, maxBudget: parseInt(e.target.value) || 10000000})}
                className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
              />
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
              />
            </div>
          </motion.div>

          {/* Export and Bulk Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-slate-700/50 rounded-lg border border-slate-600"
          >
            <h2 className="text-xl font-bold mb-4">📥 Экспорт и действия</h2>
            <div className="flex gap-4 flex-wrap">
              <motion.button
                onClick={() => handleExport('csv')}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📊 CSV (все)
              </motion.button>
              <motion.button
                onClick={() => handleExport('json')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📄 JSON (все)
              </motion.button>
              {selectedLeads.size > 0 && (
                <>
                  <motion.button
                    onClick={() => handleExport('csv', true)}
                    className="px-6 py-2 bg-green-700 hover:bg-green-800 rounded-lg transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    📊 CSV ({selectedLeads.size})
                  </motion.button>
                  <motion.button
                    onClick={bulkDelete}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🗑️ Удалить ({selectedLeads.size})
                  </motion.button>
                </>
              )}
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                className="px-4 py-2 bg-slate-600 rounded-lg border border-slate-500 cursor-pointer"
              >
                <option value={5000}>🕐 5 сек</option>
                <option value={10000}>🕐 10 сек</option>
                <option value={30000}>🕐 30 сек</option>
                <option value={60000}>🕐 1 мин</option>
              </select>
            </div>
          </motion.div>

          {/* Leads Table */}
          <div className="bg-slate-700/50 rounded-lg border border-slate-600 overflow-hidden">
            <div className="p-6 border-b border-slate-600 flex justify-between items-center">
              <h2 className="text-xl font-bold">📋 Заявки ({filteredLeads.length})</h2>
              <div className="flex gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLeads.size === filteredLeads.length && filteredLeads.length > 0}
                    onChange={selectAllToggle}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Выбрать всё</span>
                </label>
              </div>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                Заявок не найдено
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-800 border-b border-slate-600">
                      <th className="px-4 py-3 text-left w-8">
                        <input
                          type="checkbox"
                          checked={selectedLeads.size === filteredLeads.length}
                          onChange={selectAllToggle}
                          className="w-4 h-4"
                        />
                      </th>
                      <SortableHeader label="ID" field="id" onSort={handleSort} active={sortBy} order={sortOrder} />
                      <SortableHeader label="Имя" field="name" onSort={handleSort} active={sortBy} order={sortOrder} />
                      <SortableHeader label="Стиль" field="style" onSort={handleSort} active={sortBy} order={sortOrder} />
                      <SortableHeader label="Площадь" field="area" onSort={handleSort} active={sortBy} order={sortOrder} />
                      <SortableHeader label="Бюджет" field="budget" onSort={handleSort} active={sortBy} order={sortOrder} />
                      <th className="px-6 py-3 text-left text-sm font-semibold">Контакт</th>
                      <SortableHeader label="Режим" field="ai_mode" onSort={handleSort} active={sortBy} order={sortOrder} />
                      <SortableHeader label="Дата" field="created_at" onSort={handleSort} active={sortBy} order={sortOrder} />
                      <th className="px-6 py-3 text-left text-sm font-semibold">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead, idx) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        className="border-b border-slate-600 hover:bg-slate-600/30 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedLeads.has(lead.id)}
                            onChange={() => toggleSelectLead(lead.id)}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{lead.id}</td>
                        <td className="px-6 py-4 text-sm font-medium cursor-pointer hover:text-blue-400" onClick={() => { setSelectedLead(lead); setShowModal(true) }}>
                          {lead.name}
                        </td>
                        <td className="px-6 py-4 text-sm">{lead.style || '—'}</td>
                        <td className="px-6 py-4 text-sm">{lead.area || '—'}м²</td>
                        <td className="px-6 py-4 text-sm">{lead.budget ? `₽${parseInt(lead.budget).toLocaleString('ru-RU')}` : '—'}</td>
                        <td className="px-6 py-4 text-xs">
                          {lead.phone && <div className="text-blue-300">📞 {lead.phone}</div>}
                          {lead.email && <div className="text-green-300">📧 {lead.email}</div>}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            lead.ai_mode
                              ? 'bg-purple-500/30 text-purple-200'
                              : 'bg-blue-500/30 text-blue-200'
                          }`}>
                            {lead.ai_mode ? '🤖 AI' : '📝 Обычный'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(lead.created_at).toLocaleDateString('ru-RU')}
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <motion.button
                            onClick={() => { setSelectedLead(lead); setShowModal(true) }}
                            className="text-blue-400 hover:text-blue-300"
                            whileHover={{ scale: 1.2 }}
                          >
                            👁️
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-400 hover:text-red-300"
                            whileHover={{ scale: 1.2 }}
                          >
                            🗑️
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal для детального просмотра */}
      <AnimatePresence>
        {showModal && selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 border border-slate-600 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-6">📋 Детали заявки #{selectedLead.id}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <DetailRow label="Имя" value={selectedLead.name} />
                <DetailRow label="Телефон" value={selectedLead.phone} />
                <DetailRow label="Email" value={selectedLead.email} />
                <DetailRow label="Тип помещения" value={selectedLead.property_type} />
                <DetailRow label="Стиль" value={selectedLead.style} />
                <DetailRow label="Площадь" value={`${selectedLead.area}м²`} />
                <DetailRow label="Бюджет" value={`₽${parseInt(selectedLead.budget || 0).toLocaleString('ru-RU')}`} />
                <DetailRow label="Зоны" value={selectedLead.zones} />
                <DetailRow label="Режим" value={selectedLead.ai_mode ? '🤖 AI' : '📝 Обычный'} />
                <DetailRow label="Дата" value={new Date(selectedLead.created_at).toLocaleString('ru-RU')} />
              </div>

              {selectedLead.ai_questions && (
                <div className="mb-6 p-4 bg-slate-700/50 rounded-lg">
                  <h3 className="font-bold mb-3">💭 AI Вопросы</h3>
                  <p className="text-sm text-gray-300">{selectedLead.ai_questions}</p>
                </div>
              )}

              <div className="flex gap-4">
                <motion.button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  Закрыть
                </motion.button>
                <motion.button
                  onClick={() => {
                    handleDeleteLead(selectedLead.id)
                    setShowModal(false)
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  Удалить
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper Components
function SortableHeader({ label, field, onSort, active, order }) {
  const isActive = active === field
  return (
    <th 
      className="px-6 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-slate-700/50"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        {label}
        {isActive && (order === 'asc' ? '↑' : '↓')}
      </div>
    </th>
  )
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="font-semibold">{value || '—'}</p>
    </div>
  )
}

function StatCard({ title, value, icon, trend, percentage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-lg border border-slate-600 hover:border-blue-500/50 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-3xl">{icon}</div>
        {trend && <span className="text-green-400 text-sm">{trend}</span>}
        {percentage && <span className="text-purple-400 text-sm">{percentage.toFixed(1)}%</span>}
      </div>
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  )
}

function ChartsCard({ title, data }) {
  const maxValue = Math.max(...data.map(item => item[1]), 1)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-700/50 p-6 rounded-lg border border-slate-600"
    >
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-gray-400 text-sm">Нет данных</p>
        ) : (
          data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="origin-left"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium truncate">{item[0]}</span>
                <span className="text-cyan-400 text-sm font-bold">{item[1]}</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item[1] / maxValue) * 100}%` }}
                  transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}
