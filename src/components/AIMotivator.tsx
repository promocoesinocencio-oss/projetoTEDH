import React, { useState } from 'react';
import { Brain, Send, Heart, Smile, Frown, Meh, Mic, Volume2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: 'positive' | 'neutral' | 'negative';
}

interface MoodAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  keywords: string[];
  suggestion: string;
}

const AIMotivator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Eu sou sua IA motivacional. Como você está se sentindo hoje? Conte-me sobre seus pensamentos e sentimentos, e vou te ajudar com palavras de apoio personalizadas. 💜',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Simulação de análise de sentimento (em produção, usar OpenAI API)
  const analyzeMood = (text: string): MoodAnalysis => {
    const positiveWords = ['feliz', 'bem', 'bom', 'ótimo', 'alegre', 'animado', 'motivado', 'confiante'];
    const negativeWords = ['triste', 'mal', 'difícil', 'cansado', 'estressado', 'ansioso', 'deprimido', 'preocupado'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    let sentiment: 'positive' | 'neutral' | 'negative';
    if (positiveCount > negativeCount) {
      sentiment = 'positive';
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
    } else {
      sentiment = 'neutral';
    }
    
    const keywords = [...positiveWords, ...negativeWords].filter(word => lowerText.includes(word));
    
    return {
      sentiment,
      confidence: Math.max(0.6, Math.random() * 0.4 + 0.6),
      keywords,
      suggestion: getMotivationalResponse(sentiment, keywords)
    };
  };

  const getMotivationalResponse = (sentiment: 'positive' | 'neutral' | 'negative', keywords: string[]): string => {
    const responses = {
      positive: [
        'Que maravilhoso saber que você está se sentindo bem! 😊 Continue cultivando esses sentimentos positivos. Você merece toda essa alegria!',
        'Fico muito feliz em ver você radiante! ✨ Sua energia positiva é contagiante. Lembre-se de celebrar esses momentos bons!',
        'Que incrível! Você está brilhando hoje! 🌟 Aproveite essa energia para fazer algo que te deixe ainda mais feliz.'
      ],
      negative: [
        'Entendo que você está passando por um momento difícil. 🤗 Lembre-se: sentimentos difíceis são temporários, mas sua força é permanente. Você já superou desafios antes e vai superar este também.',
        'Seus sentimentos são válidos e é ok não estar bem o tempo todo. 💙 Que tal fazer uma pausa e respirar fundo? Ou talvez conversar com alguém de confiança?',
        'Sei que está difícil agora, mas você não está sozinho(a). 🫂 Cada dia é uma nova oportunidade de cura. Seja gentil consigo mesmo(a) hoje.'
      ],
      neutral: [
        'Percebo que você está em um momento de equilíbrio. 🌱 Às vezes a neutralidade é exatamente o que precisamos. Como posso te apoiar hoje?',
        'É normal ter dias mais neutros. 🌸 Que tal aproveitarmos para fazer algo pequeno mas significativo para seu bem-estar?',
        'Estar neutro também é estar presente. 🧘‍♀️ Talvez seja um bom momento para reflexão ou para cuidar de algo que você tem adiado.'
      ]
    };
    
    return responses[sentiment][Math.floor(Math.random() * responses[sentiment].length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsAnalyzing(true);
    
    // Simular tempo de processamento da IA
    setTimeout(() => {
      const analysis = analyzeMood(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: analysis.suggestion,
        sender: 'ai',
        timestamp: new Date(),
        mood: analysis.sentiment
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Implementar Web Speech API aqui
    if (!isListening) {
      // Simular captura de voz
      setTimeout(() => {
        setInputText('Estou me sentindo um pouco ansioso hoje...');
        setIsListening(false);
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

  const getMoodIcon = (mood?: 'positive' | 'neutral' | 'negative') => {
    switch (mood) {
      case 'positive':
        return <Smile className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <Frown className="w-4 h-4 text-red-500" />;
      case 'neutral':
        return <Meh className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-13rem)] lg:h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 md:p-6 border border-purple-100 mb-4 md:mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">IA Motivacional Empática</h2>
            <p className="text-sm md:text-base text-gray-600">Análise de humor em tempo real com suporte personalizado</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white/80 backdrop-blur-md rounded-xl border border-purple-100 p-4 md:p-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 md:p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-lg'
                    : 'bg-gray-100 text-gray-800 rounded-bl-lg'
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-2 ml-3">
                      {getMoodIcon(message.mood)}
                      <button
                        onClick={() => handleTextToSpeech(message.text)}
                        className="text-gray-500 hover:text-purple-500 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-xs opacity-70 mt-2 block text-right">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isAnalyzing && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">Analisando seu humor...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <button
            onClick={handleVoiceInput}
            className={`p-3 rounded-full transition-all ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Compartilhe seus sentimentos..."
              className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isAnalyzing}
            className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Mood Buttons */}
      <div className="mt-4 bg-white/80 backdrop-blur-md rounded-xl p-4 border border-purple-100">
        <p className="text-sm text-gray-600 mb-3">Como você está se sentindo agora?</p>
        <div className="flex flex-wrap gap-2">
          {[
            { emoji: '😊', label: 'Feliz' },
            { emoji: '😐', label: 'Neutro' },
            { emoji: '😔', label: 'Triste' },
            { emoji: '😰', label: 'Ansioso' },
            { emoji: '😤', label: 'Irritado' }
          ].map((mood) => (
            <button
              key={mood.label}
              onClick={() => setInputText(`Estou me sentindo ${mood.label.toLowerCase()} hoje...`)}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all bg-purple-50 text-purple-700 hover:bg-purple-100"
            >
              {mood.emoji} {mood.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIMotivator;
