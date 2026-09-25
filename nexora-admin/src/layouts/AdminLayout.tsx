
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { CinematicBodyWrapper } from '../components/CinematicBodyWrapper';

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black overflow-hidden relative font-sans text-white">
      {/* Cinematic Golden Background similar to customer site */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deep dark base */}
        <div className="absolute inset-0 bg-[#050505]"></div>
        {/* Golden glow in center */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-nexora-gold/20 blur-[150px] rounded-full mix-blend-screen"></div>
        {/* Subtle grid/noise overlay could go here */}
      </div>
      
      {/* Top Marquee Banner (Moves Right to Left) */}
      <div className="relative z-20 w-full overflow-hidden bg-[#0A0A0A] border-b border-nexora-gold/20 py-1.5 flex whitespace-nowrap items-center">
        <div className="animate-[marqueeLeft_20s_linear_infinite] flex space-x-8 text-[10px] tracking-[0.3em] font-bold text-nexora-gold/80 uppercase">
          {[...Array(20)].map((_, i) => (
            <span key={i}>+ NEXORA ADMIN +</span>
          ))}
        </div>
      </div>

      <Topbar />

      {/* Bottom Marquee Banner (Moves Left to Right) */}
      <div className="relative z-20 w-full overflow-hidden bg-[#0A0A0A] border-t border-nexora-gold/20 py-1.5 flex whitespace-nowrap items-center">
        <div className="animate-[marqueeRight_20s_linear_infinite] flex space-x-8 text-[10px] tracking-[0.3em] font-bold text-nexora-gold/80 uppercase relative -left-[50%]">
          {[...Array(20)].map((_, i) => (
            <span key={i}>+ NEXORA ADMIN +</span>
          ))}
        </div>
      </div>
      <main className="flex-1 relative z-10 w-full mx-auto bg-[#050505]">
        <CinematicBodyWrapper>
          <div className="px-6 py-8 h-full">
            <Outlet />
          </div>
        </CinematicBodyWrapper>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(0%); }
          100% { transform: translateX(50%); }
        }
      `}} />
    </div>
  );
};

export default AdminLayout;
