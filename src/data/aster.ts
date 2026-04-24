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

// ─── Helper: detect image-based icons ────────────────────────

/** Returns true if the icon string references an image file rather than an emoji */
export function isImageIcon(icon: string): boolean {
  return (
    icon.startsWith("/") ||
    icon.includes(".png") ||
    icon.includes(".svg") ||
    icon.includes(".ico")
  );
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
    previewMedia: "/previews/sobre-mim.gif",
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
    previewMedia: "/previews/curriculo.gif",
  },
  {
    type: "app",
    id: "github",
    name: "GitHub",
    icon: "/icons/octocat.svg",
    gradient: ["#2d3436", "#636e72"],
    summary:
      "Perfil ativo com projetos open-source que demonstram código limpo, arquitetura bem definida e evolução contínua. De calculadoras estatísticas com dados reais do IBGE a wikis acadêmicas completas — cada repositório reflete boas práticas, separação de responsabilidades e atenção ao detalhe.",
    links: [
      { name: "Ver Perfil no GitHub", url: "https://github.com/zAstergun" },
    ],
    tags: ["Open Source", "Código Limpo", "Boas Práticas"],
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
        id: "ideal-calculator",
        name: "Ideal Calc",
        icon: "/icons/calculator.svg",
        gradient: ["#0b0a0a", "#121214"],
        summary:
          "Calculadora estatística interativa que cruza 12 filtros demográficos com microdados oficiais do IBGE (Censo 2022, PNAD 2023) para revelar a probabilidade real de encontrar o parceiro ideal no Brasil. Cálculo em tempo real, card viral compartilhável e auditoria completa de dados.",
        links: [
          { name: "Abrir App", url: "https://idealcalc.app/" },
          {
            name: "Código Fonte",
            url: "https://github.com/zAstergun/Ideal-Calculator",
          },
        ],
        tags: ["JavaScript", "Estatística", "IBGE", "UI/UX"],
        previewMedia: "/previews/calculator.webp",
      },
      {
        type: "project",
        id: "soul-fighter-memory",
        name: "Soul Fighter: Memory Game",
        icon: "/icons/memory.png",
        gradient: ["#6c5ce7", "#a29bfe"],
        summary:
          "Jogo da memória temático inspirado no universo Soul Fighter de League of Legends. Mecânica clássica de card-flip com assets oficiais do evento, lógica de matching em JavaScript vanilla e design responsivo fiel à identidade visual do game.",
        links: [
          {
            name: "Jogar Agora",
            url: "https://zastergun.github.io/Soul-Fighter-Memory-Game/",
          },
          {
            name: "Código Fonte",
            url: "https://github.com/zAstergun/Soul-Fighter-Memory-Game",
          },
        ],
        tags: ["JavaScript", "Game Dev", "CSS", "LoL"],
        previewMedia: "/previews/memory.webp",
      },
      {
        type: "project",
        id: "pex-wiki",
        name: "PEX Wiki",
        icon: "/icons/pex_wiki.png",
        gradient: ["#5865F2", "#7289DA"],
        summary:
          "Hub de conhecimento acadêmico para alunos de Ciência da Computação da Descomplica. Sistema de Views com roteamento SPA em Vanilla JS, design system 'Blurple Gamer' em dark mode, checklists interativos, modais dinâmicos para os 17 ODS da ONU e responsividade Mobile First.",
        links: [
          { name: "Visitar Wiki", url: "https://pex-wiki.vercel.app/" },
          {
            name: "Código Fonte",
            url: "https://github.com/Descomplica-TI/Pex-Wiki",
          },
        ],
        tags: ["Vanilla JS", "SPA", "Dark Mode", "Educação"],
        previewMedia: "/previews/pex.webp",
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
        previewMedia: "/previews/app-demo.gif",
      },
    ],
  },
];

/** Number of columns in the app grid */
export const GRID_COLS = 3;
