import React, { useState } from 'react';
import { Target, Plus, CheckCircle, Clock, Zap, AlertCircle, Edit3 } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'work' | 'personal' | 'social';
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'pending' | 'in-progress' | 'completed';
  microSteps: MicroStep[];
  energyRequired: number;
  deadline?: string;
  userEnergy: number;
}

interface MicroStep {
  id: string;
  title: string;
  completed: boolean;
  estimatedTime: number;
}

const GoalsManager: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Exercitar-se regularmente',
      description: 'Fazer exercícios 3x por semana',
      category: 'health',
      difficulty: 'medium',
      status: 'in-progress',
      energyRequired: 7,
      userEnergy: 6,
      deadline: '2025-02-15',
      microSteps: [
        { id: '1a', title: 'Separar roupa de ginástica', completed: true, estimatedTime: 2 },
        { id: '1b', title: 'Fazer 10 minutos de caminhada', completed: true, estimatedTime: 10 },
        { id: '1c', title: 'Fazer alongamento básico', completed: false, estimatedTime: 5 },
        { id: '1d', title: 'Aumentar para 15 min de exercício', completed: false, estimatedTime: 15 },
      ]
    },
    {
      id: '2',
      title: 'Organizar quarto',
      description: 'Deixar o ambiente mais tranquilo',
      category: 'personal',
      difficulty: 'easy',
      status: 'pending',
      energyRequired: 4,
      userEnergy: 6,
      microSteps: [
        { id: '2a', title: 'Recolher roupas do chão', completed: false, estimatedTime: 5 },
        { id: '2b', title: 'Fazer a cama', completed: false, estimatedTime: 3 },
        { id: '2c', title: 'Organizar mesa de estudos', completed: false, estimatedTime: 10 },
      ]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [currentUserEnergy, setCurrentUserEnergy] = useState(6);

  const categoryColors = {
    health: 'bg-green-500',
    work: 'bg-blue-500',
    personal: 'bg-purple-500',
    social: 'bg-orange-500'
  };

  const difficultyColors = {
    easy: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    hard: 'text-red-600 bg-red-100'
  };

  const getAdaptiveRecommendation = (goal: Goal) => {
    if (currentUserEnergy < goal.energyRequired) {
      return {
        type: 'energy-low',
        message: 'Sua energia está baixa. Que tal começar com micro-passos mais simples?',
        suggestion: 'Escolha apenas 1-2 micro-passos hoje'
      };
    }
    if (currentUserEnergy >= goal.energyRequired + 2) {
      return {
        type: 'energy-high',
        message: 'Você está com boa energia! Perfeito para avançar mais.',
        suggestion: 'Considere completar 3-4 micro-passos hoje'
      };
    }
    return {
      type: 'energy-normal',
      message: 'Sua energia está adequada para esta meta.',
      suggestion: 'Siga seu ritmo normal'
    };
  };

  const toggleMicroStep = (goalId: string, stepId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedSteps = goal.microSteps.map(step =>
          step.id === stepId ? { ...step, completed: !step.completed } : step
        );
        return { ...goal, microSteps: updatedSteps };
      }
      return goal;
    }));
  };

  const getCompletionPercentage = (goal: Goal) => {
    const completed = goal.microSteps.filter(step => step.completed).length;
    return Math.round((completed / goal.microSteps.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800">Metas Adaptativas</h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Meta</span>
          </button>
        </div>

        {/* Energy Level */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Meu nível de energia hoje:</span>
            <span className="text-lg font-bold text-purple-600">{currentUserEnergy}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={currentUserEnergy}
            onChange={(e) => setCurrentUserEnergy(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Baixa</span>
            <span>Moderada</span>
            <span>Alta</span>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const recommendation = getAdaptiveRecommendation(goal);
          const completionPercentage = getCompletionPercentage(goal);

          return (
            <div key={goal.id} className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
              {/* Goal Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${categoryColors[goal.category]}`}></div>
                    <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[goal.difficulty]}`}>
                      {goal.difficulty === 'easy' ? 'Fácil' : goal.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{goal.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progresso</span>
                      <span className="font-medium text-purple-600">{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Zap className="w-4 h-4" />
                      <span>{goal.energyRequired}/10</span>
                    </div>
                    {goal.deadline && (
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(goal.deadline).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                  <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-purple-500" />
                </div>
              </div>

              {/* AI Recommendation */}
              <div className={`p-3 rounded-lg mb-4 ${
                recommendation.type === 'energy-low' ? 'bg-yellow-50 border border-yellow-200' :
                recommendation.type === 'energy-high' ? 'bg-green-50 border border-green-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <div className="flex items-start space-x-2">
                  <AlertCircle className={`w-4 h-4 mt-0.5 ${
                    recommendation.type === 'energy-low' ? 'text-yellow-600' :
                    recommendation.type === 'energy-high' ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{recommendation.message}</p>
                    <p className="text-xs text-gray-600 mt-1">{recommendation.suggestion}</p>
                  </div>
                </div>
              </div>

              {/* Micro Steps */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Micro-passos
                </h4>
                {goal.microSteps.map((step) => (
                  <div key={step.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={step.completed}
                      onChange={() => toggleMicroStep(goal.id, step.id)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className={`flex-1 ${step.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {step.title}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.estimatedTime}min
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Goal Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Nova Meta</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título da meta"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <textarea
                placeholder="Descrição"
                className="w-full p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="">Categoria</option>
                <option value="health">Saúde</option>
                <option value="work">Trabalho</option>
                <option value="personal">Pessoal</option>
                <option value="social">Social</option>
              </select>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg"
                >
                  Criar Meta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsManager;
