import React from 'react';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/pratham-dagli" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-indigo-500 transition-colors text-zinc-400 hover:text-white">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Profile Image Area */}
        <div className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2rem] rotate-6 opacity-20 group-hover:opacity-40 group-hover:rotate-12 transition-all duration-500 blur-2xl"></div>
          <div className="w-full h-full bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden flex items-center justify-center relative shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
            {/* The user's image will go here. Add it to public/profile.jpg */}
            <span className="text-zinc-700 font-bold text-4xl">PD</span>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="max-w-4xl w-full mt-32">
        <h3 className="text-3xl font-bold text-zinc-100 mb-8 flex items-center gap-4">
          <span className="w-8 h-[2px] bg-indigo-500"></span>
          Experience
        </h3>
        
        <div className="space-y-12 pl-4 border-l border-zinc-800">
          <div className="relative pl-8">
            <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[8.5px] top-1.5 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h4 className="text-xl font-semibold text-zinc-200">AI/ML Intern</h4>
              <span className="text-zinc-500 text-sm font-medium bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">Jun 2026 – Jul 2026</span>
            </div>
            <p className="text-indigo-400 font-medium mb-4">Techify Solutions Pvt. Ltd.</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2 marker:text-zinc-600">
              <li>Built and deployed ML models (KNN, Logistic Regression) with backend APIs.</li>
              <li>Integrated RESTful APIs with FastAPI to serve models in a full-stack app.</li>
              <li>Contributed across the full data pipeline from preprocessing to deployment.</li>
            </ul>
          </div>

          <div className="relative pl-8">
            <div className="absolute w-3 h-3 bg-zinc-700 rounded-full -left-[6.5px] top-2 border-2 border-zinc-950"></div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h4 className="text-xl font-semibold text-zinc-200">CSSI Intern</h4>
              <span className="text-zinc-500 text-sm font-medium bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">Jun 2025</span>
            </div>
            <p className="text-zinc-400 font-medium mb-4">Rainbow Force Foundation</p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2 marker:text-zinc-600">
              <li>Tutored 30 underprivileged students in English and mathematics.</li>
              <li>Coordinated educational activities and community food distribution.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-4xl w-full mt-32 mb-20">
        <h3 className="text-3xl font-bold text-zinc-100 mb-8 flex items-center gap-4">
          <span className="w-8 h-[2px] bg-purple-500"></span>
          Featured Projects
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-colors group">
            <h4 className="text-xl font-semibold text-zinc-200 mb-2 group-hover:text-indigo-400 transition-colors">ComplaintTracker AI</h4>
            <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
              AI-powered system classifying customer complaints by category and urgency. Includes role-based dashboards and a Telegram bot integration.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'React', 'scikit-learn'].map(tech => (
                <span key={tech} className="text-xs font-medium text-zinc-300 bg-zinc-800 px-2 py-1 rounded-md">{tech}</span>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-purple-500/50 transition-colors group">
            <h4 className="text-xl font-semibold text-zinc-200 mb-2 group-hover:text-purple-400 transition-colors">GreenHydro</h4>
            <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
              AI-powered Blockchain Certification System to analyze green hydrogen data and automate subsidy certification using ML.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Flask', 'Solidity'].map(tech => (
                <span key={tech} className="text-xs font-medium text-zinc-300 bg-zinc-800 px-2 py-1 rounded-md">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
