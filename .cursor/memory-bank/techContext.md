# Технологический контекст

## Используемые технологии

### Frontend
- **React 19.1.0**: Основной фреймворк для построения пользовательского интерфейса
- **TypeScript**: Типизированный JavaScript для более надежного кода
- **CSS**: Чистый CSS без использования препроцессоров или CSS-in-JS решений

### Сборка и развертывание
- **Vite 6.3.5**: Современный инструмент сборки для frontend проектов
- **GitHub**: Система контроля версий и хранения кода
- **Netlify**: Платформа для непрерывного развертывания статических сайтов

## Зависимости проекта

### Основные зависимости (package.json)
```json
{
  "dependencies": {
    "react-dom": "^19.1.0",
    "react": "^19.1.0",
    "@google/genai": "^1.4.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "typescript": "~5.7.2",
    "vite": "^6.2.0"
  }
}
```

Обратите внимание:
- Изначально была зависимость от API Gemini для переводов, но она была удалена в пользу статических переводов
- В проекте нет сторонних библиотек компонентов или стилей - всё реализовано на чистом React/CSS

## Конфигурация проекта

### TypeScript (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "allowJs": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "paths": {
      "@/*" :  ["./*"]
    }
  }
}
```

### Vite (vite.config.ts)
```typescript
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(''),
        'process.env.GEMINI_API_KEY': JSON.stringify('')
      },
      base: '/',
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            chinese: path.resolve(__dirname, 'chinese.html')
          }
        }
      },
      publicDir: 'public',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
```

### Netlify (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/chinese.html"
  to = "/index.html"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Структура проекта

```
copy-of-прайс-лист-c-one-auto/
├── public/
│   └── logo.jpg
├── .cursor/
│   ├── memory-bank/
│   └── rules/
├── .env.local
├── .gitignore
├── chinese.html
├── chinese.tsx
├── index.css
├── index.html
├── index.tsx
├── netlify.toml
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## Среда разработки

- **Операционная система**: Windows 10
- **Node.js**: Версия, поддерживающая все используемые зависимости
- **npm**: Менеджер пакетов для установки зависимостей
- **Браузеры**: Приложение оптимизировано для современных браузеров (Chrome, Firefox, Safari, Edge)

## Особенности и ограничения

1. **Статический сайт без бэкенда**: Все данные хранятся и обрабатываются на стороне клиента
2. **Отсутствие внешних API**: Изначально планировалось использование Gemini API для переводов, но было решено использовать статические переводы
3. **Многостраничный SPA**: Хотя приложение функционирует как SPA, используются две разные точки входа (index.html и chinese.html)
4. **Переключение языка**: Переключение между языками реализовано через переход на разные HTML файлы, а не через динамическую смену языка в одном компоненте
5. **Локализация**: Все переводы на китайский язык хранятся в коде и не подгружаются из внешних источников

## Техническая задолженность и направления улучшения

1. **Подключение ESLint и Prettier**: Внедрение инструментов для обеспечения единого стиля кода
2. **Добавление тестов**: Реализация модульных и интеграционных тестов
3. **Улучшение типизации**: Устранение `any` и более строгая типизация параметров
4. **Оптимизация для мобильных устройств**: Доработка отзывчивого дизайна для лучшего отображения на мобильных устройствах
5. **Рефакторинг компонентов**: Разделение больших компонентов на более мелкие для улучшения поддерживаемости
6. **Вынесение логики расчетов**: Отделение бизнес-логики от компонентов представления 