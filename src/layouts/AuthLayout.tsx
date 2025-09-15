import React from 'react';
import { Heart } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:text-transparent">
            MindSupport
          </h1>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-purple-100 dark:border-gray-700">
          {children}
        </div>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          © 2025 MindSupport. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
