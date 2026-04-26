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

type TranslationDict = {
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

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  br: {
    ui: { back: 'Voltar', summary: 'Resumo', homeButton: 'Botão Home — fechar app', navigate: 'navegar', open: 'abrir', project: 'projeto', projects: 'projetos', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'Bem-vindo ao', welcomeSubtitle: 'Explore o portfólio navegando pelos apps no celular. Cada projeto abre aqui com todos os detalhes.', post: 'postagem', posts: 'postagens', lang: 'idioma', langs: 'idiomas', cert: 'certificado', certs: 'certificados' },
    items: {
      sobreMimName: 'Sobre Mim',
      sobreMimSummary: 'Sou o Aster, Desenvolvedor Frontend focado em criar interfaces performáticas e arquiteturas limpas. Atualmente no 5º semestre de Ciência da Computação no Centro Universitário União das Américas - UniAmérica, divido meu tempo entre o código e a liderança de uma comunidade técnica acadêmica, onde orquestro projetos colaborativos e auxilio no nivelamento de outros estudantes.\n\nMeu interesse por programação não começou na teoria, mas dissecando sistemas na prática. A porta de entrada foi a configuração de servidores de jogos online e a engenharia reversa para a criação de cheats. Essa exploração me forçou a entender desde cedo como a memória de uma máquina funciona, como interceptar fluxos de dados e como a lógica de um sistema opera em baixo nível. Hoje, canalizo essa mesma curiosidade analítica para construir aplicações web seguras e robustas.\n\nFora dos repositórios, mantenho a mente afiada estudando Mandarim e analisando cenários competitivos de e-sports. Para sustentar esse nível de exigência técnica, aplico uma disciplina inegociável na vida real: treino intensamente com a meta de completar um triathlon Ironman. É essa combinação de consistência, resolução de problemas complexos e execução pragmática que entrego na engenharia de software.',
      blogName: 'Blog', blogProjName: 'Hackathons & Projetos', blogProjSummary: 'Aqui documentarei meus aprendizados, participações em Hackathons, desafios de código e projetos em grupo. A ideia é mostrar não só o código final, mas o processo de engenharia.',
      certName: 'Certificações', certProjName: 'Em Breve', certProjSummary: 'Espaço reservado para as futuras certificações oficiais e diplomas técnicos.',
      cvName: 'Currículo', cvSummary: '--- RESUMO PROFISSIONAL ---\nDesenvolvedor Frontend focado em performance, escalabilidade e arquitetura de sistemas. Atualmente no 5º semestre de Ciência da Computação, com experiência prática na liderança de comunidades técnicas e gestão de projetos colaborativos.\n\n--- FORMAÇÃO E COMUNIDADE ---\nCiência da Computação – UniAmérica (5º Semestre).\nLiderança Técnica: Fundador de comunidade acadêmica com foco em mentoria e governança de projetos no GitHub.\n\n--- STACK TÉCNICA ---\nFrontend: React.js, Next.js, Vue.js, Astro, JavaScript (ES6+), Tailwind CSS, Bootstrap.\nBack & Infra: Node.js, SQL, Vercel, Cloudflare, Git/GitHub.\nMobile & Outros: Flutter, Dart, C++.\nProdutividade: Notion, Obsidian.\n\n--- DIFERENCIAIS ---\nOrganização e Fluxo: Especialista em estruturação de fluxos de trabalho e documentação utilizando Notion e Obsidian (PKM).\nIdiomas: Inglês Avançado; Mandarim e Japonês (Em aprendizado).',
      githubName: 'GitHub', githubSummary: 'Este é o meu Hub de Engenharia e Colaboração. Mais do que um repositório de arquivos, este espaço centraliza minha atuação em diferentes ecossistemas técnicos, onde aplico padrões de arquitetura e liderança de projetos.\n\n---  PERFIL PESSOAL ---\nFoco em experimentação de novas stacks (React, Astro, Tailwind), ferramentas utilitárias e o desenvolvimento core deste portfólio.\n\n---  ORGANIZAÇÕES E COMUNIDADES ---\n• Centro Universitário União das Américas - UniAmérica (Liderança Técnica): Atuo na coordenação dos repositórios de projetos de extensão (PEX). Minha missão é garantir a padronização das Wikis de documentação, revisar Pull Requests e mentorar outros estudantes na organização do código.\n• [Nome de Outra Org]: Espaço reservado para futuras parcerias e contribuições em projetos Open Source.',
      langName: 'Tradução', frontName: 'Frontend', calcName: 'Ideal Calc', calcSummary: 'Calculadora estatística interativa que cruza 12 filtros demográficos com microdados oficiais do IBGE (Censo 2022, PNAD 2023) para revelar a probabilidade real de encontrar o parceiro ideal no Brasil. Cálculo em tempo real, card viral compartilhável e auditoria completa de dados.', calcLinkOpen: 'Abrir App',
      soulName: 'Soul Fighter: Memory Game', soulSummary: 'Jogo da memória temático inspirado no universo Soul Fighter de League of Legends. Mecânica clássica de card-flip com assets oficiais do evento, lógica de matching em JavaScript vanilla e design responsivo fiel à identidade visual do game.', soulLinkPlay: 'Jogar',
      pexName: 'PEX Wiki', pexSummary: 'Hub de conhecimento acadêmico para alunos de Ciência da Computação do Centro Universitário União das Américas - UniAmérica. Sistema de Views com roteamento SPA em Vanilla JS, design system \'Blurple Gamer\' em dark mode, checklists interativos, modais dinâmicos para os 17 ODS da ONU e responsividade Mobile First.', pexLinkVisit: 'Visitar Wiki',
      darkName: 'Modo Escuro', mobileName: 'Mobile', demoName: 'App Demo', demoSummary: 'Aplicação mobile de demonstração construída com React Native.',
      tagStat: 'Estatística', tagComp: 'Competição', tagCert: 'Certificação', tagArch: 'Arquitetura', btnSourceCode: 'Código Fonte'
    }
  },
  en: {
    ui: { back: 'Back', summary: 'Summary', homeButton: 'Home Button — close app', navigate: 'navigate', open: 'open', project: 'project', projects: 'projects', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'Welcome to', welcomeSubtitle: 'Explore the portfolio by navigating through the apps on the phone. Each project opens here with full details.', post: 'post', posts: 'posts', lang: 'language', langs: 'languages', cert: 'certificate', certs: 'certificates' },
    items: {
      sobreMimName: 'About Me',
      sobreMimSummary: 'I am Aster, a Frontend Developer focused on creating performant interfaces and clean architectures. Currently in my 5th semester of Computer Science at UniAmérica, I split my time between code and leading an academic technical community, where I orchestrate collaborative projects and help level up other students.\n\nMy interest in programming did not start with theory, but dissecting systems in practice. The gateway was configuring online game servers and reverse engineering for cheat creation. This exploration forced me to understand early on how machine memory works, how to intercept data flows, and how a systems logic operates at a low level. Today, I channel this same analytical curiosity to build secure and robust web applications.\n\nOutside the repositories, I keep my mind sharp studying Mandarin and analyzing competitive esports. To sustain this level of technical demand, I apply non-negotiable discipline in real life: training intensely with the goal of completing an Ironman triathlon. It is this combination of consistency, complex problem solving, and pragmatic execution that I deliver in software engineering.',
      blogName: 'Blog', blogProjName: 'Hackathons & Projects', blogProjSummary: 'Here I document my learnings, Hackathon participations, coding challenges, and group projects. The idea is to show not just the final code, but the engineering process.',
      certName: 'Certifications', certProjName: 'Coming Soon', certProjSummary: 'Space reserved for future official certifications and technical diplomas.',
      cvName: 'Resume', cvSummary: '--- PROFESSIONAL SUMMARY ---\nFrontend Developer focused on performance, scalability, and system architecture. Currently in the 5th semester of Computer Science, with practical experience leading technical communities and managing collaborative projects.\n\n--- EDUCATION & COMMUNITY ---\nComputer Science – UniAmérica (5th Semester).\nTechnical Leadership: Founder of an academic community focused on mentoring and project governance on GitHub.\n\n--- TECH STACK ---\nFrontend: React.js, Next.js, Vue.js, Astro, JavaScript (ES6+), Tailwind CSS, Bootstrap.\nBack & Infra: Node.js, SQL, Vercel, Cloudflare, Git/GitHub.\nMobile & Others: Flutter, Dart, C++.\nProductivity: Notion, Obsidian.\n\n--- HIGHLIGHTS ---\nOrganization & Workflow: Specialist in structuring workflows and documentation using Notion and Obsidian (PKM).\nLanguages: Advanced English; Mandarin and Japanese (Learning).',
      githubName: 'GitHub', githubSummary: 'This is my Engineering and Collaboration Hub. More than a file repository, this space centralizes my work across different technical ecosystems, where I apply architecture patterns and project leadership.\n\n---  PERSONAL PROFILE ---\nFocus on experimenting with new stacks (React, Astro, Tailwind), utility tools, and the core development of this portfolio.\n\n---  ORGANIZATIONS AND COMMUNITIES ---\n• Centro Universitário União das Américas - UniAmérica (Technical Leadership): I coordinate the extension project (PEX) repositories. My mission is to ensure the standardization of documentation Wikis, review Pull Requests, and mentor other students in code organization.\n• [Other Org Name]: Space reserved for future partnerships and contributions to Open Source projects.',
      langName: 'Language', frontName: 'Frontend', calcName: 'Ideal Calc', calcSummary: 'Interactive statistical calculator that crosses 12 demographic filters with official IBGE microdata (2022 Census, 2023 PNAD) to reveal the real probability of finding the ideal partner in Brazil. Real-time calculation, shareable viral card, and complete data audit.', calcLinkOpen: 'Open App',
      soulName: 'Soul Fighter: Memory Game', soulSummary: 'Themed memory game inspired by the League of Legends Soul Fighter universe. Classic card-flip mechanics with official event assets, vanilla JavaScript matching logic, and responsive design faithful to the game\'s visual identity.', soulLinkPlay: 'Play',
      pexName: 'PEX Wiki', pexSummary: 'Academic knowledge hub for Computer Science students at Centro Universitário União das Américas - UniAmérica. View system with SPA routing in Vanilla JS, \'Blurple Gamer\' design system in dark mode, interactive checklists, dynamic modals for the 17 UN SDGs, and Mobile First responsiveness.', pexLinkVisit: 'Visit Wiki',
      darkName: 'Dark Mode', mobileName: 'Mobile', demoName: 'App Demo', demoSummary: 'Demo mobile application built with React Native.',
      tagStat: 'Statistics', tagComp: 'Competition', tagCert: 'Certification', tagArch: 'Architecture', btnSourceCode: 'Source Code'
    }
  },
  es: {
    ui: { back: 'Volver', summary: 'Resumen', homeButton: 'Botón Inicio — cerrar app', navigate: 'navegar', open: 'abrir', project: 'proyecto', projects: 'proyectos', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'Bienvenido a', welcomeSubtitle: 'Explora el portafolio navegando por las aplicaciones en el móvil. Cada proyecto se abre aquí con todos los detalles.', post: 'publicación', posts: 'publicaciones', lang: 'idioma', langs: 'idiomas', cert: 'certificado', certs: 'certificados' },
    items: {
      sobreMimName: 'Sobre Mí',
      sobreMimSummary: 'Soy Aster, Desarrollador Frontend enfocado en crear interfaces de alto rendimiento y arquitecturas limpias. Actualmente en el 5º semestre de Ciencias de la Computación, divido mi tiempo entre el código y liderar una comunidad técnica académica.\n\nMi interés por la programación no empezó en la teoría, sino diseccionando sistemas en la práctica, desde configurar servidores de juegos hasta ingeniería inversa. Hoy canalizo esta curiosidad analítica para construir aplicaciones web seguras y robustas.\n\nPara mantener el rigor técnico, aplico una disciplina innegociable en la vida real: entreno intensamente para completar un triatlón Ironman. Es esta combinación de consistencia, resolución de problemas complejos y ejecución pragmática lo que entrego en la ingeniería de software.',
      blogName: 'Blog', blogProjName: 'Hackathons y Proyectos', blogProjSummary: 'Aquí documentaré mis aprendizajes, participaciones en Hackathons, desafíos de código y proyectos grupales. La idea es mostrar no solo el código final, sino el proceso de ingeniería.',
      certName: 'Certificaciones', certProjName: 'Próximamente', certProjSummary: 'Espacio reservado para futuras certificaciones oficiales y diplomas técnicos.',
      cvName: 'Currículum', cvSummary: '--- RESUMEN PROFESIONAL ---\nDesarrollador Frontend enfocado en rendimiento, escalabilidad y arquitectura de sistemas. Actualmente en el 5º semestre de Ciencias de la Computación.\n\n--- FORMACIÓN Y COMUNIDAD ---\nCiencias de la Computación – UniAmérica (5º Semestre).\nLiderazgo Técnico: Fundador de una comunidad académica.\n\n--- STACK TÉCNICO ---\nFrontend: React.js, Next.js, Vue.js, Astro, TS, Tailwind CSS.\nBack & Infra: Node.js, SQL, Vercel, Git/GitHub.\nMobile & Otros: Flutter, Dart, C++.\nProductividad: Notion, Obsidian.\n\n--- DIFERENCIALES ---\nOrganización y Flujo: Especialista en estructuración de flujos de trabajo (PKM).\nIdiomas: Inglés Avanzado; Mandarín y Japonés (Aprendiendo).',
      githubName: 'GitHub', githubSummary: 'Este es mi Hub de Ingeniería y Colaboración. Más que un repositorio de archivos, este espacio centraliza mi trabajo en diferentes ecosistemas técnicos, donde aplico patrones de arquitectura y liderazgo de proyectos.\n\n---  PERFIL PERSONAL ---\nEnfoque en la experimentación con nuevas stacks (React, Astro, Tailwind), herramientas de utilidad y el desarrollo core de este portafolio.\n\n---  ORGANIZACIONES Y COMUNIDADES ---\n• Centro Universitário União das Américas - UniAmérica (Liderazgo Técnico): Coordino los repositorios de proyectos de extensión (PEX). Mi misión es garantizar la estandarización de las Wikis de documentación, revisar Pull Requests y ser mentor de otros estudiantes en la organización del código.\n• [Nombre de Otra Org]: Espacio reservado para futuras asociaciones y contribuciones a proyectos Open Source.',
      langName: 'Idioma', frontName: 'Frontend', calcName: 'Ideal Calc', calcSummary: 'Calculadora estadística interactiva que cruza 12 filtros demográficos con microdatos oficiales del IBGE (Censo 2022, PNAD 2023) para revelar la probabilidad real de encontrar la pareja ideal en Brasil. Cálculo en tiempo real, tarjeta viral compartible y auditoría completa de datos.', calcLinkOpen: 'Abrir App',
      soulName: 'Soul Fighter: Memory Game', soulSummary: 'Juego de memoria temático inspirado en el universo Soul Fighter de League of Legends. Mecánica clásica de card-flip con assets oficiales del evento, lógica de matching en JavaScript vanilla y diseño responsivo fiel a la identidad visual del juego.', soulLinkPlay: 'Jugar',
      pexName: 'PEX Wiki', pexSummary: 'Hub de conhecimento académico para estudiantes de Ciencias de la Computación del Centro Universitário União das Américas - UniAmérica. Sistema de vistas con enrutamiento SPA en Vanilla JS, sistema de diseño \'Blurple Gamer\' en modo oscuro, listas de verificación interactivas, modales dinámicos para los 17 ODS de la ONU y responsividad Mobile First.', pexLinkVisit: 'Visitar Wiki',
      darkName: 'Modo Oscuro', mobileName: 'Móvil', demoName: 'App Demo', demoSummary: 'Aplicación móvil de demostración construida con React Native.',
      tagStat: 'Estadística', tagComp: 'Competición', tagCert: 'Certificación', tagArch: 'Arquitectura', btnSourceCode: 'Código Fuente'
    }
  },
  jp: {
    ui: { back: '戻る', summary: '概要', homeButton: 'ホームボタン — アプリを閉じる', navigate: 'ナビゲート', open: '開く', project: 'プロジェクト', projects: 'プロジェクト', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'ようこそ', welcomeSubtitle: 'モバイルのアプリを操作してポートフォリオを探索してください。各プロジェクトの詳細がここに表示されます。', post: '投稿', posts: '投稿', lang: '言語', langs: '言語', cert: '証明書', certs: '証明書' },
    items: {
      sobreMimName: '私について',
      sobreMimSummary: 'Asterです。パフォーマンスの高いインターフェースとクリーンなアーキテクチャの構築に注力するフロントエンド開発者です。現在、コンピュータサイエンスの第5学期に在籍し、コードと学術的な技術コミュニティのリーダーシップの間に時間を割いています。\n\nプログラミングへの関心は理論からではなく、実践でのシステムの解剖から始まりました。ゲームサーバーの設定やチート作成のためのリバースエンジニアリングが入り口でした。今日、私はこの分析的な好奇心を安全で堅牢なWebアプリケーションの構築に向けています。\n\nリポジトリの外では、マンダリンを学び、eスポーツの競争シーンを分析しています。この技術的要件を維持するために、アイアンマントライアスロンを完了するという目標に向けて厳格な訓練を行っています。',
      blogName: 'ブログ', blogProjName: 'ハッカソンとプロジェクト', blogProjSummary: 'ここで私の学習、ハッカソンへの参加、コーディングの課題、グループプロジェクトを記録します。',
      certName: '認定', certProjName: '近日公開', certProjSummary: '将来の公式認定および技術学位のために予約されたスペース。',
      cvName: '履歴書', cvSummary: '--- 職務経歴書 ---\nパフォーマンス、スケーラビリティ、システムアーキテクチャに焦点を当てたフロントエンド開発者。\n\n--- テクノロジースタック ---\nフロントエンド: React.js, Next.js, TS, Tailwind CSS.\nバック＆インフラ: Node.js, SQL, Vercel, Git/GitHub.\n\n--- 特徴 ---\nワークフロー構造とPKMのスペシャリスト。',
      githubName: 'GitHub', githubSummary: 'これは私のエンジニアリングおよびコラボレーションハブです。単なるファイルリポジトリではなく、このスペースは、アーキテクチャパターンとプロジェクトリーダーシップを適用するさまざまな技術エコシステムでの私の作業を一元化します。\n\n--- 個人プロフィール ---\n新しいスタック（React、Astro、Tailwind）、ユーティリティツール、およびこのポートフォリオのコア開発の実験に焦点を当てています。\n\n--- 組織とコミュニティ ---\n• Centro Universitário União das Américas - UniAmérica（技術リーダーシップ）: 拡張プロジェクト（PEX）リポジトリを調整します。私の使命は、ドキュメントWikiの標準化を保証し、プルリクエストをレビューし、コード編成において他の学生を指導することです。\n• [他の組織名]: 将来のパートナーシップとオープンソースプロジェクトへの貢献のために予約されたスペース。',
      langName: '言語', frontName: 'フロントエンド', calcName: 'Ideal Calc', calcSummary: '12の人口統計フィルターとIBGEの公式マイクロデータ（2022年国勢調査、2023年PNAD）を交差させ、ブラジルで理想のパートナーが見つかる真の確率を明らかにするインタラクティブな統計計算機。リアルタイム計算、共有可能なバイラルカード、および完全なデータ監査を備えています。', calcLinkOpen: 'アプリを開く',
      soulName: 'Soul Fighter: メモリー', soulSummary: 'League of LegendsのSoul Fighterの世界観にインスパイアされたテーマ別のメモリーゲーム。イベントの公式アセットを使用したクラシックなカードフリップメカニズム、バニラJavaScriptの照合ロジック、およびゲームのビジュアルアイデンティティに忠実なレスポンシブデザインを備えています。', soulLinkPlay: 'プレイ',
      pexName: 'PEX Wiki', pexSummary: 'Centro Universitário União das Américas - UniAméricaのコンピュータサイエンス専攻の学生向けのアカデミックナレッジハブ。バニラJSによるSPAルーティングを備えたビューシステム、ダークモードの\'Blurple Gamer\'デザインシステム、インタラクティブなチェックリスト、国連の17のSDGs向けの動的モーダル、およびモバイルファーストのレスポンシブデザインを備えています。', pexLinkVisit: 'Wikiを見る',
      darkName: 'ダークモード', mobileName: 'モバイル', demoName: 'デモアプリ', demoSummary: 'React Nativeで構築されたデモモバイルアプリケーション。',
      tagStat: '統計学', tagComp: 'コンペティション', tagCert: '認定', tagArch: 'アーキテクチャ', btnSourceCode: 'ソースコード'
    }
  },
  cn: {
    ui: { back: '返回', summary: '摘要', homeButton: '主页按钮 — 关闭应用', navigate: '导航', open: '打开', project: '项目', projects: '项目', booting: '[ ASTER_OS BOOT ]', welcomeTitle: '欢迎来到', welcomeSubtitle: '在手机上浏览应用程序来探索作品集。每个项目都会在这里打开并显示所有细节。', post: '帖子', posts: '帖子', lang: '语言', langs: '语言', cert: '证书', certs: '证书' },
    items: {
      sobreMimName: '关于我',
      sobreMimSummary: '我是Aster，一名前端开发人员，专注于创建高性能界面和清晰架构。目前在读计算机科学第五学期，我在编写代码和领导学术技术社区之间分配时间。\n\n我对编程的兴趣并非始于理论，而是在实践中解剖系统。入门是配置在线游戏服务器和作弊创建的逆向工程。今天，我将这种分析好奇心用于构建安全强大的Web应用程序。\n\n在代码库之外，我学习普通话并分析电子竞技竞争环境以保持头脑敏锐。为了维持这种技术要求，我进行了铁人三项的严格训练。',
      blogName: '博客', blogProjName: '黑客松与项目', blogProjSummary: '在这里，我将记录我的学习、黑客松参与、编码挑战和小组项目。',
      certName: '认证', certProjName: '敬请期待', certProjSummary: '为未来的官方认证和技术文凭预留的空间。',
      cvName: '简历', cvSummary: '--- 个人简历 ---\n专注于性能、可扩展性和系统架构的前端开发人员。\n\n--- 技术栈 ---\n前端: React.js, Next.js, TS, Tailwind CSS.\n后端与基础设施: Node.js, SQL, Vercel, Git/GitHub.\n\n--- 特点 ---\n工作流结构和PKM（Notion/Obsidian）专家。',
      githubName: 'GitHub', githubSummary: '这是我的工程和协作中心。这不仅仅是一个文件存储库，这个空间集中了我在不同技术生态系统中的工作，我在其中应用架构模式和项目领导力。\n\n--- 个人资料 ---\n专注于尝试新的技术栈（React、Astro、Tailwind）、实用工具以及此投资组合的核心开发。\n\n--- 组织和社区 ---\n• Centro Universitário União das Américas - UniAmérica（技术领导）: 我负责协调扩展项目（PEX）存储库。我的任务是确保文档Wiki的标准化、审查拉取请求，并在代码组织方面指导其他学生。\n• [其他组织名称]: 为未来在开源项目中的合作伙伴关系和贡献保留的空间。',
      langName: '语言', frontName: '前端', calcName: 'Ideal Calc', calcSummary: '交互式统计计算器，将12个人口统计过滤器与官方IBGE微观数据（2022年人口普查、2023年PNAD）相结合，揭示在巴西找到理想伴侣的真实概率。支持实时计算、可分享的病毒式卡片和完整的数据审计。', calcLinkOpen: '打开应用',
      soulName: 'Soul Fighter: 记忆', soulSummary: '以英雄联盟Soul Fighter宇宙为灵感的记忆游戏。采用活动官方资产、经典的翻牌机制、原生JavaScript匹配逻辑，以及忠于游戏视觉身份的响应式设计。', soulLinkPlay: '开始游戏',
      pexName: 'PEX Wiki', pexSummary: 'Centro Universitário União das Américas - UniAmérica 计算机科学专业学生的学术知识中心。采用原生JS开发的具有SPA路由的视图系统、深色模式下的\'Blurple Gamer\'设计系统、交互式检查清单、针对联合国17个SDG的动态模态窗口，以及移动优先的响应式设计。', pexLinkVisit: '访问Wiki',
      darkName: '深色模式', mobileName: '移动端', demoName: '演示应用', demoSummary: '使用React Native构建的演示移动应用程序。',
      tagStat: '统计学', tagComp: '竞赛', tagCert: '认证', tagArch: '架构', btnSourceCode: '源代码'
    }
  },
  kr: {
    ui: { back: '뒤로', summary: '요약', homeButton: '홈 버튼 — 앱 닫기', navigate: '탐색', open: '열기', project: '프로젝트', projects: '프로젝트', booting: '[ ASTER_OS BOOT ]', welcomeTitle: '환영합니다', welcomeSubtitle: '모바일에서 앱을 탐색하여 포트폴리오를 둘러보세요. 각 프로젝트의 전체 세부 정보가 여기에 열립니다.', post: '게시물', posts: '게시물', lang: '언어', langs: '언어', cert: '인증서', certs: '인증서' },
    items: {
      sobreMimName: '내 소개',
      sobreMimSummary: '저는 Aster입니다. 고성능 인터페이스와 깔끔한 아키텍처를 만드는 데 중점을 둔 프론트엔드 개발자입니다. 현재 컴퓨터 과학 5학기에 재학 중이며, 코드 작성과 학술 기술 커뮤니티 리더십에 시간을 할애하고 있습니다.\n\n프로그래밍에 대한 관심은 이론이 아닌 실무 시스템을 해부하는 것에서 시작되었습니다. 게임 서버 구성과 리버스 엔지니어링이 그 시작이었습니다. 오늘날 저는 이 분석적 호기심을 안전하고 강력한 웹 애플리케이션을 구축하는 데 집중하고 있습니다.\n\n리포지토리 밖에서는 만다린을 공부하고 e스포츠를 분석하며 정신을 예리하게 유지합니다. 이러한 기술적 요구 수준을 유지하기 위해 철인 3종 경기를 목표로 엄격하게 훈련합니다.',
      blogName: '블로그', blogProjName: '해커톤 및 프로젝트', blogProjSummary: '여기에서는 저의 학습, 해커톤 참여, 코딩 챌린지 및 그룹 프로젝트를 기록합니다.',
      certName: '인증', certProjName: '곧 공개', certProjSummary: '향후 공식 인증 및 기술 학위를 위해 예약된 공간입니다.',
      cvName: '이력서', cvSummary: '--- 전문 요약 ---\n성능, 확장성 및 시스템 아키텍처에 중점을 둔 프론트엔드 개발자.\n\n--- 기술 스택 ---\n프론트엔드: React.js, Next.js, TS, Tailwind CSS.\n백엔드 및 인프라: Node.js, SQL, Vercel, Git/GitHub.\n\n--- 특징 ---\n워크플로우 구조화 및 PKM 전문가.',
      githubName: 'GitHub', githubSummary: '이곳은 저의 엔지니어링 및 협업 허브입니다. 단순한 파일 리포지토리 그 이상인 이 공간은 아키텍처 패턴과 프로젝트 리더십을 적용하는 다양한 기술 생태계에서의 작업을 중앙 집중화합니다。\n\n--- 개인 프로필 ---\n새로운 스택(React, Astro, Tailwind), 유틸리티 도구 및 이 포트폴리오의 핵심 개발 실험에 중점을 둡니다。\n\n--- 조직 및 커뮤니티 ---\n• Centro Universitário União das Américas - UniAmérica(기술 리더십): 확장 프로젝트(PEX) 리포지토리를 조정합니다。 저의 임무는 문서 Wiki의 표준화를 보장하고, Pull Request를 검토하며, 코드 구성에서 다른 학생들을 멘토링하는 것입니다。\n• [다른 조직 이름]: 오픈 소스 프로젝트의 향후 파트너십 및 기여를 위해 예약된 공간입니다。',
      langName: '언어', frontName: '프론트엔드', calcName: 'Ideal Calc', calcSummary: '12가지 인구 통계 필터와 IBGE 공식 마이크로데이터(2022년 인구 조사, 2023년 PNAD)를 교차하여 브라질에서 이상적인 파트너를 찾을 실제 확률을 보여주는 대화형 통계 계산기입니다. 실시간 계산, 공유 가능한 바이럴 카드 및 전체 데이터 감사를 제공합니다.', calcLinkOpen: '앱 열기',
      soulName: 'Soul Fighter: 메모리', soulSummary: 'League of Legends의 Soul Fighter 유니버스에서 영감을 받은 테마 메모리 게임입니다. 이벤트 공식 에셋을 사용한 클래식한 카드 뒤집기 메커니즘, 바닐라 자바스크립트 매칭 로직, 그리고 게임의 시각적 정체성을 충실히 따르는 반응형 디자인을 제공합니다.', soulLinkPlay: '플레이',
      pexName: 'PEX Wiki', pexSummary: 'Centro Universitário União das Américas - UniAmérica 컴퓨터 과학과 학생들을 위한 학술 지식 허브입니다. 바닐라 JS 기반의 SPA 라우팅 뷰 시스템, 다크 모드 \'Blurple Gamer\' 디자인 시스템, 대화형 체크리스트, UN의 17가지 SDGs를 위한 동적 모달 및 모바일 퍼스트 반응형 디자인을 제공합니다.', pexLinkVisit: 'Wiki 방문',
      darkName: '다크 모드', mobileName: '모바일', demoName: '데모 앱', demoSummary: 'React Native로 구축된 데모 모바일 애플리케이션.',
      tagStat: '통계학', tagComp: '대회', tagCert: '인증', tagArch: '아키텍처', btnSourceCode: '소스 코드'
    }
  },
  vn: {
    ui: { back: 'Quay lại', summary: 'Tóm tắt', homeButton: 'Nút Home — đóng ứng dụng', navigate: 'điều hướng', open: 'mở', project: 'dự án', projects: 'dự án', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'Chào mừng đến với', welcomeSubtitle: 'Khám phá portfolio bằng cách điều hướng qua các ứng dụng trên điện thoại. Mỗi dự án sẽ mở ra ở đây với đầy đủ chi tiết.', post: 'bài viết', posts: 'bài viết', lang: 'ngôn ngữ', langs: 'ngôn ngữ', cert: 'chứng chỉ', certs: 'chứng chỉ' },
    items: {
      sobreMimName: 'Về tôi',
      sobreMimSummary: 'Tôi là Aster, một Lập trình viên Frontend tập trung vào việc tạo ra các giao diện hiệu suất cao và kiến trúc rõ ràng. Hiện đang học kỳ 5 ngành Khoa học Máy tính, tôi phân chia thời gian giữa việc viết mã và lãnh đạo một cộng đồng kỹ thuật học thuật.\n\nSự quan tâm của tôi đối với lập trình không bắt đầu từ lý thuyết mà từ việc mổ xẻ các hệ thống trong thực tế. Khởi đầu là cấu hình máy chủ trò chơi trực tuyến và kỹ thuật đảo ngược. Ngày nay, tôi chuyển hướng sự tò hướng sự tò mò phân tích này để xây dựng các ứng dụng web an toàn và mạnh mẽ.\n\nNgoài các dự án mã nguồn, tôi giữ cho tâm trí sắc bén bằng cách học tiếng Quan Thoại và phân tích e-sports. Tôi cũng tập luyện nghiêm ngặt cho giải thể thao ba môn phối hợp Ironman.',
      blogName: 'Blog', blogProjName: 'Hackathons & Dự án', blogProjSummary: 'Đây là nơi tôi ghi lại những gì mình học được, tham gia Hackathon, thử thách mã hóa và các dự án nhóm.',
      certName: 'Chứng chỉ', certProjName: 'Sắp ra mắt', certProjSummary: 'Không gian dành riêng cho các chứng chỉ chính thức trong tương lai.',
      cvName: 'Sơ yếu lý lịch', cvSummary: '--- TÓM TẮT CHUYÊN MÔN ---\nLập trình viên Frontend tập trung vào hiệu suất, khả năng mở rộng và kiến trúc hệ thống.\n\n--- CÔNG NGHỆ ---\nFrontend: React.js, Next.js, TS, Tailwind CSS.\nBack & Infra: Node.js, SQL, Vercel, Git/GitHub.\n\n--- ĐIỂM NỔI BẬT ---\nChuyên gia về cấu trúc quy trình làm việc và PKM.',
      githubName: 'GitHub', githubSummary: 'Đây là Trung tâm Kỹ thuật và Cộng tác của tôi. Không chỉ là một kho lưu trữ tệp, không gian này tập trung công việc của tôi trong các hệ sinh thái công nghệ khác nhau, nơi tôi áp dụng các mô hình kiến trúc và lãnh đạo dự án.\n\n--- HỒ SƠ CÁ NHÂN ---\nTập trung vào việc thử nghiệm các ngăn xếp mới (React, Astro, Tailwind), các công cụ tiện ích và phát triển cốt lõi của danh mục đầu tư này.\n\n--- TỔ CHỨC VÀ CỘNG ĐỒNG ---\n• Centro Universitário União das Américas - UniAmérica (Lãnh đạo Kỹ thuật): Tôi điều phối các kho lưu trữ dự án mở rộng (PEX). Nhiệm vụ của tôi là đảm bảo tiêu chuẩn hóa các Wiki tài liệu, xem xét các Pull Request và cố vấn cho các sinh viên khác trong việc tổ chức mã.\n• [Tên Tổ chức khác]: Không gian dành riêng cho các quan hệ đối tác và đóng góp trong tương lai cho các dự án Open Source.',
      langName: 'Ngôn ngữ', frontName: 'Frontend', calcName: 'Ideal Calc', calcSummary: 'Máy tính thống kê tương tác kết hợp 12 bộ lọc nhân khẩu học với vi dữ liệu chính thức của IBGE (Tổng điều tra 2022, PNAD 2023) để tiết lộ xác suất thực tế tìm thấy đối tác lý tưởng tại Brazil. Tính toán thời gian thực, thẻ viral có thể chia sẻ và kiểm tra dữ liệu đầy đủ.', calcLinkOpen: 'Mở Ứng dụng',
      soulName: 'Soul Fighter: Memory', soulSummary: 'Trò chơi trí nhớ theo chủ đề lấy cảm hứng từ vũ trụ Soul Fighter của League of Legends. Cơ chế lật thẻ cổ điển với tài sản chính thức từ sự kiện, logic so khớp bằng JavaScript thuần và thiết kế phản hồi trung thành với bản sắc hình ảnh của trò chơi.', soulLinkPlay: 'Chơi',
      pexName: 'PEX Wiki', pexSummary: 'Trung tâm kiến thức học thuật dành cho sinh viên Khoa học Máy tính tại Centro Universitário União das Américas - UniAmérica. Hệ thống View với định tuyến SPA bằng Vanilla JS, hệ thống thiết kế \'Blurple Gamer\' ở chế độ tối, danh sách kiểm tra tương tác, các modal động cho 17 SDG của Liên Hợp Quốc và khả năng đáp ứng Mobile First.', pexLinkVisit: 'Thăm Wiki',
      darkName: 'Chế độ tối', mobileName: 'Di động', demoName: 'Ứng dụng Demo', demoSummary: 'Ứng dụng di động demo được xây dựng bằng React Native.',
      tagStat: 'Thống kê', tagComp: 'Cuộc thi', tagCert: 'Chứng nhận', tagArch: 'Kiến trúc', btnSourceCode: 'Mã nguồn'
    }
  },
  id: {
    ui: { back: 'Kembali', summary: 'Ringkasan', homeButton: 'Tombol Beranda — tutup aplikasi', navigate: 'navigasi', open: 'buka', project: 'proyek', projects: 'proyek', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'Selamat Datang di', welcomeSubtitle: 'Jelajahi portofolio dengan menavigasi aplikasi di ponsel. Setiap proyek terbuka di sini dengan detail lengkap.', post: 'postingan', posts: 'postingan', lang: 'bahasa', langs: 'bahasa', cert: 'sertifikat', certs: 'sertifikat' },
    items: {
      sobreMimName: 'Tentang Saya',
      sobreMimSummary: 'Saya Aster, Developer Frontend yang berfokus pada pembuatan antarmuka berkinerja tinggi dan arsitektur yang bersih. Saat ini di semester 5 Ilmu Komputer, saya membagi waktu antara coding dan memimpin komunitas teknis akademik.\n\nMinat saya pada pemrograman tidak dimulai dari teori, tetapi membedah sistem dalam praktiknya. Saat ini, saya menyalurkan rasa ingin tahu analitis ini untuk membangun aplikasi web yang aman dan kuat.\n\nDi luar repositori, saya menjaga pikiran tetap tajam dengan belajar bahasa Mandarin dan menganalisis e-sports. Saya juga berlatih secara disiplin untuk menyelesaikan triatlon Ironman.',
      blogName: 'Blog', blogProjName: 'Hackathon & Proyek', blogProjSummary: 'Di sini saya mendokumentasikan pembelajaran, partisipasi Hackathon, tantangan pengkodean, dan proyek grup.',
      certName: 'Sertifikasi', certProjName: 'Segera Hadir', certProjSummary: 'Ruang yang disiapkan untuk sertifikasi resmi dan ijazah teknis di masa mendatang.',
      cvName: 'Resume', cvSummary: '--- RINGKASAN PROFESIONAL ---\nDeveloper Frontend berfokus pada kinerja, skalabilitas, dan arsitektur sistem.\n\n--- TEKNOLOGI ---\nFrontend: React.js, Next.js, TS, Tailwind CSS.\nBack & Infra: Node.js, SQL, Vercel, Git/GitHub.\n\n--- SOROTAN ---\nSpesialis dalam penataan alur kerja dan PKM.',
      githubName: 'GitHub', githubSummary: 'Ini adalah Hub Rekayasa dan Kolaborasi saya. Lebih dari sekadar repositori file, ruang ini memusatkan pekerjaan saya di berbagai ekosistem teknis, di mana saya menerapkan pola arsitektur dan kepemimpinan proyek.\n\n--- PROFIL PRIBADI ---\nFokus pada eksperimen dengan tumpukan baru (React, Astro, Tailwind), alat utilitas, dan pengembangan inti dari portofolio ini.\n\n--- ORGANISASI DAN KOMUNITAS ---\n• Centro Universitário União das Américas - UniAmérica (Kepemimpinan Teknis): Saya mengoordinasikan repositori proyek ekstensi (PEX). Misi saya adalah memastikan standarisasi Wiki dokumentasi, meninjau Pull Request, dan membimbing siswa lain dalam pengorganisasian kode.\n• [Nama Org Lain]: Ruang yang disiapkan untuk kemitraan masa depan dan kontribusi pada proyek Open Source.',
      langName: 'Bahasa', frontName: 'Frontend', calcName: 'Ideal Calc', calcSummary: 'Kalkulator statistik interaktif yang menyilangkan 12 filter demografis dengan data mikro resmi IBGE (Sensus 2022, PNAD 2023) untuk mengungkap probabilitas nyata menemukan pasangan ideal di Brasil. Perhitungan waktu nyata, kartu viral yang dapat dibagikan, dan audit data lengkap.', calcLinkOpen: 'Buka Aplikasi',
      soulName: 'Soul Fighter: Memory', soulSummary: 'Game memori bertema yang terinspirasi oleh alam semesta Soul Fighter League of Legends. Mekanisme flip-kartu klasik dengan aset acara resmi, logika pencocokan JavaScript vanilla, dan desain responsivo yang setia pada identitas visual game.', soulLinkPlay: 'Main',
      pexName: 'PEX Wiki', pexSummary: 'Pusat pengetahuan akademik untuk mahasiswa Ilmu Komputer di Centro Universitário União das Américas - UniAmérica. Sistem tampilan dengan perutean SPA dalam Vanilla JS, sistem desain \'Blurple Gamer\' dalam mode gelap, daftar periksa interaktif, modal dinamis untuk 17 SDG PBB, dan responsivitas Mobile First.', pexLinkVisit: 'Kunjungi Wiki',
      darkName: 'Mode Gelap', mobileName: 'Seluler', demoName: 'Aplikasi Demo', demoSummary: 'Aplikasi seluler demo yang dibangun dengan React Native.',
      tagStat: 'Statistik', tagComp: 'Kompetisi', tagCert: 'Sertifikasi', tagArch: 'Arsitektur', btnSourceCode: 'Kode Sumber'
    }
  },
  fr: {
    ui: { back: 'Retour', summary: 'Résumé', homeButton: 'Bouton Accueil — fermer app', navigate: 'naviguer', open: 'ouvrir', project: 'projet', projects: 'projets', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'Bienvenue sur', welcomeSubtitle: 'Explorez le portfolio en naviguant à travers les applications sur le téléphone. Chaque projet s’ouvre ici avec tous les détails.', post: 'publication', posts: 'publications', lang: 'langue', langs: 'langues', cert: 'certificat', certs: 'certificats' },
    items: {
      sobreMimName: 'À Propos',
      sobreMimSummary: 'Je suis Aster, un développeur Frontend concentré sur la création d\'interfaces performantes et d\'architectures propres. Actuellement en 5ème semestre d\'Informatique, je partage mon temps entre le code et la direction d\'une communauté technique universitaire.\n\nMon intérêt pour la programmation a commencé par la rétro-ingénierie et les serveurs de jeux. Aujourd\'hui, je canalise cette curiosité analytique pour construire des applications web sécurisées.\n\nPour soutenir ce niveau d\'exigence technique, je m\'entraîne intensément avec pour objectif de terminer un triathlon Ironman. C\'est cette combinaison de constance et de résolution de problèmes que j\'apporte à l\'ingénierie logicielle.',
      blogName: 'Blog', blogProjName: 'Hackathons & Projets', blogProjSummary: 'Ici, je documenterai mes apprentissages, mes participations aux Hackathons, et mes projets de groupe.',
      certName: 'Certifications', certProjName: 'À venir', certProjSummary: 'Espace réservé aux futures certifications officielles et diplômes techniques.',
      cvName: 'CV', cvSummary: '--- RÉSUMÉ PROFESSIONNEL ---\nDéveloppeur Frontend concentré sur les performances et l\'architecture.\n\n--- STACK TECHNIQUE ---\nFrontend: React, Next.js, TS, Tailwind CSS.\nBack & Infra: Node.js, SQL, Vercel, Git/GitHub.\n\n--- POINTS FORTS ---\nSpécialiste de l\'organisation des flux de travail et du PKM.',
      githubName: 'GitHub', githubSummary: 'C\'est mon Hub d\'Ingénierie et de Collaboration. Plus qu\'un référentiel de fichiers, cet espace centralise mon travail dans différents écosystèmes techniques, où j\'applique des modèles d\'architecture et de direction de projets.\n\n--- PROFIL PERSONNEL ---\nFocus sur l\'expérimentation de nouvelles stacks (React, Astro, Tailwind), d\'outils utilitaires et le développement principal de ce portfolio.\n\n--- ORGANISATIONS ET COMMUNAUTÉS ---\n• Centro Universitário União das Américas - UniAmérica (Leadership Technique): Je coordonne les référentiels de projets d\'extension (PEX). Ma mission est d\'assurer la standardisation des Wikis de documentation, de revoir les Pull Requests et de guider d\'autres étudiants dans l\'organisation du code.\n• [Nom de l\'Autre Org]: Espace réservé aux futurs partenariats et contributions à des projets Open Source.',
      langName: 'Langue', frontName: 'Frontend', calcName: 'Ideal Calc', calcSummary: 'Calculateur statistique interactif croisant 12 filtres démographiques avec les microdonnées officielles de l\'IBGE (Recensement 2022, PNAD 2023) pour révéler la probabilité réelle de trouver le partenaire idéal au Brésil. Calcul en temps réel, carte virale partageable et audit complet des données.', calcLinkOpen: 'Ouvrir l\'App',
      soulName: 'Soul Fighter: Memory', soulSummary: 'Jeu de mémoire thématique inspiré de l\'univers Soul Fighter de League of Legends. Mécanique classique de retournement de cartes avec les assets officiels de l\'événement, logique de correspondance en JavaScript vanilla et design réactif fidèle à l\'identité visuelle du jeu.', soulLinkPlay: 'Jouer',
      pexName: 'PEX Wiki', pexSummary: 'Hub de connaissances académiques pour les étudiants en informatique du Centro Universitário União das Américas - UniAmérica. Système de vues avec routage SPA en Vanilla JS, système de design \'Blurple Gamer\' en mode sombre, listes de contrôle interactives, modaux dynamiques pour les 17 ODD de l\'ONU et réactivité Mobile First.', pexLinkVisit: 'Visiter le Wiki',
      darkName: 'Mode Sombre', mobileName: 'Mobile', demoName: 'App Demo', demoSummary: 'Application mobile de démonstration développée avec React Native.',
      tagStat: 'Statistiques', tagComp: 'Compétition', tagCert: 'Certification', tagArch: 'Architecture', btnSourceCode: 'Code Source'
    }
  },
  de: {
    ui: { back: 'Zurück', summary: 'Zusammenfassung', homeButton: 'Home-Button — App schließen', navigate: 'navigieren', open: 'öffnen', project: 'Projekt', projects: 'Projekte', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'Willkommen bei', welcomeSubtitle: 'Erkunden Sie das Portfolio, indem Sie durch die Apps auf dem Telefon navigieren. Jedes Projekt öffnet sich hier mit allen Details.', post: 'Beitrag', posts: 'Beiträge', lang: 'Sprache', langs: 'Sprachen', cert: 'Zertifikat', certs: 'Zertifikate' },
    items: {
      sobreMimName: 'Über Mich',
      sobreMimSummary: 'Ich bin Aster, ein Frontend-Entwickler, der sich auf die Erstellung leistungsstarker Schnittstellen und sauberer Architekturen konzentriert. Derzeit im 5. Semester Informatik teile ich meine Zeit zwischen dem Programmieren und der Leitung einer akademischen technischen Community auf.\n\nMein Interesse an der Programmierung begann mit Reverse Engineering und Gameservern. Heute nutze ich diese analytische Neugier, um sichere Webanwendungen zu erstellen.\n\nUm dieses Niveau der technischen Anforderung aufrechtzuerhalten, trainiere ich intensiv mit dem Ziel, einen Ironman-Triathlon zu absolvieren.',
      blogName: 'Blog', blogProjName: 'Hackathons & Projekte', blogProjSummary: 'Hier dokumentiere ich meine Erkenntnisse, Hackathon-Teilnahmen und Gruppenprojekte.',
      certName: 'Zertifizierungen', certProjName: 'Demnächst', certProjSummary: 'Reservierter Platz für zukünftige offizielle Zertifizierungen.',
      cvName: 'Lebenslauf', cvSummary: '--- BERUFLICHE ZUSAMMENFASSUNG ---\nFrontend-Entwickler mit Schwerpunkt auf Leistung und Architektur.\n\n--- TECH-STACK ---\nFrontend: React, Next.js, TS, Tailwind CSS.\nBack & Infra: Node.js, SQL, Vercel, Git/GitHub.\n\n--- HIGHLIGHTS ---\nSpezialist für Workflow-Strukturierung und PKM.',
      githubName: 'GitHub', githubSummary: 'Dies ist mein Engineering- und Collaboration-Hub. Mehr als ein Datei-Repository, zentralisiert dieser Raum meine Arbeit in verschiedenen technischen Ökosystemen, in denen ich Architekturmuster und Projektleitung anwende.\n\n--- PERSÖNLICHES PROFIL ---\nFokus auf das Experimentieren mit neuen Stacks (React, Astro, Tailwind), Dienstprogramm-Tools und die Kernentwicklung dieses Portfolios.\n\n--- ORGANISATIONEN UND GEMEINSCHAFTEN ---\n• Centro Universitário União das Américas - UniAmérica (Technische Leitung): Ich koordiniere die Repositories für Erweiterungsprojekte (PEX). Meine Mission ist es, die Standardisierung von Dokumentations-Wikis sicherzustellen, Pull Requests zu überprüfen und andere Studenten bei der Code-Organisation zu betreuen.\n• [Name einer anderen Organisation]: Reservierter Platz für zukünftige Partnerschaften und Beiträge zu Open-Source-Projekten.',
      langName: 'Sprache', frontName: 'Frontend', calcName: 'Ideal Calc', calcSummary: 'Interaktiver Statistik-Rechner, der 12 demografische Filter mit offiziellen IBGE-Mikrodaten (Zensus 2022, PNAD 2023) abgleicht, um die reale Wahrscheinlichkeit zu ermitteln, den idealen Partner in Brasilien zu finden. Echtzeit-Berechnung, teilbare virale Karte und vollständige Datenprüfung.', calcLinkOpen: 'App öffnen',
      soulName: 'Soul Fighter: Memory', soulSummary: 'Thematisches Memory-Spiel, inspiriert vom Soul Fighter-Universum aus League of Legends. Klassische Card-Flip-Mechanik mit offiziellen Event-Assets, Matching-Logik in Vanilla-JavaScript und responsives Design, das der visuellen Identität des Spiels treu bleibt.', soulLinkPlay: 'Spielen',
      pexName: 'PEX Wiki', pexSummary: 'Akademischer Wissens-Hub für Informatikstudierende am Centro Universitário União das Américas - UniAmérica. View-System mit SPA-Routing in Vanilla JS, \'Blurple Gamer\' Design-System im Dark Mode, interaktive Checklisten, dynamische Modale für die 17 UN-SDGs und Mobile First Responsivität.', pexLinkVisit: 'Wiki besuchen',
      darkName: 'Dunkelmodus', mobileName: 'Mobil', demoName: 'Demo-App', demoSummary: 'Demo-Mobilanwendung, erstellt mit React Native.',
      tagStat: 'Statistik', tagComp: 'Wettbewerb', tagCert: 'Zertifizierung', tagArch: 'Architektur', btnSourceCode: 'Quellcode'
    }
  },
  it: {
    ui: { back: 'Indietro', summary: 'Riepilogo', homeButton: 'Tasto Home — chiudi app', navigate: 'naviga', open: 'apri', project: 'progetto', projects: 'progetti', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'Benvenuto su', welcomeSubtitle: 'Esplora il portfolio navigando tra le app sul telefono. Ogni progetto si apre qui con tutti i dettagli.', post: 'post', posts: 'post', lang: 'lingua', langs: 'lingue', cert: 'certificato', certs: 'certificati' },
    items: {
      sobreMimName: 'Su di Me',
      sobreMimSummary: 'Sono Aster, uno sviluppatore Frontend concentrato sulla creazione di interfacce performanti e architetture pulite. Attualmente al 5º semestre di Informatica, divido il mio tempo tra il codice e la guida di una comunità tecnica accademica.\n\nIl mio interesse per la programmazione è iniziato con il reverse engineering e i server di gioco. Oggi incanalo questa curiosità analitica per costruire applicazioni web sicure.\n\nPer sostenere questo livello di esigenza tecnica, mi alleno intensamente con l\'obiettivo di completare un triathlon Ironman.',
      blogName: 'Blog', blogProjName: 'Hackathon & Progetti', blogProjSummary: 'Qui documenterò i miei apprendimenti, le partecipazioni agli Hackathon e i progetti di gruppo.',
      certName: 'Certificazioni', certProjName: 'In Arrivo', certProjSummary: 'Spazio riservato alle future certificazioni ufficiali.',
      cvName: 'Curriculum', cvSummary: '--- RIEPILOGO PROFESSIONALE ---\nSviluppatore Frontend focalizzato su prestazioni e architettura.\n\n--- STACK TECNICO ---\nFrontend: React, Next.js, TS, Tailwind CSS.\nBack & Infra: Node.js, SQL, Vercel, Git/GitHub.\n\n--- IN EVIDENZA ---\nSpecialista in strutturazione del flusso di lavoro e PKM.',
      githubName: 'GitHub', githubSummary: 'Questo è il mio Hub di Ingegneria e Collaborazione. Più che un repository di file, questo spazio centralizza il mio lavoro in diversi ecosistemi tecnici, dove applico pattern architetturali e leadership di progetto.\n\n--- PROFILO PERSONALE ---\nFocus sulla sperimentazione con nuovi stack (React, Astro, Tailwind), strumenti di utilità e lo sviluppo principale di questo portfolio.\n\n--- ORGANIZZAZIONI E COMUNITÀ ---\n• Centro Universitário União das Américas - UniAmérica (Leadership Tecnica): Coordino i repository dei progetti di estensione (PEX). La mia missione è garantire la standardizzazione delle Wiki di documentazione, rivedere le Pull Request e fare da mentore ad altri studenti nell\'organizzazione del codice.\n• [Nome di un\'altra Org]: Spazio riservato a future partnership e contributi a progetti Open Source.',
      langName: 'Lingua', frontName: 'Frontend', calcName: 'Ideal Calc', calcSummary: 'Calcolatore statistico interattivo che incrocia 12 filtri demografici con i microdati ufficiali IBGE (Censimento 2022, PNAD 2023) per rivelare la reale probabilità di trovare il partner ideale in Brasile. Calcolo in tempo reale, scheda virale condivisibile e audit completo dei dati.', calcLinkOpen: 'Apri App',
      soulName: 'Soul Fighter: Memory', soulSummary: 'Gioco di memoria a tema ispirato all\'universo Soul Fighter di League of Legends. Classica meccanica di rotazione delle carte con asset ufficiali dell\'evento, logica di abbinamento in JavaScript vanilla e design reattivo fedele all\'identità visiva del gioco.', soulLinkPlay: 'Gioca',
      pexName: 'PEX Wiki', pexSummary: 'Hub di conoscenza accademica per gli studenti di Informatica del Centro Universitário União das Américas - UniAmérica. Sistema di visualizzazione con routing SPA in Vanilla JS, sistema di design \'Blurple Gamer\' in modalità scura, checklist interattive, modali dinamici per i 17 OSS dell\'ONU e reattività Mobile First.', pexLinkVisit: 'Visita Wiki',
      darkName: 'Modalità Scura', mobileName: 'Mobile', demoName: 'App Demo', demoSummary: 'Applicazione mobile demo realizzata con React Native.',
      tagStat: 'Statistica', tagComp: 'Competizione', tagCert: 'Certificazione', tagArch: 'Architettura', btnSourceCode: 'Codice Sorgente'
    }
  },
  nl: {
    ui: { back: 'Terug', summary: 'Samenvatting', homeButton: 'Home-knop — app sluiten', navigate: 'navigeren', open: 'openen', project: 'project', projects: 'projecten', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'Welkom bij', welcomeSubtitle: 'Verken het portfolio door de apps op de telefoon te navigeren. Elk project wordt hier geopend met alle details.', post: 'bericht', posts: 'berichten', lang: 'taal', langs: 'talen', cert: 'certificaat', certs: 'certificaten' },
    items: {
      sobreMimName: 'Over Mij',
      sobreMimSummary: 'Ik ben Aster, een Frontend Developer gericht op het maken van performante interfaces en schone architecturen. Momenteel in het 5e semester Informatica, verdeel ik mijn tijd tussen coderen en het leiden van een academische technische gemeenschap.\n\nMijn interesse in programmeren begon met reverse engineering en gameservers. Vandaag gebruik ik deze analytische nieuwsgierigheid om veilige webapplicaties te bouwen.\n\nOm dit niveau van technische eis vol te houden, train ik intensief met als doel een Ironman-triatlon te voltooien.',
      blogName: 'Blog', blogProjName: 'Hackathons & Projecten', blogProjSummary: 'Hier documenteer ik mijn leerprocessen, deelnames aan Hackathons en groepsprojecten.',
      certName: 'Certificeringen', certProjName: 'Binnenkort', certProjSummary: 'Gereserveerde ruimte voor toekomstige officiële certificeringen.',
      cvName: 'Cv', cvSummary: '--- PROFESSIONELE SAMENVATTING ---\nFrontend Developer gericht op prestaties en architectuur.\n\n--- TECH STACK ---\nFrontend: React, Next.js, TS, Tailwind CSS.\nBack & Infra: Node.js, SQL, Vercel, Git/GitHub.\n\n--- HOOGTEPUNTEN ---\nSpecialist in workflow-structurering en PKM.',
      githubName: 'GitHub', githubSummary: 'Dit is mijn Engineering en Collaboration Hub. Meer dan een bestandsrepository, centraliseert deze ruimte mijn werk in verschillende technische ecosystemen, waar ik architectuurpatronen en projectleiderschap toepas.\n\n--- PERSOONLIJK PROFIEL ---\nFocus op het experimenteren met nieuwe stacks (React, Astro, Tailwind), utility-tools en de kernontwikkeling van dit portfolio.\n\n--- ORGANISATIES EN GEMEENSCHAPPEN ---\n• Centro Universitário União das Américas - UniAmérica (Technisch Leiderschap): Ik coördineer de repositories voor uitbreidingsprojecten (PEX). Mijn missie is om de standaardisatie van documentatie-wiki\'s te waarborgen, Pull Requests te beoordelen en andere studenten te begeleiden bij de code-organisatie.\n• [Andere Org Naam]: Ruimte gereserveerd voor toekomstige partnerschappen en bijdragen aan Open Source-projecten.',
      langName: 'Taal', frontName: 'Frontend', calcName: 'Ideal Calc', calcSummary: 'Interactieve statistische rekenmachine die 12 demografische filters kruist met officiële IBGE-microdata (Census 2022, PNAD 2023) om de werkelijke waarschijnlijkheid te onthullen van het vinden van de ideale partner in Brazilië. Real-time berekening, deelbare virale kaart en volledige gegevenscontrole.', calcLinkOpen: 'App openen',
      soulName: 'Soul Fighter: Memory', soulSummary: 'Thematisch geheugenspel geïnspireerd op het Soul Fighter-universum van League of Legends. Klassiek kaart-draai mechanisme met officiële evenement-assets, matching-logica in vanilla JavaScript en een responsief ontwerp dat trouw is aan de visuele identiteit van de game.', soulLinkPlay: 'Spelen',
      pexName: 'PEX Wiki', pexSummary: 'Academische kennishub voor studenten Informatica aan het Centro Universitário União das Américas - UniAmérica. View-systeem met SPA-routing in Vanilla JS, \'Blurple Gamer\' design-systeem in dark mode, interactieve checklists, dynamische modals voor de 17 SDG\'s van de VN en Mobile First responsiviteit.', pexLinkVisit: 'Bezoek Wiki',
      darkName: 'Donkere Modus', mobileName: 'Mobiel', demoName: 'Demo App', demoSummary: 'Demo mobiele applicatie gebouwd met React Native.',
      tagStat: 'Statistiek', tagComp: 'Competitie', tagCert: 'Certificering', tagArch: 'Architectuur', btnSourceCode: 'Broncode'
    }
  },
  ru: {
    ui: { back: 'Назад', summary: 'Резюме', homeButton: 'Кнопка Home — закрыть приложение', navigate: 'навигация', open: 'открыть', project: 'проект', projects: 'проекты', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'Добро пожаловать в', welcomeSubtitle: 'Изучите портфолио, перемещаясь по приложениям на телефоне. Здесь открывается каждый проект со всеми подробностями.', post: 'пост', posts: 'посты', lang: 'язык', langs: 'языки', cert: 'сертификат', certs: 'сертификаты' },
    items: {
      sobreMimName: 'Обо Мне',
      sobreMimSummary: 'Я Астер, Frontend-разработчик, специализирующийся на создании производительных интерфейсов и чистой архитектуры. В настоящее время я учусь на 5-м семестре компьютерных наук и делю свое время между кодированием и руководством академическим техническим сообществом.\n\nМой интерес к программированию начался с реверс-инжиниринга и игровых серверов. Сегодня я направляю это аналитическое любопытство на создание безопасных веб-приложений.\n\nЧтобы поддерживать этот уровень технических требований, я интенсивно тренируюсь с целью завершить триатлон Ironman.',
      blogName: 'Блог', blogProjName: 'Хакатоны и Проекты', blogProjSummary: 'Здесь я буду документировать свои знания, участие в хакатонах и групповых проектах.',
      certName: 'Сертификаты', certProjName: 'Скоро', certProjSummary: 'Зарезервированное место для будущих официальных сертификатов.',
      cvName: 'Резюме', cvSummary: '--- ПРОФЕССИОНАЛЬНОЕ РЕЗЮМЕ ---\nFrontend-разработчик, ориентированный на производительность и архитектуру.\n\n--- ТЕХНОЛОГИЧЕСКИЙ СТЕК ---\nFrontend: React, Next.js, TS, Tailwind CSS.\nBack & Infra: Node.js, SQL, Vercel, Git/GitHub.\n\n--- ОСОБЕННОСТИ ---\nСпециалист по структурированию рабочих процессов и PKM.',
      githubName: 'GitHub', githubSummary: 'Это мой Центр Инженерии и Сотрудничества. Это больше, чем просто файловый репозиторий, это пространство централизует мою работу в различных технических экосистемах, где я применяю архитектурные шаблоны и лидерство в проектах.\n\n--- ЛИЧНЫЙ ПРОФИЛЬ ---\nСосредоточен на экспериментах с новыми стеками (React, Astro, Tailwind), служебными инструментами и основной разработке этого портфолио.\n\n--- ОРГАНИЗАЦИИ И СООБЩЕСТВА ---\n• Centro Universitário União das Américas - UniAmérica (Техническое руководство): Я координирую репозитории проектов расширения (PEX). Моя миссия - обеспечить стандартизацию документационных Wiki, просматривать запросы на включение (Pull Requests) и наставлять других студентов в организации кода.\n• [Название другой организации]: Пространство зарезервировано для будущих партнерских отношений и вклада в проекты с открытым исходным кодом.',
      langName: 'Язык', frontName: 'Frontend', calcName: 'Ideal Calc', calcSummary: 'Интерактивный статистический калькулятор, сопоставляющий 12 демографических фильтров с официальными микроданными IBGE (Перепись 2022, PNAD 2023), чтобы выявить реальную вероятность найти идеального партнера в Бразилии. Расчет в реальном времени, вирусная карточка для соцсетей и полный аудит данных.', calcLinkOpen: 'Открыть приложение',
      soulName: 'Soul Fighter: Memory', soulSummary: 'Тематическая игра на развитие памяти, вдохновленная вселенной Soul Fighter из League of Legends. Классическая механика переворачивания карт с официальными ресурсами события, логика сопоставления на чистом JavaScript и адаптивный дизайн, верный визуальному стилю игры.', soulLinkPlay: 'Играть',
      pexName: 'PEX Wiki', pexSummary: 'Академический центр знаний для студентов компьютерных наук в Centro Universitário União das Américas - UniAmérica. Система представлений с SPA-маршрутизацией на чистом JS, дизайн-система \'Blurple Gamer\' в темном режиме, интерактивные чек-листы, динамические модальные окна для 17 ЦУР ООН и адаптивность Mobile First.', pexLinkVisit: 'Посетить Wiki',
      darkName: 'Темный Режим', mobileName: 'Мобильный', demoName: 'Демо-приложение', demoSummary: 'Демонстрационное мобильное приложение, созданное с помощью React Native.',
      tagStat: 'Статистика', tagComp: 'Соревнование', tagCert: 'Сертификация', tagArch: 'Архитектура', btnSourceCode: 'Исходный Код'
    }
  },
  ar: {
    ui: { back: 'رجوع', summary: 'ملخص', homeButton: 'زر الصفحة الرئيسية — إغلاق التطبيق', navigate: 'تنقل', open: 'فتح', project: 'مشروع', projects: 'مشاريع', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'مرحبًا بك في', welcomeSubtitle: 'استكشف المحفظة من خلال التنقل عبر التطبيقات الموجودة على الهاتف. يفتح كل مشروع هنا بكامل تفاصيله.', post: 'منشور', posts: 'منشورات', lang: 'لغة', langs: 'لغات', cert: 'شهادة', certs: 'شهادات' },
    items: {
      sobreMimName: 'عني',
      sobreMimSummary: 'أنا آستر ، مطور واجهة أمامية أركز على إنشاء واجهات عالية الأداء وبنيات نظيفة. أدرس حاليًا في الفصل الدراسي الخامس لعلوم الكمبيوتر وأقسم وقتي بين كتابة التعليمات البرمجية وقيادة مجتمع تقني أكاديمي.\n\nبدأ اهتمامي بالبرمجة بالهندسة العكسية وخوادم الألعاب. اليوم، أقوم بتوجيه هذا الفضول التحليلي لبناء تطبيقات ويب آمنة.\n\nللحفاظ على هذا المستوى من المتطلبات الفنية، أتدرب بشكل مكثف بهدف إكمال سباق الترياتلون Ironman.',
      blogName: 'مدونة', blogProjName: 'الهاكاثون والمشاريع', blogProjSummary: 'هنا سأقوم بتوثيق ما تعلمته ومشاركاتي في الهاكاثون والمشاريع الجماعية.',
      certName: 'الشهادات', certProjName: 'قريباً', certProjSummary: 'مساحة محجوزة للشهادات الرسمية المستقبلية.',
      cvName: 'سيرة ذاتية', cvSummary: '--- ملخص مهني ---\nمطور واجهة أمامية يركز على الأداء والهندسة المعمارية.\n\n--- مجموعة التقنيات ---\nالواجهة الأمامية: React, Next.js, TS, Tailwind CSS.\nالخلفية والبنية التحتية: Node.js, SQL, Vercel, Git/GitHub.\n\n--- الميزات ---\nمتخصص في هيكلة سير العمل و PKM.',
      githubName: 'GitHub', githubSummary: 'هذا هو مركز الهندسة والتعاون الخاص بي. أكثر من مجرد مستودع ملفات، يركز هذا المساحة عملي في النظم البيئية التقنية المختلفة، حيث أطبق أنماط الهندسة المعمارية وقيادة المشاريع.\n\n--- الملف الشخصي ---\nالتركيز على تجربة حزم جديدة (React, Astro, Tailwind)، وأدوات مساعدة، والتطوير الأساسي لهذا المحفظة.\n\n--- المنظمات والمجتمعات ---\n• Centro Universitário União das Américas - UniAmérica (القيادة الفنية): أقوم بتنسيق مستودعات مشاريع التمديد (PEX). مهمتي هي ضمان توحيد مواقع توثيق الويكي، ومراجعة طلبات السحب (Pull Requests)، وتوجيه الطلاب الآخرين في تنظيم الكود.\n• [اسم منظمة أخرى]: مساحة محجوزة للشراكات المستقبلية والمساهمات في مشاريع مفتوحة المصدر.',
      langName: 'لغة', frontName: 'واجهة أمامية', calcName: 'Ideal Calc', calcSummary: 'حاسبة إحصائية تفاعلية تقاطع 12 فلترًا ديموغرافيًا مع بيانات IBGE الرسمية (تعداد 2022، PNAD 2023) للكشف عن الاحتمالية الحقيقية للعثور على الشريك المثالي في البرازيل. حساب في الوقت الفعلي، بطاقة فيروسية قابلة للمشاركة، وتدقيق كامل للبيانات.', calcLinkOpen: 'فتح التطبيق',
      soulName: 'Soul Fighter: Memory', soulSummary: 'لعبة ذاكرة ذات طابع مستوحى من عالم Soul Fighter لـ League of Legends. ميكانيكا تقليب البطاقات الكلاسيكية مع أصول الحدث الرسمية، ومنطق مطابقة بلغة JavaScript الأصلية، وتصميم مستجيب مخلص للهوية البصرية للعبة.', soulLinkPlay: 'العب',
      pexName: 'PEX Wiki', pexSummary: 'مركز المعرفة الأكاديمية لطلاب علوم الكمبيوتر في Centro Universitário União das Américas - UniAmérica. نظام عرض مع توجيه SPA بلغة Vanilla JS، ونظام تصميم \'Blurple Gamer\' في الوضع المظلم، وقوائم مراجعة تفاعلية، ونوافذ منبثقة ديناميكية لأهداف التنمية المستدامة الـ 17 للأمم المتحدة، واستجابة Mobile First.', pexLinkVisit: 'زيارة الويكي',
      darkName: 'الوضع المظلم', mobileName: 'هاتف محمول', demoName: 'تطبيق تجريبي', demoSummary: 'تطبيق محمول تجريبي تم إنشاؤه باستخدام React Native.',
      tagStat: 'إحصائيات', tagComp: 'مسابقة', tagCert: 'شهادة', tagArch: 'هندسة معمارية', btnSourceCode: 'شفرة المصدر'
    }
  },
  pt: {
    ui: { back: 'Voltar', summary: 'Resumo', homeButton: 'Botão Home — fechar app', navigate: 'navegar', open: 'abrir', project: 'projeto', projects: 'projetos', booting: '[ ASTER_OS BOOT ]', welcomeTitle: 'Bem-vindo ao', welcomeSubtitle: 'Explore o portfólio navegando pelas apps no telemóvel. Cada projeto abre aqui com todos os detalhes.', post: 'publicação', posts: 'publicações', lang: 'idioma', langs: 'idiomas', cert: 'certificado', certs: 'certificados' },
    items: {
      sobreMimName: 'Sobre Mim',
      sobreMimSummary: 'Sou o Aster, Desenvolvedor Frontend focado em criar interfaces performáticas e arquiteturas limpas. Atualmente no 5º semestre de Ciência da Computação, divido o meu tempo entre o código e a liderança de uma comunidade técnica académica, onde orquestro projetos colaborativos e auxilio no nivelamento de outros estudantes.\n\nO meu interesse por programação não começou na teoria, mas dissecando sistemas na prática. A porta de entrada foi a configuração de servidores de jogos online e a engenharia reversa para a criação de cheats. Essa exploração forçou-me a entender desde cedo como a memória de uma máquina funciona, como intercetar fluxos de dados e como a lógica de um sistema opera em baixo nível. Hoje, canalizo essa mesma curiosidade analítica para construir aplicações web seguras e robustas.\n\nFora dos repositórios, mantenho a mente afiada estudando Mandarim e analisando cenários competitivos de e-sports. Para sustentar esse nível de exigência técnica, aplico uma disciplina inegociável na vida real: treino intensamente com a meta de completar um triathlon Ironman. É essa combinação de consistência, resolução de problemas complexos e execução pragmática que entrego na engenharia de software.',
      blogName: 'Blog', blogProjName: 'Hackathons & Projetos', blogProjSummary: 'Aqui documentarei as minhas aprendizagens, participações em Hackathons, desafios de código e projetos em grupo. A ideia é mostrar não só o código final, mas o processo de engenharia.',
      certName: 'Certificações', certProjName: 'Em Breve', certProjSummary: 'Espaço reservado para as futuras certificações oficiais e diplomas técnicos.',
      cvName: 'Currículo', cvSummary: '--- RESUMO PROFISSIONAL ---\nDesenvolvedor Frontend focado em performance, escalabilidade e arquitetura de sistemas. Atualmente no 5º semestre de Ciência da Computação, com experiência prática na liderança de comunidades técnicas e gestão de projetos colaborativos.\n\n--- FORMAÇÃO E COMUNIDADE ---\nCiência da Computação – UniAmérica (5º Semestre).\nLiderança Técnica: Fundador de comunidade académica com foco em mentoria e governança de projetos no GitHub.\n\n--- STACK TÉCNICA ---\nFrontend: React.js, Next.js, Vue.js, Astro, JavaScript (ES6+), Tailwind CSS, Bootstrap.\nBack & Infra: Node.js, SQL, Vercel, Cloudflare, Git/GitHub.\nMobile & Outros: Flutter, Dart, C++.\nProdutividade: Notion, Obsidian.\n\n--- DIFERENCIAIS ---\nOrganização e Fluxo: Especialista em estruturação de fluxos de trabalho e documentação utilizando Notion e Obsidian (PKM).\nIdiomas: Inglês Avançado; Mandarim e Japonês (Em aprendizagem).',
      githubName: 'GitHub', githubSummary: 'Este é o meu Hub de Engenharia e Colaboração. Mais do que um repositório de ficheiros, este espaço centraliza a minha atuação em diferentes ecossistemas técnicos, onde aplico padrões de arquitetura e liderança de projetos.\n\n---  PERFIL PESSOAL ---\nFoco na experimentação de novas stacks (React, Astro, Tailwind), ferramentas utilitárias e no desenvolvimento core deste portfólio.\n\n---  ORGANIZAÇÕES E COMUNIDADES ---\n• Centro Universitário União das Américas - UniAmérica (Liderança Técnica): Atuo na coordenação dos repositórios de projetos de extensão (PEX). A minha missão é garantir a padronização das Wikis de documentação, rever Pull Requests e mentorar outros estudantes na organização do código.\n• [Nome de Outra Org]: Espaço reservado para futuras parcerias e contribuições em projetos Open Source.',
      langName: 'Tradução', frontName: 'Frontend', calcName: 'Ideal Calc', calcSummary: 'Calculadora estatística interativa que cruza 12 filtros demográficos com microdados oficiais do IBGE (Censo 2022, PNAD 2023) para revelar a probabilidade real de encontrar o parceiro ideal no Brasil. Cálculo em tempo real, card viral partilhável e auditoria completa de dados.', calcLinkOpen: 'Abrir App',
      soulName: 'Soul Fighter: Memory Game', soulSummary: 'Jogo da memória temático inspirado no universo Soul Fighter de League of Legends. Mecânica clássica de card-flip com assets oficiais do evento, lógica de matching em JavaScript vanilla e design responsivo fiel à identidade visual do game.', soulLinkPlay: 'Jogar',
      pexName: 'PEX Wiki', pexSummary: 'Hub de conhecimento académico para alunos de Ciência da Computação do Centro Universitário União das Américas - UniAmérica. Sistema de Views com roteamento SPA em Vanilla JS, design system \'Blurple Gamer\' em dark mode, checklists interativos, modais dinâmicos para os 17 ODS da ONU e responsividade Mobile First.', pexLinkVisit: 'Visitar Wiki',
      darkName: 'Modo Escuro', mobileName: 'Mobile', demoName: 'App Demo', demoSummary: 'Aplicação mobile de demonstração construída com React Native.',
      tagStat: 'Estatística', tagComp: 'Competição', tagCert: 'Certificação', tagArch: 'Arquitetura', btnSourceCode: 'Código Fonte'
    }
  }
};

export function getUITranslations(lang: Language) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return t.ui;
}

// ─── Data ────────────────────────────────────────────────────

/**
 * Returns Home screen items for a specific language.
 */
export function getHomeItems(lang: Language): GridItem[] {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const itemsText = t.items;

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
