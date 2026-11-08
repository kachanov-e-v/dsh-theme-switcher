# Переключатель тем для DeepSeek Harness

Плагин для переключения цветовых тем интерфейса DSH. Темы выбираются из выпадающего списка. Включает 27 тем из файла DESIGN.json.

## Возможности

- **27 цветовых тем** из DESIGN.json (absolutely, ayu, catppuccin, dracula, everforest, github, linear, lobster, material, matrix, monokai, night-owl, nord, notion, og, one, oscurange, raycast, rose-pine, sentry, solarized, temple, tokyo-night, vercel, vscode-plus, xcode, codex)
- **Выпадающий список** в подвале боковой панели (рядом с кнопкой Настройки) для быстрого переключения
- **Страница настроек темы** в Настройки → Тема с визуальным выбором из карточек
- **Многоязычность**: русский, английский, китайский

## Установка

### Через Plugin Manager (рекомендуется)

1. Откройте Настройки → Плагины
2. Нажмите "Установить пакет"
3. Введите URL репозитория GitHub:
   ```
   https://github.com/kachanov-e-v/dsh-theme-switcher.git
   ```
4. Плагин активируется автоматически

### Через CLI

```bash
dsh plugin install https://github.com/kachanov-e-v/dsh-theme-switcher.git
```

### Локальная установка (для разработки)

```bash
cd C:\Users\Evgeniy\Desktop\dsh\Plugins\dsh-theme
# Плагин уже установлен в профиль через plugin_manager
```

## Публикация на GitHub

1. Создайте репозиторий на GitHub
2. Загрузите файлы плагина:
   ```bash
   git init
   git add .
   git commit -m "feat: плагин переключения тем для DSH"
   git remote add origin https://github.com/kachanov-e-v/dsh-theme-switcher.git
   git push -u origin main
   ```
3. Пользователи смогут установить плагин по ссылке на репозиторий

## Структура проекта

```
dsh-theme/
├── package.json          # Манифест плагина
├── cordis.patch.yml      # Патч Cordis для вставки плагина
├── index.js              # Хост-часть (минимальная)
├── client.js             # Основная логика: регистрация тем и UI
├── icon.svg              # Иконка плагина (палитра)
├── README.md             # Документация
└── locale/
    ├── en.json           # Английская локаль
    ├── zh.json           # Китайская локаль
    └── ru.json           # Русская локаль
```

## Технические детали

### Регистрация тем

Плагин использует Theme Service DSH для регистрации тем. Каждая тема из DESIGN.json конвертируется в формат `ThemeDefinition`:

```typescript
interface ThemeDefinition {
  id: string;           // Идентификатор темы (например, "dracula")
  name: string;         // Отображаемое имя
  colorScheme: 'light' | 'dark';  // Цветовая схема
  tokens: Record<string, string>; // CSS-переменные темы
}
```

### UI-компоненты

1. **ThemeDropdown** — компактный выпадающий список в подвале сайдбара
2. **ThemeSettingsPage** — страница настроек с визуальным выбором тем

### Локализация

Плагин поддерживает 3 языка:
- **Русский** (ru) — основной для русскоязычных пользователей
- **Английский** (en) — по умолчанию
- **Китайский** (zh) — для китайскоязычных пользователей

## Разработка

### Требования

- DeepSeek Harness (DSH) с поддержкой плагинов
- Node.js (для синтаксической проверки)

### Проверка синтаксиса

```bash
node --check client.js
```

### Обновление тем

Для добавления новых тем отредактируйте массив `THEME_DEFINITIONS_RAW` в `client.js` и добавьте соответствующие данные из DESIGN.json.

## Лицензия

MIT
