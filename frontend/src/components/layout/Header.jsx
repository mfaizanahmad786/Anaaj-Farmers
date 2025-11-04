import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Left section - Breadcrumb and Title */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-400">Dashboards</span>
            <span className="text-gray-400">/</span>
            <span className="font-medium">Default</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Search */}
        

          {/* Logout button */}
          <Button 
            variant="ghost" 
            className="h-9 px-3 flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

