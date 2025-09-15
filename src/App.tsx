import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  // Simulação de estado de autenticação. Em um app real, isso viria de um contexto, Supabase, etc.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Funções para simular login/logout
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    // Redireciona para a página de login após o logout
    return <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <WelcomePage /> : <Navigate to="/app/dashboard" />} />
      <Route path="/login" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/app/dashboard" />} />
      <Route path="/signup" element={!isAuthenticated ? <SignupPage onSignup={handleLogin} /> : <Navigate to="/app/dashboard" />} />
      
      {/* Rota Protegida para o App Principal */}
      <Route 
        path="/app/*" 
        element={
          isAuthenticated 
            ? <MainLayout onLogout={handleLogout} /> 
            : <Navigate to="/login" replace />
        } 
      />
      
      {/* Fallback para qualquer outra rota */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/app/dashboard" : "/"} />} />
    </Routes>
  );
}

export default App;
