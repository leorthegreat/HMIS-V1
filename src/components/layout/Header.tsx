import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { Input } from '../ui/Input';
import { Avatar } from '../ui/Avatar';
import { mockUsers } from '../../data/mockData';

const getTitleFromPath = (path: string): string => {
  switch (path) {
    case '/':
      return '';
    case '/clients':
      return 'Clients';
    case '/case-management':
      return 'Case Management';
    case '/services':
      return 'Services';
    case '/coordinated-entry':
      return 'Coordinated Entry';
    case '/programs':
      return 'Programs & Properties';
    case '/settings':
      return 'Settings';
    default:
      if (path.startsWith('/clients/')) {
        return 'Client Details';
      }
      if (path.startsWith('/programs/')) {
        return 'Program Details';
      }
      return 'HMIS';
  }
};

export function Header() {
  const location = useLocation();
  const title = getTitleFromPath(location.pathname);
  const currentUser = mockUsers[0]; // Using the first mock user

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-end border-b border-gray-200 bg-white/90 backdrop-blur px-4 md:px-6">
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-full bg-gray-100 pl-8 focus:bg-white"
          />
        </div>
        
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="flex items-center">
          <Avatar
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            fallback={currentUser.name.charAt(0)}
            size="sm"
            className="cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}