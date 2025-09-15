import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Award, Target, Heart, Brain, Zap } from 'lucide-react';

const ProgressReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  const weeklyData = [
    { week: 'S1', mood: 6.5, energy: 7, goals: 8 },
    { week: 'S2', mood: 7.2, energy: 7.5, goals: 9 },
    { week: 'S3', mood: 6.8, energy: 6, goals: 7 },
    { week: 'S4', mood: 8.1, energy: 8, goals: 10 },
  ];

  const achievements = [
    { id: '1', title: 'Primeira Semana Completa', icon: '🎯', unlockedAt: new Date('2025-01-08')},
    { id: '2', title: 'Humor em Alta', icon: '😊', unlockedAt: new Date('2025-01-15')},
    { id: '3', title: 'Mestre das Metas', icon: '🏆', unlockedAt: new Date('2025-01-22')},
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Relatórios de Progresso</h2>
          </div>
          <div className="flex space-x-2 self-start sm:self-center">
            <button onClick={() => setSelectedPeriod('week')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedPeriod === 'week' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100'}`}>Semana</button>
            <button onClick={() => setSelectedPeriod('month')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedPeriod === 'month' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100'}`}>Mês</button>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Visualize seu progresso e celebre cada conquista.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600 dark:text-gray-300">Humor Médio</p><p className="text-2xl font-bold text-green-600 dark:text-green-400">7.6/10</p></div><Heart className="w-8 h-8 text-green-500" /></div></div>
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600 dark:text-gray-300">Energia Média</p><p className="text-2xl font-bold text-blue-600 dark:text-blue-400">7.3/10</p></div><Zap className="w-8 h-8 text-blue-500" /></div></div>
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600 dark:text-gray-300">Metas Concluídas</p><p className="text-2xl font-bold text-purple-600 dark:text-purple-400">43</p></div><Target className="w-8 h-8 text-purple-500" /></div></div>
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600 dark:text-gray-300">Dias Ativos</p><p className="text-2xl font-bold text-orange-600 dark:text-orange-400">28/30</p></div><Calendar className="w-8 h-8 text-orange-500" /></div></div>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-6 flex items-center text-gray-800 dark:text-gray-100"><BarChart3 className="w-5 h-5 mr-2 text-purple-500" />Evolução Semanal</h3>
        <div className="overflow-x-auto pb-4"><div className="h-64 flex items-end justify-between min-w-max space-x-4 px-4">{weeklyData.map((d, i) => <div key={i} className="flex flex-col items-center space-y-2 flex-1"><div className="flex items-end space-x-1"><div title={`Humor: ${d.mood}`} className="w-4 bg-gradient-to-t from-green-400 to-green-600 rounded-t" style={{ height: `${(d.mood / 10) * 200}px` }}></div><div title={`Energia: ${d.energy}`} className="w-4 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t" style={{ height: `${(d.energy / 10) * 200}px` }}></div><div title={`Metas: ${d.goals}`} className="w-4 bg-gradient-to-t from-purple-400 to-purple-600 rounded-t" style={{ height: `${(d.goals / 10) * 200}px` }}></div></div><span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{d.week}</span></div>)}</div></div>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 mt-6 text-sm dark:text-gray-300"><div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-2"></div><span>Humor</span></div><div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded mr-2"></div><span>Energia</span></div><div className="flex items-center"><div className="w-3 h-3 bg-purple-500 rounded mr-2"></div><span>Metas</span></div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-100"><Brain className="w-5 h-5 mr-2 text-purple-500" />Insights da IA</h3>
          <div className="space-y-4"><div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800"><h4 className="font-medium text-purple-800 dark:text-purple-200">Progresso Notável</h4><p className="text-sm text-purple-700 dark:text-purple-300">Seu humor melhorou 23% nas últimas 4 semanas. Continue assim!</p></div><div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800"><h4 className="font-medium text-blue-800 dark:text-blue-200">Consistência é a chave</h4><p className="text-sm text-blue-700 dark:text-blue-300">Você manteve uma sequência de 12 dias. Isso mostra dedicação!</p></div></div>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-100"><Award className="w-5 h-5 mr-2 text-purple-500" />Conquistas</h3>
          <div className="space-y-3">{achievements.map(a => <div key={a.id} className="flex items-center space-x-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800"><div className="text-2xl">{a.icon}</div><div><h4 className="font-medium text-gray-800 dark:text-gray-200">{a.title}</h4><p className="text-sm text-gray-600 dark:text-gray-400">Desbloqueado em {a.unlockedAt.toLocaleDateString('pt-BR')}</p></div></div>)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressReports;
