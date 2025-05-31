import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { 
  Home, Users, FileText, Map, BarChart3, Settings, Menu, X,
  PlusCircle, Calendar, MessageSquare, Building2, BookOpen, Clock
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { mockUsers } from '../../data/mockData';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Case Management', path: '/case-management', icon: FileText },
  { name: 'Clients', path: '/clients', icon: Users },
  { name: 'Coordinated Entry', path: '/coordinated-entry', icon: PlusCircle },
  { name: 'Programs & Properties', path: '/programs', icon: Building2 },
  { name: 'Services', path: '/services', icon: Calendar },
  { name: 'Resources', path: '/resources', icon: BookOpen },
  { name: 'Time Card', path: '/time-card', icon: Clock },
  { name: 'Messaging', path: '/messaging', icon: MessageSquare },
  { name: 'Map', path: '/map', icon: Map },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentUser = mockUsers[0]; // Using the first mock user

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 block md:hidden"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-500" />
        ) : (
          <Menu className="h-6 w-6 text-gray-500" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        {/* Logo */}
        <div className="flex h-24 items-center justify-center border-b border-gray-200 px-6">
          <Link to="/" className="flex items-center">
            <img src="/image.png" alt="Abode Services" className="h-16" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Menu */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <Avatar 
              src={currentUser.avatarUrl} 
              alt={currentUser.name} 
              fallback={currentUser.name.charAt(0)}
              size="sm" 
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
              <p className="text-xs text-gray-500">{currentUser.role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}