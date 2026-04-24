import { useCallback, useEffect, useMemo, useState } from "react";
import { PROJECTS, GRID_COLS, type AsterProject } from "./data/aster";

// ─── Helpers ─────────────────────────────────────────────────

/** Clamp index within valid project bounds */
function clampIndex(index: number, total: number): number {
  return Math.max(0, Math.min(index, total - 1));
}

/** Format current time like a phone status bar */
function useClockTime(): string {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const id = setInterval(
      () =>
        setTime(
          new Date().toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
          })
        ),
      10_000
    );
    return () => clearInterval(id);
  }, []);

  return time;
}

// ─── Components ──────────────────────────────────────────────

function StatusBar({ time }: { time: string }) {
  return (
    <div className="status-bar flex items-center justify-between px-6 py-2 bg-aster-beige/80 relative z-10">
      <span className="text-xs font-semibold text-aster-dark tracking-wide">
        {time}
      </span>
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-2.5 border border-aster-dark/60 rounded-sm relative">
          <div className="absolute inset-[1px] right-[2px] bg-aster-dark/70 rounded-[1px]" />
        </div>
      </div>
    </div>
  );
}

function AppIcon({
  project,
  isFocused,
  onClick,
}: {
  project: AsterProject;
  isFocused: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`app-icon flex flex-col items-center gap-2 p-2 rounded-2xl transition-all duration-200 cursor-pointer ${
        isFocused ? "focused" : ""
      }`}
      aria-label={`Abrir ${project.name}`}
    >
      {/* Icon Container */}
      <div
        className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${
          isFocused
            ? "shadow-cel scale-105"
            : "shadow-md hover:shadow-cel-sm"
        }`}
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      >
        <span className="drop-shadow-sm select-none">{project.icon}</span>

        {/* Focus indicator ring */}
        {isFocused && (
          <div className="absolute -inset-1 rounded-2xl border-2 border-aster-accent/60 animate-pulse-glow pointer-events-none" />
        )}
      </div>

      {/* Label */}
      <span
        className={`text-[11px] font-medium leading-tight text-center max-w-[72px] truncate transition-colors duration-200 ${
          isFocused ? "text-aster-dark font-semibold" : "text-aster-dark/70"
        }`}
      >
        {project.name}
      </span>
    </button>
  );
}

function DetailPanel({
  project,
  onClose,
}: {
  project: AsterProject;
  onClose: () => void;
}) {
  return (
    <div className="detail-panel absolute inset-0 z-30 bg-aster-beige flex flex-col">
      {/* Header */}
      <div
        className="relative h-28 flex items-end px-5 pb-4"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/30 transition-colors cursor-pointer"
          aria-label="Voltar"
        >
          ←
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl drop-shadow-md">{project.icon}</span>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight drop-shadow-sm">
              {project.name}
            </h2>
            <div className="flex gap-1.5 mt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-chip bg-white/20 text-white/90 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-5 py-5 overflow-y-auto">
        <h3 className="text-xs font-bold uppercase tracking-widest text-aster-dark/40 mb-2">
          Sobre
        </h3>
        <p className="text-sm text-aster-dark/80 leading-relaxed mb-6">
          {project.summary}
        </p>

        <h3 className="text-xs font-bold uppercase tracking-widest text-aster-dark/40 mb-3">
          Links
        </h3>
        <div className="flex flex-col gap-2">
          {project.links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-aster-beige-dark/60 border border-aster-dark/8 hover:bg-aster-beige-dark hover:shadow-cel-sm transition-all duration-200 group"
            >
              <span className="text-base">🔗</span>
              <span className="text-sm font-medium text-aster-dark/80 group-hover:text-aster-accent transition-colors">
                {link.name}
              </span>
              <span className="ml-auto text-aster-dark/30 group-hover:text-aster-accent transition-colors text-xs">
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom safe area */}
      <div className="h-6 bg-aster-beige" />
    </div>
  );
}

function KeyHint() {
  return (
    <div className="flex items-center justify-center gap-3 py-2 animate-fade-in">
      <div className="flex gap-1">
        {["W", "A", "S", "D"].map((key) => (
          <kbd
            key={key}
            className="w-5 h-5 rounded text-[9px] font-mono font-bold bg-aster-dark/8 text-aster-dark/40 flex items-center justify-center border border-aster-dark/10"
          >
            {key}
          </kbd>
        ))}
      </div>
      <span className="text-[9px] text-aster-dark/30 font-medium">
        navegar
      </span>
      <kbd className="px-2 h-5 rounded text-[9px] font-mono font-bold bg-aster-dark/8 text-aster-dark/40 flex items-center justify-center border border-aster-dark/10">
        Enter
      </kbd>
      <span className="text-[9px] text-aster-dark/30 font-medium">abrir</span>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────

export default function App() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<AsterProject | null>(
    null
  );
  const time = useClockTime();

  /** Safe focused index — always within array bounds */
  const safeFocusedIndex = useMemo(
    () => clampIndex(focusedIndex, PROJECTS.length),
    [focusedIndex]
  );

  // ─── Keyboard Navigation ──────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // If detail panel is open, only listen for Escape/Backspace
      if (selectedProject) {
        if (e.key === "Escape" || e.key === "Backspace") {
          e.preventDefault();
          setSelectedProject(null);
        }
        return;
      }

      const total = PROJECTS.length;
      const cols = GRID_COLS;

      const keyActions: Record<string, () => void> = {
        // Move right
        ArrowRight: () => setFocusedIndex((i) => clampIndex(i + 1, total)),
        d: () => setFocusedIndex((i) => clampIndex(i + 1, total)),
        D: () => setFocusedIndex((i) => clampIndex(i + 1, total)),

        // Move left
        ArrowLeft: () => setFocusedIndex((i) => clampIndex(i - 1, total)),
        a: () => setFocusedIndex((i) => clampIndex(i - 1, total)),
        A: () => setFocusedIndex((i) => clampIndex(i - 1, total)),

        // Move down
        ArrowDown: () =>
          setFocusedIndex((i) => clampIndex(i + cols, total)),
        s: () => setFocusedIndex((i) => clampIndex(i + cols, total)),
        S: () => setFocusedIndex((i) => clampIndex(i + cols, total)),

        // Move up
        ArrowUp: () => setFocusedIndex((i) => clampIndex(i - cols, total)),
        w: () => setFocusedIndex((i) => clampIndex(i - cols, total)),
        W: () => setFocusedIndex((i) => clampIndex(i - cols, total)),

        // Select
        Enter: () => {
          const project = PROJECTS[safeFocusedIndex];
          if (project) setSelectedProject(project);
        },
      };

      const action = keyActions[e.key];
      if (action) {
        e.preventDefault();
        action();
      }
    },
    [selectedProject, safeFocusedIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // ─── Render ────────────────────────────────────────────────

  return (
    <div className="min-h-screen w-full bg-aster-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="ambient-glow"
        style={{ top: "-10%", left: "20%", background: "#6c63ff" }}
      />
      <div
        className="ambient-glow"
        style={{ bottom: "-10%", right: "15%", background: "#00cec9" }}
      />

      {/* Brand watermark */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 select-none">
        <span className="text-white/10 text-xs font-mono tracking-[0.3em] uppercase">
          Aster Dev
        </span>
      </div>

      {/* Phone Shell */}
      <div className="phone-shell w-full max-w-[360px] aspect-[9/18] relative z-10">
        <div className="phone-screen w-full h-full bg-aster-beige flex flex-col relative">
          {/* Status Bar */}
          <StatusBar time={time} />

          {/* Header Area */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-aster-accent animate-pulse" />
              <h1 className="text-lg font-extrabold text-aster-dark tracking-tight">
                Aster<span className="text-aster-accent">Dev</span>
              </h1>
            </div>
            <p className="text-[11px] text-aster-dark/40 font-medium tracking-wide">
              Frontend &amp; Mobile Development
            </p>
          </div>

          {/* App Grid */}
          <div className="flex-1 px-4 py-3">
            <div className="grid grid-cols-3 gap-3 justify-items-center">
              {PROJECTS.map((project, index) => (
                <AppIcon
                  key={project.id}
                  project={project}
                  isFocused={safeFocusedIndex === index}
                  onClick={() => {
                    setFocusedIndex(index);
                    setSelectedProject(project);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Keyboard Hints (bottom) */}
          <KeyHint />

          {/* Bottom bar */}
          <div className="flex justify-center pb-3 pt-1">
            <div className="w-28 h-1 rounded-full bg-aster-dark/15" />
          </div>

          {/* Detail Panel (overlay) */}
          {selectedProject && (
            <DetailPanel
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </div>
      </div>

      {/* Bottom brand */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center z-10 select-none">
        <p className="text-white/8 text-[10px] font-mono tracking-widest uppercase">
          One Person Business · Portfolio
        </p>
      </div>
    </div>
  );
}
