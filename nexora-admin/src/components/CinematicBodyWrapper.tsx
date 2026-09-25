import type { ReactNode } from 'react';

export const CinematicBodyWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative w-full h-full min-h-[calc(100vh-140px)] flex flex-col">
      {/* Background Breathing Auroras */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Gold Aurora */}
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[#D4AF37] blur-[150px] mix-blend-screen rounded-full animate-aurora-drift animate-pulse-glow" style={{ willChange: 'transform, opacity' }} />
        {/* Cyan Aurora */}
        <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-[#01c6ff] blur-[150px] mix-blend-screen rounded-full animate-aurora-drift animate-pulse-glow" style={{ animationDelay: '-5s', willChange: 'transform, opacity' }} />
      </div>

      {/* Main Content with Fade & Slide Up */}
      <div className="relative z-10 flex-1 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        {children}
      </div>
    </div>
  );
};
