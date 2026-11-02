const CLOUDINARY = {
  norcan: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410798/Capture_d_e%CC%81cran_le_2025-10-03_a%CC%80_11.10.40_v5hyzr.png',
  cardinal: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784411817/Capture_d_e%CC%81cran_le_2026-07-18_a%CC%80_17.56.25_rfb74n.png',
};

// Éventail de clients affiché sous le hero (section id="clients").
// img vide → placeholder en dégradé avec le nom du client en grand.
// views/videos null → rien n'est affiché sous le nom.
export const fan = [
  { name: 'Bâton Rouge', img: '', gradient: 'linear-gradient(135deg, #8B0000, #2a0a0a)', views: '+100K vues', videos: '8 vidéos' },
  { name: 'Équipe Lemire Fillion', img: '/clients/lemire-fillion.jpg', views: '30K vues', videos: '2 vidéos' },
  { name: 'Équipe Maher', img: '/clients/maher.jpg', views: '+1M vues', videos: '+50 vidéos' },
  { name: 'Nor-Can', img: CLOUDINARY.norcan, views: '+7M vues', videos: '+200 vidéos' },
  { name: 'Cardinal Asphalte', img: CLOUDINARY.cardinal, views: '+600K vues', videos: '+30 vidéos' },
  { name: 'Groupe DDC', img: '', gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)', views: null, videos: null },
];

// Bloc de stats noir — chiffres cumulés de l'agence (pas de ventes/$).
export const stats = [
  { prefix: '+', value: 40, suffix: 'M', label: 'de vues générées' },
  { prefix: '+', value: 2, suffix: 'M', label: "d'engagements" },
  { prefix: '+', value: 100, suffix: 'K', label: 'abonnés cumulés' },
];
