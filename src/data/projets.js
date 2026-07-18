export const projets = [
  {
    slug: 'norcan',
    client: 'NorCan',
    categorie: { fr: 'Chauffage & Climatisation', en: 'Heating & Air Conditioning' },
    description: {
      fr: "Production d'une web série premium mettant en valeur l'expertise et la culture d'entreprise de NorCan.",
      en: "Production of a premium web series showcasing NorCan's expertise and company culture.",
    },
    stats: { vues: '—', engagement: '—', videos: '—', abonnes: '—' },
    tiktokVideos: [],
  },
  {
    slug: 'bataillon',
    client: 'Bataillon',
    categorie: { fr: 'Hockey · LNAH', en: 'Hockey · LNAH' },
    description: {
      fr: "Stratégie de contenu complète et gestion des médias sociaux pour l'équipe de hockey du Bataillon.",
      en: 'Complete content strategy and social media management for the Bataillon hockey team.',
    },
    stats: { vues: '—', engagement: '—', videos: '—', abonnes: '—' },
    tiktokVideos: [],
  },
  {
    slug: 'sexxxplus',
    client: 'SexxxPlus',
    categorie: { fr: 'Boutique érotique', en: 'Erotic Boutique' },
    description: {
      fr: 'Stratégie de contenu organique et gestion complète des réseaux sociaux pour la marque SexxxPlus.',
      en: 'Organic content strategy and complete social media management for the SexxxPlus brand.',
    },
    stats: { vues: '—', engagement: '—', videos: '—', abonnes: '—' },
    tiktokVideos: [],
  },
  {
    slug: 'maher',
    client: 'Famille Maher',
    categorie: { fr: 'Immobilier · RE/MAX', en: 'Real Estate · RE/MAX' },
    description: {
      fr: 'Contenu de marque et présence sociale pour la Famille Maher, courtiers immobiliers RE/MAX.',
      en: 'Brand content and social presence for the Maher Family, RE/MAX real estate brokers.',
    },
    stats: { vues: '—', engagement: '—', videos: '—', abonnes: '—' },
    tiktokVideos: [],
  },
  {
    slug: 'sylvestre',
    client: 'Sébastien Sylvestre',
    categorie: { fr: 'Hockey · LNAH', en: 'Hockey · LNAH' },
    description: {
      fr: "Personal branding et production de contenu pour l'athlète de la LNAH Sébastien Sylvestre.",
      en: 'Personal branding and content production for LNAH athlete Sébastien Sylvestre.',
    },
    stats: { vues: '—', engagement: '—', videos: '—', abonnes: '—' },
    tiktokVideos: [],
  },
  {
    slug: 'tardif',
    client: 'Transport Tardif',
    categorie: { fr: 'Transport', en: 'Transportation' },
    description: {
      fr: 'Production de contenu de marque pour Transport Tardif, renforçant leur image dans le secteur du transport.',
      en: 'Brand content production for Transport Tardif, strengthening their image in the transportation sector.',
    },
    stats: { vues: '—', engagement: '—', videos: '—', abonnes: '—' },
    tiktokVideos: [],
  },
];

export function getProjetBySlug(slug) {
  return projets.find((p) => p.slug === slug);
}
