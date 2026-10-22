export const email = "prathamdagli11@gmail.com";
export const social = {
  github: "https://github.com/prathamdagli",
  linkedin: "https://linkedin.com/in/pratham-dagli",
};
export type Project = {
  slug: string;
  title: string;
  category: "Applied AI" | "Full stack" | "Data science";
  short: string;
  description: string;
  stack: string[];
  color: string;
  repo?: string;
  live?: string;
  challenge: string;
  approach: string;
  features: string[];
  flow: string[];
};
export const projects: Project[] = [
  {
    slug: "complaint-tracker",
    title: "ComplaintTracker AI",
    category: "Applied AI",
    color: "mint",
    short: "From customer frustration to a clear next step.",
    description:
      "An AI-powered complaint management platform that brings classification, urgency detection, and resolution workflows into one connected system.",
    stack: ["React", "FastAPI", "scikit-learn", "Node.js"],
    repo: "https://github.com/prathamdagli/complaint_tracker_AI",
    challenge:
      "When complaints arrive through different channels, manual triage becomes inconsistent. Urgent issues need to reach the right people, and customers need a way to follow what happens next.",
    approach:
      "The system connects a React interface and Express backend to a FastAPI ML service. TF-IDF and Logistic Regression classify complaints, while sentiment analysis helps assign priority. A feedback loop incorporates QA corrections into the classifier.",
    features: [
      "Complaint intake through a web portal and Telegram bot.",
      "Category prediction, sentiment analysis, and priority assignment.",
      "Separate workflows for customers, support, QA, managers, and administrators.",
      "QA corrections feed back into model retraining.",
      "AI-assisted response drafting and ticket updates.",
    ],
    flow: [
      "Complaint intake",
      "NLP classification",
      "Priority & routing",
      "Resolution & feedback",
    ],
  },
  {
    slug: "creditscout",
    title: "Creditscout",
    category: "Applied AI",
    color: "lilac",
    short: "Making financial behavior easier to understand.",
    description:
      "A credit-readiness platform that turns bank transaction patterns into an explainable picture of financial behavior for first-time borrowers.",
    stack: ["Next.js", "FastAPI", "XGBoost", "Firebase"],
    repo: "https://github.com/prathamdagli/credit-scoring-platform",
    live: "https://credit-scoring-platform.vercel.app",
    challenge:
      "People without a borrowing history can be invisible to traditional credit systems, even when their transaction history shows consistent financial habits.",
    approach:
      "The platform ingests voluntarily provided bank statements and extracts behavioral features with Python. An XGBoost model, trained on synthetic banking data, supports a credit-readiness assessment delivered through a Next.js interface and FastAPI backend.",
    features: [
      "CSV and PDF bank statement ingestion.",
      "Financial behavior feature extraction with Pandas and NumPy.",
      "A 0–100 credit-readiness score and trend analysis.",
      "Firebase authentication and stored score history.",
      "Downloadable PDF credit-readiness certificate.",
    ],
    flow: [
      "Bank statement",
      "Behavioral features",
      "XGBoost model",
      "Readiness report",
    ],
  },
  {
    slug: "greenhydro",
    title: "GreenHydro",
    category: "Full stack",
    color: "green",
    short: "A more transparent path to green certification.",
    description:
      "An experimental certification platform connecting machine learning analysis of hydrogen production data with blockchain-based subsidy workflows.",
    stack: ["React", "Node.js", "Flask", "Solidity"],
    repo: "https://github.com/prathamdagli/GreenHydro_Project",
    challenge:
      "Green hydrogen certification depends on reliable production data. Inconsistent records make it harder to validate production claims and track the certification process.",
    approach:
      "A React frontend sends production documents through an Express backend to a Flask ML service. Random Forest analysis flags suspicious patterns. The project also includes Solidity contracts for certification and subsidy token workflows.",
    features: [
      "Production data submission through documents and text.",
      "Random Forest analysis of environmental and capacity data.",
      "Flagging of inconsistent production records.",
      "Firebase storage for analysis results.",
      "Smart contract components for certification and subsidy tokens.",
    ],
    flow: [
      "Production data",
      "ML validation",
      "Certification review",
      "Smart contract",
    ],
  },
  {
    slug: "jobwemet",
    title: "JobWeMet",
    category: "Full stack",
    color: "peach",
    short: "Turning career uncertainty into a learning roadmap.",
    description:
      "An AI-driven career workspace for exploring career matches, understanding skill gaps, and finding a more focused path to the next role.",
    stack: ["React", "FastAPI", "Gemini", "Firebase"],
    repo: "https://github.com/prathamdagli/jobwemet",
    challenge:
      "A resume describes where someone has been, but rarely tells them what to learn next. Connecting existing skills to a target career needs more context than a list of job titles.",
    approach:
      "The platform extracts text from PDF and DOCX resumes, then uses Gemini through a FastAPI backend to analyze skills and career fit. The React workspace brings matches, missing competencies, and personalized learning plans together.",
    features: [
      "Resume parsing and technical skill extraction.",
      "AI-assisted career matching with supporting reasoning.",
      "Skill-gap analysis against a target role.",
      "Personalized learning roadmaps and course recommendations.",
      "Firebase authentication and document storage.",
    ],
    flow: [
      "Resume upload",
      "Skill extraction",
      "Career matching",
      "Learning roadmap",
    ],
  },
  {
    slug: "formula-one",
    title: "Formula 1 Analysis",
    category: "Data science",
    color: "red",
    short: "Finding the stories behind the finish line.",
    description:
      "An exploratory data analysis of more than 500 Formula 1 races, looking at performance trends and the patterns behind race strategy.",
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    challenge:
      "Race results capture the finish, but understanding performance means looking across races and finding the patterns that a single result cannot show.",
    approach:
      "Using Python and Pandas, this analysis explores race data and turns comparisons into visualizations with Matplotlib and Seaborn. The focus is on making performance trends and strategy patterns easier to inspect.",
    features: [
      "Exploration of a dataset spanning 500+ races.",
      "Performance trend analysis with Pandas.",
      "Race strategy pattern exploration.",
      "Visual comparisons using Matplotlib and Seaborn.",
    ],
    flow: ["Race data", "Data exploration", "Trend analysis", "Visualization"],
  },
];
export const experience = [
  {
    role: "Intern",
    company: "Rivix · Early-Stage Startup",
    date: "Sep 2026 — Present",
    description:
      "Building reusable AWS infrastructure and service accelerators in collaboration with the founding team.",
    bullets: [
      "Developing reusable AWS cloud infrastructure and accelerator frameworks to streamline service integration and reduce repetitive setup across products.",
      "Collaborating directly with the founding team to take features from concept to implementation across cloud infrastructure, frontend, and backend development.",
      "Building reusable frameworks and accelerators to improve development efficiency, scalability, and consistency across projects.",
    ],
  },
  {
    role: "Intern",
    company: "Maverick",
    date: "Sep 2026 — Present",
    description:
      "Working across digital engagement and construction estimation, from LinkedIn content to detailed quantity takeoffs.",
    bullets: [
      "Managing LinkedIn content and scheduling to strengthen the company’s professional presence and digital engagement.",
      "Executed quantity takeoffs using On-Screen Takeoff (OST), processing approximately 200 drawing sheets across multiple construction trades.",
      "Interpreted construction drawings and performed trade-specific quantity measurements to support material estimation and project costing.",
    ],
  },
  {
    role: "AI / ML Intern",
    company: "Techify Solutions Pvt. Ltd.",
    date: "Jun — Jul 2026",
    description:
      "Worked across the machine learning lifecycle, from preprocessing and model training to backend integration and deployment.",
    bullets: [
      "Built and deployed KNN and Logistic Regression models.",
      "Integrated model inference with RESTful APIs using FastAPI.",
      "Connected data pipelines with full-stack application workflows.",
    ],
  },
  {
    role: "CSSI Intern",
    company: "Rainbow Force Foundation",
    date: "Jun 2025",
    description:
      "Contributed to community education and outreach, bringing the same care for real people that shapes my approach to software.",
    bullets: [
      "Tutored 30 underprivileged students in English and mathematics.",
      "Coordinated educational activities and community food distribution.",
    ],
  },
  {
    role: "Physics Tutor",
    company: "Physics is Everywhere",
    date: "May — Jul 2024",
    description:
      "Helped students build a stronger understanding of Physics and prepare for their next academic step.",
    bullets: [
      "Tutored Class 11 and 12 students in Physics.",
      "Guided students in preparation for board exams and competitive entrance tests.",
    ],
  },
];
export const skills = [
  {
    name: "Intelligence",
    note: "From raw data to useful predictions.",
    items: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "Random Forest",
      "Logistic Regression",
      "TF-IDF",
      "Pandas",
      "NumPy",
    ],
  },
  {
    name: "Interfaces",
    note: "Making complex systems feel simple.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Matplotlib",
      "Seaborn",
    ],
  },
  {
    name: "Infrastructure",
    note: "Connecting the pieces that matter.",
    items: ["AWS", "FastAPI", "Firebase", "SQL", "Git", "GitHub", "C++", "Java"],
  },
];
export const certifications = [
  ["Fundamentals of Deep Learning", "NVIDIA"],
  ["Solutions Architecture Job Simulation", "AWS APAC"],
  ["Technology Job Simulation", "Deloitte Australia"],
  ["NumPy and Pandas in Python", "Infosys Springboard"],
  ["Python 101 for Data Science", "Cognitive Class · IBM"],
  ["Basics of Finance", "HP LIFE"],
];
