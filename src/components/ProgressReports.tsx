import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Award, Target, Heart, Brain, Zap } from 'lucide-react';

interface WeeklyData {
  week: string;
  mood: number;
  energy: number;
  goals: number;
  social: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'goals' | 'mood' | 'social' | 'consistency';
}

const ProgressReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week');

  const weeklyData: WeeklyData[] = [
    { week: 'S1', mood: 6.5, energy: 7, goals: 8, social: 5 },
    { week: 'S2', mood: 7.2, energy: 7.5, goals: 9, social: 6 },
    { week: 'S3', mood: 6.8, energy: 6, goals: 7, social: 7 },
    { week: 'S4', mood: 8.1, energy: 8, goals: 10, social: 8 },
    { week: 'S5', mood: 7.8, energy: 7, goals: 9, social: 7 },
    { week: 'S6', mood: 8.5, energy: 8.5, goals: 10, social: 9 },
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Primeira Semana Completa',
      description: 'Você completou sua primeira semana de uso consistente!',
      icon: '🎯',
      unlockedAt: new Date('2025-01-08'),
      category: 'consistency'
    },
    {
      id: '2',
      title: 'Humor em Alta',
      description: 'Manteve humor acima de 8/10 por 3 dias consecutivos',
      icon: '😊',
      unlockedAt: new Date('2025-01-15'),
      category: 'mood'
    },
    {
      id: '3',
      title: 'Mestre das Metas',
      description: 'Completou 10 metas em uma semana',
      icon: '🏆',
      unlockedAt: new Date('2025-01-22'),
      category: 'goals'
    },
    {
      id: '4',
      title: 'Sociável',
      description: 'Praticou habilidades sociais por 5 sessões',
      icon: '🤝',
      unlockedAt: new Date('2025-01-25'),
      category: 'social'
    }
  ];

  const insights = [
    {
      type: 'improvement',
      title: 'Progresso Notável em Humor',
      description: 'Seu humor melhorou 23% nas últimas 4 semanas. Continue com as práticas de mindfulness!',
      trend: '+23%'
    },
    {
      type: 'achievement',
      title: 'Consistência Impressionante',
      description: 'Você manteve uma sequência de 12 dias usando o app. Isso mostra dedicação ao autocuidado!',
      trend: '12 dias'
    },
    {
      type: 'suggestion',
      title: 'Oportunidade Social',
      description: 'Suas habilidades sociais estão melhorando. Que tal praticar em situações reais?',
      trend: 'Nova meta'
    }
  ];

  const getMaxValue = () => Math.max(...weeklyData.map(d => Math.max(d.mood, d.energy, d.goals, d.social)));

  const getCategoryColor = (category: 'goals' | 'mood' | 'social' | 'consistency') => {
    switch (category) {
      case 'goals':
        return 'bg-blue-100 text-blue-700';
      case 'mood':
        return 'bg-green-100 text-green-700';
      case 'social':
        return 'bg-purple-100 text-purple-700';
      case 'consistency':
        return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800">Relatórios de Progresso</h2>
          </div>
          <div className="flex space-x-2 self-start sm:self-center">
            {[
              { key: 'week', label: 'Semana' },
              { key: 'month', label: 'Mês' },
              { key: 'quarter', label: 'Trimestre' }
            ].map(period => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key as 'week' | 'month' | 'quarter')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === period.key
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
        <p className="text-gray-600">
          Visualize seu progresso e celebre cada conquista no seu caminho de bem-estar.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Humor Médio</p>
              <p className="text-2xl font-bold text-green-600">7.6/10</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +0.8
              </p>
            </div>
            <Heart className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Energia Média</p>
              <p className="text-2xl font-bold text-blue-600">7.3/10</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +0.5
              </p>
            </div>
            <Zap className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Metas Concluídas</p>
              <p className="text-2xl font-bold text-purple-600">43</p>
              <p className="text-sm text-purple-600 flex items-center mt-1">
                <Target className="w-3 h-3 mr-1" />
                +12
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dias Ativos</p>
              <p className="text-2xl font-bold text-orange-600">28/30</p>
              <p className="text-sm text-orange-600 flex items-center mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                93%
              </p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
          Evolução Semanal
        </h3>
        
        <div className="overflow-x-auto pb-4">
          <div className="h-64 flex items-end justify-between min-w-max space-x-4 px-4">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div className="flex items-end space-x-1">
                  <div title={`Humor: ${data.mood}`} className="w-2.5 bg-gradient-to-t from-green-400 to-green-600 rounded-t transition-all duration-300" style={{ height: `${(data.mood / 10) * 150}px` }}></div>
                  <div title={`Energia: ${data.energy}`} className="w-2.5 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t transition-all duration-300" style={{ height: `${(data.energy / 10) * 150}px` }}></div>
                  <div title={`Metas: ${data.goals}`} className="w-2.5 bg-gradient-to-t from-purple-400 to-purple-600 rounded-t transition-all duration-300" style={{ height: `${(data.goals / 10) * 150}px` }}></div>
                  <div title={`Social: ${data.social}`} className="w-2.5 bg-gradient-to-t from-orange-400 to-orange-600 rounded-t transition-all duration-300" style={{ height: `${(data.social / 10) * 150}px` }}></div>
                </div>
                <span className="text-xs text-gray-600 font-medium">{data.week}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 mt-6 text-sm">
          <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-2"></div><span>Humor</span></div>
          <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded mr-2"></div><span>Energia</span></div>
          <div className="flex items-center"><div className="w-3 h-3 bg-purple-500 rounded mr-2"></div><span>Metas</span></div>
          <div className="flex items-center"><div className="w-3 h-3 bg-orange-500 rounded mr-2"></div><span>Social</span></div>
        </div>
      </div>

      {/* Insights & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Insights */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-500" />
            Insights Personalizados
          </h3>
          
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-purple-800">{insight.title}</h4>
                  <span className="text-sm font-bold text-purple-600">{insight.trend}</span>
                </div>
                <p className="text-sm text-purple-700">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-purple-500" />
            Conquistas Desbloqueadas
          </h3>
          
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement.category)}`}>
                      {achievement.category === 'goals' ? 'Metas' :
                       achievement.category === 'mood' ? 'Humor' :
                       achievement.category === 'social' ? 'Social' : 'Consistência'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-4">📊 Resumo da Semana</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/60 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">🎯 Principais Conquistas</h4>
            <ul className="text-green-700 space-y-1">
              <li>• Completou 12 metas esta semana</li>
              <li>• Manteve humor estável por 5 dias</li>
              <li>• Praticou exercícios 4 vezes</li>
            </ul>
          </div>
          
          <div className="bg-white/60 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">🌱 Áreas de Crescimento</h4>
            <ul className="text-blue-700 space-y-1">
              <li>• Habilidades sociais em desenvolvimento</li>
              <li>• Energia mais consistente</li>
              <li>• Meditação se tornando hábito</li>
            </ul>
          </div>
          
          <div className="bg-white/60 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">💪 Próximos Passos</h4>
            <ul className="text-purple-700 space-y-1">
              <li>• Aumentar interações sociais</li>
              <li>• Manter rotina de exercícios</li>
              <li>• Explorar novos hobbies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressReports;
