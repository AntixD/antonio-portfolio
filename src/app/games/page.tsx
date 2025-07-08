// src/app/games/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Gamepad2, ArrowLeft, Trophy, Target, Brain, Play } from 'lucide-react';
import { games } from '@/data/games/game-arcade';

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Gamepad2 className="w-4 h-4 text-purple-400/30" />
          </div>
        ))}
      </div>

      <div className="relative z-10 p-6 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Gamepad2 className="w-8 h-8 text-purple-400 animate-bounce" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Antonio's Game Arcade
            </h1>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Developer Games Collection
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Welcome to my interactive showcase! These games demonstrate my
            coding skills while hopefully entertaining you. It's like a
            technical interview, but with more fun and less stress! 🎮
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>🚀 Built with React</span>
            <span>•</span>
            <span>🧠 Custom AI Logic</span>
            <span>•</span>
            <span>🎨 Tailwind Styling</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {games.map((game, index) => (
            <div key={game.id} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-2xl blur-xl transition-all duration-500 group-hover:opacity-40"></div>
              <div
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${game.color} bg-opacity-10 border border-gray-800 hover:border-gray-600 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-7xl group-hover:scale-110 transition-transform duration-500">
                    {game.icon}
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm bg-gradient-to-r ${game.color} text-white px-4 py-2 rounded-full font-semibold`}
                    >
                      {game.difficulty}
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {game.title}
                </h3>
                <p className="text-white mb-6 leading-relaxed">
                  {game.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">
                    Features:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {game.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs bg-gray-700/10 px-3 py-1 rounded-full text-white"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white-500 bg-gray-700/10 px-3 py-2 rounded-lg">
                    Built with {game.tech}
                  </span>
                  <Link href={`/games/${game.id}`}>
                    <button
                      className={`flex items-center gap-2 bg-gradient-to-r ${game.color} text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer`}
                    >
                      <Play className="w-5 h-5" />
                      <span>Play Now</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
          <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Developer Achievement Board
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
              <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">4</div>
              <div className="text-sm text-gray-400">Games Built</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
              <Target className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-gray-400">Fun Guaranteed</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
              <Brain className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">∞</div>
              <div className="text-sm text-gray-400">Learning Potential</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
              <Gamepad2 className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">∞</div>
              <div className="text-sm text-gray-400">
                Hours of Entertainment
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-2xl border border-gray-800/50">
          <h3 className="text-2xl font-bold mb-4 text-white">
            Impressed? Let's Work Together!
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            If you enjoyed these games, imagine what we could build together for
            your business! These are just small demos of what's possible.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              Back to Portfolio
            </Link>
            <a
              href="mailto:antonio.dedic123@gmail.com?subject=Your Games Are Amazing!&body=Hi Antonio! I just played your games and I'm impressed. Let's discuss working together!"
              className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300"
            >
              Hire Me Now!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
