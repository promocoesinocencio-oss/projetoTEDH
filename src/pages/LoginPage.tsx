import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Em um app real, aqui você validaria os dados e chamaria a API de login
    onLogin();
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">Bem-vindo(a) de volta!</h2>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">Estamos felizes em te ver novamente.</p>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input 
            type="email" 
            placeholder="seu@email.com"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
            <a href="#" className="text-xs text-purple-600 hover:underline dark:text-purple-400">Esqueceu a senha?</a>
          </div>
          <input 
            type="password" 
            placeholder="********"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>
        
        <button 
          onClick={handleLoginClick}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
          Entrar
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Não tem uma conta?{' '}
        <Link to="/signup" className="font-medium text-purple-600 hover:underline dark:text-purple-400">
          Cadastre-se
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
