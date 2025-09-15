import React, { useState } from 'react';
import { MessageCircle, PlayCircle, RotateCcw, Star, Volume2, Mic } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  category: 'interview' | 'meeting' | 'social' | 'conflict';
  avatar: string;
  context: string;
}

interface SimulationMessage {
  id: string;
  sender: 'user' | 'npc';
  text: string;
  feedback?: { score: number; suggestions: string[]; strengths: string[]; };
}

const SocialSimulator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<SimulationMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [overallScore, setOverallScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const scenarios: Scenario[] = [
    { id: '1', title: 'Entrevista de Emprego', description: 'Pratique respostas para perguntas comuns', category: 'interview', avatar: '👨‍💼', context: 'Você está em uma entrevista para a vaga dos seus sonhos.' },
    { id: '2', title: 'Reunião de Trabalho', description: 'Aprenda a se expressar em reuniões', category: 'meeting', avatar: '👩‍💻', context: 'Você precisa apresentar suas ideias para a equipe.' },
    { id: '3', title: 'Conversa Casual', description: 'Pratique small talk e conversas sociais', category: 'social', avatar: '😊', context: 'Você está em um evento e quer iniciar uma conversa.' },
    { id: '4', title: 'Resolução de Conflito', description: 'Aprenda a lidar com situações tensas', category: 'conflict', avatar: '🤝', context: 'Um mal-entendido precisa ser resolvido.' }
  ];

  const categoryColors = {
    interview: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    meeting: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
    social: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
    conflict: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
  };

  const startSimulation = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setMessages([{ id: '1', sender: 'npc', text: getInitialMessage(scenario) }]);
    setOverallScore(0);
  };

  const getInitialMessage = (scenario: Scenario): string => ({
    interview: 'Olá! Obrigado por vir. Fale-me um pouco sobre você.',
    meeting: 'Bom dia! Vamos começar. Gostaria que compartilhasse suas ideias.',
    social: 'Oi! Que evento interessante, não é?',
    conflict: 'Olha, acho que tivemos um mal-entendido. Podemos conversar?'
  })[scenario.category];

  const sendMessage = () => {
    if (!userInput.trim() || !selectedScenario) return;
    const userMessage: SimulationMessage = { id: Date.now().toString(), sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');

    setTimeout(() => {
      const feedback = analyzeUserResponse(userInput);
      const npcResponse = generateNPCResponse(selectedScenario, messages.length);
      const npcMessage: SimulationMessage = { id: (Date.now() + 1).toString(), sender: 'npc', text: npcResponse };
      setMessages(prev => [...prev.slice(0, -1), { ...userMessage, feedback }, npcMessage]);
      setOverallScore(prev => Math.min(100, prev + feedback.score));
    }, 1500);
  };

  const analyzeUserResponse = (text: string) => {
    let score = 15 + Math.floor(Math.random() * 15);
    const strengths = ['Clareza na resposta'];
    const suggestions = ['Tente elaborar um pouco mais na próxima vez.'];
    if (text.length > 50) strengths.push('Boa elaboração');
    if (text.toLowerCase().includes('obrigado')) strengths.push('Linguagem cortês');
    return { score, suggestions, strengths };
  };

  const generateNPCResponse = (scenario: Scenario, messageCount: number): string => {
    const responses = {
      interview: ['Interessante! E qual sua maior qualidade?', 'Ótimo. Você tem alguma pergunta para mim?'],
      meeting: ['Bom ponto. Como você vê os próximos passos?', 'Agradeço a contribuição.'],
      social: ['Que legal! Você trabalha com o quê?', 'Prazer em te conhecer!'],
      conflict: ['Entendo sua perspectiva. Obrigado por compartilhar.', 'Fico feliz que esclarecemos isso.']
    };
    return responses[scenario.category][Math.min(messageCount - 1, responses[scenario.category].length - 1)] || "Entendi. Algo mais?";
  };

  const resetSimulation = () => setSelectedScenario(null);

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setUserInput('Obrigado pela oportunidade. Tenho muito interesse...');
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      speechSynthesis.speak(utterance);
    }
  };

  if (!selectedScenario) {
    return (
      <div className="space-y-6">
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <MessageCircle className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Simulador Social</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Pratique suas habilidades sociais em cenários realistas com feedback inteligente.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{scenario.avatar}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[scenario.category]}`}>{scenario.title}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{scenario.description}</p>
              <button onClick={() => startSimulation(scenario)} className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                <PlayCircle className="w-5 h-5" />
                <span>Iniciar Simulação</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{selectedScenario.avatar}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{selectedScenario.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{selectedScenario.context}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="flex items-center space-x-1"><Star className="w-4 h-4 text-yellow-500" /><span className="font-semibold text-gray-800 dark:text-gray-100">{overallScore}/100</span></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Pontuação</span>
            </div>
            <button onClick={resetSimulation} className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg transition-all"><RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-100 dark:border-gray-700 p-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${message.sender === 'user' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                  <div className="flex items-start justify-between">
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {message.sender === 'npc' && <button onClick={() => handleTextToSpeech(message.text)} className="text-gray-500 dark:text-gray-400 hover:text-purple-500 transition-colors ml-2"><Volume2 className="w-4 h-4" /></button>}
                  </div>
                </div>
              </div>
              {message.feedback && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2"><Star className="w-4 h-4 text-green-600" /><span className="font-semibold text-green-800 dark:text-green-300">+{message.feedback.score} pontos</span></div>
                    {message.feedback.strengths.length > 0 && <div className="mb-2"><p className="text-xs font-medium text-green-800 dark:text-green-300">Pontos fortes:</p><ul className="text-xs text-green-700 dark:text-green-400">{message.feedback.strengths.map((s, i) => <li key={i}>• {s}</li>)}</ul></div>}
                    {message.feedback.suggestions.length > 0 && <div><p className="text-xs font-medium text-yellow-800 dark:text-yellow-300">Sugestões:</p><ul className="text-xs text-yellow-700 dark:text-yellow-400">{message.feedback.suggestions.map((s, i) => <li key={i}>• {s}</li>)}</ul></div>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={handleVoiceInput} className={`p-3 rounded-full transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600'}`}><Mic className="w-5 h-5" /></button>
          <div className="flex-1"><input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Digite sua resposta..." className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent" /></div>
          <button onClick={sendMessage} disabled={!userInput.trim()} className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50"><MessageCircle className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
};

export default SocialSimulator;
