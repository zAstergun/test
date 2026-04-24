export interface AsterProject {
  /** Unique identifier for the project */
  id: string;
  /** Display name shown under the icon */
  name: string;
  /** Short description shown in the detail panel */
  summary: string;
  /** Emoji icon displayed in the grid */
  icon: string;
  /** Gradient colors for the icon background [from, to] */
  gradient: [string, string];
  /** Links associated with this project */
  links: AsterLink[];
  /** Tech stack tags */
  tags: string[];
}

export interface AsterLink {
  /** Display name for the link */
  name: string;
  /** URL to navigate to */
  url: string;
}

/**
 * All Aster Dev projects.
 * This is the single source of truth — the UI reads from this array.
 * Add new projects here; the grid adapts automatically.
 */
export const PROJECTS: AsterProject[] = [
  {
    id: "pex-wiki",
    name: "PEX Wiki",
    summary:
      "Wiki completa para o ecossistema PEX. Interface responsiva construída com foco em performance e acessibilidade.",
    icon: "📖",
    gradient: ["#6c63ff", "#a29bfe"],
    links: [{ name: "Visitar Wiki", url: "#" }],
    tags: ["React", "TypeScript", "Wiki"],
  },
  {
    id: "calculadora-raridade",
    name: "Calculadora de Raridade",
    summary:
      "Ferramenta de cálculo de raridade com algoritmos otimizados. Design premium com feedback visual em tempo real.",
    icon: "🎲",
    gradient: ["#00cec9", "#55efc4"],
    links: [{ name: "Abrir Calculadora", url: "#" }],
    tags: ["JavaScript", "Algoritmos", "UI/UX"],
  },
  {
    id: "github",
    name: "GitHub",
    summary:
      "Repositórios open source e contribuições. Código limpo, documentação completa e boas práticas.",
    icon: "🐙",
    gradient: ["#2d3436", "#636e72"],
    links: [{ name: "Ver Perfil", url: "https://github.com" }],
    tags: ["Open Source", "Git", "Colaboração"],
  },
  {
    id: "curriculo",
    name: "Currículo",
    summary:
      "Currículo profissional interativo. Experiência em Frontend & Mobile com foco em React, React Native e TypeScript.",
    icon: "📄",
    gradient: ["#fd79a8", "#e84393"],
    links: [{ name: "Download PDF", url: "#" }],
    tags: ["Carreira", "Frontend", "Mobile"],
  },
];

/** Number of columns in the app grid */
export const GRID_COLS = 3;

/** Maximum items per grid page (3x3) */
export const ITEMS_PER_PAGE = 9;
