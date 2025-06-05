/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './index';

// Этот файл теперь просто реэкспортирует основное приложение
// Он нужен только для совместимости со старыми ссылками

// Установка языка по умолчанию
window.defaultLanguage = 'zh';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App defaultLanguage="zh" />);
} 