export const siteConfig = {
  name: "Pratham Dagli",
  title: "AI Engineering",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://personal-website-puce-two-38.vercel.app",
  availability: "Open to AI/ML internships — Summer 2027",
  location: "Ahmedabad, India",
  timezone: "IST · UTC+5:30",
  resume: "/Pratham-Dagli-Resume.pdf",
  currently: {
    building: "Reusable AWS infrastructure and service accelerators at Rivix.",
    learning: "[ADD CURRENT LEARNING FOCUS]",
    reading: "[ADD CURRENT BOOK OR ARTICLE]",
  },
  achievements: [
    {
      title: "Smart India Hackathon 2026",
      event: "[ADD EVENT / TRACK]",
      year: "2026",
      description: "[ADD PARTICIPATION DETAILS OR VERIFIED RESULT]",
      href: "",
      placeholder: true,
    },
  ],
};

// Editable skills inventory. Derived from the existing project stacks and resume.
export const skillGroups = [
  {
    name: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL"],
  },
  {
    name: "ML / AI",
    items: [
      "scikit-learn",
      "XGBoost",
      "Random Forest",
      "TF-IDF",
      "Gemini",
      "Pandas",
      "NumPy",
    ],
  },
  { name: "Backend", items: ["FastAPI", "Node.js", "Flask", "REST APIs"] },
  { name: "Frontend", items: ["React", "Next.js", "TypeScript"] },
  { name: "Cloud & DevOps", items: ["AWS", "Firebase", "Git"] },
  {
    name: "Tools",
    items: ["GitHub", "Matplotlib", "Seaborn", "On-Screen Takeoff"],
  },
];
