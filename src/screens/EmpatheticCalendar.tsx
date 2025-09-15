import React, { useState } from 'react';
import { Calendar, Clock, Zap, AlertCircle } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'task' | 'rest' | 'appointment';
  date: Date;
  energyRequired: number;
}

const EmpatheticCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userEnergyLevel, setUserEnergyLevel] = useState(7);
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: '1', title: 'Reunião de trabalho', type: 'appointment', date: new Date(2025, 0, 28), energyRequired: 8 },
    { id: '2', title: 'Pausa para respirar', type: 'rest', date: new Date(2025, 0, 28), energyRequired: 0 },
    { id: '3', title: 'Organizar quarto', type: 'task', date: new Date(2025, 0, 29), energyRequired: 5 },
  ]);

  const getEventTypeColor = (type: CalendarEvent['type']) => ({
    task: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    rest: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
    appointment: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  })[type];

  const analyzeDayWorkload = (date: Date) => {
    const dayEvents = events.filter(e => e.date.toDateString() === date.toDateString());
    const totalEnergy = dayEvents.reduce((sum, e) => sum + e.energyRequired, 0);
    if (totalEnergy > 15) return { level: 'overloaded', suggestions: ['Dia sobrecarregado! Considere reagendar algo.'] };
    if (totalEnergy > 10) return { level: 'heavy', suggestions: ['Dia intenso. Planeje pausas.'] };
    return { level: 'light', suggestions: ['Dia tranquilo!'] };
  };

  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
    return days;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div className="flex items-center space-x-3"><Calendar className="w-6 h-6 text-purple-500" /><h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Agenda Empática</h2></div>
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            <div className="text-sm flex-1 sm:flex-none"><span className="text-gray-600 dark:text-gray-300">Energia:</span><span className="font-semibold text-purple-600 dark:text-purple-400 ml-2">{userEnergyLevel}/10</span></div>
            <input type="range" min="1" max="10" value={userEnergyLevel} onChange={(e) => setUserEnergyLevel(parseInt(e.target.value))} className="w-20 sm:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Planejamento que se adapta à sua energia e sugere pausas estratégicas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-4 md:p-6 border border-purple-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
            <div className="flex space-x-1">
              <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-colors">←</button>
              <button onClick={() => setCurrentDate(new Date())} className="px-3 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg text-sm hover:bg-purple-200 transition-colors">Hoje</button>
              <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-colors">→</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => <div key={d} className="text-center text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{d}</div>)}
            {generateCalendarDays().map(day => {
              const analysis = analyzeDayWorkload(day);
              const dayEvents = events.filter(e => e.date.toDateString() === day.toDateString());
              return <div key={day.toString()} className="p-1 sm:p-2 min-h-[80px] border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 cursor-pointer hover:bg-purple-50 dark:hover:bg-gray-700"><span className="text-sm font-medium text-gray-800 dark:text-gray-200">{day.getDate()}</span>{analysis.level === 'overloaded' && <AlertCircle className="w-3 h-3 text-red-500 float-right" />}{dayEvents.map(e => <div key={e.id} className={`text-xs p-1 rounded truncate mt-1 ${getEventTypeColor(e.type)}`}>{e.title}</div>)}</div>;
            })}
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
          <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">Análise do Dia</h3>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-800 dark:text-blue-200">Sugestão da IA</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">{analyzeDayWorkload(new Date()).suggestions[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpatheticCalendar;
