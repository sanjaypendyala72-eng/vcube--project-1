import type { LucideIcon } from 'lucide-react';
import { Settings, Image as ImageIcon, MessageSquare } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  icon: LucideIcon;
}

export const PlaceholderPage = ({ title, icon: Icon }: PlaceholderPageProps) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[70vh]">
    <div className="relative group p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.5)] flex flex-col items-center hover:border-nexora-gold/50 transition-colors duration-500 overflow-hidden">
      
      {/* Subtle sweeping light inside the card */}
      <div className="absolute inset-0 bg-gradient-to-tr from-nexora-gold/0 via-nexora-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="p-5 bg-[#050505] rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] mb-8 animate-bounce" style={{ animationDuration: '3s' }}>
        <Icon className="h-16 w-16 text-nexora-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
      </div>
      <h2 className="text-3xl font-bold text-white tracking-wide mb-3">{title} Management</h2>
      <p className="text-gray-400 font-medium tracking-wide">This module is being connected to the server.</p>
    </div>
  </div>
);

export const Promotions = () => <PlaceholderPage title="Promotions" icon={ImageIcon} />;
export const Reviews = () => <PlaceholderPage title="Reviews" icon={MessageSquare} />;
export const SettingsPage = () => <PlaceholderPage title="Settings" icon={Settings} />;
