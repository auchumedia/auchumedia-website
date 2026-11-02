// Photo du clap de tournage — même image Cloudinary que la carte Nor-Can
// dans la section clients.
const CLOUDINARY_NORCAN_TOURNAGE = 'https://res.cloudinary.com/dr0kwuqqa/image/upload/v1784410798/Capture_d_e%CC%81cran_le_2025-10-03_a%CC%80_11.10.40_v5hyzr.png';

// Les 4 étapes de "De l'idée à l'attention."
// img vide → placeholder dégradé animé, en attendant les vraies photos.
export const steps = [
  {
    num: '01',
    titre: 'Stratégie & positionnement',
    texte: "On définit ton angle, ton audience et ce qui te rend différent. Chaque série part d'un objectif clair.",
    tags: ['Positionnement', 'Angle', 'Audience'],
    img: '',
  },
  {
    num: '02',
    titre: 'Écriture & storytelling',
    texte: "On écrit des histoires, pas des scripts génériques : accroche, tension, preuve, appel à l'action.",
    tags: ['Storytelling', 'Accroche', 'Séries'],
    img: '',
  },
  {
    num: '03',
    titre: 'Tournage & montage',
    texte: "Une vidéo par semaine, tournée et montée avec soin : image, rythme et sous-titres pensés pour retenir l'attention.",
    tags: ['Tournage', 'Montage', 'Sous-titres'],
    img: CLOUDINARY_NORCAN_TOURNAGE,
  },
  {
    num: '04',
    titre: 'Diffusion & croissance',
    texte: "On publie, on mesure l'attention, l'engagement et les abonnés, puis on amplifie ce qui fonctionne.",
    tags: ['Diffusion', 'Analyse', 'Croissance'],
    img: '',
  },
];
