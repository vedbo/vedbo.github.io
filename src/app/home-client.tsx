"use client";

import { AnimatedHero } from "@/components/ui/animated-hero";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { Card } from "@/components/ui/card";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { FunContactOrbit, FunContactSwipe } from "@/components/ui/fun-contact";
import { ProjectFilter } from "@/components/ui/project-filter";
import { KonamiGame } from "@/components/ui/konami-game";
import { Marquee } from "@/components/ui/marquee";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Cpu, Apple, Satellite, Briefcase, Shield, Award, FlaskConical } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { type Post } from "@/lib/mdx";

/* ───────────────────────── DATA ───────────────────────── */

const timelineData = [
  {
    id: 1,
    title: "Aresty Research",
    date: "Aug 2025 – Present",
    content: "Developing ILP/Gurobi algorithms for shelf placement on the UR5 robotic platform. Engineering 3D data pipelines and applying Python/Plotly for performance evaluation at PRACSYS Lab.",
    category: "Research",
    icon: FlaskConical,
    relatedIds: [2, 3],
    status: "in-progress" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "Apple Specialist",
    date: "Jul – Oct 2025",
    content: "Generated over $100K in revenue providing tailored product solutions. Diagnosed software/hardware issues and performed pre-appointment troubleshooting for Genius Bar.",
    category: "Industry",
    icon: Apple,
    relatedIds: [1],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 3,
    title: "MIT Lincoln Lab",
    date: "Jul – Dec 2023",
    content: "Designed an ASIC chip for air quality monitoring using Chipyard. Developed and pitched a $10,000 funding proposal to industry experts from SOFWERX.",
    category: "Research",
    icon: Cpu,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Jetson Intern",
    date: "Jun – Aug 2023",
    content: "QA tested beta features achieving 0 production bugs. Prototyped wireframes in Figma and Swift. Contributed to features increasing daily engagement by 5% and day-one retention by 9%.",
    category: "Industry",
    icon: Briefcase,
    relatedIds: [2],
    status: "completed" as const,
    energy: 75,
  },
  {
    id: 5,
    title: "NYU Cyber Security",
    date: "Jul – Aug 2022",
    content: "Utilized custom Python scripts for network analysis, identifying security threats and anomalies. Reverse-engineered malware samples to develop detection methods.",
    category: "Research",
    icon: Shield,
    relatedIds: [3],
    status: "completed" as const,
    energy: 70,
  },
  {
    id: 6,
    title: "NASA Mentor",
    date: "Oct 2023",
    content: "Served as a Galactic Local Mentor advising 93,000+ participants across 150+ countries in one of the world's biggest hackathons.",
    category: "Leadership",
    icon: Satellite,
    relatedIds: [7],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 7,
    title: "5x Hackathon Winner",
    date: "2022 – 2025",
    content: "Winner across 5 regional and university hackathons, with projects spanning AI, robotics, quantum computing, and healthcare tech.",
    category: "Competition",
    icon: Award,
    relatedIds: [6, 1],
    status: "completed" as const,
    energy: 100,
  },
];

const allProjects = [
  {
    title: "Robotic Service Dog",
    badge: "GOLD MEDAL",
    badgeColor: "bg-yellow-400 text-black",
    pills: ["Arduino", "C", "Embedded"],
    pillColor: "bg-cyan-500/10 text-cyan-400",
    description: "Autonomous robot with functional manipulation. Hudson County Gold Medalist 2023.",
    videoId: "LyuvT-aBg3E",
    links: [
      { text: "Tech Details", url: "https://devpost.com/software/navigate_e" },
      { text: "Demo", url: "https://www.youtube.com/watch?v=YenW5by_jaQ&t=480s" },
    ],
    categories: ["hardware"],
  },
  {
    title: "SurgeVue AI",
    badge: "3RD @ PENNAPPS",
    badgeColor: "bg-cyan-400 text-black",
    pills: ["ML", "Python", "Vision"],
    pillColor: "bg-blue-500/10 text-blue-400",
    description: "AI assistant providing real-time procedural analysis for surgical teams. Placed 3rd at PennApps, one of the nation's oldest collegiate hackathons.",
    videoId: "nRNcrBKIokg",
    links: [{ text: "Project Link", url: "https://github.com/jeet-dekivadia/SurgeVue" }],
    categories: ["ai", "hackathon"],
  },
  {
    title: "Click to Professional",
    badge: "AI ENGINE",
    badgeColor: "bg-purple-500 text-white",
    pills: ["Gemini AI", "HEIC", "JS"],
    pillColor: "bg-purple-500/10 text-purple-400",
    description: "Browser-based application using Google Gemini API for smart background replacement in casual photos.",
    videoId: "EqpaVzvHZVU",
    links: [
      { text: "Watch Demo", url: "https://youtu.be/EqpaVzvHZVU" },
      { text: "GitHub", url: "https://github.com/vedbo/click-to-professional" },
    ],
    categories: ["ai", "creative"],
  },
  {
    title: "Epi-Sense Wearable",
    badge: "WINNER",
    badgeColor: "bg-cyan-400 text-black",
    pills: ["IoT", "Hardware", "ML"],
    pillColor: "bg-cyan-500/10 text-cyan-400",
    description: "A revolutionary microdevice that assesses the risk of seizures in epileptic individuals using dual-band EEG signal analysis.",
    image: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/896/542/datas/original.jpg",
    links: [{ text: "Project Link", url: "https://devpost.com/software/epi-sense-the-epileptic-sensor" }],
    categories: ["hardware", "hackathon"],
  },
  {
    title: "GUMDROP",
    badge: "WINNER",
    badgeColor: "bg-purple-500 text-white",
    pills: ["Healthcare", "Full-Stack"],
    pillColor: "bg-purple-500/10 text-purple-400",
    description: "Optimizing convenience and security of medical prescriptions for low-income and rural areas.",
    image: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/483/713/datas/original.png",
    links: [{ text: "Project Link", url: "https://devpost.com/software/gumdrop" }],
    categories: ["hackathon"],
  },
  {
    title: "CerebrAI",
    badge: "WINNER",
    badgeColor: "bg-cyan-400 text-black",
    pills: ["Quantum", "Neural Net"],
    pillColor: "bg-cyan-500/10 text-cyan-400",
    description: "Quantum Neural Network implementation for high-dimensional classification.",
    videoId: "7TnSkqgWpa0",
    links: [{ text: "Project Link", url: "https://devpost.com/software/s-0ucrb4" }],
    categories: ["ai", "hackathon"],
  },
  {
    title: "RU Live",
    badge: "SWIFT CHALLENGE 2026",
    badgeColor: "bg-red-500 text-white",
    pills: ["SwiftUI", "MapKit", "On-Device NLP"],
    pillColor: "bg-red-500/10 text-red-400",
    description: "Real-time Rutgers campus simulation with custom NLP intent engine, 3D heatmap, sensory awareness categories, accessibility-first design, and integrated crisis tools.",
    links: [{ text: "GitHub Repo", url: "https://github.com/vedbo/RU-Live" }],
    categories: ["swift"],
  },
  {
    title: "Knight Wallet",
    badge: "TECHSTART",
    badgeColor: "bg-yellow-400 text-black",
    pills: ["SwiftUI", "Base L2", "Smart Contracts"],
    pillColor: "bg-yellow-500/10 text-yellow-400",
    description: "Blockchain-based credential wallet for Rutgers. Mint verifiable diplomas, honors, and club positions as on-chain credentials with gasless minting and FERPA compliance. Submitted to Rutgers TechStart competition.",
    links: [
      { text: "GitHub Repo", url: "https://github.com/vedbo/knight-wallet" },
      { text: "Pitch Deck", url: "https://docs.google.com/presentation/d/17CEvD0UPr9P6X38zSjV0hhT-uKbO-b-IRvxgpuFg0Cc/edit?usp=sharing" },
    ],
    categories: ["swift", "hackathon"],
  },
  {
    title: "NBA Longevity Predictor",
    badge: "DATA CAPSTONE",
    badgeColor: "bg-cyan-600 text-white",
    pills: ["Python", "Sklearn", "Pandas"],
    pillColor: "bg-cyan-500/10 text-cyan-400",
    description: "Machine Learning model to predict NBA career lengths.",
    links: [{ text: "Full Paper", url: "https://drive.google.com/file/d/1JnqO3-2Co7cYagNiwbpRnCDXvEUXnrwX/view?usp=drive_link" }],
    categories: ["ai"],
  },
  {
    title: "Fetchr",
    badge: "HACKATHON",
    badgeColor: "bg-yellow-500 text-black",
    pills: ["Hardware", "React", "AI"],
    pillColor: "bg-yellow-500/10 text-yellow-400",
    description: "Pet safety monitoring utilizing AI alerts and integrated sensor hardware.",
    image: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/820/601/datas/original.jpeg",
    links: [{ text: "Details", url: "https://devpost.com/software/fetchr-rja9kh" }],
    categories: ["hardware", "hackathon"],
  },
  { 
    title: "Animatronic Santa Display", 
    badge: "ENGINEERING",
    badgeColor: "bg-green-500 text-black",
    pills: ["Arduino", "Robotics"],
    pillColor: "bg-green-500/10 text-green-400",
    description: "Built a 4-foot animatronic display using custom circuitry for community events.",
    videoId: "FC8r0VPXaig",
    links: [],
    categories: ["hardware", "creative"],
  },
  {
    title: "Automated Toll Booth",
    badge: "HARDWARE",
    badgeColor: "bg-cyan-500 text-black",
    pills: ["Arduino", "Sensors", "C"],
    pillColor: "bg-cyan-500/10 text-cyan-400",
    description: "Automated toll booth system with vehicle detection and barrier control using Arduino.",
    videoId: "ilsbYDccD_w",
    links: [],
    categories: ["hardware"],
  },
  {
    title: "Voice Controlled Lights",
    badge: "HARDWARE",
    badgeColor: "bg-cyan-500 text-black",
    pills: ["Arduino", "Speech", "IoT"],
    pillColor: "bg-cyan-500/10 text-cyan-400",
    description: "Voice-activated lighting system using speech recognition and Arduino relay control.",
    videoId: "u3wQpNjbwq4",
    links: [],
    categories: ["hardware"],
  },
  {
    title: "Touch Sensor Buzzer",
    badge: "HARDWARE",
    badgeColor: "bg-cyan-500 text-black",
    pills: ["Arduino", "Capacitive", "C"],
    pillColor: "bg-cyan-500/10 text-cyan-400",
    description: "Capacitive touch sensor system with programmable buzzer feedback built on Arduino.",
    videoId: "rO0PJKwz7WY",
    links: [],
    categories: ["hardware"],
  },
  {
    title: "Temp & Humidity System",
    badge: "HARDWARE",
    badgeColor: "bg-teal-500 text-black",
    pills: ["Arduino", "DHT11", "IoT"],
    pillColor: "bg-teal-500/10 text-teal-400",
    description: "Real-time temperature and humidity monitoring system with live display output.",
    videoId: "WbZ_fRxHkBY",
    links: [],
    categories: ["hardware"],
  },
  {
    title: "HarvestHacks",
    badge: "HACKATHON",
    badgeColor: "bg-green-700 text-white",
    pills: ["Hackathon", "AgTech"],
    pillColor: "bg-green-500/10 text-green-400",
    description: "Hackathon project built at HarvestHacks, focused on agricultural technology.",
    videoId: "_P6hI0XtBJU",
    links: [],
    categories: ["hackathon"],
  },
  {
    title: "Dead Dino Diffuse",
    badge: "NYU GAME LAB",
    badgeColor: "bg-purple-500 text-white",
    pills: ["GML", "Physics"],
    pillColor: "bg-purple-500/10 text-purple-400",
    description: "Diffusion game programmed with custom physics and animations.",
    image: "https://img.itch.zone/aW1hZ2UvMjA1NjQwNy8xMjA5Mzc5MS5wbmc=/original/64ExaP.png",
    links: [{ text: "Play", url: "https://nyugc.itch.io/deaddinodiffuse" }],
    categories: ["creative"],
  },
];

const distinctions = [
  {
    title: "STEM Gold Medalist",
    badge: "STATE GOLD",
    badgeColor: "bg-yellow-500 text-black",
    color: "text-yellow-400",
    hoverBorder: "hover:border-yellow-500/40",
    description: "Consecutive Gold Medalist (2022 & 2023) at district science fair and recognized by Jersey City Councilman.",
    links: [
      { text: "Watch Demo →", url: "https://www.youtube.com/watch?v=YenW5by_jaQ&t=480s" },
      { text: "Read Article →", url: "https://www.nj.com/hudson/2022/04/2022-jersey-city-medical-centerrwjbarnabas-health-stem-showcase-three-from-mcnair-advance-to-international-science-fair-plus-full-list-of-winners.html" },
    ],
  },
  {
    title: "5x Hackathon Winner",
    badge: "COMPETITIVE",
    badgeColor: "bg-cyan-500 text-black",
    color: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/40",
    description: "Winner across 5 regional and university hackathons. Interactive projects available on Devpost.",
    url: "https://devpost.com/vedmborade",
  },
  {
    title: "NASA Space Apps Mentor",
    badge: "GLOBAL IMPACT",
    badgeColor: "bg-blue-500 text-white",
    color: "text-blue-400",
    hoverBorder: "hover:border-blue-500/40",
    description: "Advised 93,000+ participants across 150+ countries in one of the biggest global hackathons.",
    url: "NasaMentor.pdf",
  },
  {
    title: "CodePath Scholar",
    badge: "OUTSTANDING",
    badgeColor: "bg-purple-500 text-white",
    color: "text-purple-400",
    hoverBorder: "hover:border-purple-500/40",
    description: "Completed Technical Interview Prep (TIP102) on the Advanced Track.",
    url: "CodePath.pdf",
  },
  {
    title: "AP Scholar w/ Distinction",
    badge: "COLLEGE BOARD",
    badgeColor: "bg-yellow-500 text-black",
    color: "text-yellow-400",
    hoverBorder: "hover:border-yellow-500/40",
    description: "National recognition for outstanding performance across multiple AP examinations.",
    url: "APScholar.pdf",
  },
  {
    title: "SAT Score",
    badge: "99TH PERCENTILE",
    badgeColor: "bg-cyan-500 text-black",
    color: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/40",
    description: "Achieved 99th percentile scores in Evidence-Based Reading & Writing and Math.",
    url: "SAT.pdf",
  },
  {
    title: "SAS Excellence Award",
    badge: "RUTGERS SAS",
    badgeColor: "bg-red-700 text-white",
    color: "text-red-400",
    hoverBorder: "hover:border-red-500/40",
    description: "Awarded by the School of Arts and Sciences for outstanding academic achievement at Rutgers University.",
  },
  {
    title: "Dean's List",
    badge: "RUTGERS",
    badgeColor: "bg-cyan-600 text-white",
    color: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/40",
    description: "Honored for maintaining high academic standing at Rutgers University.",
    url: "deans_letter25.pdf",
  },
  {
    title: "BWSI ASIC Completion",
    badge: "MIT LINCOLN LAB",
    badgeColor: "bg-purple-500 text-white",
    color: "text-purple-400",
    hoverBorder: "hover:border-purple-400/40",
    description: "Successful completion of the Beaver Works ASIC Design intensive program.",
    url: "BWSI.pdf",
  },
  {
    title: "Quantum Winter School",
    badge: "MICROSOFT",
    badgeColor: "bg-blue-600 text-white",
    color: "text-blue-400",
    hoverBorder: "hover:border-blue-400/40",
    description: "Quantum algorithms and mechanics using the Microsoft Q# language.",
    url: "https://www.credly.com/badges/b0fc4173-046d-44df-a784-64e67da5e121/linked_in_profile",
  },
];

const contactLinks = [
  {
    name: "Email",
    url: "mailto:vedmborade@gmail.com",
    color: "rgba(6, 182, 212, 0.7)",
    shadow: "#06b6d4",
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vedb",
    color: "rgba(59, 130, 246, 0.7)",
    shadow: "#3b82f6",
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  },
  {
    name: "GitHub",
    url: "https://github.com/vedbo",
    color: "rgba(255, 255, 255, 0.5)",
    shadow: "#ffffff",
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
  },
  {
    name: "Devpost",
    url: "https://devpost.com/vedmborade",
    color: "rgba(6, 182, 212, 0.7)",
    shadow: "#06b6d4",
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M0 8.35v7.3l6.34 3.66 6.33-3.66v-7.3l-6.33-3.66-6.34 3.66zm10.74 6.45l-4.4 2.54-4.4-2.54v-5.08l4.4-2.54 4.4 2.54v5.08zM17.67 2l-6.34 3.66 2.11 1.22 4.23-2.44 4.23 2.44v9.76l-4.23 2.44-4.23-2.44-2.11 1.22 6.34 3.66 8.44-4.88v-14.64l-8.44-4.88z"/></svg>,
  },
];

/* ── Experience data for mobile vertical timeline ── */
const experienceList = [
  { title: "Aresty Research Assistant", company: "Rutgers PRACSYS Lab", date: "Aug 2025 – Present", color: "bg-emerald-500", textColor: "text-emerald-400", bullets: ["Developing ILP/Gurobi algorithms for shelf placement on the UR5 robotic platform.", "Engineering a 3D data pipeline to map retail datasets into simulation instances.", "Applying Python/Plotly for performance evaluation with PhD researchers."] },
  { title: "Apple Specialist", company: "Apple Inc.", date: "Jul – Oct 2025", color: "bg-gray-500", textColor: "text-cyan-400", bullets: ["Generated over $100,000 in revenue by providing tailored product solutions.", "Diagnosed software/hardware issues for Genius Bar appointments."] },
  { title: "Lincoln Laboratory Summer Program", company: "MIT Lincoln Laboratory", date: "Jul – Dec 2023", color: "bg-purple-500", textColor: "text-purple-400", bullets: ["Designed an ASIC chip for air quality monitoring using Chipyard.", "Developed and pitched a $10,000 funding proposal to SOFWERX."] },
  { title: "Product Intern", company: "Jetson", date: "Jun – Aug 2023", color: "bg-blue-500", textColor: "text-blue-400", bullets: ["QA tested beta features achieving 0 production bugs.", "Contributed to features increasing daily engagement by 5%."] },
  { title: "Cyber Security Scholar", company: "NYU Tandon", date: "Jul – Aug 2022", color: "bg-red-500", textColor: "text-red-400", bullets: ["Utilized custom Python scripts for network analysis.", "Reverse-engineered malware samples to develop detection methods."] },
];

/* ───────────────────────── COMPONENT ───────────────────────── */

export default function HomeClient({ latestPosts }: { latestPosts: Post[] }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [funMode, setFunMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isKonamiOpen, setIsKonamiOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProjects = activeFilter === "all" 
    ? allProjects 
    : allProjects.filter(p => p.categories?.includes(activeFilter));

  const projectCounts = allProjects.reduce((acc, proj) => {
    proj.categories?.forEach(cat => {
      acc[cat] = (acc[cat] || 0) + 1;
    });
    acc["all"] = allProjects.length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#050508] text-gray-200 overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-lg md:text-xl font-black text-white tracking-tighter hover:text-cyan-400 transition-colors uppercase">VED BORADE</a>
          {/* Desktop nav */}
          <div className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest items-center">
            <a href="#experience" className="text-gray-400 hover:text-white transition-colors">Journey</a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
            <a href="#awards" className="text-gray-400 hover:text-white transition-colors">Distinctions</a>
            <Link href="/journal" className="text-gray-400 hover:text-white transition-colors">Journal</Link>
            <a href="/resume.pdf" target="_blank" className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-all font-black text-[10px]">Resume</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#contact" className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-cyan-500 transition-all">Connect</a>
            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </nav>
        {/* Mobile menu drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/5 bg-[#050508]/95 overflow-hidden"
            >
              <div className="flex flex-col px-4 py-4 gap-1 text-xs font-black uppercase tracking-widest">
                {[
                  { label: "Journey", href: "#experience" },
                  { label: "Projects", href: "#projects" },
                  { label: "Distinctions", href: "#awards" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white px-3 py-3 rounded-lg hover:bg-white/5 transition-colors">
                    {label}
                  </a>
                ))}
                <Link href="/journal" onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white px-3 py-3 rounded-lg hover:bg-white/5 transition-colors">
                  Journal
                </Link>
                <a href="/resume.pdf" target="_blank" onClick={() => setMobileMenuOpen(false)}
                  className="text-cyan-400 px-3 py-3 rounded-lg hover:bg-cyan-500/10 transition-colors">
                  Resume ↗
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6">
        {/* ── HERO ── */}
        <section className="min-h-[70vh] md:min-h-[85vh] relative flex items-center mb-20 pt-8 md:pt-0">
          <Card className="w-full bg-black/[0.96] relative overflow-hidden border-white/5 rounded-3xl">
            {isDesktop && <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />}
            <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[500px]">
              {/* Left content */}
              <div className="flex-1 p-6 md:p-12 relative z-10 flex flex-col justify-center">
                <AnimatedHero
                  titles={["Robotics", "Data Science", "Research", "Engineering", "Innovation"]}
                  staticText="Computer Science &"
                  subtitle="Rutgers Honors College"
                />
                <div className="flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-8">
                  <a href="#projects" className="bg-cyan-600 text-white font-black text-[10px] md:text-xs uppercase tracking-widest px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/20 inline-block">
                    Explore Projects
                  </a>
                  <Link href="/journal" className="bg-white/5 border border-white/10 text-white font-black text-[10px] md:text-xs uppercase tracking-widest px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-white/10 transition-all inline-block">
                    Read Thoughts
                  </Link>
                </div>
              </div>
              {/* Right content — 3D Robot (desktop only) */}
              {isDesktop && (
                <div className="flex-1 relative min-h-[400px]">
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </Card>
        </section>

        {/* ── AFFILIATIONS AND TECH STACK MARQUEE ── */}
        <section className="mb-32 md:mb-40 overflow-hidden relative flex flex-col gap-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none"></div>
          
          <Marquee pauseOnHover className="[--duration:40s] py-2">
            {[
              { text: "RUTGERS HONORS COLLEGE", color: "bg-cyan-500" },
              { text: "COMPUTATIONAL ROBOTICS RESEARCH", color: "bg-green-500" },
              { text: "NASA TECHNICAL MENTOR", color: "bg-blue-500" },
              { text: "SILICON V/ALLEY SCHOLAR", color: "bg-purple-500" },
              { text: "JETSON INTERN", color: "bg-orange-500" },
              { text: "NYU GAME LAB", color: "bg-red-500" }
            ].map((affiliation, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-full px-6 py-3 md:px-8 md:py-4 flex items-center justify-center whitespace-nowrap hover:border-white/30 transition-colors gap-3">
                <span className={`w-2 h-2 rounded-full ${affiliation.color} animate-pulse shadow-[0_0_8px_currentColor]`}></span>
                <span className="text-gray-200 font-bold text-sm md:text-base uppercase tracking-widest">{affiliation.text}</span>
              </div>
            ))}
          </Marquee>

          <Marquee pauseOnHover reverse className="[--duration:35s] py-2">
            {[
              { text: "SwiftUI", color: "bg-orange-500" },
              { text: "Python", color: "bg-yellow-500" },
              { text: "React", color: "bg-cyan-400" },
              { text: "Next.js", color: "bg-white" },
              { text: "Arduino", color: "bg-teal-500" },
              { text: "C++", color: "bg-blue-600" },
              { text: "PyTorch", color: "bg-red-500" },
              { text: "Solidity", color: "bg-gray-400" },
              { text: "AWS", color: "bg-orange-400" }
            ].map((tech, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-full px-5 py-2 md:px-6 md:py-3 flex items-center justify-center whitespace-nowrap hover:border-white/30 transition-colors gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${tech.color} opacity-80`}></span>
                <span className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-widest">{tech.text}</span>
              </div>
            ))}
          </Marquee>
        </section>

        {/* ── MY JOURNEY ── */}
        <section id="experience" className="mb-32 md:mb-40">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tighter uppercase border-l-4 border-cyan-500 pl-6">My Journey</h2>
          
          {isDesktop ? (
            <>
              <p className="text-gray-400 text-sm mb-8 pl-6">Click a node to explore — connected experiences will pulse.</p>
              <RadialOrbitalTimeline timelineData={timelineData} />
            </>
          ) : (
            <div className="space-y-12 mt-8">
              {experienceList.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className={`absolute -left-[5px] top-0 w-[9px] h-[9px] ${exp.color} rounded-full`}></div>
                  <div className="mb-3">
                    <h3 className={`text-lg font-black ${exp.textColor} uppercase tracking-tight mb-1`}>{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest">
                      <span className="text-gray-400">{exp.company}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-500 font-mono">{exp.date}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-100 text-sm font-medium list-disc ml-4 leading-relaxed">
                    {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ── DISTINCTIONS ── */}
        <section id="awards" className="mb-32 md:mb-40">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-10 md:mb-12 tracking-tighter uppercase border-l-4 border-yellow-500 pl-6">Distinctions &amp; Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {distinctions.map((d, i) => {
              const isExternal = d.url && (d.url.startsWith("http") || d.url.startsWith("mailto"));
              const href = d.url ? (isExternal ? d.url : `/${d.url}`) : undefined;
              const Wrapper = href ? "a" : "div";
              const wrapperProps = href ? { href, target: "_blank" as const, rel: "noopener noreferrer" } : {};

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Wrapper {...wrapperProps} className={`block bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 ${d.hoverBorder} transition-all group h-full flex flex-col justify-between text-left cursor-pointer`}>
                    <div>
                      <div className="flex justify-between items-start mb-3 md:mb-4">
                        <h3 className={`text-xs font-bold ${d.color} uppercase tracking-widest`}>{d.title}</h3>
                        <span className={`text-[7px] font-black ${d.badgeColor} px-2 py-1 rounded tracking-tighter uppercase whitespace-nowrap ml-2`}>{d.badge}</span>
                      </div>
                      <p className="text-gray-100 text-sm md:text-[15px] font-medium leading-relaxed">{d.description}</p>
                    </div>
                    {d.links ? (
                      <div className="flex justify-end gap-4 mt-4 md:mt-6">
                        {d.links.map((link, j) => (
                          <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" className={`${d.color} text-[9px] font-bold uppercase hover:underline italic`}>{link.text}</a>
                        ))}
                      </div>
                    ) : href ? (
                      <p className={`${d.color} text-[9px] mt-4 md:mt-6 font-bold uppercase group-hover:underline italic text-right`}>Click to view →</p>
                    ) : null}
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── LEADERSHIP (Scroll Animation) ── */}
        <section className="mb-20">
          {isDesktop ? (
            <ContainerScroll
              titleComponent={
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                  Leadership &amp; <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Involvement</span>
                </h2>
              }
            >
              <div className="flex flex-col gap-6 p-6 md:p-8 h-full bg-[#0a0a0f] overflow-y-auto">
                {/* Card 1 — Cloud Computing */}
                <div className="bg-gradient-to-br from-cyan-950/40 to-black/40 rounded-2xl p-8 md:p-10 border border-cyan-500/20 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                      <span className="text-cyan-400 text-lg">☁️</span>
                    </div>
                    <div>
                      <span className="text-cyan-400 font-black text-[10px] uppercase tracking-widest block">Executive Board</span>
                      <span className="text-white/40 font-mono text-[10px]">2025 – Present</span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">Rutgers Organization of Cloud Computing</h3>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed font-medium">Organizing speaker events with cloud engineers from Google and Amazon, leading hands-on hardware and cloud integration demos, and running workshops on AWS/Azure architecture for the Rutgers community.</p>
                </div>

                {/* Card 2 — Silicon V/Alley */}
                <div className="bg-gradient-to-br from-purple-950/40 to-black/40 rounded-2xl p-8 md:p-10 border border-purple-500/20 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                      <span className="text-purple-400 text-lg">🚀</span>
                    </div>
                    <div>
                      <span className="text-purple-400 font-black text-[10px] uppercase tracking-widest block">Leadership Scholar</span>
                      <span className="text-white/40 font-mono text-[10px]">Cohort 7</span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">Road to Silicon V/Alley</h3>
                  <div className="space-y-2 text-sm md:text-base text-gray-300 leading-relaxed font-medium">
                    <p className="flex items-start gap-2"><span className="text-purple-500 mt-1">•</span> Selected as a Fellow in a highly competitive program spanning technology, finance, and entrepreneurship.</p>
                    <p className="flex items-start gap-2"><span className="text-purple-500 mt-1">•</span> Built and pitched multiple ventures, combining engineering rigor, product design, and go-to-market strategy.</p>
                  </div>
                </div>

                {/* Card 3 — CS Honor Society */}
                <div className="bg-gradient-to-br from-yellow-950/40 to-black/40 rounded-2xl p-8 md:p-10 border border-yellow-500/20 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
                      <span className="text-yellow-400 text-lg">🏆</span>
                    </div>
                    <div>
                      <span className="text-yellow-400 font-black text-[10px] uppercase tracking-widest block">President (Alum)</span>
                      <span className="text-white/40 font-mono text-[10px]">2021 – 2024</span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">National CS Honor Society</h3>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed font-medium">Coached lessons in engineering and circuitry for 50+ students. Designed a 4ft Santa animatronic display using Arduino and custom robotics for the school lobby.</p>
                </div>
              </div>
            </ContainerScroll>
          ) : (
            <>
              <h2 className="text-2xl font-black text-white mb-8 tracking-tighter uppercase border-l-4 border-cyan-500 pl-6">
                Leadership &amp; <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Involvement</span>
              </h2>
              <div className="space-y-6">
                {[
                  { label: "Executive Board", color: "text-cyan-400", border: "border-cyan-500/20", title: "Rutgers Organization of Cloud Computing", desc: "Organizing speaker events with Google and Amazon engineers, leading hardware + cloud demos, and running AWS/Azure workshops." },
                  { label: "Leadership Scholar", color: "text-purple-400", border: "border-purple-500/20", title: "Road to Silicon V/Alley", desc: "Selected as a Fellow in a highly competitive program spanning technology, finance, and entrepreneurship. Built and pitched multiple ventures, combining engineering rigor, product design, and go-to-market strategy." },
                  { label: "President (Alum)", color: "text-yellow-400", border: "border-yellow-500/20", title: "National CS Honor Society", desc: "Coached lessons in engineering and circuitry for 50+ students." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-white/5 rounded-2xl p-6 border ${item.border}`}
                  >
                    <span className={`${item.color} font-black text-[10px] uppercase tracking-widest`}>{item.label}</span>
                    <h3 className="text-lg font-black text-white mt-2 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed font-medium">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="mb-32 md:mb-40 pt-10">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tighter uppercase border-l-4 border-purple-500 pl-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Projects</span> &amp; Builds
          </h2>
          
          <ProjectFilter 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
            counts={projectCounts} 
          />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className=""
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ── LATEST THOUGHTS / JOURNAL ── */}
        <section className="mb-32 md:mb-40 pt-10 relative">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            {/* Left Graphics (CPU) */}
            {isDesktop && (
              <div className="flex-1 w-full max-w-sm ml-6 opacity-80 scale-125 transform transition-transform duration-1000 hover:scale-150">
                <CpuArchitecture />
              </div>
            )}
            
            {/* Right Content (Thoughts) */}
            <div className="flex-[2] w-full">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tighter uppercase border-l-4 border-cyan-500 pl-6">
                Latest <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Thoughts</span>
              </h2>
              
              <div className="space-y-4">
                {latestPosts.map((entry, idx) => (
                  <Link href={`/journal/${entry.meta.id}`} key={entry.meta.id}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group p-5 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/30 hover:bg-white/10 transition-all cursor-pointer flex flex-col md:flex-row gap-4 justify-between md:items-center mb-4"
                    >
                      <div>
                        <span className="text-gray-500 font-mono text-[10px] md:text-xs mb-1 block">{entry.meta.date}</span>
                        <h3 className="text-sm md:text-base font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{entry.meta.title}</h3>
                      </div>
                      <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-600">
                        {entry.meta.tags.slice(0, 2).map(tag => <span key={tag}>{tag}</span>)}
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 pl-6">
                <Link href="/journal" className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 hover:text-cyan-300 hover:underline">
                  Read all entries →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONNECT ── */}
        <section id="contact" className="text-center py-20 md:py-32 mb-20 rounded-3xl relative overflow-hidden bg-[#0a0f1e]/75 backdrop-blur-xl border border-white/5 mx-2 md:mx-4 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tighter relative z-10">Connect</h2>
          
          <div className="flex items-center justify-center gap-4 mb-10 md:mb-16 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Standard</span>
            <label className="relative inline-block w-16 h-[34px] cursor-pointer">
              <input type="checkbox" className="opacity-0 w-0 h-0 peer" checked={funMode} onChange={() => setFunMode(!funMode)} />
              <span className="absolute top-0 left-0 right-0 bottom-0 bg-[#1f2937] rounded-full transition-all peer-checked:bg-cyan-500"></span>
              <span className="absolute h-[26px] w-[26px] left-1 bottom-1 bg-white rounded-full transition-all peer-checked:translate-x-[30px]"></span>
            </label>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Try me!</span>
          </div>

          {funMode ? (
            <div className="relative z-10">
              {isDesktop ? (
                <FunContactOrbit links={contactLinks} />
              ) : (
                <FunContactSwipe links={contactLinks} />
              )}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-4xl mx-auto relative z-10 px-4">
              {contactLinks.map((link, i) => (
                <a key={i} href={link.url} target={link.url.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="group flex flex-col items-center gap-3 md:gap-4 transition-all">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/40 duration-300">
                    <div className="w-5 h-5 md:w-6 md:h-6 fill-gray-400 group-hover:fill-white transition-colors flex items-center justify-center">
                      {link.icon}
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">{link.name}</span>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="text-center py-12 md:py-16 border-t border-white/5 flex flex-col items-center justify-center gap-6 relative">
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em]">Ved Borade © 2026</p>
        <button 
          onClick={() => setIsKonamiOpen(true)}
          className="text-gray-500 hover:text-cyan-400 transition-colors text-[9px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 px-4 py-2 border border-white/10 rounded-lg cursor-pointer"
        >
          Secret Challenge 🤫
        </button>
      </footer>
      <KonamiGame isOpen={isKonamiOpen} onClose={() => setIsKonamiOpen(false)} />
    </div>
  );
}

/* ── Reusable Project Card ── */
function ProjectCard({ project, compact }: { project: typeof allProjects[0]; compact?: boolean }) {
  const [videoActive, setVideoActive] = useState(false);
  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-cyan-500/30 transition-all">
      {project.videoId ? (
        <div className="relative pb-[56.25%] h-0 overflow-hidden bg-black cursor-pointer" onClick={() => setVideoActive(true)}>
          {videoActive ? (
            <iframe
              src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          ) : (
            <>
              <img
                src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`}
                alt={project.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6 fill-white ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </>
          )}
        </div>
      ) : project.image ? (
        <div className="relative pb-[56.25%] h-0 overflow-hidden bg-[#0a0a12]">
          <img
            src={project.image}
            alt={project.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-24 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{project.title}</span>
        </div>
      )}
      <div className={`${compact ? "p-4" : "p-5 md:p-6"} flex-grow flex flex-col`}>
        <div className="flex justify-between items-start mb-2 md:mb-3">
          <h3 className={`${compact ? "text-xs" : "text-sm"} font-bold text-white tracking-tight uppercase`}>{project.title}</h3>
          {project.badge && (
            <span className={`text-[7px] font-black ${project.badgeColor} px-2 py-1 rounded tracking-tighter uppercase whitespace-nowrap ml-2`}>{project.badge}</span>
          )}
        </div>
        <div className="flex gap-1.5 mb-2 md:mb-3 flex-wrap">
          {project.pills?.map((pill: string, j: number) => (
            <span key={j} className={`text-[8px] md:text-[9px] font-bold px-1.5 md:px-2 py-0.5 rounded ${project.pillColor} uppercase`}>{pill}</span>
          ))}
        </div>
        <p className={`text-gray-300 ${compact ? "text-[10px]" : "text-[11px] md:text-xs"} leading-relaxed flex-grow font-medium mb-3 md:mb-4`}>{project.description}</p>
        <div className="flex gap-2 mt-auto">
          {project.links?.map((link: { text: string; url: string; }, j: number) => (
            <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" className={`flex-grow text-center bg-gray-800 text-white ${compact ? "text-[8px] py-2" : "text-[9px] py-2.5"} font-black rounded-lg hover:bg-cyan-600 transition-colors uppercase tracking-widest`}>{link.text}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
