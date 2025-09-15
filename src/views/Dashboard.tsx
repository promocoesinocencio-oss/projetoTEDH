import React from 'react';
import { Heart, Target, Brain, TrendingUp, Calendar, MessageCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const moodData = [
    { day: 'Seg', mood: 7, energy: 6 },
    { day: 'Ter', mood: 8, energy: 7 },
    { day: 'Qua', mood: 6, energy: 5 },
    { day: 'Qui', mood: 9, energy: 8 },
    { day: 'Sex', mood: 7, energy: 6 },
    { day: 'Sáb', mood: 8, energy: 7 },
    { day: 'Dom', mood: 9, energy: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Olá! Como você está se sentindo hoje? 💜</h2>
        <p className="text-purple-100 mb-4 text-sm md:text-base">
          Lembre-se: cada pequeno passo conta. Você é mais forte do que imagina.
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg hover:bg-white/30 transition-all text-sm">
            😊 Bem
          </button>
          <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg hover:bg-white/30 transition-all text-sm">
            😐 Neutro
          </button>
          <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg hover:bg-white/30 transition-all text-sm">
            😔 Difícil
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-4 md:p-6 border border-purple-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Metas Concluídas</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">8/12</p>
            </div>
            <Target className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }}></div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-4 md:p-6 border border-purple-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Humor Médio</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">7.7/10</p>
            </div>
            <Heart className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">↗️ +0.5 esta semana</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-4 md:p-6 border border-purple-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Sequência</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">5 dias</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">🔥 Continue assim!</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-4 md:p-6 border border-purple-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Próxima Tarefa</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">Exercício</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">em 30 minutos</p>
        </div>
      </div>

      {/* Weekly Mood Chart */}
      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-4 md:p-6 border border-purple-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-100">
          <Brain className="w-5 h-5 mr-2 text-purple-500" />
          Seu Humor Esta Semana
        </h3>
        <div className="overflow-x-auto pb-4">
          <div className="flex items-end justify-between h-40 min-w-max space-x-4">
            {moodData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex items-end space-x-1">
                  <div
                    className="w-4 md:w-6 bg-gradient-to-t from-purple-400 to-purple-600 rounded-t"
                    style={{ height: `${data.mood * 12}px` }}
                  ></div>
                  <div
                    className="w-4 md:w-6 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t"
                    style={{ height: `${data.energy * 12}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{data.day}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
            <span>Humor</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span>Energia</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-4 md:p-6 border border-purple-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Ações Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-green-50 dark:bg-green-900/40 hover:bg-green-100 dark:hover:bg-green-900/60 p-4 rounded-lg text-center transition-all group">
            <div className="w-10 h-10 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Respiração</span>
          </button>
          
          <button className="bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 p-4 rounded-lg text-center transition-all group">
            <div className="w-10 h-10 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Meditação</span>
          </button>
          
          <button className="bg-purple-50 dark:bg-purple-900/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 p-4 rounded-lg text-center transition-all group">
            <div className="w-10 h-10 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Conversar</span>
          </button>
          
          <button className="bg-orange-50 dark:bg-orange-900/40 hover:bg-orange-100 dark:hover:bg-orange-900/60 p-4 rounded-lg text-center transition-all group">
            <div className="w-10 h-10 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Nova Meta</span>
          </button>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/50 dark:to-purple-900/50 rounded-xl p-6 border border-pink-200 dark:border-pink-800">
        <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">💪 Mensagem do Dia</h4>
        <p className="text-purple-700 dark:text-purple-300 text-sm md:text-base">
          "Progresso não é perfeição. É sobre ser um pouco melhor do que ontem. 
          Você está fazendo um trabalho incrível ao cuidar de si mesmo!"
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
