import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// 기존 EngTalk 저장 키를 EngSpeak 키로 한 번만 옮긴다.
for (const key of ['settings', 'progress', 'review']) {
  const old = localStorage.getItem(`engtalk-${key}`);
  if (old && !localStorage.getItem(`engspeak-${key}`)) localStorage.setItem(`engspeak-${key}`, old);
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
