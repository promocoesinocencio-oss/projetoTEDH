import React, { useState } from 'react';
import { Bell, Settings, Clock, Heart, Target, MessageCircle, Zap, Volume2, VolumeX } from 'lucide-react';

interface SmartNotification {
  id: string;
  type: 'motivational' | 'reminder' | 'check-in' | 'achievement' | 'break';
  title: string;
  message: string;
  scheduledTime: string;
  frequency: 'daily' | 'weekly' | 'custom';
  isActive: boolean;
  aiGenerated: boolean;
  contextual: boolean;
}

interface NotificationSettings {
  enabled: boolean;
  soundEnabled: boolean;
  adaptiveTimings: boolean;
  moodBasedTone: boolean;
  energyBasedFrequency: boolean;
  respectDoNotDisturb: boolean;
}

const NotificationCenter: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    soundEnabled: true,
    adaptiveTimings: true,
    moodBasedTone: true,
    energyBasedFrequency: true,
    respectDoNotDisturb: true
  });

  const [notifications, setNotifications] = useState<SmartNotification[]>([
    {
      id: '1',
      type: 'motivational',
      title: 'Mensagem Motivacional',
      message: 'Lembre-se: você já superou 100% dos seus dias mais difíceis. Hoje não será diferente! 💪',
      scheduledTime: '09:00',
      frequency: 'daily',
      isActive: true,
      aiGenerated: true,
      contextual: true
    },
    {
      id: '2',
      type: 'check-in',
      title: 'Como você está?',
      message: 'Hora de registrar como você está se sentindo. Seus sentimentos importam! 💜',
      scheduledTime: '12:00',
      frequency: 'daily',
      isActive: true,
      aiGenerated: false,
      contextual: false
    },
    {
      id: '3',
      type: 'break',
      title: 'Pausa para Respirar',
      message: 'Que tal fazer uma pausa de 5 minutos? Sua mente merece esse cuidado 🧘‍♀️',
      scheduledTime: '15:00',
      frequency: 'daily',
      isActive: true,
      aiGenerated: true,
      contextual: true
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Exercício Suave',
      message: 'Hora do seu exercício! Lembre-se: qualquer movimento conta 🚶‍♀️',
      scheduledTime: '18:00',
      frequency: 'custom',
      isActive: true,
      aiGenerated: false,
      contextual: false
    },
    {
      id: '5',
      type: 'achievement',
      title: 'Celebração',
      message: 'Parabéns! Você completou 3 metas hoje. Isso é incrível! 🎉',
      scheduledTime: '20:00',
      frequency: 'custom',
      isActive: true,
      aiGenerated: true,
      contextual: true
    }
  ]);

  const [newNotification, setNewNotification] = useState<Partial<SmartNotification>>({
    type: 'motivational',
    frequency: 'daily',
    isActive: true,
    aiGenerated: false,
    contextual: false
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const getNotificationIcon = (type: SmartNotification['type']) => {
    switch (type) {
      case 'motivational':
        return <Heart className="w-5 h-5 text-pink-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'check-in':
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      case 'achievement':
        return <Target className="w-5 h-5 text-green-500" />;
      case 'break':
        return <Zap className="w-5 h-5 text-orange-500" />;
    }
  };

  const getNotificationColor = (type: SmartNotification['type']) => {
    switch (type) {
      case 'motivational':
        return 'bg-pink-50 border-pink-200';
      case 'reminder':
        return 'bg-blue-50 border-blue-200';
      case 'check-in':
        return 'bg-purple-50 border-purple-200';
      case 'achievement':
        return 'bg-green-50 border-green-200';
      case 'break':
        return 'bg-orange-50 border-orange-200';
    }
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isActive: !notif.isActive } : notif
    ));
  };

  const addNotification = () => {
    if (!newNotification.title || !newNotification.message || !newNotification.scheduledTime) return;

    const notification: SmartNotification = {
      id: Date.now().toString(),
      type: newNotification.type || 'motivational',
      title: newNotification.title,
      message: newNotification.message,
      scheduledTime: newNotification.scheduledTime,
      frequency: newNotification.frequency || 'daily',
      isActive: true,
      aiGenerated: false,
      contextual: false
    };

    setNotifications(prev => [...prev, notification]);
    setNewNotification({
      type: 'motivational',
      frequency: 'daily',
      isActive: true,
      aiGenerated: false,
      contextual: false
    });
    setShowAddForm(false);
  };

  const aiNotificationExamples = [
    {
      mood: 'baixo',
      message: 'Sei que hoje está sendo um dia difícil. Lembre-se: sentimentos passam, mas sua força permanece. Você consegue! 🌟'
    },
    {
      mood: 'ansioso',
      message: 'Respirar fundo pode ajudar agora. Inspire calma, expire preocupação. Você está seguro(a) 🫧'
    },
    {
      mood: 'cansado',
      message: 'Sua energia está baixa e tudo bem. Que tal uma pausa gentil? Você merece este cuidado ☕'
    },
    {
      mood: 'motivado',
      message: 'Que energia incrível! Aproveite este momento para dar um passo em direção aos seus sonhos 🚀'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800">Central de Notificações Inteligentes</h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            + Nova Notificação
          </button>
        </div>
        <p className="text-gray-600">
          Notificações personalizadas que se adaptam ao seu humor e energia, oferecendo o apoio certo no momento certo.
        </p>
      </div>

      {/* Settings */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-purple-500" />
          Configurações Inteligentes
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Notificações Ativadas</p>
                <p className="text-sm text-gray-600">Receber lembretes e motivações</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => setSettings(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Som das Notificações</p>
                <p className="text-sm text-gray-600">Alertas sonoros suaves</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => setSettings(prev => ({ ...prev, soundEnabled: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Horários Adaptativos</p>
                <p className="text-sm text-gray-600">IA ajusta horários conforme rotina</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.adaptiveTimings}
                  onChange={(e) => setSettings(prev => ({ ...prev, adaptiveTimings: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Tom Baseado no Humor</p>
                <p className="text-sm text-gray-600">Mensagens se adaptam ao seu estado</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.moodBasedTone}
                  onChange={(e) => setSettings(prev => ({ ...prev, moodBasedTone: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Frequência por Energia</p>
                <p className="text-sm text-gray-600">Menos notificações quando cansado</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.energyBasedFrequency}
                  onChange={(e) => setSettings(prev => ({ ...prev, energyBasedFrequency: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Respeitar Não Perturbe</p>
                <p className="text-sm text-gray-600">Pausar em horários de descanso</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.respectDoNotDisturb}
                  onChange={(e) => setSettings(prev => ({ ...prev, respectDoNotDisturb: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* AI Examples */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">🤖 Exemplos de IA Contextual</h3>
        <p className="text-blue-700 mb-4 text-sm">
          Veja como nossa IA adapta as mensagens baseado no seu humor e contexto:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {aiNotificationExamples.map((example, index) => (
            <div key={index} className="bg-white/60 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
                  {example.mood}
                </span>
              </div>
              <p className="text-sm text-gray-700 italic">"{example.message}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Suas Notificações</h3>
        
        {notifications.map(notification => (
          <div key={notification.id} className={`rounded-xl p-4 border ${getNotificationColor(notification.type)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-800">{notification.title}</h4>
                    {notification.aiGenerated && (
                      <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">IA</span>
                    )}
                    {notification.contextual && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Contextual</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {notification.scheduledTime}
                    </span>
                    <span className="capitalize">{notification.frequency}</span>
                    <span className="capitalize">{notification.type.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleNotification(notification.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    notification.isActive 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {notification.isActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Notification Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Nova Notificação</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={newNotification.type}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, type: e.target.value as SmartNotification['type'] }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="motivational">Motivacional</option>
                  <option value="reminder">Lembrete</option>
                  <option value="check-in">Check-in</option>
                  <option value="break">Pausa</option>
                  <option value="achievement">Conquista</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={newNotification.title || ''}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Momento de reflexão"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                <textarea
                  value={newNotification.message || ''}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Sua mensagem motivacional..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                  <input
                    type="time"
                    value={newNotification.scheduledTime || ''}
                    onChange={(e) => setNewNotification(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequência</label>
                  <select
                    value={newNotification.frequency}
                    onChange={(e) => setNewNotification(prev => ({ ...prev, frequency: e.target.value as SmartNotification['frequency'] }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="daily">Diário</option>
                    <option value="weekly">Semanal</option>
                    <option value="custom">Personalizado</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={addNotification}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg"
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
