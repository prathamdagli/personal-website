import React from 'react';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 font-[family-name:var(--font-geist-sans)] flex flex-col items-center p-8 sm:p-20 relative">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-zinc-950/80 backdrop-blur-md z-50 border-b border-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-white tracking-tight">PD<span className="text-indigo-500">.</span></span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-indigo-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-indigo-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-indigo-400 transition-colors">Skills</a>
            <a href="#education" className="hover:text-indigo-400 transition-colors">Education</a>
          </div>
        </div>
      </nav>

      <div id="about" className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 mt-16">
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
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" alt="Pratham Dagli" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <section id="experience" className="max-w-4xl w-full mt-32 scroll-mt-24">
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
      <section id="projects" className="max-w-4xl w-full mt-32 mb-20 scroll-mt-24">
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

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-colors group">
            <h4 className="text-xl font-semibold text-zinc-200 mb-2 group-hover:text-emerald-400 transition-colors">Creditscout</h4>
            <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
              Credit Scoring for the Unbanked. Uses transaction history to generate a credit-readiness score for people without formal banking records.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'FastAPI', 'Python', 'Firebase', 'XGBoost'].map(tech => (
                <span key={tech} className="text-xs font-medium text-zinc-300 bg-zinc-800 px-2 py-1 rounded-md">{tech}</span>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-blue-500/50 transition-colors group">
            <h4 className="text-xl font-semibold text-zinc-200 mb-2 group-hover:text-blue-400 transition-colors">Jobwemet</h4>
            <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
              Skill Intelligence System. Full-stack platform for skill-gap analysis with personalized learning recommendations and an AI-powered assistant.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'FastAPI', 'Python', 'Chart.js', 'Git'].map(tech => (
                <span key={tech} className="text-xs font-medium text-zinc-300 bg-zinc-800 px-2 py-1 rounded-md">{tech}</span>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-rose-500/50 transition-colors group md:col-span-2">
            <h4 className="text-xl font-semibold text-zinc-200 mb-2 group-hover:text-rose-400 transition-colors">Formula 1 Data Analysis</h4>
            <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
              Analyzed 500+ F1 races to explore performance trends and race strategy patterns using Python visualization libraries.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Pandas', 'Matplotlib', 'Seaborn'].map(tech => (
                <span key={tech} className="text-xs font-medium text-zinc-300 bg-zinc-800 px-2 py-1 rounded-md">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="max-w-4xl w-full mt-32 scroll-mt-24">
        <h3 className="text-3xl font-bold text-zinc-100 mb-8 flex items-center gap-4">
          <span className="w-8 h-[2px] bg-emerald-500"></span>
          Skills
        </h3>
        <div className="flex flex-wrap gap-3">
          {[
            'Python', 'C++', 'Java', 'SQL',
            'Logistic Regression', 'XGBoost', 'Random Forest', 'KNN', 'SVM', 'scikit-learn',
            'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'TF-IDF',
            'FastAPI', 'Firebase', 'Git', 'GitHub', 'Next.js', 'React'
          ].map(skill => (
            <span key={skill} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 font-medium hover:border-emerald-500 hover:text-emerald-400 transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="max-w-4xl w-full mt-32 mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 scroll-mt-24">
        <div>
          <h3 className="text-3xl font-bold text-zinc-100 mb-8 flex items-center gap-4">
            <span className="w-8 h-[2px] bg-blue-500"></span>
            Education
          </h3>
          <div className="space-y-8 pl-4 border-l border-zinc-800">
            <div className="relative pl-6">
              <div className="absolute w-3 h-3 bg-zinc-700 rounded-full -left-[6.5px] top-2 border-2 border-zinc-950"></div>
              <h4 className="text-lg font-semibold text-zinc-200">B.Tech, Computer Engineering</h4>
              <p className="text-blue-400 font-medium">Pandit Deendayal Energy University</p>
              <p className="text-zinc-500 text-sm mt-1">CGPA: 9.57 | Expected May 2028</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute w-3 h-3 bg-zinc-700 rounded-full -left-[6.5px] top-2 border-2 border-zinc-950"></div>
              <h4 className="text-lg font-semibold text-zinc-200">Class XII, Science</h4>
              <p className="text-zinc-400 font-medium">Sharda Mandir Modern High School</p>
              <p className="text-zinc-500 text-sm mt-1">97.7 percentile | May 2024</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-zinc-100 mb-8 flex items-center gap-4">
            <span className="w-8 h-[2px] bg-orange-500"></span>
            Certifications
          </h3>
          <ul className="space-y-4">
            {[
              'Fundamentals of Deep Learning — NVIDIA',
              'AWS APAC Solutions Architecture Job Simulation',
              'Deloitte Australia Technology Job Simulation',
              'NumPy and Pandas in Python — Infosys Springboard',
              'Python 101 for Data Science — Cognitive Class, IBM',
              'Basics of Finance — HP LIFE'
            ].map(cert => (
              <li key={cert} className="flex items-start gap-3 text-zinc-400">
                <span className="text-orange-500 mt-1">✦</span>
                <span className="leading-snug">{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-8 border-t border-zinc-900 mt-auto text-center text-zinc-600 text-sm">
        <p>© {new Date().getFullYear()} Pratham Dagli. All rights reserved.</p>
      </footer>
    </main>
  );
}
