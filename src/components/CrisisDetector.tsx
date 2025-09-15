import React, { useState } from 'react';
import { Shield, Heart, Phone, MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  riskLevel: 'low' | 'medium' | 'high';
  emotions: string[];
  analysis: {
    concerns: string[];
    recommendations: string[];
  };
}

interface EmergencyContact {
  id: string;
  name: string;
  type: 'professional' | 'personal' | 'emergency';
  phone: string;
  available: boolean;
}

const CrisisDetector: React.FC = () => {
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);

  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Dr. Ana Silva - Psicóloga',
      type: 'professional',
      phone: '(11) 99999-1234',
      available: true
    },
    {
      id: '2',
      name: 'Centro de Valorização da Vida (CVV)',
      type: 'emergency',
      phone: '188',
      available: true
    },
    {
      id: '3',
      name: 'SAMU',
      type: 'emergency',
      phone: '192',
      available: true
    },
    {
      id: '4',
      name: 'Maria - Amiga próxima',
      type: 'personal',
      phone: '(11) 98888-5678',
      available: false
    }
  ];

  const analyzeText = (text: string): { riskLevel: 'low' | 'medium' | 'high', emotions: string[], concerns: string[], recommendations: string[] } => {
    // Palavras-chave para detecção de crise
    const highRiskWords = ['suicídio', 'morrer', 'acabar com tudo', 'não aguento mais', 'sem esperança', 'inútil'];
    const mediumRiskWords = ['triste', 'deprimido', 'ansioso', 'sozinho', 'cansado', 'difícil', 'ruim'];
    const lowRiskWords = ['bem', 'feliz', 'tranquilo', 'esperança', 'melhor', 'positivo'];

    const lowerText = text.toLowerCase();
    
    const highRiskCount = highRiskWords.filter(word => lowerText.includes(word)).length;
    const mediumRiskCount = mediumRiskWords.filter(word => lowerText.includes(word)).length;
    const lowRiskCount = lowRiskWords.filter(word => lowerText.includes(word)).length;

    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    let emotions: string[] = [];
    let concerns: string[] = [];
    let recommendations: string[] = [];

    if (highRiskCount > 0) {
      riskLevel = 'high';
      emotions = ['Desesperança', 'Tristeza profunda', 'Desamparo'];
      concerns = [
        'Expressões de ideação suicida detectadas',
        'Necessidade de apoio profissional imediato',
        'Sinais de crise emocional severa'
      ];
      recommendations = [
        'Entre em contato com um profissional de saúde mental AGORA',
        'Ligue para o CVV (188) para apoio imediato',
        'Não fique sozinho(a) - procure alguém de confiança',
        'Vá ao pronto-socorro se necessário'
      ];
    } else if (mediumRiskCount > lowRiskCount) {
      riskLevel = 'medium';
      emotions = ['Tristeza', 'Ansiedade', 'Preocupação'];
      concerns = [
        'Sinais de humor baixo detectados',
        'Necessidade de monitoramento e apoio',
        'Possível episódio depressivo ou ansioso'
      ];
      recommendations = [
        'Considere conversar com um psicólogo',
        'Pratique técnicas de respiração e mindfulness',
        'Mantenha contato com amigos e família',
        'Estabeleça uma rotina de autocuidado'
      ];
    } else {
      emotions = ['Estabilidade', 'Esperança', 'Equilíbrio'];
      concerns = [];
      recommendations = [
        'Continue cuidando de seu bem-estar',
        'Mantenha suas práticas de autocuidado',
        'Celebre os momentos positivos'
      ];
    }

    return { riskLevel, emotions, concerns, recommendations };
  };

  const submitJournalEntry = () => {
    if (!journalText.trim()) return;

    const analysis = analyzeText(journalText);
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: journalText,
      timestamp: new Date(),
      riskLevel: analysis.riskLevel,
      emotions: analysis.emotions,
      analysis: {
        concerns: analysis.concerns,
        recommendations: analysis.recommendations
      }
    };

    setEntries(prev => [newEntry, ...prev]);
    setJournalText('');

    // Se risco alto, mostrar contatos de emergência
    if (analysis.riskLevel === 'high') {
      setShowEmergencyContacts(true);
    }
  };

  const getRiskColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low':
        return 'bg-green-100 border-green-300 text-green-800';
    }
  };

  const getRiskIcon = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'medium':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const getContactTypeIcon = (type: 'professional' | 'personal' | 'emergency') => {
    switch (type) {
      case 'professional':
        return '👨‍⚕️';
      case 'emergency':
        return '🚨';
      case 'personal':
        return '👥';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold text-gray-800">Apoio Emocional Inteligente</h2>
        </div>
        <p className="text-gray-600">
          Compartilhe seus sentimentos e pensamentos. Nossa IA detecta sinais de crise e oferece apoio personalizado.
        </p>
      </div>

      {/* Journal Input */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-pink-500" />
          Como você está se sentindo hoje?
        </h3>
        
        <textarea
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Escreva sobre seus sentimentos, pensamentos e experiências do dia. Suas palavras são importantes e serão analisadas com cuidado para oferecer o melhor suporte..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {journalText.length}/500 caracteres
          </span>
          <button
            onClick={submitJournalEntry}
            disabled={!journalText.trim()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analisar & Salvar
          </button>
        </div>
      </div>

      {/* Emergency Contacts Modal */}
      {showEmergencyContacts && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold text-red-800">Apoio Imediato Disponível</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Detectamos que você pode estar passando por um momento muito difícil. 
              Você não está sozinho(a). Aqui estão alguns contatos que podem ajudar:
            </p>

            <div className="space-y-3 mb-6">
              {emergencyContacts.filter(contact => contact.type === 'emergency' || contact.type === 'professional').map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getContactTypeIcon(contact.type)}</span>
                    <div>
                      <p className="font-medium text-gray-800">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                    </div>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowEmergencyContacts(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  setShowEmergencyContacts(false);
                  window.open('tel:188', '_self');
                }}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Ligar CVV (188)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Journal Entries */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-purple-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getRiskIcon(entry.riskLevel)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(entry.riskLevel)}`}>
                    {entry.riskLevel === 'high' ? 'Atenção Necessária' :
                     entry.riskLevel === 'medium' ? 'Monitoramento' : 'Estável'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {entry.timestamp.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-800 leading-relaxed">{entry.content}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Emotions Detected */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Emoções Detectadas:</h4>
                <div className="flex flex-wrap gap-2">
                  {entry.emotions.map((emotion, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>

              {/* Analysis */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Análise:</h4>
                {entry.analysis.concerns.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-orange-800 mb-1">Pontos de atenção:</p>
                    <ul className="text-sm text-orange-700 space-y-1">
                      {entry.analysis.concerns.map((concern, index) => (
                        <li key={index}>• {concern}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium text-green-800 mb-1">Recomendações:</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    {entry.analysis.recommendations.map((rec, index) => (
                      <li key={index}>• {rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {entry.riskLevel === 'high' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">Apoio Imediato Recomendado</span>
                </div>
                <p className="text-sm text-red-700 mb-3">
                  Identificamos sinais que indicam necessidade de apoio profissional. Por favor, considere entrar em contato com:
                </p>
                <div className="flex space-x-3">
                  <a
                    href="tel:188"
                    className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>CVV (188)</span>
                  </a>
                  <button
                    onClick={() => setShowEmergencyContacts(true)}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Ver Contatos</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 text-center border border-purple-200">
          <Heart className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Seu espaço seguro</h3>
          <p className="text-purple-700">
            Este é um ambiente seguro para expressar seus sentimentos. 
            Compartilhe o que está em seu coração e receba apoio personalizado.
          </p>
        </div>
      )}
    </div>
  );
};

export default CrisisDetector;
