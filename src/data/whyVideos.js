// Contenu de la section "Pourquoi nos vidéos fonctionnent" (id="pourquoi-videos").
//
// media: { type: 'image' | 'video', src, poster?, position? } | null
//   - type 'image' → <img>, type 'video' → <video muted loop playsInline>.
//   - position: valeur CSS object-position (défaut 'center').
//   - Tant que `media` est vide (null) ou que le fichier ne charge pas
//     (onError), l'encadrement "Photo à venir" s'affiche à la place.
// caption: toujours affiché (dans l'encadrement vide ou sur la vraie photo).
//
// Pour déposer les vraies photos/vidéos: place les fichiers dans public/why/
// avec ces noms exacts — etape-1.jpg, etape-2.jpg, etape-3.jpg, etape-4.jpg
// (ou .mp4 + type:'video' si c'est une vidéo), puis renseigne `media`
// ci-dessous. Contenu suggéré :
//   1. Stratégie / brainstorm avec le client (Raphaël/Benjamin en discussion avec un client)
//   2. Tournage (déjà disponible en option : photo du clap Nor-Can, voir plus bas)
//   3. Montage (capture de la timeline DaVinci Resolve)
//   4. Publication & communauté (capture de statistiques)
//
// Photo déjà existante pour l'étape 2, à utiliser en remplaçant `media: null`
// par : { type: 'image', src: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410798/Capture_d_e%CC%81cran_le_2025-10-03_a%CC%80_11.10.40_v5hyzr.png' }

export const whyVideos = [
  {
    num: '01',
    label: '01 · STRATÉGIE',
    title: 'On élabore ta stratégie.',
    usual: "On t'envoie un questionnaire, on copie ce qui marche chez les autres et on écrit un script générique qui pourrait être celui de n'importe qui.",
    withUs: "On se met dans ta réalité : on observe ton quotidien, tes clients, tes défis et ce qui te rend unique. Puis on construit la stratégie : une série, un fil conducteur, des personnages et des angles (coulisses, quotidien, actualité).",
    question: "Pourquoi quelqu'un qui ne te connaît pas encore te suivrait-il ?",
    caption: 'RAPHAËL & BENJAMIN · STRATÉGIE',
    media: null,
  },
  {
    num: '02',
    label: '02 · TOURNAGE',
    title: 'On filme la vraie vie.',
    usual: 'Un tournage froid, des plans de façade et un message récité devant la caméra.',
    withUs: 'Des coulisses, de la vraie vie et des vraies personnes. Un style mini-série ou documentaire où ton équipe et tes clients deviennent les personnages.',
    question: "Est-ce que les gens vont s'attacher à ceux qu'ils voient à l'écran ?",
    caption: 'RAPHAËL & BENJAMIN · TOURNAGE',
    media: null,
  },
  {
    num: '03',
    label: '03 · MONTAGE',
    title: 'Un montage qui fait ressentir.',
    usual: 'Des effets et de la musique collés sur une vidéo, sans rythme et sans émotion.',
    withUs: "Un montage dynamique : une accroche dans les 3 premières secondes, un rythme, des sous-titres, de l'émotion et un message clair qui donne envie d'agir.",
    question: 'Qu\'est-ce que la personne ressent à la fin de la vidéo ?',
    caption: 'RAPHAËL & BENJAMIN · MONTAGE',
    media: null,
  },
  {
    num: '04',
    label: '04 · PUBLICATION & COMMUNAUTÉ',
    title: 'On publie, on mesure, on bâtit une communauté.',
    usual: "On publie en espérant que ça prenne, puis on compte les mentions j'aime.",
    withUs: "On adapte chaque vidéo à sa plateforme, on mesure l'attention et l'engagement, puis on amplifie ce qui marche. Les gens s'attachent, reviennent à chaque vidéo… et deviennent clients.",
    question: "Qui a envie de suivre ton entreprise, pas seulement de l'acheter ?",
    caption: 'PUBLICATION & COMMUNAUTÉ',
    media: null,
  },
];
