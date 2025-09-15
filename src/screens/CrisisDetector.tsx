import React, { useState } from 'react';
import { Shield, Heart, Phone, AlertTriangle, CheckCircle } from 'lucide-react';

interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  riskLevel: 'low' | 'medium' | 'high';
}

const CrisisDetector: React.FC = () => {
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);

  const emergencyContacts = [
    { name: 'Centro de Valorização da Vida (CVV)', phone: '188' },
    { name: 'SAMU', phone: '192' },
    { name: 'Dr. Ana Silva - Psicóloga', phone: '(11) 99999-1234' },
  ];

  const analyzeText = (text: string): 'low' | 'medium' | 'high' => {
    const highRiskWords = ['suicídio', 'morrer', 'acabar com tudo', 'não aguento mais'];
    const mediumRiskWords = ['triste', 'deprimido', 'ansioso', 'sozinho', 'cansado'];
    if (highRiskWords.some(word => text.toLowerCase().includes(word))) return 'high';
    if (mediumRiskWords.some(word => text.toLowerCase().includes(word))) return 'medium';
    return 'low';
  };

  const submitJournalEntry = () => {
    if (!journalText.trim()) return;
    const riskLevel = analyzeText(journalText);
    const newEntry: JournalEntry = { id: Date.now().toString(), content: journalText, timestamp: new Date(), riskLevel };
    setEntries(prev => [newEntry, ...prev]);
    setJournalText('');
    if (riskLevel === 'high') setShowEmergencyContacts(true);
  };

  const getRiskColor = (level: 'low' | 'medium' | 'high') => ({
    high: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-300',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300',
    low: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300',
  })[level];

  const getRiskIcon = (level: 'low' | 'medium' | 'high') => ({
    high: <AlertTriangle className="w-5 h-5 text-red-600" />,
    medium: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
    low: <CheckCircle className="w-5 h-5 text-green-600" />,
  })[level];

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4"><Shield className="w-6 h-6 text-purple-500" /><h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Apoio Emocional Inteligente</h2></div>
        <p className="text-gray-600 dark:text-gray-300">Compartilhe seus sentimentos. Nossa IA detecta sinais de crise e oferece apoio.</p>
      </div>

      <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-100"><Heart className="w-5 h-5 mr-2 text-pink-500" />Como você está se sentindo?</h3>
        <textarea value={journalText} onChange={(e) => setJournalText(e.target.value)} placeholder="Escreva sobre seus sentimentos..." className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none" />
        <div className="flex justify-end mt-4">
          <button onClick={submitJournalEntry} disabled={!journalText.trim()} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50">Analisar & Salvar</button>
        </div>
      </div>

      {showEmergencyContacts && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4"><AlertTriangle className="w-6 h-6 text-red-500" /><h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Apoio Imediato Disponível</h3></div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Detectamos que você pode estar passando por um momento difícil. Você não está sozinho(a). Considere ligar para um destes contatos:</p>
            <div className="space-y-3 mb-6">
              {emergencyContacts.map((contact, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-700">
                  <div><p className="font-medium text-gray-800 dark:text-gray-200">{contact.name}</p><p className="text-sm text-gray-600 dark:text-gray-400">{contact.phone}</p></div>
                  <a href={`tel:${contact.phone}`} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"><Phone className="w-4 h-4" /></a>
                </div>
              ))}
            </div>
            <button onClick={() => setShowEmergencyContacts(false)} className="w-full py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Fechar</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className={`p-4 rounded-lg border ${getRiskColor(entry.riskLevel)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getRiskIcon(entry.riskLevel)}
                <span className="font-semibold">Risco {entry.riskLevel === 'low' ? 'Baixo' : entry.riskLevel === 'medium' ? 'Médio' : 'Alto'}</span>
              </div>
              <span className="text-xs">{entry.timestamp.toLocaleDateString('pt-BR')}</span>
            </div>
            <p className="text-sm italic">"{entry.content}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrisisDetector;
