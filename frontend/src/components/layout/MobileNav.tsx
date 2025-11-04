import { Home, User, Sprout, CloudRain, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Sprout, path: '/crops', label: 'Crops' },
    { icon: Sparkles, path: '/advice', label: 'Advice' },
    { icon: CloudRain, path: '/weather', label: 'Weather' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full space-y-1",
                isActive(item.path) ? "text-blue-600" : "text-gray-600"
              )}
            >
              <Icon className={cn(
                "w-6 h-6",
                isActive(item.path) && "fill-blue-600"
              )} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;

