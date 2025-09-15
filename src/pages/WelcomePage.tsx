import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Target, Brain, Shield } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const features = [
    { icon: Brain, title: 'IA Empática', description: 'Receba apoio e motivação personalizados.' },
    { icon: Target, title: 'Metas Adaptativas', description: 'Crie metas que se ajustam à sua energia.' },
    { icon: Shield, title: 'Apoio em Crises', description: 'Ferramentas para momentos difíceis.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <Heart className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:text-transparent">
            MindSupport
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-4">
          Seu companheiro inteligente para o bem-estar emocional.
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
          Um espaço seguro e empático para cuidar da sua saúde mental com o poder da tecnologia adaptativa. Comece sua jornada de autocuidado hoje.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/signup"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Criar Conta Gratuitamente
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto bg-white/80 dark:bg-gray-800/50 backdrop-blur-md text-purple-600 dark:text-purple-300 font-semibold py-3 px-8 rounded-lg border border-purple-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
          >
            Já tenho uma conta
          </Link>
        </div>

        <div className="max-w-4xl mx-auto mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/50 dark:bg-gray-800/40 backdrop-blur-md p-6 rounded-xl border border-purple-100 dark:border-gray-700">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
