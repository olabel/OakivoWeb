import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  timelineMessage?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  message,
  timelineMessage = "We typically respond within 24 hours."
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-[#0f141f] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-emerald-400/10 flex items-center justify-center rounded-full mb-4">
                <CheckCircle2 size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">{title}</h3>
              <p className="text-sm text-gray-300">{message}</p>
              
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-cyan-400 font-mono flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  {timelineMessage}
                </p>
              </div>
              
              <button
                onClick={onClose}
                className="mt-6 w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
