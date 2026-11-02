// Éventail de clients affiché sous le hero.
// Réutilise les mêmes URLs Cloudinary que le carrousel "Nos clients actuels".
// img vide → placeholder dégradé sombre avec le nom du client.
export const fan = [
  {
    name: 'Nor-Can',
    tag: '6 M vues',
    sub: '172 vidéos',
    img: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410798/Capture_d_e%CC%81cran_le_2025-10-03_a%CC%80_11.10.40_v5hyzr.png',
  },
  {
    name: 'SexxxPlus',
    tag: '22 M vues',
    sub: '120 vidéos',
    img: '',
  },
  {
    name: 'Famille Maher',
    tag: '700 K vues',
    sub: '30 vidéos',
    img: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410790/Raf_Steve_ycvtgk.png',
  },
  {
    name: 'Cardinal Asphalte',
    tag: '250 K vues',
    sub: '10 vidéos',
    img: 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784411817/Capture_d_e%CC%81cran_le_2026-07-18_a%CC%80_17.56.25_rfb74n.png',
  },
  {
    name: 'GoConsigne',
    tag: '2,5 M vues',
    sub: '60 vidéos',
    img: '',
  },
];

// Bloc de stats noir sous l'éventail. value = nombre brut, animé de 0 à value.
export const stats = [
  { value: 22000000, suffix: '', label: 'vues en 120 vidéos · +35 K abonnés', client: 'SexxxPlus' },
  { value: 6000000, suffix: '', label: 'vues en 172 vidéos · +9 K abonnés', client: 'Nor-Can' },
  { value: 2500000, suffix: '', label: 'vues en 60 vidéos · +10 K abonnés', client: 'GoConsigne' },
];
