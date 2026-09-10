'use client';

import { useEffect } from 'react';

export default function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    // 仅允许在 HTTPS 或 localhost 环境注册 Service Worker
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    if (protocol !== 'https:' && hostname !== 'localhost' && hostname !== '127.0.0.1') return;

    const register = () => {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {
          // 静默失败：不影响页面正常使用
        });
    };

    if (document.readyState === 'complete') {
      register();
    } else {
      window.addEventListener('load', register);
    }

    return () => window.removeEventListener('load', register);
  }, []);

  return null;
}
