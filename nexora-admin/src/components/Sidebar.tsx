
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, Tags, Image, MessageSquare
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Categories', href: '/categories', icon: Tags },
    { name: 'Orders', href: '/orders', icon: ShoppingBag },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Promotions', href: '/promotions', icon: Image },
    { name: 'Reviews', href: '/reviews', icon: MessageSquare },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 h-full shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-20 transition-all duration-300">
      <div className="flex items-center justify-center h-20 border-b border-white/10 px-6">
        <span className="text-2xl font-bold tracking-[0.2em] bg-gradient-to-r from-nexora-gold via-nexora-goldLight to-nexora-gold bg-clip-text text-transparent">
          NEXORA
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        <nav className="px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-nexora-gold/20 to-transparent text-nexora-goldLight shadow-[inset_2px_0_0_#D4AF37]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                  }
                `}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-nexora-gold' : 'text-gray-500 group-hover:text-nexora-goldLight'}`}
                  aria-hidden="true"
                />
                {item.name}
                {isActive && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-nexora-gold animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
