import React, { useEffect } from 'react';

export default function Toast({ toast, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById('toast');
      if (el) {
        el.classList.add('opacity-0');
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, duration]);

  if (!toast) return null;

  const bgColor =
    toast.tipo === 'success'
      ? 'bg-green-500'
      : toast.tipo === 'error'
      ? 'bg-red-500'
      : 'bg-gray-800';

  return (
    <div
      id="toast"
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 ${bgColor} text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500`}
    >
      {toast.msg}
    </div>
  );
}
