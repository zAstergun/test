import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HOME_ITEMS,
  GRID_COLS,
  isDetailable,
  isFolder,
  isLink,
  isImageIcon,
  type GridItem,
  type DetailableItem,
  type FolderItem,
} from "./data/aster";

// ─── Helpers ─────────────────────────────────────────────────

/** Clamp index within valid bounds — never returns < 0 or >= total */
function clampIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(index, total - 1));
}

/** Update dark mode item with dynamic icon and name based on current theme */
function getDarkModeItem(item: GridItem, isDark: boolean): GridItem {
  if (item.id === 'dark-mode') {
    return {
      ...item,
      name: isDark ? 'Light Mode' : 'Dark Mode',
      icon: isDark ? '☀️' : '🌙',
      gradient: isDark ? ['#f6d365', '#fda085'] : item.gradient,
    };
  }
  return item;
}

/** Hook: live clock string for the status bar */
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

/** Hook: detect if viewport matches `md` breakpoint (768px) */
function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

// ─── Sub-components ──────────────────────────────────────────

function StatusBar({ time, isDark }: { time: string; isDark: boolean }) {
  return (
    <div className={`status-bar flex items-center justify-between px-6 py-2 relative z-10 transition-colors duration-500 ${isDark ? 'bg-stone-900/80' : 'bg-aster-beige/80'}`}>
      <span className={`text-xs font-semibold tracking-wide transition-colors duration-500 ${isDark ? 'text-stone-100' : 'text-aster-dark'}`}>
        {time}
      </span>
      <div className="flex items-center gap-1.5">
        <div className={`w-4 h-2.5 border rounded-sm relative transition-colors duration-500 ${isDark ? 'border-stone-400' : 'border-aster-dark/60'}`}>
          <div className={`absolute inset-[1px] right-[2px] rounded-[1px] transition-colors duration-500 ${isDark ? 'bg-stone-400' : 'bg-aster-dark/70'}`} />
        </div>
      </div>
    </div>
  );
}

function GridIcon({
  item,
  isFocused,
  onClick,
  onHover,
  isDark,
}: {
  item: GridItem;
  isFocused: boolean;
  onClick: (e: React.MouseEvent) => void;
  onHover: () => void;
  isDark: boolean;
}) {
  const isFolder_ = item.type === "folder";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => {
        onHover();
        if ('previewMedia' in item && item.previewMedia) {
          const img = new Image();
          img.src = item.previewMedia as string;
        }
      }}
      className={`app-icon relative flex flex-col items-center gap-2 p-2 rounded-2xl transition-all duration-200 cursor-pointer ${
        isFocused ? "focused" : ""
      }`}
      aria-label={
        isFolder_
          ? `Abrir pasta ${item.name}`
          : item.type === "link"
          ? `Abrir ${item.name}`
          : `Ver ${item.name}`
      }
      aria-haspopup={isFolder_ ? "true" : undefined}
      aria-expanded={isFolder_ ? "false" : undefined}
    >
      {/* Focus ring — asymmetric inset to balance the 5px cel-shading shadow */}
      {isFocused && (
        <div className="hidden md:block absolute -top-[3px] -left-[3px] -bottom-[8px] -right-[8px] rounded-2xl border-2 border-aster-accent/60 animate-pulse-glow pointer-events-none" />
      )}

      {/* Icon */}
      <div
        className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${
          isFocused ? "shadow-cel scale-105" : "shadow-md hover:shadow-cel-sm"
        }`}
        style={{
          background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`,
        }}
      >
        {isImageIcon(item.icon) ? (
          <img
            src={item.icon}
            alt={item.name}
            className="w-full h-full object-cover rounded-2xl drop-shadow-sm"
          />
        ) : (
          <span className="drop-shadow-sm select-none">{item.icon}</span>
        )}

        {/* Folder badge */}
        {isFolder_ && (
          <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-aster-beige border-2 border-white shadow-sm flex items-center justify-center text-[9px]">
            📂
          </span>
        )}
      </div>

      {/* Label */}
      <span
        className={`text-[11px] font-medium leading-tight text-center max-w-[72px] truncate transition-colors duration-500 ${
          isFocused
            ? (isDark ? "text-stone-100 font-semibold" : "text-aster-dark font-semibold")
            : (isDark ? "text-stone-400" : "text-aster-dark/70")
        }`}
      >
        {item.name}
      </span>
    </button>
  );
}

function PreviewVisual({
  src,
  alt,
  isDesktop,
  isClosing,
}: {
  src: string;
  alt: string;
  isDesktop: boolean;
  isClosing?: boolean;
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isClosing) {
      // Eager unmount: destroy media DOM the millisecond closing starts
      setShouldRender(false);
      setLoaded(false);
    } else {
      // Lazy mount: only create media after entry animation finishes (450ms)
      const timer = setTimeout(() => setShouldRender(true), 450);
      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  return (
    <div
      className={`relative overflow-hidden w-full flex justify-center items-center bg-aster-dark/[0.04] ${
        isDesktop
          ? "rounded-2xl mt-8"
          : "rounded-2xl border border-aster-dark/10 mt-8 mx-0"
      }`}
      style={{ transform: "translateZ(0)" }} // Force isolated hardware-accelerated layer
    >
      {shouldRender && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto max-h-[500px] object-contain transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
        />
      )}
    </div>
  );
}

function DetailPanel({
  item,
  onClose,
  isDesktop,
  isClosing,
  onAnimationEnd,
  origin,
  isDark,
}: {
  item: DetailableItem;
  onClose: () => void;
  isDesktop: boolean;
  isClosing?: boolean;
  onAnimationEnd?: () => void;
  origin?: { x: string; y: string };
  isDark?: boolean;
}) {
  const animClass = isClosing ? "animate-ipadAppClose" : "animate-ipadAppOpen";
  const panelBg = isDark ? 'bg-stone-900' : 'bg-aster-beige';
  const panelText = isDark ? 'text-stone-100' : 'text-aster-dark';
  const panelFaint = isDark ? 'text-stone-500' : 'text-aster-dark/40';

  const containerClass = isDesktop
    ? `detail-panel-desktop absolute inset-0 z-20 flex flex-col ${panelBg} overflow-hidden ${animClass} transition-colors duration-500`
    : `detail-panel absolute inset-0 z-30 ${panelBg} flex flex-col ${animClass} transition-colors duration-500`;

  return (
    <div
      className={containerClass}
      style={{
        willChange: 'transform, opacity',
        transformOrigin: origin ? `${origin.x} ${origin.y}` : '50% 50%',
      }}
      key={item.id}
      onAnimationEnd={onAnimationEnd}
    >
      {/* Body — unified scroll area with title at top */}
      <div
        className={`flex-1 overflow-y-auto ${isDesktop ? "ipad-content-reveal" : ""} ${
          isDesktop ? "px-20 py-10" : "px-6 py-8"
        }`}
      >
        {/* Back button (mobile only) */}
        {!isDesktop && (
          <button
            type="button"
            onClick={onClose}
            className={`mb-6 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 cursor-pointer ${isDark ? 'bg-stone-600 text-stone-300 hover:bg-stone-600' : 'bg-aster-dark/10 text-aster-dark/60 hover:bg-aster-dark/20'}`}
            aria-label="Voltar"
          >
            ←
          </button>
        )}

        {/* Icon */}
        <div
          className="relative w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-md shrink-0 mb-6"
          style={{
            background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`,
          }}
        >
          {isImageIcon(item.icon) ? (
            <img
              src={item.icon}
              alt={item.name}
              className="w-full h-full object-cover rounded-[2rem] drop-shadow-sm"
            />
          ) : (
            <span className="text-5xl drop-shadow-sm select-none">
              {item.icon}
            </span>
          )}
        </div>

        {/* Name */}
        <h2
          className={`font-bold leading-tight transition-colors duration-500 ${panelText} ${
            isDesktop ? "text-3xl mb-4" : "text-2xl mb-4"
          }`}
        >
          {item.name}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`tag-chip transition-colors duration-500 ${isDark ? 'bg-stone-700 text-stone-400' : 'bg-aster-dark/[0.07] text-aster-dark/60'}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 transition-colors duration-500 ${panelFaint}`}>
          Sobre
        </h3>
        <p
          className={`leading-relaxed text-justify transition-colors duration-500 ${isDark ? 'text-stone-300' : 'text-aster-dark/80'} ${
            isDesktop ? "text-base mb-0" : "text-sm mb-8"
          }`}
        >
          {item.summary}
        </p>

        {/* Preview Visual — desktop */}
        {isDesktop && item.previewMedia && (
          <>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 mt-8 transition-colors duration-500 ${panelFaint}`}>
              Preview
            </h3>
            <PreviewVisual
              src={item.previewMedia}
              alt={`Preview de ${item.name}`}
              isDesktop={isDesktop}
              isClosing={isClosing}
            />
          </>
        )}

        <h3
          className={`text-xs font-bold uppercase tracking-widest mb-4 transition-colors duration-500 ${panelFaint} ${
            isDesktop ? "mt-10" : "mt-2"
          }`}
        >
          Links
        </h3>
        <div
          className={`flex flex-col gap-2.5 ${
            isDesktop ? "max-w-lg" : ""
          }`}
        >
          {item.links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border transition-colors duration-500 group ${isDark ? 'bg-stone-700/60 border-stone-600 hover:bg-stone-700' : 'bg-aster-beige-dark/60 border-aster-dark/[0.08] hover:bg-aster-beige-dark'}`}
            >
              <span className="text-base">🔗</span>
              <span className={`text-sm font-medium group-hover:text-aster-accent transition-colors duration-500 ${isDark ? 'text-stone-300' : 'text-aster-dark/80'}`}>
                {link.name}
              </span>
              <span className={`ml-auto group-hover:text-aster-accent transition-colors duration-500 text-xs ${isDark ? 'text-stone-600' : 'text-aster-dark/30'}`}>
                →
              </span>
            </a>
          ))}
        </div>

        {/* Preview Visual — mobile */}
        {!isDesktop && item.previewMedia && (
          <>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 mt-8 transition-colors duration-500 ${panelFaint}`}>
              Preview
            </h3>
            <PreviewVisual
              src={item.previewMedia}
              alt={`Preview de ${item.name}`}
              isDesktop={isDesktop}
              isClosing={isClosing}
            />
          </>
        )}
      </div>

      {/* Divisória minimalista */}
      <div className={`w-full ${isDesktop ? 'px-12 pt-6' : 'px-6 pt-2 pb-3'} shrink-0 transition-colors duration-500 ${panelBg}`}>
        <div className={`w-full h-[1px] transition-colors duration-500 ${isDark ? 'bg-stone-700' : 'bg-aster-dark/[0.08]'}`} />
      </div>

      {/* iPad physical home button (desktop) */}
      {isDesktop && (
        <div className={`relative flex justify-center py-5 transition-colors duration-500 ${panelBg}`}>
          {/* Textura inferior (Bevel/Gradient) */}
          <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${isDark ? 'bg-gradient-to-t from-black/80 to-transparent' : 'bg-gradient-to-t from-black/10 to-transparent'}`} />
          
          <button
            type="button"
            onClick={onClose}
            className={`home-btn relative z-10 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${isDark ? 'bg-stone-900/50 border border-stone-700 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] hover:bg-stone-800' : 'bg-black/[0.02] border border-aster-dark/10 shadow-[inset_0_3px_6px_rgba(0,0,0,0.08)] hover:bg-black/[0.04]'}`}
            aria-label="Botão Home — fechar app"
          >
          </button>
        </div>
      )}

      {/* Bottom safe area with texture (mobile) */}
      {!isDesktop && (
        <div className={`relative h-20 w-full transition-colors duration-500 ${panelBg}`}>
          {/* Textura inferior (Bevel/Gradient) */}
          <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${isDark ? 'bg-gradient-to-t from-black/80 to-transparent' : 'bg-gradient-to-t from-black/10 to-transparent'}`} />
        </div>
      )}
    </div>
  );
}

function HomeButton({ onClick, isDark }: { onClick: () => void; isDark: boolean }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-5 pt-3 pointer-events-none">
      <button
        type="button"
        onClick={onClick}
        className={`home-btn pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${isDark ? 'bg-stone-900/80 border border-stone-700 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] hover:bg-stone-800' : 'bg-aster-beige-dark/80 border border-aster-dark/10 shadow-[inset_0_3px_6px_rgba(0,0,0,0.08)] backdrop-blur-sm hover:bg-aster-beige-dark'}`}
        aria-label="Botão Home — fechar app"
      >
      </button>
    </div>
  );
}

function KeyHint({ isDesktop, isDark }: { isDesktop: boolean; isDark: boolean }) {
  if (!isDesktop) return null;
  return (
    <div className="flex items-center justify-center gap-3 py-2 animate-fade-in">
      <div className="flex gap-1">
        {["W", "A", "S", "D"].map((key) => (
          <kbd
            key={key}
            className={`w-5 h-5 rounded text-[9px] font-mono font-bold flex items-center justify-center border transition-colors duration-500 ${isDark ? 'bg-stone-700 text-stone-400 border-stone-600' : 'bg-aster-dark/[0.08] text-aster-dark/40 border-aster-dark/10'}`}
          >
            {key}
          </kbd>
        ))}
      </div>
      <span className={`text-[9px] font-medium transition-colors duration-500 ${isDark ? 'text-stone-500' : 'text-aster-dark/30'}`}>
        navegar
      </span>
      <kbd className={`px-2 h-5 rounded text-[9px] font-mono font-bold flex items-center justify-center border transition-colors duration-500 ${isDark ? 'bg-stone-700 text-stone-400 border-stone-600' : 'bg-aster-dark/[0.08] text-aster-dark/40 border-aster-dark/10'}`}>
        Enter
      </kbd>
      <span className={`text-[9px] font-medium transition-colors duration-500 ${isDark ? 'text-stone-500' : 'text-aster-dark/30'}`}>abrir</span>
    </div>
  );
}

function SplashScreen({ isBooting }: { isBooting: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-aster-beige flex flex-col items-center justify-center transition-opacity duration-1000 ${
        isBooting ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <span className="text-5xl text-aster-dark select-none mb-6">✦</span>
      <div className="w-5 h-5 border-[3px] border-aster-dark/20 border-t-aster-dark rounded-full animate-spin" />
    </div>
  );
}

function FolderHeader({
  folder,
  onBack,
  isDark,
}: {
  folder: FolderItem;
  onBack: () => void;
  isDark: boolean;
}) {
  return (
    <div className="flex items-center gap-2 px-5 pt-4 pb-2">
      <button
        type="button"
        onClick={onBack}
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-500 cursor-pointer text-sm ${isDark ? 'bg-stone-700 text-stone-400 hover:bg-stone-600' : 'bg-aster-dark/[0.06] text-aster-dark/50 hover:bg-aster-dark/10'}`}
        aria-label="Voltar para Home"
      >
        ←
      </button>
      {isImageIcon(folder.icon) ? (
        <img
          src={folder.icon}
          alt={folder.name}
          className="w-5 h-5 object-contain"
        />
      ) : (
        <span className="text-sm">{folder.icon}</span>
      )}
      <h2 className={`text-sm font-bold tracking-tight transition-colors duration-500 ${isDark ? 'text-stone-100' : 'text-aster-dark'}`}>
        {folder.name}
      </h2>
      <span className={`text-[10px] font-medium ml-auto transition-colors duration-500 ${isDark ? 'text-stone-500' : 'text-aster-dark/30'}`}>
        {folder.children.length}{" "}
        {folder.children.length === 1 ? "projeto" : "projetos"}
      </span>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // ─── Boot Experience ────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);
  const [selectedDetail, setSelectedDetail] = useState<DetailableItem | null>(
    null
  );
  const [isClosing, setIsClosing] = useState(false);
  const [openFolder, setOpenFolder] = useState<FolderItem | null>(null);
  const [appOrigin, setAppOrigin] = useState({ x: "50%", y: "50%" });
  const [isDark, setIsDark] = useState(false);
  const time = useClockTime();
  const isDesktop = useIsDesktop();

  // ─── Theme helpers ────────────────────────────────────────
  const bg = isDark ? 'bg-stone-900' : 'bg-aster-beige';
  const text = isDark ? 'text-stone-100' : 'text-aster-dark';
  const textFaint = isDark ? 'text-stone-500' : 'text-aster-dark/40';

  // ─── Deep Linking ──────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const appId = params.get("app");

    if (appId) {
      let foundItem: DetailableItem | null = null;
      let parentFolder: FolderItem | null = null;
      let foundIndex = 0;

      for (let i = 0; i < HOME_ITEMS.length; i++) {
        const item = HOME_ITEMS[i];
        if (item.id === appId && isDetailable(item)) {
          foundItem = item;
          foundIndex = i;
          break;
        }
        if (isFolder(item)) {
          const childIndex = item.children.findIndex((c) => c.id === appId);
          if (childIndex !== -1) {
            const child = item.children[childIndex];
            if (isDetailable(child)) {
              foundItem = child as DetailableItem;
              parentFolder = item;
              foundIndex = childIndex;
              break;
            }
          }
        }
      }

      if (foundItem) {
        if (parentFolder) {
          setOpenFolder(parentFolder);
        }
        setFocusedIndex(foundIndex);
        setSelectedDetail(foundItem);
      }
    }
  }, []);


  /** Items currently visible in the phone grid */
  const currentItems: GridItem[] = useMemo(
    () => (openFolder ? openFolder.children : HOME_ITEMS),
    [openFolder]
  );

  /** Clamped index — always safe for the current grid */
  const safeFocusedIndex = useMemo(
    () => clampIndex(focusedIndex, currentItems.length),
    [focusedIndex, currentItems.length]
  );

  // ─── Actions ───────────────────────────────────────────────

  const goHome = useCallback(() => {
    setOpenFolder(null);
    setFocusedIndex(0);
  }, []);

  const goBackFromFolder = useCallback(() => {
    setOpenFolder(null);
    setFocusedIndex(0);
  }, []);

  const closeDetail = useCallback(() => {
    setIsClosing(true);
    // Limpa o parâmetro da URL silenciosamente sem recarregar a página
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  const activateItem = useCallback(
    (item: GridItem, index: number, e?: React.MouseEvent) => {
      setFocusedIndex(index);

      // ─── Dark Mode toggle — never opens a detail panel ───
      if (item.id === 'dark-mode') {
        setIsDark(prev => !prev);
        return;
      }

      if (isLink(item)) {
        window.open(item.url, "_blank", "noopener,noreferrer");
        return;
      }
      if (isFolder(item)) {
        setOpenFolder(item);
        setSelectedDetail(null);
        setFocusedIndex(0);
        return;
      }
      if (isDetailable(item)) {
        // Calculate transform origin from the clicked icon's centre
        if (e && e.currentTarget) {
          const rect = e.currentTarget.getBoundingClientRect();
          setAppOrigin({
            x: `${rect.left + rect.width / 2}px`,
            y: `${rect.top + rect.height / 2}px`,
          });
        } else {
          setAppOrigin({ x: "50%", y: "50%" });
        }

        // Toggle with animation: if already open, trigger close animation
        setSelectedDetail((prev) => {
          if (prev && prev.id === item.id) {
            setIsClosing(true);
            return prev; // keep prev so DetailPanel stays mounted during animation
          }
          return item;
        });
      }
    },
    []
  );

  // ─── Keyboard Navigation ──────────────────────────────────

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Detail open on mobile — only Escape closes
      if (selectedDetail && !isDesktop) {
        if (e.key === "Escape" || e.key === "Backspace") {
          e.preventDefault();
          closeDetail();
        }
        return;
      }

      // Detail open on desktop — Escape closes detail
      if (selectedDetail && isDesktop) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeDetail();
          return;
        }
        // On desktop, allow grid nav even with detail open
      }

      const total = currentItems.length;
      const cols = GRID_COLS;

      const keyActions: Record<string, () => void> = {
        ArrowRight: () => setFocusedIndex((i) => clampIndex(i + 1, total)),
        d: () => setFocusedIndex((i) => clampIndex(i + 1, total)),
        D: () => setFocusedIndex((i) => clampIndex(i + 1, total)),

        ArrowLeft: () => setFocusedIndex((i) => clampIndex(i - 1, total)),
        a: () => setFocusedIndex((i) => clampIndex(i - 1, total)),
        A: () => setFocusedIndex((i) => clampIndex(i - 1, total)),

        ArrowDown: () =>
          setFocusedIndex((i) => clampIndex(i + cols, total)),
        s: () => setFocusedIndex((i) => clampIndex(i + cols, total)),
        S: () => setFocusedIndex((i) => clampIndex(i + cols, total)),

        ArrowUp: () =>
          setFocusedIndex((i) => clampIndex(i - cols, total)),
        w: () => setFocusedIndex((i) => clampIndex(i - cols, total)),
        W: () => setFocusedIndex((i) => clampIndex(i - cols, total)),

        Enter: () => {
          const item = currentItems[safeFocusedIndex];
          if (item) activateItem(item, safeFocusedIndex, undefined);
        },

        Escape: () => {
          if (openFolder) {
            goBackFromFolder();
          }
        },

        Backspace: () => {
          if (openFolder) {
            goBackFromFolder();
          }
        },
      };

      const action = keyActions[e.key];
      if (action) {
        e.preventDefault();
        action();
      }
    },
    [
      selectedDetail,
      isDesktop,
      currentItems,
      safeFocusedIndex,
      openFolder,
      closeDetail,
      activateItem,
      goBackFromFolder,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // ─── Phone Screen Content ─────────────────────────────────

  const phoneContent = (
    <>
      <StatusBar time={time} isDark={isDark} />

      {/* Header / Folder header */}
      {openFolder ? (
        <FolderHeader folder={openFolder} onBack={goBackFromFolder} isDark={isDark} />
      ) : (
        <div className="px-5 pt-4 pb-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-aster-accent animate-pulse" />
            <h1 className={`text-lg font-extrabold tracking-tight transition-colors duration-500 ${text}`}>
              Aster<span className="text-aster-accent">Dev</span>
            </h1>
          </div>
          <p className={`text-[11px] font-medium tracking-wide transition-colors duration-500 ${textFaint}`}>
            Frontend &amp; Mobile Development
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="flex-1 px-4 py-3 overflow-y-auto">
        <div className="grid grid-cols-3 gap-3 justify-items-center">
          {currentItems.map((item, index) => {
            const displayItem = getDarkModeItem(item, isDark);
            return (
              <GridIcon
                key={item.id}
                item={displayItem}
                isFocused={safeFocusedIndex === index}
                onClick={(e) => activateItem(item, index, e)}
                onHover={() => setFocusedIndex(index)}
                isDark={isDark}
              />
            );
          })}
        </div>
      </div>

      {/* Key hints (desktop only) */}
      <KeyHint isDesktop={isDesktop} isDark={isDark} />

      {/* Bottom bar (desktop only) */}
      {isDesktop && (
        <div className="flex justify-center pb-3 pt-1">
          <div className="w-28 h-1 rounded-full bg-aster-dark/15" />
        </div>
      )}

      {/* Divisória minimalista (Mobile Home) */}
      {!isDesktop && (
        <div className="w-full px-6 pt-2 pb-3 shrink-0 transition-colors duration-500">
          <div className={`w-full h-[1px] transition-colors duration-500 ${isDark ? 'bg-stone-700' : 'bg-aster-dark/[0.08]'}`} />
        </div>
      )}

      {/* Mobile Safe Area with texture for floating home button */}
      {!isDesktop && (
        <div className="relative h-20 shrink-0 w-full">
          <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${isDark ? 'bg-gradient-to-t from-black/80 to-transparent' : 'bg-gradient-to-t from-black/10 to-transparent'}`} />
        </div>
      )}
      
      {/* Detail Panel as overlay (MOBILE ONLY) */}
      {selectedDetail && !isDesktop && (
        <DetailPanel
          item={selectedDetail!}
          onClose={closeDetail}
          isDesktop={false}
          isClosing={isClosing}
          onAnimationEnd={
            isClosing
              ? () => { setSelectedDetail(null); setIsClosing(false); }
              : undefined
          }
          origin={appOrigin}
          isDark={isDark}
        />
      )}
    </>
  );

  // ─── Render ────────────────────────────────────────────────

  return (
    <div className="min-h-screen w-full bg-aster-dark relative overflow-hidden">
      <SplashScreen isBooting={isBooting} />

      {/* Ambient glows (desktop only) */}
      {isDesktop && (
        <>
          <div
            className="ambient-glow"
            style={{ top: "-10%", left: "20%", background: "#6c63ff" }}
          />
          <div
            className="ambient-glow"
            style={{ bottom: "-10%", right: "15%", background: "#00cec9" }}
          />
        </>
      )}

      {/* ── MOBILE LAYOUT ── */}
      {!isDesktop && (
        <div className={`w-full min-h-screen flex flex-col relative transition-colors duration-500 ${isDark ? 'bg-stone-900' : 'bg-aster-beige'}`}>
          {phoneContent}
          {/* Floating home button — always visible, even over detail panel */}
          <HomeButton
            isDark={isDark}
            onClick={
              selectedDetail
                ? closeDetail
                : openFolder
                ? goBackFromFolder
                : goHome
            }
          />
        </div>
      )}

      {/* ── DESKTOP LAYOUT ── */}
      {isDesktop && (
        <div className="h-screen w-full flex items-center justify-center gap-10 px-10 py-8 relative z-10">
          {/* Brand watermark */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 select-none">
            <span className="text-white/10 text-xs font-mono tracking-[0.3em] uppercase">
              Aster Dev
            </span>
          </div>

          {/* Phone (left) */}
          <div className="phone-shell flex-shrink-0 w-[340px] h-[680px] relative z-10">
            <div className={`phone-screen w-full h-full flex flex-col relative transition-colors duration-500 ${isDark ? 'bg-stone-900' : 'bg-aster-beige'}`}>
              {phoneContent}
            </div>
          </div>

          {/* Detail Panel (right) — iPad shell frame */}
          <div className="flex-1 max-w-[1400px] h-[750px] relative z-10">
            <div className="ipad-shell w-full h-full">
              <div className="ipad-screen relative overflow-hidden bg-gradient-to-br from-aster-dark-lighter/90 to-aster-dark-lighter/60">
                {/* Empty State — wallpaper, fills 100% */}
                <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Decorative ambient circles */}
                  <div className="absolute top-10 right-16 w-40 h-40 rounded-full bg-aster-accent/[0.04] blur-2xl pointer-events-none" />
                  <div className="absolute bottom-16 left-12 w-56 h-56 rounded-full bg-[#00cec9]/[0.03] blur-3xl pointer-events-none" />

                  {/* Logo mark */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-aster-accent/20 to-aster-accent/5 border border-aster-accent/10 flex items-center justify-center shadow-lg">
                      <span className="text-4xl select-none">✦</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-aster-accent/60 animate-pulse" />
                  </div>

                  {/* Welcome copy */}
                  <h2 className="text-2xl font-bold tracking-tight mb-2 transition-colors duration-500 text-white/80">
                    Bem-vindo ao <span className="text-aster-accent">AsterDev</span>
                  </h2>
                  <p className="text-sm font-medium max-w-sm text-center leading-relaxed mb-6 transition-colors duration-500 text-white/30">
                    Explora o portfólio navegando pelos apps no telemóvel.
                    Cada projeto abre aqui com todos os detalhes.
                  </p>

                  {/* Interaction hint */}
                  <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex gap-1">
                      {["W", "A", "S", "D"].map((key) => (
                        <kbd
                          key={key}
                          className="w-6 h-6 rounded-md text-[10px] font-mono font-bold flex items-center justify-center border transition-colors duration-500 bg-white/[0.06] text-white/30 border-white/[0.08]"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                    <span className="text-xs font-medium transition-colors duration-500 text-white/20">
                      navegar
                    </span>
                    <div className="w-px h-4 bg-white/10" />
                    <kbd className="px-3 h-6 rounded-md text-[10px] font-mono font-bold flex items-center justify-center border transition-colors duration-500 bg-white/[0.06] text-white/30 border-white/[0.08]">
                      Enter
                    </kbd>
                    <span className="text-xs font-medium transition-colors duration-500 text-white/20">
                      abrir
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-[10px] font-mono tracking-widest uppercase mt-8 transition-colors duration-500 text-white/[0.08]">
                    Frontend · Mobile · Design
                  </p>
                </div>

                {/* DetailPanel — absolute overlay, covers the full screen */}
                {selectedDetail && (
                  <DetailPanel
                    item={selectedDetail!}
                    onClose={closeDetail}
                    isDesktop
                    isClosing={isClosing}
                    onAnimationEnd={
                      isClosing
                        ? () => { setSelectedDetail(null); setIsClosing(false); }
                        : undefined
                    }
                    origin={appOrigin}
                    isDark={isDark}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Bottom brand */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center z-10 select-none">
            <p className="text-white/[0.06] text-[10px] font-mono tracking-widest uppercase">
              Portfolio
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
