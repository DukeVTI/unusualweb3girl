import React, { useState } from 'react';
import { Gem, Award, Users, Target, ScrollText, Gift, Sword, Crown } from 'lucide-react';

const GemQuest = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  const userData = {
    username: "GemHunter",
    level: 15,
    xp: 2750,
    nextLevel: 3000,
    gemPoints: 1250,
    questTokens: 45,
    communityCredits: 120,
    guild: "Crystal Seekers"
  };

  const quests = [
    { id: 1, title: "Crystal Challenger", reward: 100, xp: 200, difficulty: "Easy", type: "Daily" },
    { id: 2, title: "Guild Guardian", reward: 250, xp: 500, difficulty: "Medium", type: "Guild" },
    { id: 3, title: "Legendary Hunt", reward: 500, xp: 1000, difficulty: "Hard", type: "Special" },
  ];

  const renderHeader = () => (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{userData.username}</h1>
          <div className="flex items-center gap-2">
            <Crown size={16} />
            <span>Level {userData.level}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <Gem size={16} />
            <span>{userData.gemPoints} GP</span>
          </div>
        </div>
      </div>
      <div className="mt-2 bg-white/20 rounded-full h-2">
        <div 
          className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${(userData.xp / userData.nextLevel) * 100}%` }}
        />
      </div>
      <div className="text-sm mt-1">XP: {userData.xp}/{userData.nextLevel}</div>
    </div>
  );

  const renderCurrencies = () => (
    <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-3">
        <div className="flex items-center gap-2">
          <Target className="text-purple-500" size={20} />
          <div>
            <div className="text-sm font-medium">Quest Tokens</div>
            <div className="text-lg font-bold">{userData.questTokens}</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-3">
        <div className="flex items-center gap-2">
          <Users className="text-blue-500" size={20} />
          <div>
            <div className="text-sm font-medium">CC</div>
            <div className="text-lg font-bold">{userData.communityCredits}</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-3">
        <div className="flex items-center gap-2">
          <Crown className="text-yellow-500" size={20} />
          <div>
            <div className="text-sm font-medium">Guild</div>
            <div className="text-lg font-bold truncate">{userData.guild}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuests = () => (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3">Active Quests</h2>
      <div className="space-y-3">
        {quests.map(quest => (
          <div key={quest.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{quest.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <span className={`px-2 py-0.5 rounded ${
                    quest.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {quest.difficulty}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    {quest.type}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-purple-600">
                  <Gem size={16} />
                  <span>{quest.reward}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600 text-sm">
                  <Award size={14} />
                  <span>{quest.xp} XP</span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="bg-gray-100 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full w-1/2" />
              </div>
              <div className="text-xs text-gray-500 mt-1">50% Complete</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDailyTasks = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Daily Tasks</h2>
        <span className="text-sm text-gray-500">3/5 Complete</span>
      </div>
      <div className="space-y-2">
        {[
          { title: "Complete 3 quests", reward: 50, completed: true },
          { title: "Join guild activity", reward: 30, completed: true },
          { title: "Use 3 power-ups", reward: 25, completed: true },
          { title: "Trade with players", reward: 40, completed: false },
          { title: "Win team challenge", reward: 60, completed: false }
        ].map((task, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-3 rounded-lg ${
              task.completed ? 'bg-green-50' : 'bg-white'
            } shadow-sm`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                task.completed ? 'border-green-500 bg-green-500' : 'border-gray-300'
              }`}>
                {task.completed && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
              <span className={task.completed ? 'text-gray-500' : ''}>
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-1 text-purple-600">
              <Gem size={14} />
              <span>{task.reward}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="grid grid-cols-5 gap-1 p-2">
        {[
          { id: 'home', icon: Gem, label: 'Home' },
          { id: 'quests', icon: Sword, label: 'Quests' },
          { id: 'guild', icon: Users, label: 'Guild' },
          { id: 'rewards', icon: Gift, label: 'Rewards' },
          { id: 'profile', icon: ScrollText, label: 'Profile' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
              activeTab === item.id ? 'text-purple-600 bg-purple-50' : 'text-gray-600'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-100 pb-20 overflow-auto">
      {renderHeader()}
      {renderCurrencies()}
      {renderQuests()}
      {renderDailyTasks()}
      {renderNavigation()}
    </div>
  );
};

export default GemQuest;