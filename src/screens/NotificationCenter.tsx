import React, { useState } from 'react';
import { Bell, Settings, Clock, Heart, Target, MessageCircle, Zap, Volume2, VolumeX } from 'lucide-react';

interface SmartNotification {
  id: string;
  type: 'motivational' | 'reminder' | 'check-in';
  title: string;
  message: string;
  time: string;
  isActive: boolean;
}

const NotificationCenter: React.FC = () => {
  const [settings, setSettings] = useState({ enabled: true, sound: true, adaptive: true });
  const [notifications, setNotifications] = useState<SmartNotification[]>([
    { id: '1', type: 'motivational', title: 'Mensagem Motivacional', message: 'Você consegue! 💪', time: '09:00', isActive: true },
    { id: '2', type: 'check-in', title: 'Como você está?', message: 'Registre seu humor.', time: '12:00', isActive: true },
    { id: '3', type: 'reminder', title: 'Pausa para Respirar', message: '5 minutos de mindfulness.', time: '15:00', isActive: false },
  ]);

  const getNotificationIcon = (type: SmartNotification['type']) => ({
    motivational: <Heart className="w-5 h-5 text-pink-500" />,
    reminder: <Clock className="w-5 h-5 text-blue-500" />,
    'check-in': <MessageCircle className="w-5 h-5 text-purple-500" />,
  })[type];

  const getNotificationColor = (type: SmartNotification['type']) => ({
    motivational: 'bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800',
    reminder: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    'check-in': 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800',
  })[type];

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4"><Bell className="w-6 h-6 text-purple-500" /><h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Notificações Inteligentes</h2></div>
        <p className="text-gray-600 dark:text-gray-300">Notificações que se adaptam ao seu humor e energia.</p>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-100"><Settings className="w-5 h-5 mr-2 text-purple-500" />Configurações</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between"><p className="font-medium text-gray-700 dark:text-gray-300">Ativar Notificações</p><input type="checkbox" className="toggle" checked={settings.enabled} onChange={e => setSettings(s => ({...s, enabled: e.target.checked}))} /></div>
          <div className="flex items-center justify-between"><p className="font-medium text-gray-700 dark:text-gray-300">Ativar Som</p><input type="checkbox" className="toggle" checked={settings.sound} onChange={e => setSettings(s => ({...s, sound: e.target.checked}))} /></div>
          <div className="flex items-center justify-between"><p className="font-medium text-gray-700 dark:text-gray-300">Horários Adaptativos (IA)</p><input type="checkbox" className="toggle" checked={settings.adaptive} onChange={e => setSettings(s => ({...s, adaptive: e.target.checked}))} /></div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Suas Notificações</h3>
        {notifications.map(n => (
          <div key={n.id} className={`rounded-xl p-4 border ${getNotificationColor(n.type)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getNotificationIcon(n.type)}
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">{n.title}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{n.message}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mt-1"><Clock className="w-3 h-3" /><span>{n.time}</span></div>
                </div>
              </div>
              <button onClick={() => setNotifications(notifications.map(notif => notif.id === n.id ? {...notif, isActive: !notif.isActive} : notif))} className={`p-2 rounded-lg transition-colors ${n.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{n.isActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;
