import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface NewsletterPopupProps {
  onClose: () => void;
  onSubscribe: () => void;
}

export default function NewsletterPopup({ onClose, onSubscribe }: NewsletterPopupProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-to-br from-gray-900 to-indigo-900 p-8 rounded-xl max-w-2xl w-full mx-4 shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">You got it, data has value!</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <p className="text-gray-300">
              If you’d like to hear about Ada, subscribe to our newsletter! We promise, we won’t monetise your email but we'll give you a small bonus!
            </p>

            <div className="flex gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSubscribe();
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-colors"
              >
                <ExternalLink size={20} />
                Subscribe (+500 €)
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg text-white font-medium transition-colors"
              >
                No thanks
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}