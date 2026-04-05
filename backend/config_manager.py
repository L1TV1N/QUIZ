import copy
import json
import os
from datetime import datetime
from config_defaults import DEFAULT_QUIZ_CONFIG

CONFIG_PATH = os.path.join(os.path.dirname(__file__), 'quiz_config.json')


def deep_merge(base, overrides):
    if not isinstance(base, dict) or not isinstance(overrides, dict):
        return copy.deepcopy(overrides)
    result = copy.deepcopy(base)
    for key, value in overrides.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = copy.deepcopy(value)
    return result


def get_default_config():
    return copy.deepcopy(DEFAULT_QUIZ_CONFIG)


def load_config():
    config = get_default_config()
    if os.path.exists(CONFIG_PATH):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                stored = json.load(f)
            config = deep_merge(config, stored)
        except Exception:
            pass
    return config


def save_config(config):
    merged = deep_merge(get_default_config(), config or {})
    merged.setdefault('meta', {})
    merged['meta']['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
    with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)
    return merged


def reset_config():
    config = get_default_config()
    config['meta']['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
    with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=2)
    return config


def get_label_maps(config=None):
    config = config or load_config()
    steps = config.get('steps', {})
    property_map = {item['id']: item.get('label', item['id']) for item in steps.get('property', {}).get('options', [])}
    style_map = {item['id']: item.get('label', item['id']) for item in steps.get('styles', {}).get('options', [])}
    budget_map = {item['id']: item.get('label', item['id']) for item in steps.get('budgets', {}).get('options', [])}
    zone_map = {}
    for items in steps.get('zones', {}).get('optionsByProperty', {}).values():
        for item in items:
            zone_map[item['id']] = item.get('label', item['id'])
    return {
        'property': property_map,
        'style': style_map,
        'budget': budget_map,
        'zone': zone_map,
    }
