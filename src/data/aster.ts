// ─── Types ───────────────────────────────────────────────────

export const LANGUAGES = ["br", "en", "es", "jp", "cn", "kr", "vn", "id", "fr", "de", "it", "nl", "ru", "ar", "pt"] as const;
export type Language = typeof LANGUAGES[number];

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
  lang?: Language;
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
  lang?: Language;
}

/** A folder that contains child projects or links */
export interface FolderItem {
  type: "folder";
  id: string;
  name: string;
  icon: string;
  gradient: [string, string];
  children: ProjectItem[] | LinkItem[];
  lang?: Language;
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
  lang?: Language;
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

export function isImageIcon(icon: string): boolean {
  return (
    icon.startsWith("/") ||
    icon.includes(".png") ||
    icon.includes(".svg") ||
    icon.includes(".ico")
  );
}

// ─── Translation Dictionary ───────────────────────────────────

export type TranslationDict = {
  ui: {
    back: string;
    summary: string;
    homeButton: string;
    navigate: string;
    open: string;
    project: string;
    projects: string;
    booting: string;
    welcomeTitle: string;
    welcomeSubtitle: string;
    post: string;
    posts: string;
    lang: string;
    langs: string;
    cert: string;
    certs: string;
  };
  items: {
    sobreMimName: string;
    sobreMimSummary: string;
    blogName: string;
    blogProjName: string;
    blogProjSummary: string;
    certName: string;
    certProjName: string;
    certProjSummary: string;
    cvName: string;
    cvSummary: string;
    githubName: string;
    githubSummary: string;
    langName: string;
    frontName: string;
    calcName: string;
    calcSummary: string;
    calcLinkOpen: string;
    soulName: string;
    soulSummary: string;
    soulLinkPlay: string;
    pexName: string;
    pexSummary: string;
    pexLinkVisit: string;
    darkName: string;
    mobileName: string;
    demoName: string;
    demoSummary: string;
    tagStat: string;
    tagComp: string;
    tagCert: string;
    tagArch: string;
    btnSourceCode: string;
  };
};

// ─── Data ────────────────────────────────────────────────────

/**
 * Returns Home screen items for a specific language.
 */
export function getHomeItems(lang: Language, itemsText: TranslationDict["items"]): GridItem[] {

  const items: GridItem[] = [
    // ─── Row 1: Sobre Mim · Blog · Certificações ───
    {
      type: "app",
      id: "sobre-mim",
      name: itemsText.sobreMimName,
      icon: "👤",
      gradient: ["#6c63ff", "#a29bfe"],
      summary: itemsText.sobreMimSummary,
      links: [
        { title: "LinkedIn", url: "#", icon: "linkedin" },
        { title: "GitHub", url: "https://github.com/zAstergun", icon: "github" },
        { title: "Email", url: "mailto:contact@aster.dev", icon: "mail" },
      ],
      tags: ["Frontend", "Mobile", "UI/UX"],
      lang,
    },
    {
      type: "folder",
      id: "blog",
      name: itemsText.blogName,
      icon: "✍️",
      gradient: ["#11998e", "#38ef7d"],
      lang,
      children: [
        {
          type: "project",
          id: "blog-placeholder",
          name: itemsText.blogProjName,
          icon: "🚀",
          gradient: ["#4facfe", "#00f2fe"],
          summary: itemsText.blogProjSummary,
          links: [],
          tags: ["DevLog", itemsText.tagComp],
          lang,
        },
      ],
    },
    {
      type: "folder",
      id: "certificacoes",
      name: itemsText.certName,
      icon: "📜",
      gradient: ["#f5af19", "#f12711"],
      lang,
      children: [
        {
          type: "project",
          id: "cert-placeholder",
          name: itemsText.certProjName,
          icon: "🎓",
          gradient: ["#e6d082", "#987c22"],
          summary: itemsText.certProjSummary,
          links: [],
          tags: [itemsText.tagCert],
          lang,
        },
      ],
    },

    // ─── Row 2: Currículo · GitHub · Tradução ───
    {
      type: "app",
      id: "curriculo",
      name: itemsText.cvName,
      icon: "📄",
      gradient: ["#fd79a8", "#e84393"],
      summary: itemsText.cvSummary,
      links: [
        { title: "Download [PDF]", url: "/Currículo_Aster_Frontend.pdf", icon: "file-pdf" },
        { title: "Download [DOCX]", url: "/Currículo_Aster_Frontend.docx", icon: "file-word" },
        { title: "Download [Markdown]", url: "/Currículo_Aster_Frontend.md", icon: "file-text" },
        { title: "Download [JSON]", url: "/Currículo_Aster_Frontend.json", icon: "file-json" },
      ],
      tags: ["Frontend", "CV"],
      lang,
    },
    {
      type: "app",
      id: "github",
      name: itemsText.githubName,
      icon: "/icons/octocat.svg",
      gradient: ["#2d3436", "#636e72"],
      summary: itemsText.githubSummary,
      links: [
        { title: "GitHub", url: "https://github.com/zAstergun", icon: "github" },
        { title: "ORG: Descomplica TI", url: "https://github.com/Descomplica-TI", icon: "/emojis/descomplica_ti.ico" },
      ],
      tags: ["Open Source", itemsText.tagArch],
      lang,
    },
    {
      type: "folder",
      id: "idiomas",
      name: itemsText.langName,
      icon: "🌐",
      gradient: ["#667eea", "#764ba2"],
      lang,
      children: [
        { type: "link", id: "lang-br", name: "Português (BR)", icon: "🇧🇷", url: "/br/", gradient: ["#009c3b", "#ffdf00"], bgImage: "https://flagcdn.com/w160/br.png" },
        { type: "link", id: "lang-en", name: "English", icon: "🇬🇧", url: "/en/", gradient: ["#002868", "#bf0a30"], bgImage: "https://flagcdn.com/w160/gb.png" },
        { type: "link", id: "lang-es", name: "Español", icon: "🇪🇸", url: "/es/", gradient: ["#aa151b", "#f1bf00"], bgImage: "https://flagcdn.com/w160/es.png" },
        { type: "link", id: "lang-jp", name: "日本語", icon: "🇯🇵", url: "/jp/", gradient: ["#ffffff", "#bc002d"], bgImage: "https://flagcdn.com/w160/jp.png" },
        { type: "link", id: "lang-cn", name: "中文", icon: "🇨🇳", url: "/cn/", gradient: ["#ee1c25", "#ffff00"], bgImage: "https://flagcdn.com/w160/cn.png" },
        { type: "link", id: "lang-kr", name: "한국어", icon: "🇰🇷", url: "/kr/", gradient: ["#0047a0", "#cd2e3a"], bgImage: "https://flagcdn.com/w160/kr.png" },
        { type: "link", id: "lang-vn", name: "Tiếng Việt", icon: "🇻🇳", url: "/vn/", gradient: ["#da251d", "#ffff00"], bgImage: "https://flagcdn.com/w160/vn.png" },
        { type: "link", id: "lang-id", name: "Bahasa", icon: "🇮🇩", url: "/id/", gradient: ["#ff0000", "#ffffff"], bgImage: "https://flagcdn.com/w160/id.png" },
        { type: "link", id: "lang-fr", name: "Français", icon: "🇫🇷", url: "/fr/", gradient: ["#002395", "#ed2939"], bgImage: "https://flagcdn.com/w160/fr.png" },
        { type: "link", id: "lang-de", name: "Deutsch", icon: "🇩🇪", url: "/de/", gradient: ["#000000", "#ffce00"], bgImage: "https://flagcdn.com/w160/de.png" },
        { type: "link", id: "lang-it", name: "Italiano", icon: "🇮🇹", url: "/it/", gradient: ["#009246", "#ce2b37"], bgImage: "https://flagcdn.com/w160/it.png" },
        { type: "link", id: "lang-nl", name: "Nederlands", icon: "🇳🇱", url: "/nl/", gradient: ["#ae1c28", "#21468b"], bgImage: "https://flagcdn.com/w160/nl.png" },
        { type: "link", id: "lang-ru", name: "Русский", icon: "🇷🇺", url: "/ru/", gradient: ["#ffffff", "#d52b1e"], bgImage: "https://flagcdn.com/w160/ru.png" },
        { type: "link", id: "lang-ar", name: "العربية", icon: "🇸🇦", url: "/ar/", gradient: ["#006c35", "#ffffff"], bgImage: "https://flagcdn.com/w160/sa.png" },
        { type: "link", id: "lang-pt", name: "Português (PT)", icon: "🇵🇹", url: "/pt/", gradient: ["#ff0000", "#006600"], bgImage: "https://flagcdn.com/w160/pt.png" },
      ],
    },

    // ─── Row 3: Frontend · Dark Mode · Mobile ───
    {
      type: "folder",
      id: "frontend",
      name: itemsText.frontName,
      icon: "🖥️",
      gradient: ["#0984e3", "#74b9ff"],
      lang,
      children: [
        {
          type: "project",
          id: "ideal-calculator",
          name: itemsText.calcName,
          icon: "/icons/calculator.svg",
          gradient: ["#0b0a0a", "#121214"],
          summary: itemsText.calcSummary,
          links: [
            { title: itemsText.calcLinkOpen, url: "https://idealcalc.app/", icon: "external-link" },
            { title: itemsText.btnSourceCode, url: "https://github.com/zAstergun/ideal-calculator", icon: "file-code" },
          ],
          tags: ["JavaScript", itemsText.tagStat, "UI/UX"],
          previewMedia: "/previews/calculator.webp",
          lang,
        },
        {
          type: "project",
          id: "soul-fighter-memory",
          name: itemsText.soulName,
          icon: "/icons/memory.png",
          gradient: ["#6c5ce7", "#a29bfe"],
          summary: itemsText.soulSummary,
          links: [
            { title: itemsText.soulLinkPlay, url: "https://zastergun.github.io/Soul-Fighter-Memory-Game/", icon: "play" },
            { title: itemsText.btnSourceCode, url: "https://github.com/zAstergun/Soul-Fighter-Memory-Game", icon: "file-code" },
          ],
          tags: ["JavaScript", "Game Dev"],
          previewMedia: "/previews/memory.webp",
          lang,
        },
        {
          type: "project",
          id: "pex-wiki",
          name: itemsText.pexName,
          icon: "/icons/pex_wiki.png",
          gradient: ["#5865F2", "#7289DA"],
          summary: itemsText.pexSummary,
          links: [
            { title: itemsText.pexLinkVisit, url: "https://pex-wiki.vercel.app/", icon: "external-link" },
            { title: itemsText.btnSourceCode, url: "https://github.com/zAstergun/pex-wiki", icon: "file-code" },
          ],
          tags: ["Vanilla JS", "SPA"],
          previewMedia: "/previews/pex.webp",
          lang,
        },
      ],
    },
    {
      type: "app",
      id: "dark-mode",
      name: itemsText.darkName,
      icon: "🌙",
      gradient: ["#232526", "#414345"],
      summary: "",
      links: [],
      tags: [],
      lang,
    },
    {
      type: "folder",
      id: "mobile",
      name: itemsText.mobileName,
      icon: "📱",
      gradient: ["#00b894", "#55efc4"],
      lang,
      children: [
        {
          type: "project",
          id: "app-mobile-demo",
          name: itemsText.demoName,
          icon: "🚀",
          gradient: ["#e17055", "#fab1a0"],
          summary: itemsText.demoSummary,
          links: [
            { title: "Demo", url: "#", icon: "play" },
            { title: itemsText.btnSourceCode, url: "https://github.com/zAstergun/app-mobile-demo", icon: "file-code" },
          ],
          tags: ["React Native"],
          previewMedia: "/previews/app-demo.gif",
          lang,
        },
      ],
    },
  ];

  return items;
}

/** Number of columns in the app grid */
export const GRID_COLS = 3;
