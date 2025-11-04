import { Link, useLocation } from 'react-router-dom';
import { User, FileText, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();

  const favorites = [
    { label: 'Overview', path: '/', icon: null },
  ];

  const dashboards = [
    { label: 'Overview', path: '/', icon: LayoutDashboard },
  ];

  const pages = [
    { label: 'User Profile', path: '/profile', icon: User, nested: [
      { label: 'Overview', path: '/profile' },
      { label: 'Crops', path: '/crops' },
    ]},
    { label: 'Blog', path: '/blog', icon: FileText },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-52 bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-black flex items-center justify-center">
            <span className="text-white text-sm font-semibold">B</span>
          </div>
          <span className="text-sm font-medium">ByeWind</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        {/* Favorites Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Favorites</span>
            <span className="text-xs text-gray-400">Recently</span>
          </div>
          <ul className="space-y-0.5">
            {favorites.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors",
                    isActive(item.path)
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dashboards Section */}
        <div className="mb-6">
          <div className="px-3 mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Dashboards</span>
          </div>
          <ul className="space-y-0.5">
            {dashboards.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-1.5 text-sm rounded-md transition-colors",
                      isActive(item.path)
                        ? 'bg-gray-900 text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Pages Section */}
        <div>
          <div className="px-3 mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Pages</span>
          </div>
          <ul className="space-y-0.5">
            {pages.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </Link>
                  {item.nested && (
                    <ul className="ml-9 mt-1 space-y-0.5">
                      {item.nested.map((nested) => (
                        <li key={nested.path}>
                          <Link
                            to={nested.path}
                            className="block px-3 py-1 text-xs text-gray-500 hover:text-gray-900 transition-colors"
                          >
                            {nested.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

