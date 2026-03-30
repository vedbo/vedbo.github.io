"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";

type Log = {
  id: string;
  command: string;
  output: React.ReactNode;
};

const COMMANDS = ["help", "ls", "whoami", "cat resume.pdf", "clear", "echo", "pwd"];

export function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Log[]>([
    {
      id: "init",
      command: "",
      output: (
        <div className="text-cyan-400">
          VedOS (v1.0.0) - Welcome to the terminal.
          <br />
          Type <span className="text-yellow-400">'help'</span> to see available commands.
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isOpen]);

  // Global shortcut to open terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + J or ` (backtick) to toggle terminal
      if ((e.metaKey || e.ctrlKey) && e.key === "j" || e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const args = trimmed.split(" ");
    const baseCmd = args[0].toLowerCase();

    let output: React.ReactNode = "";

    if (baseCmd === "clear") {
      setHistory([]);
      return;
    }

    switch (baseCmd) {
      case "help":
        output = (
          <div className="text-gray-300">
            <p>Available commands:</p>
            <ul className="pl-4 list-disc text-gray-400 mt-2 space-y-1">
              <li><span className="text-yellow-400">help</span> - View this list</li>
              <li><span className="text-yellow-400">ls</span> - List directory contents</li>
              <li><span className="text-yellow-400">cat [file]</span> - Read file contents</li>
              <li><span className="text-yellow-400">whoami</span> - Display current user info</li>
              <li><span className="text-yellow-400">pwd</span> - Print working directory</li>
              <li><span className="text-yellow-400">clear</span> - Clear the terminal</li>
            </ul>
          </div>
        );
        break;
      case "ls":
        output = (
          <div className="flex gap-4 text-cyan-300">
            <span className="text-blue-400 font-bold">projects/</span>
            <span className="text-blue-400 font-bold">journal/</span>
            <span className="text-gray-200">resume.pdf</span>
            <span className="text-gray-200">about.txt</span>
          </div>
        );
        break;
      case "pwd":
        output = <span className="text-gray-300">/Users/vedborade/portfolio</span>;
        break;
      case "whoami":
        output = (
          <div className="text-gray-300">
            vedborade - Software Engineer, AI Researcher, and Apple Specialist.
            <br />
            Currently building at Rutgers Honors College & PRACSYS Lab.
          </div>
        );
        break;
      case "cat":
        if (args[1] === "resume.pdf") {
          output = (
            <div className="text-gray-300 whitespace-pre font-mono text-xs md:text-sm">
{`========================================
             VED BORADE
    CS & Data Science @ Rutgers
========================================
[Experience]
- Robotics Research @ PRACSYS Lab
- Technical Mentor @ NASA Space Apps
- Apple Specialist @ Apple
- Board Member @ ROCC

[Skills]
Python, Swift, React, PyTorch, C++, AWS

> Type 'ls projects' to view builds
========================================`}
            </div>
          );
        } else if (args[1] === "about.txt") {
          output = <span className="text-gray-300">I build intelligent software that bridges cloud architecture with cutting-edge ML.</span>;
        } else if (!args[1]) {
          output = <span className="text-red-400">cat: missing file operand</span>;
        } else {
          output = <span className="text-red-400">cat: {args[1]}: No such file or directory</span>;
        }
        break;
      case "echo":
        output = <span className="text-gray-300">{args.slice(1).join(" ")}</span>;
        break;
      case "":
        output = "";
        break;
      default:
        output = <span className="text-red-400">zsh: command not found: {baseCmd}</span>;
    }

    setHistory((prev) => [
      ...prev,
      { id: Date.now().toString(), command: trimmed, output },
    ]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-6 left-6 z-[90] w-12 h-12 bg-black border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 shadow-lg shadow-black/50 transition-colors cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open Terminal"
      >
        <TerminalIcon size={20} />
        {/* Tooltip */}
        <span className="absolute left-16 px-2 py-1 bg-black border border-white/10 text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Launch Terminal (` or Cmd+J)
        </span>
      </motion.button>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed z-[100] flex flex-col overflow-hidden bg-[#0A0A0F]/95 backdrop-blur-xl border border-white/10 shadow-2xl ${
              isFullScreen
                ? "inset-0 rounded-none"
                : "bottom-4 left-4 right-4 md:bottom-24 md:left-6 md:w-[600px] h-[400px] md:h-[450px] rounded-xl"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5 shrink-0 cursor-default">
              <div className="flex gap-2 items-center">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 cursor-pointer flex items-center justify-center" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 cursor-pointer" onClick={() => setIsFullScreen(!isFullScreen)} />
              </div>
              <div className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 flex items-center gap-2">
                <TerminalIcon size={12} /> root@vedos:~
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsFullScreen(!isFullScreen)} className="text-gray-500 hover:text-white transition-colors">
                  {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm" onClick={() => inputRef.current?.focus()}>
              {history.map((log) => (
                <div key={log.id} className="mb-4">
                  {log.command !== "" && (
                    <div className="flex items-center gap-2 text-white mb-1">
                      <span className="text-green-400 font-bold">ved~/portfolio</span>
                      <span className="text-gray-500">$</span>
                      <span className="text-gray-100">{log.command}</span>
                    </div>
                  )}
                  <div className="leading-relaxed">{log.output}</div>
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={onSubmit} className="flex items-center gap-2 text-white">
                <span className="text-green-400 font-bold">ved~/portfolio</span>
                <span className="text-gray-500">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none border-none text-gray-100 font-mono"
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                />
              </form>
              <div ref={bottomRef} className="h-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
