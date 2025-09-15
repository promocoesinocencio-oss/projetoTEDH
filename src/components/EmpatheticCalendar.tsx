import React, { useState } from 'react';
import { Calendar, Clock, Zap, AlertCircle, Coffee, Moon, Sun } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'task' | 'rest' | 'appointment' | 'exercise' | 'social';
  date: Date;
  duration: number;
  energyRequired: number;
  priority: 'low' | 'medium' | 'high';
  isAdaptive?: boolean;
  originalDate?: Date;
}

interface DayAnalysis {
  date: Date;
  totalEnergyRequired: number;
  workload: 'light' | 'moderate' | 'heavy' | 'overloaded';
  suggestions: string[];
  moodPrediction: number;
}

const EmpatheticCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userEnergyLevel, setUserEnergyLevel] = useState(7);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Exercício matinal',
      type: 'exercise',
      date: new Date(2025, 0, 28),
      duration: 30,
      energyRequired: 6,
      priority: 'medium'
    },
    {
      id: '2',
      title: 'Reunião de trabalho',
      type: 'appointment',
      date: new Date(2025, 0, 28),
      duration: 60,
      energyRequired: 8,
      priority: 'high'
    },
    {
      id: '3',
      title: 'Descanso programado',
      type: 'rest',
      date: new Date(2025, 0, 28),
      duration: 20,
      energyRequired: 0,
      priority: 'low',
      isAdaptive: true
    },
    {
      id: '4',
      title: 'Organizar quarto',
      type: 'task',
      date: new Date(2025, 0, 29),
      duration: 45,
      energyRequired: 5,
      priority: 'medium'
    }
  ]);

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'task':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'rest':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'appointment':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'exercise':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'social':
        return 'bg-pink-100 text-pink-700 border-pink-200';
    }
  };

  const getEventTypeIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'task':
        return '📝';
      case 'rest':
        return '😴';
      case 'appointment':
        return '📅';
      case 'exercise':
        return '💪';
      case 'social':
        return '👥';
    }
  };

  const analyzeDayWorkload = (date: Date): DayAnalysis => {
    const dayEvents = events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );

    const totalEnergyRequired = dayEvents.reduce((sum, event) => sum + event.energyRequired, 0);
    
    let workload: 'light' | 'moderate' | 'heavy' | 'overloaded';
    let suggestions: string[] = [];
    let moodPrediction = 8;

    if (totalEnergyRequired <= 15) {
      workload = 'light';
      suggestions = ['Dia tranquilo! Aproveite para relaxar', 'Considere adicionar uma atividade prazerosa'];
    } else if (totalEnergyRequired <= 25) {
      workload = 'moderate';
      suggestions = ['Dia equilibrado', 'Mantenha pausas entre atividades'];
      moodPrediction = 7;
    } else if (totalEnergyRequired <= 35) {
      workload = 'heavy';
      suggestions = ['Dia intenso - planeje bem as pausas', 'Considere reagendar algo não urgente'];
      moodPrediction = 6;
    } else {
      workload = 'overloaded';
      suggestions = [
        'Dia sobrecarregado! Recomendamos redistribuir algumas tarefas',
        'Priorize apenas o essencial',
        'Agende pausas obrigatórias'
      ];
      moodPrediction = 4;
    }

    // Ajustar sugestões baseado no nível de energia do usuário
    if (userEnergyLevel < 5 && workload !== 'light') {
      suggestions.unshift('Sua energia está baixa - considere um dia mais leve');
      moodPrediction -= 1;
    }

    return {
      date,
      totalEnergyRequired,
      workload,
      suggestions,
      moodPrediction: Math.max(1, moodPrediction)
    };
  };

  const getWorkloadColor = (workload: 'light' | 'moderate' | 'heavy' | 'overloaded') => {
    switch (workload) {
      case 'light':
        return 'bg-green-100 text-green-700';
      case 'moderate':
        return 'bg-blue-100 text-blue-700';
      case 'heavy':
        return 'bg-yellow-100 text-yellow-700';
      case 'overloaded':
        return 'bg-red-100 text-red-700';
    }
  };

  const redistributeTasks = () => {
    const analysis = analyzeDayWorkload(selectedDate);
    if (analysis.workload === 'overloaded') {
      // Simular redistribuição inteligente
      const heavyTasks = events.filter(event => 
        event.date.toDateString() === selectedDate.toDateString() && 
        event.energyRequired > 6 && 
        event.priority !== 'high'
      );

      if (heavyTasks.length > 0) {
        const taskToMove = heavyTasks[0];
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        
        setEvents(prev => prev.map(event => 
          event.id === taskToMove.id 
            ? { ...event, date: newDate, isAdaptive: true, originalDate: event.date }
            : event
        ));
      }
    }
  };

  const addRestPeriod = () => {
    const restEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: 'Pausa para respirar',
      type: 'rest',
      date: selectedDate,
      duration: 15,
      energyRequired: 0,
      priority: 'low',
      isAdaptive: true
    };
    setEvents(prev => [...prev, restEvent]);
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dayEvents = events.filter(event => 
        event.date.toDateString() === current.toDateString()
      );
      const analysis = analyzeDayWorkload(current);
      
      days.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === month,
        events: dayEvents,
        analysis
      });
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const selectedDayAnalysis = analyzeDayWorkload(selectedDate);
  const selectedDayEvents = events.filter(event => 
    event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800">Agenda Empática</h2>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            <div className="text-sm flex-1 sm:flex-none">
              <span className="text-gray-600">Energia:</span>
              <span className="font-semibold text-purple-600 ml-2">{userEnergyLevel}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={userEnergyLevel}
              onChange={(e) => setUserEnergyLevel(parseInt(e.target.value))}
              className="w-20 sm:w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        <p className="text-gray-600">
          Planejamento inteligente que se adapta à sua energia e sugere pausas estratégicas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-xl p-4 md:p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">
              {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-colors"
              >
                Hoje
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
              >
                →
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
              <div key={i} className="text-center text-xs sm:text-sm font-medium text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`p-1 sm:p-2 min-h-[70px] border rounded-lg cursor-pointer transition-all ${
                  day.isCurrentMonth ? 'bg-white hover:bg-purple-50' : 'bg-gray-50 text-gray-400'
                } ${
                  day.date.toDateString() === selectedDate.toDateString() 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{day.date.getDate()}</span>
                  {day.analysis.workload === 'overloaded' && (
                    <AlertCircle className="w-3 h-3 text-red-500" />
                  )}
                </div>
                
                <div className="space-y-1">
                  {day.events.slice(0, 2).map(event => (
                    <div key={event.id} className={`text-xs p-1 rounded ${getEventTypeColor(event.type).split(' ')[0]} truncate`}>
                       <span className="hidden sm:inline">{getEventTypeIcon(event.type)}</span> {event.title}
                    </div>
                  ))}
                  {day.events.length > 2 && (
                    <div className="text-xs text-gray-500">+{day.events.length - 2} mais</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day Details */}
        <div className="space-y-4">
          {/* Day Analysis */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
            <h3 className="font-semibold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-500" />
              {selectedDate.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Carga de trabalho:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkloadColor(selectedDayAnalysis.workload)}`}>
                  {selectedDayAnalysis.workload === 'light' ? 'Leve' :
                   selectedDayAnalysis.workload === 'moderate' ? 'Moderada' :
                   selectedDayAnalysis.workload === 'heavy' ? 'Pesada' : 'Sobrecarregada'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Energia necessária:</span>
                <span className="font-semibold">{selectedDayAnalysis.totalEnergyRequired}/40</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Humor previsto:</span>
                <span className="font-semibold">{selectedDayAnalysis.moodPrediction}/10</span>
              </div>
            </div>

            {/* Suggestions */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Sugestões da IA:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {selectedDayAnalysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">💡</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            {selectedDayAnalysis.workload === 'overloaded' && (
              <div className="mt-4 space-y-2">
                <button
                  onClick={redistributeTasks}
                  className="w-full bg-red-100 text-red-700 py-2 px-3 rounded-lg text-sm hover:bg-red-200 transition-colors"
                >
                  🔄 Redistribuir tarefas
                </button>
                <button
                  onClick={addRestPeriod}
                  className="w-full bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm hover:bg-green-200 transition-colors"
                >
                  😴 Adicionar pausa
                </button>
              </div>
            )}
          </div>

          {/* Day Events */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
            <h3 className="font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-500" />
              Atividades do Dia
            </h3>

            {selectedDayEvents.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhuma atividade planejada</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDayEvents.map(event => (
                  <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">{getEventTypeIcon(event.type)}</span>
                          <span className="font-medium">{event.title}</span>
                          {event.isAdaptive && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                              IA
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-600">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {event.duration}min
                          </span>
                          <span className="flex items-center">
                            <Zap className="w-3 h-3 mr-1" />
                            {event.energyRequired}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Energy Tips */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
              <Sun className="w-4 h-4 mr-2" />
              Dicas de Energia
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Manhã: melhor para tarefas complexas</li>
              <li>• Tarde: ideal para tarefas sociais</li>
              <li>• Pausas de 15min a cada 2h</li>
              <li>• Hidratação regular aumenta energia</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpatheticCalendar;
