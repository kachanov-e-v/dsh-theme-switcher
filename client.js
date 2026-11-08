/**
 * Плагин переключателя тем DSH.
 * Регистрирует темы из DESIGN.json и предоставляет UI для переключения.
 */

// Данные тем из DESIGN.json (каждая строка — отдельный JSON-объект)
const THEME_DEFINITIONS_RAW = [
  {"codeThemeId":"absolutely","theme":{"accent":"#cc7d5e","accentSource":"custom","contrast":50,"fonts":{"code":"\"SFMono-Medium\"","ui":"Inter"},"ink":"#f9f9f7","opaqueWindows":true,"semanticColors":{"diffAdded":"#00c853","diffRemoved":"#ff5f38","skill":"#ad7bf9"},"surface":"#2d2d2b"},"variant":"dark"},
  {"codeThemeId":"ayu","theme":{"accent":"#e6b450","accentSource":"custom","contrast":50,"fonts":{"code":"\"SFMono-Medium\"","ui":"Inter"},"ink":"#bfbdb6","opaqueWindows":true,"semanticColors":{"diffAdded":"#70bf56","diffRemoved":"#f26d78","skill":"#ad7bf9"},"surface":"#10141c"},"variant":"dark"},
  {"codeThemeId":"catppuccin","theme":{"accent":"#cba6f7","accentSource":"custom","contrast":50,"fonts":{"code":"\"SFMono-Medium\"","ui":"Inter"},"ink":"#cdd6f4","opaqueWindows":true,"semanticColors":{"diffAdded":"#a6e3a1","diffRemoved":"#f38ba8","skill":"#ad7bf9"},"surface":"#1e1e2e"},"variant":"dark"},
  {"codeThemeId":"dracula","theme":{"accent":"#ff79c6","accentSource":"custom","contrast":50,"fonts":{"code":"\"SFMono-Medium\"","ui":"Inter"},"ink":"#f8f8f2","opaqueWindows":true,"semanticColors":{"diffAdded":"#50fa7b","diffRemoved":"#ff5555","skill":"#ad7bf9"},"surface":"#282a36"},"variant":"dark"},
  {"codeThemeId":"everforest","theme":{"accent":"#a7c080","accentSource":"custom","contrast":50,"fonts":{"code":"\"SFMono-Medium\"","ui":"Inter"},"ink":"#d3c6aa","opaqueWindows":true,"semanticColors":{"diffAdded":"#a7c080","diffRemoved":"#e67e80","skill":"#ad7bf9"},"surface":"#2d353b"},"variant":"dark"},
  {"codeThemeId":"github","theme":{"accent":"#1f6feb","accentSource":"custom","contrast":50,"fonts":{"code":"\"SFMono-Medium\"","ui":"Inter"},"ink":"#e6edf3","opaqueWindows":true,"semanticColors":{"diffAdded":"#3fb950","diffRemoved":"#f85149","skill":"#ad7bf9"},"surface":"#0d1117"},"variant":"dark"},
  {"codeThemeId":"linear","theme":{"accent":"#606acc","accentSource":"custom","contrast":50,"fonts":{"code":"\"SFMono-Medium\"","ui":"Inter"},"ink":"#e3e4e6","opaqueWindows":true,"semanticColors":{"diffAdded":"#69c967","diffRemoved":"#ff7e78","skill":"#ad7bf9"},"surface":"#0f0f11"},"variant":"dark"},
  {"codeThemeId":"lobster","theme":{"accent":"#ff5c5c","accentSource":"custom","contrast":50,"fonts":{"code":"\"SFMono-Medium\"","ui":"Satoshi"},"ink":"#e4e4e7","opaqueWindows":true,"semanticColors":{"diffAdded":"#22c55e","diffRemoved":"#ff5c5c","skill":"#ad7bf9"},"surface":"#111827"},"variant":"dark"},
  {"codeThemeId":"material","theme":{"accent":"#80cbc4","accentSource":"custom","contrast":50,"fonts":{"code":"\"SFMono-Medium\"","ui":"Satoshi"},"ink":"#eeffff","opaqueWindows":true,"semanticColors":{"diffAdded":"#c3e88d","diffRemoved":"#f07178","skill":"#ad7bf9"},"surface":"#212121"},"variant":"dark"},
  {"codeThemeId":"matrix","theme":{"accent":"#1eff5a","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":"ui-monospace, \"SFMono-Regular\", \"SF Mono\", Menlo, Consolas, \"Liberation Mono\", monospace"},"ink":"#b8ffca","opaqueWindows":true,"semanticColors":{"diffAdded":"#1eff5a","diffRemoved":"#fa423e","skill":"#ad7bf9"},"surface":"#040805"},"variant":"dark"},
  {"codeThemeId":"monokai","theme":{"accent":"#99947c","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":"ui-monospace, \"SFMono-Regular\", \"SF Mono\", Menlo, Consolas, \"Liberation Mono\", monospace"},"ink":"#f8f8f2","opaqueWindows":true,"semanticColors":{"diffAdded":"#86b42b","diffRemoved":"#c4265e","skill":"#ad7bf9"},"surface":"#272822"},"variant":"dark"},
  {"codeThemeId":"night-owl","theme":{"accent":"#44596b","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":"ui-monospace, \"SFMono-Regular\", \"SF Mono\", Menlo, Consolas, \"Liberation Mono\", monospace"},"ink":"#d6deeb","opaqueWindows":true,"semanticColors":{"diffAdded":"#c5e478","diffRemoved":"#ef5350","skill":"#ad7bf9"},"surface":"#011627"},"variant":"dark"},
  {"codeThemeId":"nord","theme":{"accent":"#88c0d0","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":"ui-monospace, \"SFMono-Regular\", \"SF Mono\", Menlo, Consolas, \"Liberation Mono\", monospace"},"ink":"#d8dee9","opaqueWindows":true,"semanticColors":{"diffAdded":"#a3be8c","diffRemoved":"#bf616a","skill":"#ad7bf9"},"surface":"#2e3440"},"variant":"dark"},
  {"codeThemeId":"notion","theme":{"accent":"#3183d8","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":null},"ink":"#d9d9d8","opaqueWindows":true,"semanticColors":{"diffAdded":"#4ec9b0","diffRemoved":"#fa423e","skill":"#ad7bf9"},"surface":"#191919"},"variant":"dark"},
  {"codeThemeId":"og","theme":{"accent":"#10a37f","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":"Arial, sans-serif","content":"Arial, sans-serif"},"ink":"#d1d5db","opaqueWindows":true,"semanticColors":{"diffAdded":"#65c99a","diffRemoved":"#f28b82","skill":"#ad7bf9"},"surface":"#343541"},"variant":"dark"},
  {"codeThemeId":"one","theme":{"accent":"#4d78cc","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":"Arial, sans-serif","content":"Arial, sans-serif"},"ink":"#abb2bf","opaqueWindows":true,"semanticColors":{"diffAdded":"#8cc265","diffRemoved":"#e05561","skill":"#ad7bf9"},"surface":"#282c34"},"variant":"dark"},
  {"codeThemeId":"oscurange","theme":{"accent":"#f9b98c","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":"Arial, sans-serif","content":"Arial, sans-serif"},"ink":"#e6e6e6","opaqueWindows":true,"semanticColors":{"diffAdded":"#40c977","diffRemoved":"#fa423e","skill":"#ad7bf9"},"surface":"#0b0b0f"},"variant":"dark"},
  {"codeThemeId":"raycast","theme":{"accent":"#ff6363","accentSource":"custom","contrast":50,"fonts":{"code":"\"Jetbrains Mono\"","ui":"Inter","content":"Arial, sans-serif"},"ink":"#fefefe","opaqueWindows":false,"semanticColors":{"diffAdded":"#59d499","diffRemoved":"#ff6363","skill":"#ad7bf9"},"surface":"#101010"},"variant":"dark"},
  {"codeThemeId":"rose-pine","theme":{"accent":"#ea9a97","accentSource":"custom","contrast":50,"fonts":{"code":"\"Jetbrains Mono\"","ui":"Inter","content":"Arial, sans-serif"},"ink":"#e0def4","opaqueWindows":false,"semanticColors":{"diffAdded":"#9ccfd8","diffRemoved":"#908caa","skill":"#ad7bf9"},"surface":"#232136"},"variant":"dark"},
  {"codeThemeId":"sentry","theme":{"accent":"#7055f6","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":null,"content":"Arial, sans-serif"},"ink":"#e6dff9","opaqueWindows":false,"semanticColors":{"diffAdded":"#8ee6d7","diffRemoved":"#fa423e","skill":"#ad7bf9"},"surface":"#2d2935"},"variant":"dark"},
  {"codeThemeId":"solarized","theme":{"accent":"#d30102","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":null,"content":"Arial, sans-serif"},"ink":"#839496","opaqueWindows":false,"semanticColors":{"diffAdded":"#859900","diffRemoved":"#dc322f","skill":"#ad7bf9"},"surface":"#002b36"},"variant":"dark"},
  {"codeThemeId":"temple","theme":{"accent":"#e4f222","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":null,"content":"Arial, sans-serif"},"ink":"#c7e6da","opaqueWindows":false,"semanticColors":{"diffAdded":"#40c977","diffRemoved":"#fa423e","skill":"#ad7bf9"},"surface":"#02120c"},"variant":"dark"},
  {"codeThemeId":"tokyo-night","theme":{"accent":"#3d59a1","accentSource":"custom","contrast":50,"fonts":{"code":null,"ui":null,"content":"Arial, sans-serif"},"ink":"#a9b1d6","opaqueWindows":false,"semanticColors":{"diffAdded":"#449dab","diffRemoved":"#914c54","skill":"#ad7bf9"},"surface":"#1a1b26"},"variant":"dark"},
  {"codeThemeId":"vercel","theme":{"accent":"#006efe","accentSource":"custom","contrast":50,"fonts":{"code":"\"Geist Mono\", ui-monospace, \"SFMono-Regular\"","ui":"Geist, Inter","content":"Arial, sans-serif"},"ink":"#ededed","opaqueWindows":true,"semanticColors":{"diffAdded":"#00ad3a","diffRemoved":"#f13342","skill":"#ad7bf9"},"surface":"#000000"},"variant":"dark"},
  {"codeThemeId":"vscode-plus","theme":{"accent":"#007acc","accentSource":"custom","contrast":50,"fonts":{"code":"\"Geist Mono\", ui-monospace, \"SFMono-Regular\"","ui":"Geist, Inter","content":"Arial, sans-serif"},"ink":"#d4d4d4","opaqueWindows":true,"semanticColors":{"diffAdded":"#369432","diffRemoved":"#f44747","skill":"#ad7bf9"},"surface":"#1e1e1e"},"variant":"dark"},
  {"codeThemeId":"xcode","theme":{"accent":"#5482ff","accentSource":"custom","contrast":50,"fonts":{"code":"\"SFMono-Medium\"","ui":"Geist, Inter","content":"Arial, sans-serif"},"ink":"#ffffff","opaqueWindows":true,"semanticColors":{"diffAdded":"#67b7a4","diffRemoved":"#fc6a5d","skill":"#ad7bf9"},"surface":"#1f1f24"},"variant":"dark"},
  {"codeThemeId":"codex","theme":{"accent":"#3a83f7","accentSource":"chatgpt","contrast":60,"fonts":{"code":null,"ui":null},"ink":"#ededed","opaqueWindows":true,"semanticColors":{"diffAdded":"#40c977","diffRemoved":"#fa423e","skill":"#ad7bf9"},"surface":"#000000"},"variant":"dark"}
];

/**
 * Конвертация темы из формата DESIGN.json в формат DSH ThemeDefinition
 */
function convertTheme(raw) {
  const { codeThemeId, theme, variant } = raw;
  const { accent, fonts, ink, semanticColors, surface } = theme;

  // Функция для осветления/затемнения цвета
  function adjust(hex, amount) {
    if (!hex) return hex;
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  const colorScheme = variant === 'light' ? 'light' : 'dark';

  return {
    id: codeThemeId,
    name: codeThemeId.charAt(0).toUpperCase() + codeThemeId.slice(1).replace(/-/g, ' '),
    colorScheme: colorScheme,
    tokens: {
      '--dsw-alias-bg-base': surface,
      '--dsw-alias-bg-layer-1': adjust(surface, colorScheme === 'dark' ? 10 : -5),
      '--dsw-alias-bg-layer-2': adjust(surface, colorScheme === 'dark' ? 20 : -10),
      '--dsw-alias-bg-overlay': adjust(surface, colorScheme === 'dark' ? 15 : -8),
      '--dsw-alias-border-l1': adjust(ink, colorScheme === 'dark' ? -60 : 40),
      '--dsw-alias-border-l2': adjust(ink, colorScheme === 'dark' ? -40 : 20),
      '--dsw-alias-brand-primary': accent,
      '--dsw-alias-label-primary': ink,
      '--dsw-alias-label-secondary': adjust(ink, colorScheme === 'dark' ? -30 : 20),
      '--dsw-alias-state-error-primary': semanticColors.diffRemoved,
      '--dsw-alias-state-idle-primary': adjust(accent, -20),
      '--dsw-alias-state-success-primary': semanticColors.diffAdded,
      '--dsw-alias-state-warn-primary': '#f5a623',
      '--dsw-specific-sidebar-fill': adjust(surface, colorScheme === 'dark' ? 5 : -3),
    },
  };
}

const THEMES = THEME_DEFINITIONS_RAW.map(convertTheme);
const THEME_MAP = {};
THEMES.forEach(t => { THEME_MAP[t.id] = t; });

window.__ModuleLoader__.load({
  id: '@local/dsh-theme-switcher',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useState, useEffect, useCallback, useRef } = React;

    // --- Компонент выпадающего списка тем ---
    function ThemeDropdown(props) {
      const { themeService, t } = props;
      const [isOpen, setIsOpen] = useState(false);
      const [currentId, setCurrentId] = useState(themeService.getTheme().active.id);
      const dropdownRef = useRef(null);

      // Подписка на смену темы
      useEffect(() => {
        const unsub = themeService.subscribe(() => {
          setCurrentId(themeService.getTheme().active.id);
        });
        return unsub;
      }, [themeService]);

      // Закрытие по клику вне
      useEffect(() => {
        function handleClickOutside(e) {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

      const currentTheme = THEME_MAP[currentId] || THEMES[0];

      return h('div', {
        ref: dropdownRef,
        style: { position: 'relative', display: 'flex', alignItems: 'center' },
      }, [
        // Кнопка-триггер
        h('button', {
          key: 'trigger',
          type: 'button',
          onClick: () => setIsOpen(!isOpen),
          'aria-expanded': isOpen,
          'aria-haspopup': 'listbox',
          'aria-label': t('themeSelectorLabel'),
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 10px',
            border: '1px solid var(--dsw-alias-border-l1)',
            borderRadius: 6,
            background: 'var(--dsw-alias-bg-layer-1)',
            color: 'var(--dsw-alias-label-primary)',
            fontSize: 13,
            fontFamily: 'inherit',
            cursor: 'pointer',
            minWidth: 180,
            justifyContent: 'space-between',
            transition: 'border-color 0.15s ease, background-color 0.15s ease',
          },
        }, [
          h('div', {
            key: 'preview',
            style: {
              width: 12,
              height: 12,
              borderRadius: 3,
              backgroundColor: currentTheme.tokens['--dsw-alias-brand-primary'],
              border: '1px solid var(--dsw-alias-border-l1)',
              flexShrink: 0,
            },
          }),
          h('span', {
            key: 'name',
            style: {
              flex: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }, currentTheme.name),
          h('svg', {
            key: 'arrow',
            width: 16,
            height: 16,
            viewBox: '0 0 16 16',
            fill: 'none',
            style: {
              color: 'var(--dsw-alias-label-secondary)',
              flexShrink: 0,
              transition: 'transform 0.15s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            },
          }, h('path', {
            d: 'M4 6L8 10L12 6',
            stroke: 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          })),
        ]),

        // Выпадающее меню
        isOpen && h('div', {
          key: 'dropdown',
          role: 'listbox',
          'aria-label': t('themeSelectorLabel'),
          style: {
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            background: 'var(--dsw-alias-bg-overlay)',
            border: '1px solid var(--dsw-alias-border-l1)',
            borderRadius: 8,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            zIndex: 100,
            maxHeight: 320,
            overflowY: 'auto',
          },
        }, THEMES.map(theme => h('button', {
          key: theme.id,
          type: 'button',
          role: 'option',
          'aria-selected': theme.id === currentId,
          onClick: () => {
            themeService.setTheme(theme.id);
            setIsOpen(false);
          },
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            padding: '10px 12px',
            border: 'none',
            background: theme.id === currentId
              ? 'var(--dsw-alias-brand-primary)'
              : 'transparent',
            color: theme.id === currentId
              ? '#fff'
              : 'var(--dsw-alias-label-primary)',
            fontSize: 13,
            fontFamily: 'inherit',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'background-color 0.1s ease',
          },
        }, [
          h('div', {
            key: 'preview',
            style: {
              width: 12,
              height: 12,
              borderRadius: 3,
              backgroundColor: theme.tokens['--dsw-alias-brand-primary'],
              border: theme.id === currentId ? '2px solid #fff' : '1px solid var(--dsw-alias-border-l1)',
              flexShrink: 0,
            },
          }),
          h('span', {
            key: 'name',
            style: {
              flex: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }, theme.name),
          theme.id === currentId && h('svg', {
            key: 'check',
            width: 16,
            height: 16,
            viewBox: '0 0 16 16',
            fill: 'none',
            style: { color: '#fff', flexShrink: 0 },
          }, h('path', {
            d: 'M3.5 8L7 11.5L12.5 4',
            stroke: 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          })),
        ]))),
      ]);
    }

    // --- Страница настроек темы ---
    function ThemeSettingsPage(props) {
      const { themeService, t } = props;
      const [currentId, setCurrentId] = useState(themeService.getTheme().active.id);

      useEffect(() => {
        const unsub = themeService.subscribe(() => {
          setCurrentId(themeService.getTheme().active.id);
        });
        return unsub;
      }, [themeService]);

      return h('div', {
        style: {
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        },
      }, [
        h('h2', {
          style: {
            margin: 0,
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--dsw-alias-label-primary)',
          },
        }, t('themeSettingsTitle')),

        h('p', {
          style: {
            margin: 0,
            fontSize: 13,
            color: 'var(--dsw-alias-label-secondary)',
          },
        }, t('themeSettingsDescription')),

        h('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
          },
        }, THEMES.map(theme => h('button', {
          key: theme.id,
          type: 'button',
          onClick: () => themeService.setTheme(theme.id),
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 8,
            padding: 16,
            border: '2px solid ' + (theme.id === currentId
              ? 'var(--dsw-alias-brand-primary)'
              : 'var(--dsw-alias-border-l1)'),
            borderRadius: 8,
            background: theme.id === currentId
              ? 'color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, var(--dsw-alias-bg-layer-1))'
              : 'var(--dsw-alias-bg-layer-1)',
            color: 'var(--dsw-alias-label-primary)',
            fontSize: 13,
            fontFamily: 'inherit',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.15s ease',
          },
        }, [
          h('div', {
            style: {
              width: '100%',
              height: 60,
              borderRadius: 6,
              background: 'linear-gradient(135deg, ' + theme.tokens['--dsw-alias-bg-base'] + ', ' + theme.tokens['--dsw-alias-bg-layer-1'] + ')',
              border: '1px solid var(--dsw-alias-border-l1)',
              position: 'relative',
            },
          }, [
            h('div', {
              style: {
                position: 'absolute',
                top: 8,
                right: 8,
                width: 16,
                height: 16,
                borderRadius: 4,
                backgroundColor: theme.tokens['--dsw-alias-brand-primary'],
              },
            }),
          ]),
          h('span', {
            style: { fontWeight: 500, fontSize: 14 },
          }, theme.name),
          h('span', {
            style: {
              fontSize: 11,
              color: 'var(--dsw-alias-label-secondary)',
              textTransform: 'capitalize',
            },
          }, theme.colorScheme),
        ]))),
      ]);
    }

    return {
      inject: ['slots', 'theme', 'locale'],
      apply(ctx) {
        const { slots, theme: themeService, locale } = ctx;

        // Регистрация русского языка
        const unregisterLang = locale.addLanguage({
          id: 'ru',
          label: 'Русский',
          fallback: 'en',
        });

        // Регистрация словарей
        const enDict = {
          themeSelectorLabel: 'Select theme',
          themeSettingsTitle: 'Theme settings',
          themeSettingsDescription: 'Choose a color theme for the interface.',
        };
        const zhDict = {
          themeSelectorLabel: '选择主题',
          themeSettingsTitle: '主题设置',
          themeSettingsDescription: '选择界面的颜色主题。',
        };
        const ruDict = {
          themeSelectorLabel: 'Выбрать тему',
          themeSettingsTitle: 'Настройки темы',
          themeSettingsDescription: 'Выберите цветовую тему для интерфейса.',
        };

        const unregEn = locale.register('dsh-theme-switcher', 'en', enDict);
        const unregZh = locale.register('dsh-theme-switcher', 'zh', zhDict);
        const unregRu = locale.register('dsh-theme-switcher', 'ru', ruDict);

        // Регистрация всех тем из DESIGN.json
        const unregisterThemes = THEMES.map(themeDef => {
          return themeService.register(themeDef);
        });

        // Привязка локали
        const t = locale.bind('dsh-theme-switcher');

        // Регистрация выпадающего списка в подвале сайдбара
        const unregisterSidebar = slots.inject('sidebar.footer.action', () => {
          return slots.register({
            name: 'sidebar.footer.action',
            id: 'dsh-theme-selector',
            order: 5,
            label: () => t('themeSelectorLabel'),
            locale: 'dsh-theme-switcher',
          }, () => h(ThemeDropdown, { themeService, t }));
        });

        // Регистрация страницы настроек темы
        const unregisterSettings = slots.inject('settings.section', () => {
          return slots.register({
            name: 'settings.section',
            id: 'dsh-theme-settings',
            order: 10,
            label: () => t('themeSettingsTitle'),
            locale: 'dsh-theme-switcher',
          }, () => h(ThemeSettingsPage, { themeService, t }));
        });

        // Функция очистки
        return () => {
          unregisterThemes.forEach(fn => { if (typeof fn === 'function') fn(); });
          unregisterSidebar();
          unregisterSettings();
          unregEn();
          unregZh();
          unregRu();
          unregisterLang();
        };
      },
    };
  },
});