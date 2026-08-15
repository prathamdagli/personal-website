import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center p-8 sm:p-20">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* Profile Info */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
              Pratham Dagli
            </h1>
            <h2 className="text-2xl text-indigo-400 font-medium tracking-wide">
              AI/ML Engineer & Full-Stack Developer
            </h2>
          </div>
          
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
            Computer Engineering student at PDEU focused on building practical software and ML-powered tools. Experienced across the full development lifecycle from data preprocessing and model training to API integration and deployment.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <a 
              href="mailto:prathamdagli11@gmail.com"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </a>
            <div className="flex items-center gap-4 ml-4">
              <a href="https://github.com/prathamdagli" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-indigo-500 transition-colors text-zinc-400 hover:text-white">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/pratham-dagli" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-indigo-500 transition-colors text-zinc-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Profile Image Area */}
        <div className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2rem] rotate-6 opacity-20 blur-2xl"></div>
          <div className="w-full h-full bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden flex items-center justify-center relative shadow-2xl">
            {/* The user's image will go here. For now, a stylized placeholder text */}
            <span className="text-zinc-700 font-bold text-4xl">PD</span>
          </div>
        </div>
      </div>
    </main>
  );
}
