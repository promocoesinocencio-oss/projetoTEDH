import React from 'react';
import { NavigateFunction } from 'react-router-dom';

interface BottomNavProps {
  tabs: {
    id: string;
    path: string;
    label: string;
    icon: React.ElementType;
  }[];
  activeTab: string;
  navigate: NavigateFunction;
}

const BottomNav: React.FC<BottomNavProps> = ({ tabs, activeTab, navigate }) => {
  // Show only a subset of tabs on mobile for a cleaner UI
  const mobileTabs = tabs.filter(tab => 
    ['dashboard', 'goals', 'ai-motivator', 'progress', 'settings'].includes(tab.id)
  );

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-purple-100 dark:border-gray-700 h-20">
      <div className="flex justify-around items-center h-full">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center space-y-1 w-16 transition-all duration-200 ${
                isActive ? 'text-purple-600 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300'
              }`}
            >
              <Icon className={`w-6 h-6 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-xs transition-all ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label === 'Início' ? 'Início' : tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
