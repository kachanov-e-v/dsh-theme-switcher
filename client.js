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

/** Осветление/затемнение HEX-цвета на заданную величину. */
function adjust(hex, amount) {
  if (typeof hex !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(hex)) return hex;
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Конвертация темы из формата DESIGN.json в формат DSH ThemeDefinition.
 * ThemeDefinition: { id, colorScheme: 'light'|'dark', tokens: Record<string,string> }.
 */
function convertTheme(raw) {
  const { codeThemeId, theme } = raw;
  const { accent, ink, semanticColors, surface } = theme;
  const colorScheme = raw.variant === 'light' ? 'light' : 'dark';
  const delta = colorScheme === 'dark' ? 1 : -1;

  return {
    id: codeThemeId,
    colorScheme,
    tokens: {
      '--dsw-alias-bg-base': surface,
      '--dsw-alias-bg-layer-1': adjust(surface, 10 * delta),
      '--dsw-alias-bg-layer-2': adjust(surface, 20 * delta),
      '--dsw-alias-bg-overlay': adjust(surface, 15 * delta),
      '--dsw-alias-border-l1': adjust(ink, -60 * delta),
      '--dsw-alias-border-l2': adjust(ink, -40 * delta),
      '--dsw-alias-brand-primary': accent,
      '--dsw-alias-label-primary': ink,
      '--dsw-alias-label-secondary': adjust(ink, -30 * delta),
      '--dsw-alias-state-error-primary': semanticColors.diffRemoved,
      '--dsw-alias-state-idle-primary': adjust(accent, -20),
      '--dsw-alias-state-success-primary': semanticColors.diffAdded,
      '--dsw-alias-state-warn-primary': '#f5a623',
      '--dsw-specific-sidebar-fill': adjust(surface, 5 * delta),
    },
  };
}

/** Отображаемое имя темы (бренды оставляем латиницей). */
function themeTitle(id) {
  return id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const THEMES = THEME_DEFINITIONS_RAW.map(convertTheme);
const THEME_BY_ID = Object.create(null);
for (const theme of THEMES) {
  THEME_BY_ID[theme.id] = theme;
  theme.title = themeTitle(theme.id);
}

window.__ModuleLoader__.load({
  id: '@local/dsh-theme-switcher',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useState, useEffect, useRef } = React;

    /** Выпадающий список тем. `wide` — развёрнута ли боковая панель. */
    function ThemeDropdown({ themeService, t, wide, getActiveTheme, subscribeTheme }) {
      const [open, setOpen] = useState(false);
      const [currentId, setCurrentId] = useState(() => getActiveTheme());
      const [rect, setRect] = useState(null);
      const rootRef = useRef(null);
      const triggerRef = useRef(null);

      useEffect(() => {
        return subscribeTheme(() => {
          setCurrentId(getActiveTheme());
        });
      }, [getActiveTheme, subscribeTheme]);

      useEffect(() => {
        if (!open) return undefined;
        const onPointerDown = (event) => {
          if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
        };
        const onKeyDown = (event) => {
          if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
          document.removeEventListener('mousedown', onPointerDown);
          document.removeEventListener('keydown', onKeyDown);
        };
      }, [open]);

      const current = THEME_BY_ID[currentId] || {
        title: currentId === 'light' ? t('builtinLight') : t('builtinDark'),
        tokens: { '--dsw-alias-brand-primary': 'var(--dsw-alias-brand-primary)' },
      };

      const toggle = () => {
        if (!open && triggerRef.current) {
          const box = triggerRef.current.getBoundingClientRect();
          setRect({ left: box.left, width: box.width, bottom: window.innerHeight - box.top + 6 });
        }
        setOpen((value) => !value);
      };

      const trigger = h('button', {
        ref: triggerRef,
        type: 'button',
        onClick: toggle,
        'aria-expanded': open,
        'aria-haspopup': 'listbox',
        'aria-label': t('themeSelectorLabel'),
        title: t('themeSelectorLabel'),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: wide ? '6px 10px' : 0,
          width: wide ? undefined : 36,
          height: 36,
          justifyContent: 'center',
          border: '1px solid var(--dsw-alias-border-l1)',
          borderRadius: 8,
          background: 'var(--dsw-alias-bg-layer-1)',
          color: 'var(--dsw-alias-label-primary)',
          fontSize: 13,
          fontFamily: 'inherit',
          cursor: 'pointer',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s ease, background-color 0.15s ease',
        },
      }, [
        h('span', {
          key: 'dot',
          style: {
            width: 12,
            height: 12,
            borderRadius: 3,
            backgroundColor: current.tokens['--dsw-alias-brand-primary'],
            border: '1px solid rgba(127,127,127,0.45)',
            flexShrink: 0,
          },
        }),
        wide && h('span', {
          key: 'name',
          style: { flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
        }, current.title),
        wide && h('svg', {
          key: 'chevron',
          width: 14,
          height: 14,
          viewBox: '0 0 16 16',
          fill: 'none',
          style: {
            color: 'var(--dsw-alias-label-secondary)',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.15s ease',
          },
        }, h('path', {
          d: 'M4 6L8 10L12 6',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        })),
      ]);

      const menu = open && h('div', {
        role: 'listbox',
        'aria-label': t('themeSelectorLabel'),
        style: {
          position: 'fixed',
          left: rect ? rect.left : 0,
          bottom: rect ? rect.bottom : 0,
          width: Math.max(rect ? rect.width : 0, 230),
          maxHeight: 340,
          overflowY: 'auto',
          background: 'var(--dsw-alias-bg-overlay)',
          border: '1px solid var(--dsw-alias-border-l1)',
          borderRadius: 8,
          boxShadow: '0 10px 28px rgba(0,0,0,0.35)',
          zIndex: 1000,
          padding: 4,
        },
      }, THEMES.map((theme) => h('button', {
        key: theme.id,
        type: 'button',
        role: 'option',
        'aria-selected': theme.id === currentId,
        onClick: () => {
          try {
            themeService.setTheme(theme.id);
          } catch (error) {
            console.error('dsh-theme-switcher: не удалось переключить тему', error);
          }
          setOpen(false);
        },
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          padding: '8px 10px',
          border: 0,
          borderRadius: 6,
          background: theme.id === currentId ? 'var(--dsw-alias-brand-primary)' : 'transparent',
          color: theme.id === currentId ? '#fff' : 'var(--dsw-alias-label-primary)',
          fontSize: 13,
          fontFamily: 'inherit',
          cursor: 'pointer',
          textAlign: 'left',
        },
      }, [
        h('span', {
          key: 'dot',
          style: {
            width: 12,
            height: 12,
            borderRadius: 3,
            backgroundColor: theme.tokens['--dsw-alias-brand-primary'],
            border: '1px solid rgba(127,127,127,0.45)',
            flexShrink: 0,
          },
        }),
        h('span', {
          key: 'name',
          style: { flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
        }, theme.title),
        theme.id === currentId && h('svg', {
          key: 'check',
          width: 14,
          height: 14,
          viewBox: '0 0 16 16',
          fill: 'none',
          style: { flexShrink: 0 },
        }, h('path', {
          d: 'M3.5 8L7 11.5L12.5 4',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        })),
      ])));

      return h('div', {
        ref: rootRef,
        style: { position: 'relative', display: 'flex', alignItems: 'center' },
      }, [trigger, menu]);
    }

    /** Страница настроек темы с карточками предпросмотра. */
    function ThemeSettingsPage({ themeService, t, getActiveTheme, subscribeTheme }) {
      const [currentId, setCurrentId] = useState(() => getActiveTheme());

      useEffect(() => {
        return subscribeTheme(() => {
          setCurrentId(getActiveTheme());
        });
      }, [getActiveTheme, subscribeTheme]);

      const select = (id) => {
        try {
          themeService.setTheme(id);
        } catch (error) {
          console.error('dsh-theme-switcher: не удалось переключить тему', error);
        }
      };

      return h('div', {
        style: { padding: 16, display: 'flex', flexDirection: 'column', gap: 16 },
      }, [
        h('h2', {
          key: 'title',
          style: { margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--dsw-alias-label-primary)' },
        }, t('themeSettingsTitle')),
        h('p', {
          key: 'desc',
          style: { margin: 0, fontSize: 13, color: 'var(--dsw-alias-label-secondary)' },
        }, t('themeSettingsDescription')),
        h('div', {
          key: 'grid',
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
          },
        }, THEMES.map((theme) => h('button', {
          key: theme.id,
          type: 'button',
          onClick: () => select(theme.id),
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 8,
            padding: 12,
            border: '2px solid ' + (theme.id === currentId
              ? 'var(--dsw-alias-brand-primary)'
              : 'var(--dsw-alias-border-l1)'),
            borderRadius: 8,
            background: 'var(--dsw-alias-bg-layer-1)',
            color: 'var(--dsw-alias-label-primary)',
            fontSize: 13,
            fontFamily: 'inherit',
            cursor: 'pointer',
            textAlign: 'left',
          },
        }, [
          h('div', {
            key: 'preview',
            style: {
              width: '100%',
              height: 56,
              borderRadius: 6,
              background: 'linear-gradient(135deg, ' + theme.tokens['--dsw-alias-bg-base'] + ', ' + theme.tokens['--dsw-alias-bg-layer-1'] + ')',
              border: '1px solid var(--dsw-alias-border-l1)',
              position: 'relative',
              overflow: 'hidden',
            },
          }, [
            h('span', {
              key: 'accent',
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
            h('span', {
              key: 'ink',
              style: {
                position: 'absolute',
                left: 10,
                bottom: 10,
                width: '55%',
                height: 6,
                borderRadius: 3,
                backgroundColor: theme.tokens['--dsw-alias-label-primary'],
                opacity: 0.65,
              },
            }),
          ]),
          h('span', { key: 'name', style: { fontWeight: 500, fontSize: 14 } }, theme.title),
          h('span', {
            key: 'scheme',
            style: { fontSize: 11, color: 'var(--dsw-alias-label-secondary)' },
          }, theme.colorScheme === 'dark' ? 'тёмная' : 'светлая'),
        ]))),
      ]);
    }

    return {
      inject: ['slots', 'theme', 'locale'],
      apply(ctx) {
        const { slots, theme: themeService, locale } = ctx;

        // Все регистрации привязываем к контексту: при выгрузке/HMR они снимаются.
        // Без этого повторное применение падало на «theme ... is already registered».
        ctx.effect(() => {
          const disposers = [];

          try {
            disposers.push(locale.addLanguage({ id: 'ru', label: 'Русский', fallback: 'en' }));
          } catch (error) {
            console.error('dsh-theme-switcher: не удалось добавить язык ru', error);
          }

          const dictionaries = {
            en: {
              themeSelectorLabel: 'Select theme',
              themeSettingsTitle: 'Theme settings',
              themeSettingsDescription: 'Choose a color theme for the interface.',
              builtinLight: 'Light (DSH)',
              builtinDark: 'Dark (DSH)',
            },
            zh: {
              themeSelectorLabel: '选择主题',
              themeSettingsTitle: '主题设置',
              themeSettingsDescription: '选择界面的颜色主题。',
              builtinLight: '浅色 (DSH)',
              builtinDark: '深色 (DSH)',
            },
            ru: {
              themeSelectorLabel: 'Выбрать тему',
              themeSettingsTitle: 'Настройки темы',
              themeSettingsDescription: 'Выберите цветовую тему для интерфейса.',
              builtinLight: 'Светлая (DSH)',
              builtinDark: 'Тёмная (DSH)',
            },
          };
          for (const [id, dict] of Object.entries(dictionaries)) {
            try {
              disposers.push(locale.register('dsh-theme-switcher', id, dict));
            } catch (error) {
              console.error('dsh-theme-switcher: не удалось зарегистрировать словарь ' + id, error);
            }
          }

          for (const definition of THEMES) {
            try {
              disposers.push(themeService.register(definition));
            } catch (error) {
              // Тема уже зарегистрирована этим же плагином в предыдущей генерации —
              // не валим весь плагин из-за одной темы.
              console.error('dsh-theme-switcher: тема "' + definition.id + '" не зарегистрирована', error);
            }
          }

          return () => {
            for (let index = disposers.length - 1; index >= 0; index -= 1) {
              try {
                const dispose = disposers[index];
                if (typeof dispose === 'function') dispose();
              } catch (error) {
                console.error('dsh-theme-switcher: ошибка очистки', error);
              }
            }
          };
        }, 'dsh-theme-switcher: themes and dictionaries');

        const t = locale.bind('dsh-theme-switcher');

        // Служба темы не имеет subscribe(): единственный канал изменений — событие
        // theme/change на контексте. Держим один набор подписчиков для компонентов.
        const themeListeners = new Set();
        ctx.effect(() => {
          const off = ctx.on('theme/change', () => {
            for (const listener of [...themeListeners]) {
              try {
                listener();
              } catch (error) {
                console.error('dsh-theme-switcher: ошибка подписчика темы', error);
              }
            }
          });
          return () => {
            if (typeof off === 'function') off();
          };
        }, 'dsh-theme-switcher: theme/change');

        const getActiveTheme = () => themeService.getTheme().active.id;
        const subscribeTheme = (listener) => {
          themeListeners.add(listener);
          return () => {
            themeListeners.delete(listener);
          };
        };

        // Выпадающий список в подвале боковой панели.
        slots.inject('sidebar.footer.action', () => slots.register({
          name: 'sidebar.footer.action',
          id: 'dsh-theme-selector',
          order: 5,
          label: () => t('themeSelectorLabel'),
          locale: 'dsh-theme-switcher',
        }, (props) => h(ThemeDropdown, {
          themeService,
          t,
          wide: props && props.wide === true,
          getActiveTheme,
          subscribeTheme,
        })));

        // Страница «Тема» в настройках.
        slots.inject('settings.section', () => slots.register({
          name: 'settings.section',
          id: 'dsh-theme-settings',
          order: 12,
          label: () => t('themeSettingsTitle'),
          locale: 'dsh-theme-switcher',
        }, () => h(ThemeSettingsPage, { themeService, t, getActiveTheme, subscribeTheme })));
      },
    };
  },
});
