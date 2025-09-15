import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

interface SignupPageProps {
  onSignup: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup }) => {
  const handleSignupClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Em um app real, aqui você validaria os dados e chamaria a API de cadastro
    onSignup();
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">Crie sua conta</h2>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">Comece sua jornada de bem-estar hoje mesmo.</p>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
          <input 
            type="text" 
            placeholder="Seu nome"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input 
            type="email" 
            placeholder="seu@email.com"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha</label>
          <input 
            type="password" 
            placeholder="Crie uma senha forte"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>
        
        <button 
          onClick={handleSignupClick}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
          Criar Conta
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Já tem uma conta?{' '}
        <Link to="/login" className="font-medium text-purple-600 hover:underline dark:text-purple-400">
          Faça login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;
