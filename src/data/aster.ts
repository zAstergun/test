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
  bgImage?: string;
}

/** A folder that contains child projects or links */
export interface FolderItem {
  type: "folder";
  id: string;
  name: string;
  icon: string;
  gradient: [string, string];
  children: ProjectItem[] | LinkItem[];
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
  title: string;
  url: string;
  icon?: string;
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
  // ─── Row 1: Sobre Mim · Blog · Certificações ───
  {
    type: "app",
    id: "sobre-mim",
    name: "Sobre Mim",
    icon: "👤",
    gradient: ["#6c63ff", "#a29bfe"],
    summary:
      "Sou o Douglas, Desenvolvedor Frontend focado em criar interfaces performáticas e arquiteturas limpas. Atualmente no 5º semestre de Ciência da Computação no Centro Universitário União das Américas - UniAmérica, divido meu tempo entre o código e a liderança de uma comunidade técnica acadêmica, onde orquestro projetos colaborativos e auxilio no nivelamento de outros estudantes.\n\n" +
      "Meu interesse por programação não começou na teoria, mas dissecando sistemas na prática. A porta de entrada foi a configuração de servidores de jogos online e a engenharia reversa para a criação de cheats. Essa exploração me forçou a entender desde cedo como a memória de uma máquina funciona, como interceptar fluxos de dados e como a lógica de um sistema opera em baixo nível. Hoje, canalizo essa mesma curiosidade analítica para construir aplicações web seguras e robustas.\n\n" +
      "Fora dos repositórios, mantenho a mente afiada estudando Mandarim e analisando cenários competitivos de e-sports. Para sustentar esse nível de exigência técnica, aplico uma disciplina inegociável na vida real: treino intensamente com a meta de completar um triathlon Ironman. É essa combinação de consistência, resolução de problemas complexos e execução pragmática que entrego na engenharia de software.",
    links: [
      { title: "LinkedIn", url: "#", icon: "linkedin" },
      { title: "GitHub", url: "https://github.com/zAstergun", icon: "github" },
      { title: "Email", url: "mailto:contact@aster.dev", icon: "mail" },
    ],
    tags: ["Frontend", "Mobile", "UI/UX"],
  },
  {
    type: "folder",
    id: "blog",
    name: "Blog",
    icon: "✍️",
    gradient: ["#11998e", "#38ef7d"],
    children: [
      {
        type: "project",
        id: "blog-placeholder",
        name: "Hackathons & Projetos",
        icon: "🚀",
        gradient: ["#4facfe", "#00f2fe"],
        summary:
          "Aqui documentarei meus aprendizados, participações em Hackathons, desafios de código e projetos em grupo. A ideia é mostrar não só o código final, mas o processo de engenharia.",
        links: [],
        tags: ["DevLog", "Competição"],
      },
    ],
  },
  {
    type: "folder",
    id: "certificacoes",
    name: "Certificações",
    icon: "📜",
    gradient: ["#f5af19", "#f12711"],
    children: [
      {
        type: "project",
        id: "cert-placeholder",
        name: "Em Breve",
        icon: "🎓",
        gradient: ["#e6d082", "#987c22"],
        summary:
          "Espaço reservado para as futuras certificações oficiais e diplomas técnicos.",
        links: [],
        tags: ["Certificação"],
      },
    ],
  },

  // ─── Row 2: Currículo · GitHub · Tradução ───
  {
    type: "app",
    id: "curriculo",
    name: "Currículo",
    icon: "📄",
    gradient: ["#fd79a8", "#e84393"],
    summary:
      "--- RESUMO PROFISSIONAL ---\n" +
      "Desenvolvedor Frontend focado em performance, escalabilidade e arquitetura de sistemas. Atualmente no 5º semestre de Ciência da Computação, com experiência prática na liderança de comunidades técnicas e gestão de projetos colaborativos.\n\n" +
      "--- FORMAÇÃO E COMUNIDADE ---\n" +
      "Ciência da Computação – UniAmérica (5º Semestre).\n" +
      "Liderança Técnica: Fundador de comunidade acadêmica com foco em mentoria e governança de projetos no GitHub.\n\n" +
      "--- STACK TÉCNICA ---\n" +
      "Frontend: React.js, Next.js, Vue.js, Astro, JavaScript (ES6+), Tailwind CSS, Bootstrap.\n" +
      "Back & Infra: Node.js, SQL, Vercel, Cloudflare, Git/GitHub.\n" +
      "Mobile & Outros: Flutter, Dart, C++.\n" +
      "Produtividade: Notion, Obsidian.\n\n" +
      "--- DIFERENCIAIS ---\n" +
      "Organização e Fluxo: Especialista em estruturação de fluxos de trabalho e documentação utilizando Notion e Obsidian (PKM).\n" +
      "Idiomas: Inglês Avançado; Mandarim e Japonês (Em aprendizado).",
    links: [
      { title: "Download [PDF]", url: "/Currículo_Douglas_Frontend.pdf", icon: "file-pdf" },
      { title: "Download [DOCX]", url: "/Currículo_Douglas_Frontend.docx", icon: "file-word" },
      { title: "Download [Markdown]", url: "/Currículo_Douglas_Frontend.md", icon: "file-text" },
      { title: "Download [JSON]", url: "/Currículo_Douglas_Frontend.json", icon: "file-code" },
    ],
    tags: ["Frontend", "CV", "Douglas"],
  },
  {
    type: "app",
    id: "github",
    name: "GitHub",
    icon: "/icons/octocat.svg",
    gradient: ["#2d3436", "#636e72"],
    summary:
      "Este é o meu Hub de Engenharia e Colaboração. Mais do que um repositório de arquivos, este espaço centraliza minha atuação em diferentes ecossistemas técnicos, onde aplico padrões de arquitetura e liderança de projetos.\n\n" +
      "--- 👤 PERFIL PESSOAL ---\n" +
      "Foco em experimentação de novas stacks (React, Astro, Tailwind), ferramentas utilitárias e o desenvolvimento core deste portfólio.\n\n" +
      "--- 🏢 ORGANIZAÇÕES E COMUNIDADES ---\n" +
      "• Centro Universitário União das Américas - UniAmérica (Liderança Técnica): Atuo na coordenação dos repositórios de projetos de extensão (PEX). Minha missão é garantir a padronização das Wikis de documentação, revisar Pull Requests e mentorar outros estudantes na organização do código.\n" +
      "• [Nome de Outra Org]: Espaço reservado para futuras parcerias e contribuições em projetos Open Source.",
    links: [
      {
        title: "Meu GitHub Principal",
        url: "https://github.com/zastergun",
        icon: "github",
      },
      {
        title: "Org. Projetos Acadêmicos",
        url: "https://github.com/Descomplica-TI",
        icon: "users",
      },
    ],
    tags: ["Open Source", "Código Limpo", "Boas Práticas"],
  },
  {
    type: "folder",
    id: "idiomas",
    name: "Tradução",
    icon: "🌐",
    gradient: ["#667eea", "#764ba2"],
    children: [
      {
        type: "link",
        id: "lang-br",
        name: "Português (BR)",
        icon: "🇧🇷",
        url: "#br",
        gradient: ["#009c3b", "#ffdf00"],
        bgImage: "https://flagcdn.com/w160/br.png"
      },
      {
        type: "link",
        id: "lang-pt",
        name: "Português",
        icon: "🇵🇹",
        url: "#pt",
        gradient: ["#009c3b", "#ffdf00"],
        bgImage: "https://flagcdn.com/w160/pt.png"
      },
      {
        type: "link",
        id: "lang-en",
        name: "English",
        icon: "🇬🇧",
        url: "#en",
        gradient: ["#002868", "#bf0a30"],
        bgImage: "https://flagcdn.com/w160/gb.png"
      },
      {
        type: "link",
        id: "lang-es",
        name: "Español",
        icon: "🇪🇸",
        url: "#es",
        gradient: ["#aa151b", "#f1bf00"],
        bgImage: "https://flagcdn.com/w160/es.png"
      },
      {
        type: "link",
        id: "lang-ja",
        name: "日本語",
        icon: "🇯🇵",
        url: "#ja",
        gradient: ["#ffffff", "#bc002d"],
        bgImage: "https://flagcdn.com/w160/jp.png"
      },
      {
        type: "link",
        id: "lang-zh",
        name: "中文",
        icon: "🇨🇳",
        url: "#zh",
        gradient: ["#ee1c25", "#ffff00"],
        bgImage: "https://flagcdn.com/w160/cn.png"
      },
      {
        type: "link",
        id: "lang-ko",
        name: "한국어",
        icon: "🇰🇷",
        url: "#ko",
        gradient: ["#0047a0", "#cd2e3a"],
        bgImage: "https://flagcdn.com/w160/kr.png"
      },
      {
        type: "link",
        id: "lang-vi",
        name: "Tiếng Việt",
        icon: "🇻🇳",
        url: "#vi",
        gradient: ["#da251d", "#ffff00"],
        bgImage: "https://flagcdn.com/w160/vn.png"
      },
      {
        type: "link",
        id: "lang-id",
        name: "Bahasa",
        icon: "🇮🇩",
        url: "#id",
        gradient: ["#ff0000", "#ffffff"],
        bgImage: "https://flagcdn.com/w160/id.png"
      },
      {
        type: "link",
        id: "lang-fr",
        name: "Français",
        icon: "🇫🇷",
        url: "#fr",
        gradient: ["#002395", "#ed2939"],
        bgImage: "https://flagcdn.com/w160/fr.png"
      },
      {
        type: "link",
        id: "lang-de",
        name: "Deutsch",
        icon: "🇩🇪",
        url: "#de",
        gradient: ["#000000", "#ffce00"],
        bgImage: "https://flagcdn.com/w160/de.png"
      },
      {
        type: "link",
        id: "lang-it",
        name: "Italiano",
        icon: "🇮🇹",
        url: "#it",
        gradient: ["#009246", "#ce2b37"],
        bgImage: "https://flagcdn.com/w160/it.png"
      },
      {
        type: "link",
        id: "lang-nl",
        name: "Nederlands",
        icon: "🇳🇱",
        url: "#nl",
        gradient: ["#ae1c28", "#21468b"],
        bgImage: "https://flagcdn.com/w160/nl.png"
      },
      {
        type: "link",
        id: "lang-ru",
        name: "Русский",
        icon: "🇷🇺",
        url: "#ru",
        gradient: ["#ffffff", "#d52b1e"],
        bgImage: "https://flagcdn.com/w160/ru.png"
      },
      {
        type: "link",
        id: "lang-ar",
        name: "العربية",
        icon: "🇸🇦",
        url: "#ar",
        gradient: ["#006c35", "#ffffff"],
        bgImage: "https://flagcdn.com/w160/sa.png"
      },
    ],
  },

  // ─── Row 3: Frontend · Dark Mode · Mobile ───
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
          { title: "Abrir App", url: "https://idealcalc.app/", icon: "external-link" },
          {
            title: "Código Fonte",
            url: "https://github.com/zAstergun/Ideal-Calculator",
            icon: "github",
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
            title: "Jogar Agora",
            url: "https://zastergun.github.io/Soul-Fighter-Memory-Game/",
            icon: "play",
          },
          {
            title: "Código Fonte",
            url: "https://github.com/zAstergun/Soul-Fighter-Memory-Game",
            icon: "github",
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
          "Hub de conhecimento acadêmico para alunos de Ciência da Computação do Centro Universitário União das Américas - UniAmérica. Sistema de Views com roteamento SPA em Vanilla JS, design system 'Blurple Gamer' em dark mode, checklists interativos, modais dinâmicos para os 17 ODS da ONU e responsividade Mobile First.",
        links: [
          { title: "Visitar Wiki", url: "https://pex-wiki.vercel.app/", icon: "external-link" },
          {
            title: "Código Fonte",
            url: "https://github.com/Descomplica-TI/Pex-Wiki",
            icon: "github",
          },
        ],
        tags: ["Vanilla JS", "SPA", "Dark Mode", "Educação"],
        previewMedia: "/previews/pex.webp",
      },
    ],
  },
  {
    type: "app",
    id: "dark-mode",
    name: "Dark Mode",
    icon: "🌙",
    gradient: ["#232526", "#414345"],
    summary: "",
    links: [],
    tags: [],
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
        links: [{ title: "Ver Demo", url: "#", icon: "play" }],
        tags: ["React Native", "Expo", "Mobile"],
        previewMedia: "/previews/app-demo.gif",
      },
    ],
  },
];

/** Number of columns in the app grid */
export const GRID_COLS = 3;
