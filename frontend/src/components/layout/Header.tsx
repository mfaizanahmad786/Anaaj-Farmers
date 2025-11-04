import { Search, Bell, Sun, History, Settings, Sidebar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Left section - Breadcrumb and Title */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Sidebar className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-400">Dashboards</span>
            <span className="text-gray-400">/</span>
            <span className="font-medium">Default</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-1.5 w-64 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 bg-gray-50"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">/</span>
          </div>

          {/* Icon buttons */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Sun className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <History className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

