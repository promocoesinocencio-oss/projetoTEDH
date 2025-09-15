import React, { useState, useEffect } from 'react';
import { Settings, User, Bell, Lock, Palette, LogOut, Sun, Moon, Monitor } from 'lucide-react';

interface SettingsPageProps {
  onLogout: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onLogout }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

  useEffect(() => {
    const applyTheme = (t: string) => {
      if (t === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (t === 'light') {
        document.documentElement.classList.remove('dark');
      } else { // system
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Configurações</h2>
        </div>

        {/* Theme Settings */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center"><Palette className="w-5 h-5 mr-2 text-purple-500" /> Tema da Aplicação</h3>
          <div className="flex justify-around items-center p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            <button onClick={() => handleThemeChange('light')} className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-colors ${theme === 'light' ? 'bg-white dark:bg-gray-600 shadow' : 'text-gray-600 dark:text-gray-300'}`}><Sun className="w-5 h-5" /><span>Claro</span></button>
            <button onClick={() => handleThemeChange('dark')} className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-colors ${theme === 'dark' ? 'bg-gray-800 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}><Moon className="w-5 h-5" /><span>Escuro</span></button>
            <button onClick={() => handleThemeChange('system')} className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-colors ${theme === 'system' ? 'bg-white dark:bg-gray-600 shadow' : 'text-gray-600 dark:text-gray-300'}`}><Monitor className="w-5 h-5" /><span>Sistema</span></button>
          </div>
        </div>

        {/* Other settings sections... */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3"><User className="w-5 h-5 text-blue-500" /><span className="font-medium text-gray-700 dark:text-gray-300">Perfil</span></div>
            <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">Editar</button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3"><Bell className="w-5 h-5 text-green-500" /><span className="font-medium text-gray-700 dark:text-gray-300">Notificações</span></div>
            <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">Gerenciar</button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3"><Lock className="w-5 h-5 text-orange-500" /><span className="font-medium text-gray-700 dark:text-gray-300">Privacidade e Segurança</span></div>
            <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">Ver opções</button>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <button onClick={onLogout} className="w-full flex items-center justify-center space-x-2 py-3 bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-300 font-semibold rounded-lg hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Sair da Conta</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
