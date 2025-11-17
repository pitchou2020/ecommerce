import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Toast({ toast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 text-white flex items-center gap-2 ${toast.tipo === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
    >
      {toast.tipo === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
      {toast.msg}
    </motion.div>
  );
}
