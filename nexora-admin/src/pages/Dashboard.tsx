import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, IndianRupee, ShoppingBag, Users, AlertCircle, ArrowRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  alert?: boolean;
  link?: string;
  linkText?: string;
}

const StatCard = ({ title, value, change, isPositive, icon: Icon, alert = false, link, linkText }: StatCardProps) => (
  <div className={`relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border flex flex-col justify-between ${alert ? 'border-red-500/30 shadow-[0_4px_24px_rgba(239,68,68,0.1)]' : 'border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)]'} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(212,175,55,0.15)] hover:border-nexora-gold/40 group`}>
    
    {/* Subtle gradient background effect on hover */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${alert ? 'from-red-500/5' : 'from-nexora-gold/5'} to-transparent pointer-events-none`}></div>

    <div className="relative z-10">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${alert ? 'bg-red-500/10 text-red-500' : 'bg-nexora-gold/10 text-nexora-gold'}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        
        {change && (
          <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium border ${isPositive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            <span>{change}</span>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">{title}</p>
        <div className="flex items-baseline space-x-2 mt-2">
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        </div>
      </div>
      
      {alert && (
        <div className="mt-4 flex items-center text-sm">
           <span className="text-red-400 font-medium animate-pulse">● Attention Required</span>
        </div>
      )}
    </div>

    {link && (
      <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
        <Link to={link} className={`text-sm font-medium flex items-center transition-colors ${alert ? 'text-red-400 hover:text-red-300' : 'text-nexora-gold hover:text-nexora-goldLight'}`}>
          {linkText} <ArrowRight className="ml-1.5 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    )}
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            <span className="bg-gradient-to-r from-nexora-gold via-nexora-goldLight to-white bg-clip-text text-transparent">Overview</span>
          </h1>
          <p className="text-gray-400 mt-1">Here is what's happening with your store today.</p>
        </div>
        <div className="flex space-x-3">
          <select className="bg-black/50 border border-white/10 text-sm rounded-xl px-4 py-2.5 text-gray-200 focus:outline-none focus:ring-1 focus:ring-nexora-gold focus:border-nexora-gold/50 backdrop-blur-sm cursor-pointer transition-all hover:bg-black/70">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue" 
          value="₹12,48,900" 
          change="12.4%" 
          isPositive={true} 
          icon={IndianRupee} 
        />
        <StatCard 
          title="Orders" 
          value="1,284" 
          change="8.2%" 
          isPositive={true} 
          icon={ShoppingBag} 
        />
        <StatCard 
          title="Customers" 
          value="8,492" 
          change="14.7%" 
          isPositive={true} 
          icon={Users} 
        />
        <StatCard 
          title="Low Stock" 
          value="24" 
          alert={true} 
          icon={AlertCircle}
          link="/products"
          linkText="Manage inventory"
        />
      </div>
      
      {/* Chart Section Placeholder */}
      <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-[400px] flex items-center justify-center relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-t from-nexora-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
         <div className="text-center relative z-10">
            <h3 className="text-xl text-white font-medium mb-3">Revenue Analytics</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              (Interactive Recharts implementation will be rendered here with live API data)
            </p>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
