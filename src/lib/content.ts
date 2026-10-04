import type { ImgKey } from "./images";

export type Lang = "bg" | "en";
export const LANGS: Lang[] = ["bg", "en"];

type Card = { title: string; text: string; img: ImgKey; alt: string };
type WorkItem = { cat: "photo" | "mapping" | "3d"; title: string; img: ImgKey; alt: string };

export type Content = {
  meta: { title: string; description: string };
  nav: { home: string; photo: string; mapping: string; d3: string; work: string; about: string; contact: string; cta: string; menu: string; close: string };
  hero: { eyebrow: string; line1: string; line2: string; text: string; tags: string[]; cta: string; secondary: string; alt: string };
  idea: { words: string[]; statement: string; text: string };
  photo: { label: string; title: string; text: string; cats: Card[] };
  events: { label: string; title: string; text: string; items: Card[] };
  mapping: { label: string; title: string; text: string; steps: string[]; problemsTitle: string; problems: Card[]; outputsTitle: string; outputs: Card[]; orthoTitle: string; orthoText: string; orthoNote: string; orthoAlt: string };
  b3d: { label: string; title: string; text: string; problemsTitle: string; problems: Card[]; note: string };
  evp: { label: string; title: string; text: string; qtyLabel: string; items: Card[]; audience: string };
  why: { title: string; text: string; verbs: string[]; second: string; secondText: string };
  work: { label: string; title: string; filters: { all: string; photo: string; mapping: string; d3: string }; items: WorkItem[] };
  process: { label: string; title: string; steps: { t: string; d: string }[]; line: string };
  about: { label: string; title: string; text: string; points: string[] };
  contact: { title: string; text: string; phone: string; email: string };
  form: { name: string; email: string; phone: string; company: string; optional: string; type: string; types: { photo: string; mapping: string; d3: string; other: string }; message: string; submit: string; sending: string; success: string; error: string; captcha: string; required: string; invalidEmail: string; notConfigured: string };
  footer: { tagline: string; rights: string; follow: string };
  problemWord: string;
};

const bg: Content = {
  meta: {
    title: "AirProPix — Фото и видео, картографиране и 3D",
    description: "Професионално фото и видео заснемане, дрон картографиране, ортофото, измервания, 3D прототипи и персонализирани продукти за събития.",
  },
  nav: { home: "Начало", photo: "Фото и видео", mapping: "Картографиране", d3: "3D", work: "Нашата работа", about: "За нас", contact: "Контакт", cta: "Започнете проект", menu: "Меню", close: "Затвори" },
  hero: {
    eyebrow: "Идея. Възможност. Реалност. Резултат.",
    line1: "Заснемаме реалността.",
    line2: "Превръщаме я в нещо повече.",
    text: "От професионално визуално съдържание до пространствени данни и 3D решения — превръщаме реалните проекти в нещо, което можете да видите, разберете и използвате.",
    tags: ["Фото и видео", "Картографиране", "3D"],
    cta: "Започнете проект",
    secondary: "Вижте работата ни",
    alt: "Ортофото на строителен терен, облак от точки на таблет, 3D принтирана механична част, табелка за сватбена маса и професионален фотоапарат",
  },
  idea: {
    words: ["Идея", "Възможност", "Реалност", "Резултат"],
    statement: "Идеята е само началото.",
    text: "Имот, събитие, продукт, терен или техническа идея — правим ги видими, измерими, разбираеми, моделирани или създадени.",
  },
  photo: {
    label: "01 — Фото и видео",
    title: "Визуално съдържание, което работи за вас",
    text: "Професионално заснето, естествено и детайлно — за бизнеса, пространствата и моментите, които имат значение.",
    cats: [
      { title: "Недвижими имоти", text: "Интериорни и екстериорни кадри, които представят имота ясно и привлекателно.", img: "pvRealestate", alt: "Професионално заснет модерен хол с големи прозорци и изглед към града" },
      { title: "Архитектура и интериор", text: "Пространство, материали, светлина и композиция.", img: "pvArchitecture", alt: "Фасада от бетон и дърво със силна светлина и сянка" },
      { title: "Събития", text: "Сватби, рождени дни, частни и корпоративни събития — атмосферата и емоцията.", img: "pvEvents", alt: "Гости се смеят на украсена сватбена маса със свещи и цветя" },
      { title: "Корпоративно заснемане", text: "Хора, екипи и работна среда за силно бизнес присъствие.", img: "pvCorporate", alt: "Екип обсъжда проект в светъл модерен офис" },
      { title: "Продуктово заснемане", text: "Контролирано осветление и прецизни детайли за всеки продукт.", img: "pvProduct", alt: "Керамична чаша и стъклена бутилка на каменен постамент със студийно осветление" },
      { title: "Дрон фото и видео", text: "Въздушна перспектива за имоти, бизнеси, събития и строителство.", img: "pvDrone", alt: "Въздушна снимка на жилищен комплекс и парк при залез" },
    ],
  },
  events: {
    label: "Събития",
    title: "Моментите, които остават",
    text: "Естествени, атмосферни и висококачествени кадри от сватби, рождени дни, частни празненства и корпоративни събития.",
    items: [
      { title: "Сватби", text: "", img: "evDance", alt: "Младоженци танцуват сред гостите под светлинни гирлянди" },
      { title: "Рождени дни", text: "", img: "evBirthday", alt: "Приятели празнуват рожден ден около торта с искрящи свещички" },
      { title: "Корпоративни събития", text: "", img: "evCorporate", alt: "Гости в официално облекло разговарят на корпоративна вечеря" },
      { title: "Детайли", text: "", img: "evDetails", alt: "Елегантна сватбена маса с бели цветя, свещи и кристални чаши" },
    ],
  },
  mapping: {
    label: "02 — Картографиране",
    title: "Пространствени данни, които можете да измерите",
    text: "Въздушно заснемане, пространствена обработка и анализ — с измерими резултати за строителство, проектиране и управление на терени.",
    steps: ["Планиране", "Заснемане", "Обработка", "Анализ", "Предаване"],
    problemsTitle: "Какъв проблем решаваме?",
    problems: [
      { title: "Труден достъп", text: "Някои терени и обекти е трудно или неефективно да се огледат на място.", img: "mpAccess", alt: "Въздушен изглед на стръмен скалист терен с тесен черен път" },
      { title: "Рискови зони", text: "Някои обекти излагат хората на ненужен риск по време на оглед.", img: "mpRisk", alt: "Кариера със стръмни нестабилни скални откоси" },
      { title: "Големи площи", text: "Ръчното документиране на големи площи изисква значителни ресурси на терен.", img: "mpLarge", alt: "Въздушно заснемане на обширни земеделски парцели с линии на полета" },
      { title: "Ресурси на терен", text: "Традиционното документиране често изисква повече хора и повторни посещения.", img: "mpField", alt: "Геодезист поставя опорна точка до GNSS приемник на строителен обект" },
      { title: "Липса на пространствен контекст", text: "Обикновената снимка не дава същия обзор и измерим контекст.", img: "mpContext", alt: "Сравнение между обикновена снимка на парцел и ортофото с хоризонтали и размери" },
      { title: "Измервания", text: "Разстояния, площи, коти, обеми на изкопи и насипи, денивелации и строителен прогрес.", img: "outMeasure", alt: "Парцел до път с нанесени измервания на разстояние, площ и коти" },
    ],
    outputsTitle: "Какво получавате",
    outputs: [
      { title: "Ортофото", text: "Геореферирано изображение с точен мащаб.", img: "outOrtho", alt: "Ортофото на населено място с нанесени имотни граници" },
      { title: "Облак от точки", text: "Плътни 3D данни за обекти и терени.", img: "outPointcloud", alt: "Цветен облак от точки на църква и околни сгради" },
      { title: "3D модел", text: "Текстуриран модел на обекта.", img: "out3dmodel", alt: "Текстуриран 3D модел на индустриална сграда и двор" },
      { title: "Дигитален модел на терена", text: "Релеф, коти и хоризонтали.", img: "outDtm", alt: "Дигитален модел на терена с цветова скала на надморската височина" },
      { title: "Измервания", text: "Разстояния, площи и коти.", img: "outMeasure", alt: "Измерване на площ и разстояние върху въздушна снимка на парцел" },
      { title: "Документиране на обекти", text: "Детайлна визуална документация.", img: "outSitedoc", alt: "Документиране на мостова опора с маркирани точки за оглед" },
      { title: "Изкопи и насипи", text: "Изчисляване на обеми.", img: "outEarthworks", alt: "Изкоп с купчина земна маса и изчислен обем" },
      { title: "Строителен прогрес", text: "Сравнение във времето.", img: "outProgress", alt: "Сравнение на строителен обект в два етапа на изграждане" },
    ],
    orthoTitle: "Ортофото",
    orthoText: "Точно, геореферирано изображение на терена — пътища, сгради, релеф и граници в един мащабиран слой, готов за анализ и измерване.",
    orthoNote: "Кадастрални граници и други пространствени слоеве могат да бъдат визуализирани върху ортофото при наличие на съответните данни.",
    orthoAlt: "Ортофото на строителен терен с нанесени имотни граници",
  },
  b3d: {
    label: "03 — 3D за бизнеса",
    title: "От CAD модел до функционална част",
    text: "Прототипи, функционални и резервни части, корпуси, механични компоненти и малки серии — 3D моделиране и производство за реални задачи.",
    problemsTitle: "Какъв проблем решаваме?",
    problems: [
      { title: "Инструменти и матрици", text: "Традиционното производство може да изисква сериозна първоначална инвестиция в матрици и инструменти.", img: "t3dTooling", alt: "Отворена стоманена матрица за леене на пластмаса" },
      { title: "Инжекционно формоване при малки количества", text: "Инжекционното формоване (injection molding) често е неефективно за прототипи и много малки количества.", img: "t3dInjection", alt: "Машина за инжекционно формоване с готови пластмасови детайли" },
      { title: "Промени в дизайна", text: "Промените след подготовка на инструментите добавят разходи и време.", img: "t3dIteration", alt: "CAD версия 1 и версия 2 на корпус до два физически прототипа" },
      { title: "Прототипиране", text: "Традиционното прототипиране изисква значителна подготовка.", img: "t3dPrototype", alt: "3D прототип на функционален механичен корпус до неговия CAD модел" },
      { title: "Резервни части", text: "Някои части са спрени от производство, липсват или трудно се намират.", img: "t3dReplacement", alt: "Нова 3D принтирана зъбна част до счупения оригинал" },
      { title: "Малки серии", text: "Традиционното производство е неефективно за много малки количества.", img: "t3dBatch", alt: "Малка серия от двадесет еднакви 3D принтирани корпуса" },
    ],
    note: "За подходящи прототипи и малки серии адитивното производство може да намали или избегне нуждата от първоначални инструменти.",
  },
  evp: {
    label: "3D за събития и персонализация",
    title: "Персонализирани продукти за събития",
    text: "Елегантни табелки за маси, табелки с имена, кейк топери, подаръци за гости, сувенири и корпоративни подаръци — създадени специално за вашето събитие.",
    qtyLabel: "Бройки",
    audience: "За сватби, рождени дни, частни и корпоративни събития, организатори, агенции и бизнеси.",
    items: [
      { title: "Табелки за маси", text: "", img: "evpTable", alt: "Елегантна сватбена маса с персонализиран номер, цветя и свещи" },
      { title: "Табелки с имена", text: "", img: "evpName", alt: "Персонализирана табелка с име върху сервирана чиния" },
      { title: "Кейк топери", text: "", img: "evpCake", alt: "Сватбена торта с персонализиран кейк топер с инициали" },
      { title: "Подаръци и сувенири", text: "", img: "evpGifts", alt: "Персонализирани подаръци и ключодържатели за сватбени гости" },
      { title: "Декорации за рожден ден", text: "", img: "evpBirthday", alt: "Персонализиран декоративен номер 30 до торта и балони" },
      { title: "Корпоративни подаръци", text: "", img: "evpCorporate", alt: "Брандирани органайзери и стойки за телефон като корпоративни подаръци" },
      { title: "Малки фигурки", text: "", img: "evpFigurine", alt: "Персонализирана фигурка на танцуваща двойка на сватбена маса" },
    ],
  },
  why: {
    title: "Идеята е само началото.",
    text: "Една идея става полезна, когато може да бъде:",
    verbs: ["видяна", "разбрана", "измерена", "моделирана", "създадена"],
    second: "Разликата е в детайла.",
    secondText: "Визуалното, пространственото и триизмерното се допълват — един екип, един процес, един резултат.",
  },
  work: {
    label: "Избрани проекти",
    title: "Нашата работа",
    filters: { all: "Всички", photo: "Фото и видео", mapping: "Картографиране", d3: "3D" },
    items: [
      { cat: "photo", title: "Сватбено тържество", img: "pvEvents", alt: "Гости на сватбена вечеря" },
      { cat: "mapping", title: "Ортофото на населено място", img: "outOrtho", alt: "Ортофото с имотни граници" },
      { cat: "3d", title: "Функционален прототип", img: "t3dPrototype", alt: "3D прототип на механичен корпус" },
      { cat: "photo", title: "Архитектура", img: "pvArchitecture", alt: "Фасада от бетон и дърво" },
      { cat: "mapping", title: "Облак от точки", img: "outPointcloud", alt: "Облак от точки на църква" },
      { cat: "3d", title: "Табелки за маси", img: "evpTable", alt: "Табелка за сватбена маса" },
      { cat: "photo", title: "Продуктово заснемане", img: "pvProduct", alt: "Продуктова снимка на чаша и бутилка" },
      { cat: "mapping", title: "Изкопни работи", img: "outEarthworks", alt: "Изкоп с изчислен обем" },
      { cat: "3d", title: "Малка серия корпуси", img: "t3dBatch", alt: "Серия 3D принтирани корпуси" },
    ],
  },
  process: {
    label: "Процес",
    title: "Как работим",
    steps: [
      { t: "Идея", d: "Започваме от вашата цел." },
      { t: "Разбиране", d: "Изясняваме нуждите и контекста." },
      { t: "Заснемане / Картографиране / Моделиране", d: "Избираме правилния подход." },
      { t: "Обработка", d: "Прецизна работа с данни и детайли." },
      { t: "Резултат", d: "Готов за използване продукт." },
    ],
    line: "Заснеми. Картографирай. Моделирай. Създай.",
  },
  about: {
    label: "За нас",
    title: "Една компания. Един подход.",
    text: "AirProPix съчетава визуален опит, пространствено мислене и 3D моделиране в професионален работен процес с практични резултати.",
    points: ["Визуална експертиза", "Пространствени данни", "3D моделиране и производство", "Професионален процес"],
  },
  contact: { title: "Имате проект?", text: "Разкажете ни какво искате да заснемете, измерите или създадете.", phone: "+359 892 061 977", email: "contact@airpropix.com" },
  form: {
    name: "Име", email: "Имейл", phone: "Телефон", company: "Компания", optional: "по избор", type: "Тип проект",
    types: { photo: "Фото и видео", mapping: "Картографиране", d3: "3D", other: "Друго" },
    message: "Съобщение", submit: "Изпратете запитване", sending: "Изпращане…",
    success: "Благодарим Ви. Вашето запитване беше изпратено.",
    error: "Възникна грешка при изпращането. Моля, опитайте отново или ни пишете на contact@airpropix.com.",
    captcha: "Моля, потвърдете, че не сте робот.", required: "Задължително поле.", invalidEmail: "Невалиден имейл адрес.",
    notConfigured: "Формата временно не е активна. Моля, свържете се с нас по телефон или имейл.",
  },
  footer: { tagline: "Заснеми. Картографирай. Моделирай. Създай.", rights: "Всички права запазени.", follow: "Последвайте ни" },
  problemWord: "Проблем",
};

const en: Content = {
  meta: {
    title: "AirProPix — Photo & Video, Mapping and 3D",
    description: "Professional photo and video, drone mapping, orthophotos, measurements, 3D prototypes and personalized event products.",
  },
  nav: { home: "Home", photo: "Photo & Video", mapping: "Mapping", d3: "3D", work: "Our Work", about: "About", contact: "Contact", cta: "Start a project", menu: "Menu", close: "Close" },
  hero: {
    eyebrow: "Idea. Possibility. Reality. Result.",
    line1: "We capture reality.",
    line2: "We turn it into something more.",
    text: "From professional visual content to spatial data and 3D solutions — we turn real projects into something you can see, understand and use.",
    tags: ["Photo & Video", "Mapping", "3D"],
    cta: "Start a project",
    secondary: "See our work",
    alt: "Orthophoto of a construction site, point cloud on a tablet, 3D printed mechanical part, wedding table number and a professional camera",
  },
  idea: {
    words: ["Idea", "Possibility", "Reality", "Result"],
    statement: "The idea is only the beginning.",
    text: "A property, an event, a product, a terrain or a technical idea — we make it visible, measurable, understandable, modelled or made.",
  },
  photo: {
    label: "01 — Photo & Video",
    title: "Visual content that works for you",
    text: "Professionally captured, natural and detailed — for businesses, spaces and the moments that matter.",
    cats: [
      { title: "Real Estate", text: "Interior and exterior imagery that presents a property clearly and attractively.", img: "pvRealestate", alt: "Professionally photographed modern living room with large windows and city view" },
      { title: "Architecture & Interiors", text: "Space, materials, light and composition.", img: "pvArchitecture", alt: "Concrete and timber facade with strong light and shadow" },
      { title: "Events", text: "Weddings, birthdays, private and corporate events — the atmosphere and emotion.", img: "pvEvents", alt: "Guests laughing at a decorated wedding table with candles and flowers" },
      { title: "Corporate Photography", text: "People, teams and workplaces for a strong business presence.", img: "pvCorporate", alt: "Team discussing a project in a bright modern office" },
      { title: "Product Photography", text: "Controlled lighting and precise detail for every product.", img: "pvProduct", alt: "Ceramic cup and glass bottle on a stone plinth under studio lighting" },
      { title: "Drone Photo & Video", text: "Aerial perspective for properties, businesses, events and construction.", img: "pvDrone", alt: "Aerial photo of a residential complex and park at sunset" },
    ],
  },
  events: {
    label: "Events",
    title: "The moments that stay",
    text: "Natural, atmospheric, high-quality imagery from weddings, birthdays, private celebrations and corporate events.",
    items: [
      { title: "Weddings", text: "", img: "evDance", alt: "Bride and groom dancing among guests under string lights" },
      { title: "Birthdays", text: "", img: "evBirthday", alt: "Friends celebrating a birthday around a cake with sparklers" },
      { title: "Corporate Events", text: "", img: "evCorporate", alt: "Guests in formal attire talking at a corporate dinner" },
      { title: "Details", text: "", img: "evDetails", alt: "Elegant wedding table with white flowers, candles and crystal glasses" },
    ],
  },
  mapping: {
    label: "02 — Mapping",
    title: "Spatial data you can measure",
    text: "Aerial capture, spatial processing and analysis — with measurable outputs for construction, design and land management.",
    steps: ["Plan", "Capture", "Process", "Analyze", "Deliver"],
    problemsTitle: "What problem do we solve?",
    problems: [
      { title: "Difficult access", text: "Some terrain and locations are difficult or inefficient to inspect physically.", img: "mpAccess", alt: "Aerial view of steep rocky terrain with a narrow dirt road" },
      { title: "Risky areas", text: "Some locations can expose people to unnecessary risk during inspection.", img: "mpRisk", alt: "Quarry with steep unstable rock faces" },
      { title: "Large areas", text: "Large areas require significant field resources when documented manually.", img: "mpLarge", alt: "Aerial survey of large agricultural parcels with flight lines" },
      { title: "Field resources", text: "Traditional documentation can require more personnel and repeated site visits.", img: "mpField", alt: "Surveyor placing a ground control point next to a GNSS rover on a construction site" },
      { title: "Lack of spatial context", text: "Ordinary photography does not provide the same overview and measurable context.", img: "mpContext", alt: "Comparison of an ordinary photo of a plot and an orthophoto with contours and dimensions" },
      { title: "Measurements", text: "Distances, areas, elevations, excavation and embankment volumes, terrain differences and construction progress.", img: "outMeasure", alt: "Plot beside a road with distance, area and elevation measurements" },
    ],
    outputsTitle: "What you receive",
    outputs: [
      { title: "Orthophoto", text: "Georeferenced, true-scale imagery.", img: "outOrtho", alt: "Orthophoto of a settlement with property boundaries overlaid" },
      { title: "Point Cloud", text: "Dense 3D data of sites and terrain.", img: "outPointcloud", alt: "Colored point cloud of a church and surrounding buildings" },
      { title: "3D Model", text: "Textured model of the site.", img: "out3dmodel", alt: "Textured 3D model of an industrial building and yard" },
      { title: "Digital Terrain Model", text: "Relief, elevations and contours.", img: "outDtm", alt: "Digital terrain model with elevation color ramp" },
      { title: "Measurements", text: "Distances, areas and elevations.", img: "outMeasure", alt: "Area and distance measurement on an aerial photo of a plot" },
      { title: "Site Documentation", text: "Detailed visual documentation.", img: "outSitedoc", alt: "Documentation of a bridge pier with marked inspection points" },
      { title: "Excavation / Earthworks", text: "Volume calculations.", img: "outEarthworks", alt: "Excavation with soil stockpile and calculated volume" },
      { title: "Construction Progress", text: "Comparison over time.", img: "outProgress", alt: "Construction site compared at two building stages" },
    ],
    orthoTitle: "Orthophoto",
    orthoText: "An accurate, georeferenced image of the site — roads, buildings, terrain and boundaries in one scaled layer, ready for analysis and measurement.",
    orthoNote: "Cadastral boundaries and other spatial layers can be visualized over the orthophoto when the relevant data is available.",
    orthoAlt: "Orthophoto of a construction site with property boundaries overlaid",
  },
  b3d: {
    label: "03 — 3D for Business",
    title: "From CAD model to functional part",
    text: "Prototypes, functional and replacement parts, enclosures, mechanical components and small runs — 3D modelling and manufacturing for real tasks.",
    problemsTitle: "What problem do we solve?",
    problems: [
      { title: "Tooling and molds", text: "Traditional production may require significant upfront investment in molds and tooling.", img: "t3dTooling", alt: "Open steel injection mold tooling" },
      { title: "Injection molding for small quantities", text: "Injection molding can be inefficient for prototypes or very small quantities.", img: "t3dInjection", alt: "Injection molding machine with finished plastic parts" },
      { title: "Design changes", text: "Design changes after tooling preparation add cost and time.", img: "t3dIteration", alt: "CAD version 1 and version 2 of an enclosure beside two physical prototypes" },
      { title: "Prototyping", text: "Traditional prototyping can require significant preparation.", img: "t3dPrototype", alt: "3D printed functional mechanical housing beside its CAD model" },
      { title: "Replacement parts", text: "Some parts are obsolete, unavailable or difficult to source.", img: "t3dReplacement", alt: "New 3D printed gear part beside the broken original" },
      { title: "Small quantities", text: "Traditional production can be inefficient for very small quantities.", img: "t3dBatch", alt: "Small batch of twenty identical 3D printed enclosures" },
    ],
    note: "For suitable prototypes and small runs, additive manufacturing can reduce or avoid upfront tooling requirements.",
  },
  evp: {
    label: "3D for Events & Personalization",
    title: "Personalized event products",
    text: "Elegant table numbers, name signs, cake toppers, guest gifts, souvenirs and corporate gifts — made specifically for your event.",
    qtyLabel: "Quantities",
    audience: "For weddings, birthdays, private and corporate events, event planners, agencies and businesses.",
    items: [
      { title: "Table Numbers", text: "", img: "evpTable", alt: "Elegant wedding table with a personalized number, flowers and candles" },
      { title: "Name Signs", text: "", img: "evpName", alt: "Personalized name sign on a place setting" },
      { title: "Cake Toppers", text: "", img: "evpCake", alt: "Wedding cake with a personalized initials cake topper" },
      { title: "Gifts & Souvenirs", text: "", img: "evpGifts", alt: "Personalized wedding guest gifts and keyrings" },
      { title: "Birthday Decorations", text: "", img: "evpBirthday", alt: "Personalized decorative number 30 beside a cake and balloons" },
      { title: "Corporate Gifts", text: "", img: "evpCorporate", alt: "Branded desk organizers and phone stands as corporate gifts" },
      { title: "Small Figurines", text: "", img: "evpFigurine", alt: "Personalized figurine of a dancing couple on a wedding table" },
    ],
  },
  why: {
    title: "The idea is only the beginning.",
    text: "An idea becomes useful when it can be:",
    verbs: ["seen", "understood", "measured", "modelled", "created"],
    second: "The details make the difference.",
    secondText: "Visual, spatial and three-dimensional work complement each other — one team, one process, one result.",
  },
  work: {
    label: "Selected projects",
    title: "Our Work",
    filters: { all: "All", photo: "Photo & Video", mapping: "Mapping", d3: "3D" },
    items: [
      { cat: "photo", title: "Wedding celebration", img: "pvEvents", alt: "Guests at a wedding dinner" },
      { cat: "mapping", title: "Settlement orthophoto", img: "outOrtho", alt: "Orthophoto with property boundaries" },
      { cat: "3d", title: "Functional prototype", img: "t3dPrototype", alt: "3D printed mechanical housing prototype" },
      { cat: "photo", title: "Architecture", img: "pvArchitecture", alt: "Concrete and timber facade" },
      { cat: "mapping", title: "Point cloud", img: "outPointcloud", alt: "Point cloud of a church" },
      { cat: "3d", title: "Table numbers", img: "evpTable", alt: "Wedding table number" },
      { cat: "photo", title: "Product photography", img: "pvProduct", alt: "Product photo of a cup and bottle" },
      { cat: "mapping", title: "Earthworks", img: "outEarthworks", alt: "Excavation with calculated volume" },
      { cat: "3d", title: "Small enclosure run", img: "t3dBatch", alt: "Batch of 3D printed enclosures" },
    ],
  },
  process: {
    label: "Process",
    title: "How we work",
    steps: [
      { t: "Idea", d: "We start from your goal." },
      { t: "Understand", d: "We clarify needs and context." },
      { t: "Capture / Map / Model", d: "We choose the right approach." },
      { t: "Process", d: "Precise work with data and detail." },
      { t: "Result", d: "A ready-to-use outcome." },
    ],
    line: "Capture. Map. Model. Make.",
  },
  about: {
    label: "About",
    title: "One company. One approach.",
    text: "AirProPix combines visual expertise, spatial understanding and 3D modelling in a professional workflow with practical outputs.",
    points: ["Visual expertise", "Spatial data", "3D modelling & manufacturing", "Professional workflow"],
  },
  contact: { title: "Have a project?", text: "Tell us what you want to capture, measure or create.", phone: "+359 892 061 977", email: "contact@airpropix.com" },
  form: {
    name: "Name", email: "Email", phone: "Phone", company: "Company", optional: "optional", type: "Project type",
    types: { photo: "Photo & Video", mapping: "Mapping", d3: "3D", other: "Other" },
    message: "Message", submit: "Send inquiry", sending: "Sending…",
    success: "Thank you. Your inquiry has been sent.",
    error: "Something went wrong. Please try again or email contact@airpropix.com.",
    captcha: "Please confirm you are not a robot.", required: "Required field.", invalidEmail: "Invalid email address.",
    notConfigured: "The form is temporarily inactive. Please contact us by phone or email.",
  },
  footer: { tagline: "Capture. Map. Model. Make.", rights: "All rights reserved.", follow: "Follow us" },
  problemWord: "Problem",
};

export const content: Record<Lang, Content> = { bg, en };
