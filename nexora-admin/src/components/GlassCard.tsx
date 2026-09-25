import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard = ({ children, className = '', onClick }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        y: -5,
        scale: 1.01,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      className={`relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-colors hover:border-[#D4AF37]/50 hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] ${className}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
