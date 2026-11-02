const CLOUDINARY = {
  norcan: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410798/Capture_d_e%CC%81cran_le_2025-10-03_a%CC%80_11.10.40_v5hyzr.png',
  maher: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410790/Raf_Steve_ycvtgk.png',
  cardinal: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784411817/Capture_d_e%CC%81cran_le_2026-07-18_a%CC%80_17.56.25_rfb74n.png',
};

// Éventail de clients affiché sous le hero (section id="clients").
// img vide → placeholder en dégradé avec le nom du client en grand.
export const fan = [
  { name: 'Nor-Can', img: CLOUDINARY.norcan },
  { name: 'Équipe Maher', img: CLOUDINARY.maher },
  { name: 'Équipe Lemire Fillion', img: '', gradient: 'linear-gradient(135deg, #0a2a1a, #1a3a2a)' },
  { name: 'Bâton Rouge', img: '', gradient: 'linear-gradient(135deg, #8B0000, #2a0a0a)' },
  { name: 'Cardinal Asphalte', img: CLOUDINARY.cardinal },
  { name: 'Groupe DDC', img: '', gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
];

// Bloc de stats noir — chiffres cumulés de l'agence (pas de ventes/$).
export const stats = [
  { prefix: '+', value: 100, suffix: ' M', label: 'de vues générées' },
  { prefix: '+', value: 30, suffix: ' M', label: "d'engagements" },
  { prefix: '+', value: 100000, suffix: '', label: 'abonnés cumulés' },
];
