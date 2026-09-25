
import { Link, useLocation } from 'react-router-dom';
import { Search, Sun, Heart, User, ShoppingBag } from 'lucide-react';

const Topbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Orders', path: '/orders' },
    { name: 'Customers', path: '/customers' },
    { name: 'Promotions', path: '/promotions' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <header className="w-full bg-[#050505] border-t-[1px] border-[#D4AF37]/50 flex items-center justify-between px-8 py-3 z-30 relative shadow-2xl">
      {/* Logo */}
      <div className="flex items-center flex-1">
        <div className="relative group cursor-pointer flex items-center">
          <img src="/logo.png" alt="Nexora Logo" className="h-[55px] w-auto object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]" />
        </div>
      </div>

      {/* Center Navigation */}
      <nav className="hidden lg:flex items-center justify-center space-x-6 xl:space-x-8 flex-none">
        {navLinks.map((link) => {
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link 
              key={link.name} 
              to={link.path}
              className="relative py-2 group flex flex-col items-center"
            >
              <span className={`text-[15px] font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                {link.name}
              </span>
              {/* Double underline for active state to match exactly */}
              <div className={`absolute -bottom-1 flex flex-col space-y-[2px] transition-all duration-300 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}`}>
                <div className="h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#FFF7E6] to-[#D4AF37] shadow-[0_0_8px_#D4AF37]"></div>
                <div className="h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#FFF7E6] to-[#D4AF37] shadow-[0_0_8px_#D4AF37]"></div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Right Icons (Exact Neon Cyan/Green style from image) */}
      <div className="flex items-center space-x-4 flex-1 justify-end">
        {[Search, Sun, Heart, User, ShoppingBag].map((Icon, i) => (
          <button 
            key={i}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#17f753] to-[#01c6ff] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(1,198,255,0.3)] hover:shadow-[0_0_25px_rgba(1,198,255,0.6)]"
          >
            <Icon className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        ))}
      </div>
    </header>
  );
};

export default Topbar;
