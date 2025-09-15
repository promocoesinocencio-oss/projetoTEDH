import React from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Brain, Heart, Target, Calendar, BarChart3, MessageCircle, Shield, Settings, Bell } from 'lucide-react';

import Dashboard from '../screens/Dashboard';
import GoalsManager from '../screens/GoalsManager';
import AIMotivator from '../screens/AIMotivator';
import SocialSimulator from '../screens/SocialSimulator';
import CrisisDetector from '../screens/CrisisDetector';
import ProgressReports from '../screens/ProgressReports';
import EmpatheticCalendar from '../screens/EmpatheticCalendar';
import NotificationCenter from '../screens/NotificationCenter';
import SettingsPage from '../screens/SettingsPage';
import BottomNav from '../components/BottomNav';

export const tabs = [
  { id: 'dashboard', path: '/app/dashboard', label: 'Início', icon: Heart, component: Dashboard },
  { id: 'goals', path: '/app/goals', label: 'Metas', icon: Target, component: GoalsManager },
  { id: 'ai-motivator', path: '/app/ai-motivator', label: 'IA', icon: Brain, component: AIMotivator },
  { id: 'social-sim', path: '/app/social-sim', label: 'Simulador', icon: MessageCircle, component: SocialSimulator },
  { id: 'crisis', path: '/app/crisis', label: 'Apoio', icon: Shield, component: CrisisDetector },
  { id: 'progress', path: '/app/progress', label: 'Progresso', icon: BarChart3, component: ProgressReports },
  { id: 'calendar', path: '/app/calendar', label: 'Agenda', icon: Calendar, component: EmpatheticCalendar },
  { id: 'notifications', path: '/app/notifications', label: 'Alertas', icon: Bell, component: NotificationCenter },
  { id: 'settings', path: '/app/settings', label: 'Ajustes', icon: Settings, component: SettingsPage },
];

interface MainLayoutProps {
  onLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = tabs.find(tab => location.pathname.startsWith(tab.path))?.id || 'dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 transition-colors duration-300">
      <div className="flex">
        {/* Sidebar for Desktop */}
        <aside className="w-64 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-r border-purple-100 dark:border-gray-700 min-h-screen sticky top-0 hidden lg:flex flex-col">
          <div className="flex items-center space-x-3 p-4 border-b border-purple-100 dark:border-gray-700 h-20">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MindSupport
              </h1>
            </div>
          </div>
          <nav className="p-4 flex-1">
            <ul className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => navigate(tab.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/50 hover:text-purple-700 dark:hover:text-purple-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          {/* Header for Mobile */}
          <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-gray-700 sticky top-0 z-40 lg:hidden h-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      MindSupport
                    </h1>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-4 sm:p-6 pb-24 lg:pb-6">
            <Routes>
              {tabs.map(tab => (
                <Route key={tab.id} path={tab.path.replace('/app', '')} element={<tab.component onLogout={onLogout} />} />
              ))}
              <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      
      <BottomNav tabs={tabs} activeTab={activeTab} navigate={navigate} />
    </div>
  );
};

export default MainLayout;
