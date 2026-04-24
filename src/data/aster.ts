// ─── Types ───────────────────────────────────────────────────

/** An item that opens a detail panel inside the phone */
export interface AppItem {
  type: "app";
  id: string;
  name: string;
  icon: string;
  gradient: [string, string];
  summary: string;
  links: AsterLink[];
  tags: string[];
  previewMedia?: string;
}

/** An external link that opens in a new tab */
export interface LinkItem {
  type: "link";
  id: string;
  name: string;
  icon: string;
  gradient: [string, string];
  url: string;
}

/** A folder that contains child projects */
export interface FolderItem {
  type: "folder";
  id: string;
  name: string;
  icon: string;
  gradient: [string, string];
  children: ProjectItem[];
}

/** A project inside a folder */
export interface ProjectItem {
  type: "project";
  id: string;
  name: string;
  icon: string;
  gradient: [string, string];
  summary: string;
  links: AsterLink[];
  tags: string[];
  previewMedia?: string;
}

export interface AsterLink {
  name: string;
  url: string;
}

/** Union of every grid-renderable item */
export type GridItem = AppItem | LinkItem | FolderItem | ProjectItem;

/** Items that can show a DetailPanel */
export type DetailableItem = AppItem | ProjectItem;

// ─── Type Guards ─────────────────────────────────────────────

export function isDetailable(item: GridItem): item is DetailableItem {
  return item.type === "app" || item.type === "project";
}

export function isFolder(item: GridItem): item is FolderItem {
  return item.type === "folder";
}

export function isLink(item: GridItem): item is LinkItem {
  return item.type === "link";
}

// ─── Data ────────────────────────────────────────────────────

/**
 * Home screen items — the root grid.
 * Order matters: this is the order they appear in the grid.
 */
export const HOME_ITEMS: GridItem[] = [
  {
    type: "app",
    id: "sobre-mim",
    name: "Sobre Mim",
    icon: "👤",
    gradient: ["#6c63ff", "#a29bfe"],
    summary:
      "Desenvolvedor Frontend & Mobile com foco em React, React Native e TypeScript. Apaixonado por interfaces limpas, performance e experiências de utilizador memoráveis.",
    links: [
      { name: "LinkedIn", url: "#" },
      { name: "Email", url: "mailto:contact@aster.dev" },
    ],
    tags: ["Frontend", "Mobile", "UI/UX"],
    previewMedia: "https://placehold.co/600x400/6c63ff/ffffff?text=Sobre+Mim",
  },
  {
    type: "app",
    id: "curriculo",
    name: "Currículo",
    icon: "📄",
    gradient: ["#fd79a8", "#e84393"],
    summary:
      "Currículo profissional interativo. Experiência em Frontend & Mobile com foco em React, React Native e TypeScript.",
    links: [{ name: "Download PDF", url: "#" }],
    tags: ["Carreira", "Frontend", "Mobile"],
    previewMedia: "https://placehold.co/600x400/e84393/ffffff?text=Curriculo",
  },
  {
    type: "link",
    id: "github",
    name: "GitHub",
    icon: "🐙",
    gradient: ["#2d3436", "#636e72"],
    url: "https://github.com",
  },
  {
    type: "folder",
    id: "frontend",
    name: "Frontend",
    icon: "🖥️",
    gradient: ["#0984e3", "#74b9ff"],
    children: [
      {
        type: "project",
        id: "pex-wiki",
        name: "PEX Wiki",
        icon: "📖",
        gradient: ["#6c63ff", "#a29bfe"],
        summary:
          "Wiki completa para o ecossistema PEX. Interface responsiva construída com foco em performance e acessibilidade.",
        links: [{ name: "Visitar Wiki", url: "#" }],
        tags: ["React", "TypeScript", "Wiki"],
        previewMedia: "https://placehold.co/600x400/6c63ff/ffffff?text=PEX+Wiki",
      },
      {
        type: "project",
        id: "calculadora-raridade",
        name: "Calc. Raridade",
        icon: "🎲",
        gradient: ["#00cec9", "#55efc4"],
        summary:
          "Ferramenta de cálculo de raridade com algoritmos otimizados. Design premium com feedback visual em tempo real.",
        links: [{ name: "Abrir Calculadora", url: "#" }],
        tags: ["JavaScript", "Algoritmos", "UI/UX"],
        previewMedia: "https://placehold.co/600x400/00cec9/ffffff?text=Calc+Raridade",
      },
    ],
  },
  {
    type: "folder",
    id: "mobile",
    name: "Mobile",
    icon: "📱",
    gradient: ["#00b894", "#55efc4"],
    children: [
      {
        type: "project",
        id: "app-mobile-demo",
        name: "App Demo",
        icon: "🚀",
        gradient: ["#e17055", "#fab1a0"],
        summary:
          "Aplicação mobile de demonstração construída com React Native. Arquitetura limpa, navegação fluida e design system customizado.",
        links: [{ name: "Ver Demo", url: "#" }],
        tags: ["React Native", "Expo", "Mobile"],
        previewMedia: "https://placehold.co/600x400/e17055/ffffff?text=App+Demo",
      },
    ],
  },
];

/** Number of columns in the app grid */
export const GRID_COLS = 3;
