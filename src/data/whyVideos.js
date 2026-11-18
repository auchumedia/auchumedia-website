// Contenu de la section "Pourquoi nos vidéos fonctionnent" (id="pourquoi-videos").
//
// media: { type: 'image' | 'video', src, poster?, position?, caption? } | null
//   - type 'image' → <img>, type 'video' → <video muted loop playsInline>.
//   - position: valeur CSS object-position (défaut 'center').
//   - caption: texte affiché dans la pastille en bas à gauche du cadre.
//   - Si `media` est vide ou que le fichier ne charge pas (onError), le dessin
//     généré de l'étape s'affiche à la place (solution temporaire).
//
// Pour déposer les vraies photos/vidéos: place les fichiers dans public/why/
// avec ces noms exacts — etape-1.jpg, etape-2.jpg, etape-3.jpg, etape-4.jpg,
// etape-5.jpg (ou .mp4 + type:'video' si c'est une vidéo). Contenu suggéré :
//   1. Brainstorm avec le client (Raphaël/Benjamin en discussion avec un client)
//   2. Stratégie & écriture (travail sur la série, le script, le tableau blanc)
//   3. Tournage (déjà en place : photo du clap Nor-Can)
//   4. Montage (devant l'écran de montage)
//   5. Publication & communauté (gestion des réseaux, résultats)
const NORCAN_TOURNAGE_IMG = 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410798/Capture_d_e%CC%81cran_le_2025-10-03_a%CC%80_11.10.40_v5hyzr.png';

export const whyVideos = [
  {
    num: '01',
    label: '01 · RÉALITÉ DU CLIENT',
    title: 'On se met dans ta réalité.',
    usual: "On t'envoie un questionnaire, on copie ce qui marche chez les autres et on tourne un contenu qui pourrait être celui de n'importe qui.",
    withUs: "On passe du temps avec toi : on observe ton quotidien, tes clients, tes défis et ce qui te rend unique. Le brainstorming part de ta réalité, pas d'un modèle.",
    question: "Qu'est-ce qui rend ton quotidien intéressant pour quelqu'un qui ne te connaît pas encore ?",
    media: { type: 'image', src: '/why/etape-1.jpg', position: 'center', caption: 'RAPHAËL & BENJAMIN · BRAINSTORM' },
  },
  {
    num: '02',
    label: '02 · STRATÉGIE & SÉRIE',
    title: 'Une histoire avant un script.',
    usual: 'Un script générique, écrit pour vendre, qui ressemble à toutes les pubs.',
    withUs: "On construit une stratégie et une série : des épisodes, un fil conducteur, des personnages. Coulisses, quotidien, actualité de ton marché : chaque angle a une raison d'exister.",
    question: "Pourquoi quelqu'un reviendrait voir l'épisode suivant ?",
    media: { type: 'image', src: '/why/etape-2.jpg', position: 'center', caption: 'RAPHAËL & BENJAMIN · STRATÉGIE' },
  },
  {
    num: '03',
    label: '03 · TOURNAGE',
    title: 'On filme la vraie vie.',
    usual: 'Un tournage froid, des plans de façade et un message récité devant la caméra.',
    withUs: 'Des coulisses, de la vraie vie et des vraies personnes. Un style mini-série ou documentaire où ton équipe et tes clients deviennent les personnages.',
    question: "Est-ce que les gens vont s'attacher à ceux qu'ils voient à l'écran ?",
    media: { type: 'image', src: NORCAN_TOURNAGE_IMG, position: 'center', caption: 'SUR LE TOURNAGE' },
  },
  {
    num: '04',
    label: '04 · MONTAGE & ÉMOTION',
    title: 'Un montage qui fait ressentir.',
    usual: 'Des effets et de la musique collés sur une vidéo, sans rythme et sans émotion.',
    withUs: "Un montage dynamique : une accroche dans les 3 premières secondes, un rythme, des sous-titres, de l'émotion et un message clair qui donne envie d'agir.",
    question: 'Qu\'est-ce que la personne ressent à la fin de la vidéo ?',
    media: { type: 'image', src: '/why/etape-4.jpg', position: 'center', caption: 'RAPHAËL & BENJAMIN · MONTAGE' },
  },
  {
    num: '05',
    label: '05 · PUBLICATION & COMMUNAUTÉ',
    title: 'On publie, on mesure, on bâtit une communauté.',
    usual: "On publie en espérant que ça prenne, puis on compte les mentions j'aime.",
    withUs: "On adapte chaque vidéo à sa plateforme, on mesure l'attention et l'engagement, puis on amplifie ce qui marche. Les gens s'attachent, reviennent chaque semaine… et deviennent clients.",
    question: "Qui a envie de suivre ton entreprise, pas seulement de l'acheter ?",
    media: { type: 'image', src: '/why/etape-5.jpg', position: 'center', caption: 'RAPHAËL & BENJAMIN · PUBLICATION' },
  },
];
