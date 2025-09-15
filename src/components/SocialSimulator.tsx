import React, { useState } from 'react';
import { MessageCircle, User, PlayCircle, RotateCcw, Star, Volume2, Mic } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  category: 'interview' | 'meeting' | 'social' | 'conflict';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  avatar: string;
  context: string;
}

interface SimulationMessage {
  id: string;
  sender: 'user' | 'npc';
  text: string;
  timestamp: Date;
  feedback?: {
    score: number;
    suggestions: string[];
    strengths: string[];
  };
}

const SocialSimulator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [messages, setMessages] = useState<SimulationMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [overallScore, setOverallScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: '1',
      title: 'Entrevista de Emprego',
      description: 'Pratique respostas para perguntas comuns de entrevista',
      category: 'interview',
      difficulty: 'intermediate',
      avatar: '👨‍💼',
      context: 'Você está em uma entrevista para a vaga dos seus sonhos. O entrevistador é amigável mas profissional.'
    },
    {
      id: '2',
      title: 'Reunião de Trabalho',
      description: 'Aprenda a se expressar em reuniões profissionais',
      category: 'meeting',
      difficulty: 'intermediate',
      avatar: '👩‍💻',
      context: 'Você está em uma reunião de equipe onde precisa apresentar suas ideias.'
    },
    {
      id: '3',
      title: 'Conversa Casual',
      description: 'Pratique small talk e conversas sociais',
      category: 'social',
      difficulty: 'beginner',
      avatar: '😊',
      context: 'Você está em um evento social e quer iniciar uma conversa interessante.'
    },
    {
      id: '4',
      title: 'Resolução de Conflito',
      description: 'Aprenda a lidar com situações tensas de forma empática',
      category: 'conflict',
      difficulty: 'advanced',
      avatar: '🤝',
      context: 'Há um mal-entendido que precisa ser resolvido de forma respeitosa.'
    }
  ];

  const categoryColors = {
    interview: 'bg-blue-100 text-blue-700',
    meeting: 'bg-purple-100 text-purple-700',
    social: 'bg-green-100 text-green-700',
    conflict: 'bg-orange-100 text-orange-700'
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-600',
    intermediate: 'bg-yellow-100 text-yellow-600',
    advanced: 'bg-red-100 text-red-600'
  };

  const startSimulation = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setIsSimulating(true);
    setMessages([]);
    setOverallScore(0);

    // Mensagem inicial do NPC
    const initialMessage: SimulationMessage = {
      id: '1',
      sender: 'npc',
      text: getInitialMessage(scenario),
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  };

  const getInitialMessage = (scenario: Scenario): string => {
    const initialMessages = {
      interview: 'Olá! Obrigado por vir hoje. Fale-me um pouco sobre você e por que está interessado nesta posição.',
      meeting: 'Bom dia! Vamos começar a reunião. Gostaria que você compartilhasse suas ideias sobre o projeto.',
      social: 'Oi! Que evento interessante, não é? Você já conhece muitas pessoas aqui?',
      conflict: 'Olha, acho que tivemos um mal-entendido outro dia. Podemos conversar sobre isso?'
    };
    return initialMessages[scenario.category];
  };

  const sendMessage = () => {
    if (!userInput.trim() || !selectedScenario) return;

    const userMessage: SimulationMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');

    // Simular análise de comunicação e resposta do NPC
    setTimeout(() => {
      const feedback = analyzeUserResponse(userInput, selectedScenario);
      const npcResponse = generateNPCResponse(userInput, selectedScenario, messages.length);

      const npcMessage: SimulationMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'npc',
        text: npcResponse,
        timestamp: new Date()
      };

      const userMessageWithFeedback: SimulationMessage = {
        ...userMessage,
        feedback
      };

      setMessages(prev => [
        ...prev.slice(0, -1),
        userMessageWithFeedback,
        npcMessage
      ]);

      setOverallScore(prev => Math.min(100, prev + feedback.score));
    }, 1500);
  };

  const analyzeUserResponse = (text: string, scenario: Scenario) => {
    // Simulação de análise de comunicação
    const positiveWords = ['obrigado', 'por favor', 'desculpe', 'compreendo', 'concordo'];
    const confidenceWords = ['acredito', 'tenho certeza', 'posso', 'conseguiria', 'experiência'];
    
    const hasPositiveLanguage = positiveWords.some(word => text.toLowerCase().includes(word));
    const hasConfidence = confidenceWords.some(word => text.toLowerCase().includes(word));
    const isAppropriateLenght = text.length > 20 && text.length < 200;
    
    let score = 0;
    const suggestions: string[] = [];
    const strengths: string[] = [];

    if (hasPositiveLanguage) {
      score += 10;
      strengths.push('Linguagem cortês e respeitosa');
    } else {
      suggestions.push('Tente usar linguagem mais cortês e respeitosa');
    }

    if (hasConfidence) {
      score += 15;
      strengths.push('Demonstrou confiança na resposta');
    } else {
      suggestions.push('Mostre mais confiança em suas capacidades');
    }

    if (isAppropriateLenght) {
      score += 10;
      strengths.push('Resposta com tamanho adequado');
    } else {
      suggestions.push('Elabore mais sua resposta ou seja mais conciso');
    }

    // Pontuação adicional baseada no contexto
    if (scenario.category === 'interview' && text.toLowerCase().includes('empresa')) {
      score += 10;
      strengths.push('Mencionou interesse na empresa');
    }

    return {
      score: Math.min(35, score),
      suggestions,
      strengths
    };
  };

  const generateNPCResponse = (userText: string, scenario: Scenario, messageCount: number): string => {
    const responses = {
      interview: [
        'Interessante! Conte-me sobre uma situação desafiadora que você enfrentou e como a resolveu.',
        'Muito bem! Quais são seus pontos fortes e como eles se aplicariam a esta função?',
        'Perfeito! Você tem alguma pergunta sobre a empresa ou sobre a posição?'
      ],
      meeting: [
        'Ótima perspectiva! Como você implementaria essa ideia na prática?',
        'Entendo seu ponto. Que recursos você acha que precisaríamos para isso?',
        'Excelente! Alguém tem alguma dúvida sobre esta proposta?'
      ],
      social: [
        'Que legal! Eu também estou conhecendo pessoas novas. Você trabalha com o quê?',
        'Interessante! Eu adoro eventos assim. Você vem aqui frequentemente?',
        'Que bacana! Tenho uma amiga que trabalha na mesma área. Vocês deviam se conhecer!'
      ],
      conflict: [
        'Obrigado por estar disposto a conversar. Como você viu a situação?',
        'Entendo sua perspectiva. Acho que posso ter me expressado mal.',
        'Que bom que conseguimos esclarecer isso. Como podemos evitar mal-entendidos no futuro?'
      ]
    };

    const categoryResponses = responses[scenario.category];
    return categoryResponses[Math.min(messageCount - 1, categoryResponses.length - 1)];
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSelectedScenario(null);
    setMessages([]);
    setOverallScore(0);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Implementar Web Speech API
    if (!isRecording) {
      setTimeout(() => {
        setUserInput('Obrigado pela oportunidade. Tenho muito interesse nesta posição...');
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

  if (!isSimulating) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
          <div className="flex items-center space-x-3 mb-4">
            <MessageCircle className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800">Simulador Social</h2>
          </div>
          <p className="text-gray-600">
            Pratique suas habilidades sociais em cenários realistas com feedback inteligente sobre sua comunicação.
          </p>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{scenario.avatar}</div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[scenario.category]}`}>
                    {scenario.category === 'interview' ? 'Entrevista' :
                     scenario.category === 'meeting' ? 'Reunião' :
                     scenario.category === 'social' ? 'Social' : 'Conflito'}
                  </span>
                  <span className={`block mt-1 px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[scenario.difficulty]}`}>
                    {scenario.difficulty === 'beginner' ? 'Iniciante' :
                     scenario.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{scenario.title}</h3>
              <p className="text-gray-600 mb-4">{scenario.description}</p>
              <p className="text-sm text-gray-500 mb-4 italic">{scenario.context}</p>
              
              <button
                onClick={() => startSimulation(scenario)}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
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
      {/* Simulation Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{selectedScenario?.avatar}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{selectedScenario?.title}</h3>
              <p className="text-sm text-gray-600">{selectedScenario?.context}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold text-gray-800">{overallScore}/100</span>
              </div>
              <span className="text-xs text-gray-600">Pontuação</span>
            </div>
            <button
              onClick={resetSimulation}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-all"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white/80 backdrop-blur-md rounded-xl border border-purple-100 p-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {message.sender === 'npc' && (
                      <button
                        onClick={() => handleTextToSpeech(message.text)}
                        className="text-gray-500 hover:text-purple-500 transition-colors ml-2"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Feedback for user messages */}
              {message.feedback && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-green-50 border border-green-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-800">+{message.feedback.score} pontos</span>
                    </div>
                    
                    {message.feedback.strengths.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-green-800">Pontos fortes:</p>
                        <ul className="text-xs text-green-700">
                          {message.feedback.strengths.map((strength, index) => (
                            <li key={index}>• {strength}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {message.feedback.suggestions.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-green-800">Sugestões:</p>
                        <ul className="text-xs text-green-700">
                          {message.feedback.suggestions.map((suggestion, index) => (
                            <li key={index}>• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleVoiceInput}
            className={`p-3 rounded-full transition-all ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <div className="flex-1">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Digite sua resposta..."
              className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!userInput.trim()}
            className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialSimulator;
