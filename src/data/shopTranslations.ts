// Per-language overrides for shop content (descriptions + type labels).
// Keyed by slug. JSON stays the source of truth for everything else.

type Lang = "fr" | "en" | "ar";

export const typeLabels: Record<Lang, Record<string, string>> = {
  fr: { Barbier: "Barbier", "Salon Esthétique": "Salon Esthétique" },
  en: { Barbier: "Barber", "Salon Esthétique": "Beauty Salon" },
  ar: { Barbier: "حلاق", "Salon Esthétique": "صالون تجميل" },
};

export const areaLabels: Record<Lang, Record<string, string>> = {
  fr: {},
  en: {
    "La Marsa": "La Marsa",
    "Centre Ville": "Downtown",
    "Ennasr": "Ennasr",
    "Centre": "Center",
    "Les Berges du Lac": "Lake Banks",
    "Soukra": "Soukra",
    "Médina": "Medina",
  },
  ar: {
    "La Marsa": "المرسى",
    "Centre Ville": "وسط المدينة",
    "Ennasr": "النصر",
    "Centre": "المركز",
    "Les Berges du Lac": "ضفاف البحيرة",
    "Soukra": "السكرة",
    "Médina": "المدينة العتيقة",
  },
};

export const cityLabels: Record<Lang, Record<string, string>> = {
  fr: {},
  en: {},
  ar: {
    Tunis: "تونس",
    Sfax: "صفاقس",
    Sousse: "سوسة",
    Monastir: "المنستير",
    Bizerte: "بنزرت",
    Nabeul: "نابل",
    Ariana: "أريانة",
    "Ben Arous": "بن عروس",
  },
};

export const shopDescriptions: Record<string, Record<Lang, { description: string; longDescription: string }>> = {
  "barbershop-classic": {
    fr: {
      description: "Le meilleur barbier de La Marsa. Coupes modernes, dégradés parfaits.",
      longDescription: "Barbershop Classic est une institution à La Marsa. Notre équipe de barbiers passionnés vous offre un service haut de gamme dans une ambiance chaleureuse et authentique. Coupes classiques, dégradés modernes, taille de barbe précise — chaque détail compte.",
    },
    en: {
      description: "The best barber in La Marsa. Modern cuts, perfect fades.",
      longDescription: "Barbershop Classic is an institution in La Marsa. Our team of passionate barbers offers premium service in a warm, authentic atmosphere. Classic cuts, modern fades, precise beard trims — every detail matters.",
    },
    ar: {
      description: "أفضل حلاق في المرسى. قصات عصرية وتدرجات مثالية.",
      longDescription: "باربرشوب كلاسيك هو مؤسسة في المرسى. فريقنا من الحلاقين الشغوفين يقدم لك خدمة راقية في أجواء دافئة وأصيلة. قصات كلاسيكية، تدرجات عصرية، تشذيب دقيق للحية — كل تفصيل يهم.",
    },
  },
  "salon-nour": {
    fr: {
      description: "Salon esthétique élégant au cœur de Sousse. Une expérience raffinée.",
      longDescription: "Salon Nour vous accueille dans un cadre élégant et apaisant. Spécialisé dans les soins esthétiques et capillaires, notre équipe vous offre un service personnalisé.",
    },
    en: {
      description: "Elegant beauty salon in the heart of Sousse. A refined experience.",
      longDescription: "Salon Nour welcomes you in an elegant, soothing setting. Specialized in beauty and hair care, our team offers a personalized service.",
    },
    ar: {
      description: "صالون تجميل أنيق في قلب سوسة. تجربة راقية.",
      longDescription: "صالون نور يستقبلك في إطار أنيق وهادئ. متخصصون في العناية بالجمال والشعر، فريقنا يقدم لك خدمة مخصصة.",
    },
  },
  "fade-kings": {
    fr: {
      description: "Les rois du dégradé. Précision, style et bonne ambiance.",
      longDescription: "Fade Kings, c'est l'adresse incontournable pour les amateurs de dégradés parfaits et de coupes urbaines.",
    },
    en: {
      description: "The kings of fades. Precision, style and great vibes.",
      longDescription: "Fade Kings is the go-to spot for lovers of perfect fades and urban cuts.",
    },
    ar: {
      description: "ملوك التدرج. دقة، أناقة وأجواء رائعة.",
      longDescription: "فايد كينغز هو العنوان الأول لعشاق التدرجات المثالية والقصات العصرية.",
    },
  },
  "beauty-palace": {
    fr: {
      description: "Le palais de la beauté à Sfax. Soins complets et professionnels.",
      longDescription: "Beauty Palace propose une gamme complète de soins esthétiques dans un cadre luxueux.",
    },
    en: {
      description: "The palace of beauty in Sfax. Complete, professional care.",
      longDescription: "Beauty Palace offers a complete range of beauty treatments in a luxurious setting.",
    },
    ar: {
      description: "قصر الجمال في صفاقس. عناية شاملة واحترافية.",
      longDescription: "بيوتي بالاس يقدم مجموعة كاملة من العلاجات التجميلية في إطار فاخر.",
    },
  },
  "sharp-cuts": {
    fr: {
      description: "Coupes nettes, style impeccable. Référence à Tunis.",
      longDescription: "Sharp Cuts est le rendez-vous des hommes exigeants au centre de Tunis.",
    },
    en: {
      description: "Sharp cuts, impeccable style. A reference in Tunis.",
      longDescription: "Sharp Cuts is the meeting point for demanding men in downtown Tunis.",
    },
    ar: {
      description: "قصات حادة، أناقة لا تشوبها شائبة. مرجع في تونس.",
      longDescription: "شارب كاتس هو ملتقى الرجال المتطلبين في وسط تونس.",
    },
  },
  "salon-yasmine": {
    fr: {
      description: "Élégance et raffinement à Monastir. Service haut de gamme.",
      longDescription: "Salon Yasmine vous offre une parenthèse de détente et de beauté.",
    },
    en: {
      description: "Elegance and refinement in Monastir. Premium service.",
      longDescription: "Salon Yasmine offers you a moment of relaxation and beauty.",
    },
    ar: {
      description: "أناقة ورقي في المنستير. خدمة راقية.",
      longDescription: "صالون ياسمين يمنحك لحظة من الاسترخاء والجمال.",
    },
  },
  "the-barber-room": {
    fr: {
      description: "Une salle de barbier moderne avec une touche vintage.",
      longDescription: "The Barber Room combine atmosphère vintage et techniques modernes pour une expérience unique.",
    },
    en: {
      description: "A modern barbershop with a vintage touch.",
      longDescription: "The Barber Room combines vintage atmosphere with modern techniques for a unique experience.",
    },
    ar: {
      description: "صالون حلاقة عصري بلمسة كلاسيكية.",
      longDescription: "ذا باربر روم يجمع بين الأجواء الكلاسيكية والتقنيات الحديثة لتجربة فريدة.",
    },
  },
  "glam-studio": {
    fr: {
      description: "Le glam à la tunisienne. Soins premium et look impeccable.",
      longDescription: "Glam Studio est le studio des stars en herbe, pour un look qui se démarque.",
    },
    en: {
      description: "Tunisian glam. Premium care and impeccable looks.",
      longDescription: "Glam Studio is the studio of rising stars, for a standout look.",
    },
    ar: {
      description: "الجلام على الطريقة التونسية. عناية فاخرة وإطلالة مثالية.",
      longDescription: "غلام ستوديو هو ستوديو نجوم الغد، لإطلالة مميزة.",
    },
  },
  "classic-touch": {
    fr: {
      description: "Tradition et savoir-faire. Le vrai barbier à l'ancienne.",
      longDescription: "Classic Touch perpétue l'art du barbier traditionnel avec passion et expertise.",
    },
    en: {
      description: "Tradition and craftsmanship. The real old-school barber.",
      longDescription: "Classic Touch carries on the art of traditional barbering with passion and expertise.",
    },
    ar: {
      description: "تقاليد ومهارة. الحلاق التقليدي الحقيقي.",
      longDescription: "كلاسيك تاتش يحافظ على فن الحلاقة التقليدية بشغف وخبرة.",
    },
  },
};

export function tShop(slug: string, lang: Lang, field: "description" | "longDescription", fallback: string): string {
  return shopDescriptions[slug]?.[lang]?.[field] ?? fallback;
}

export function tType(type: string, lang: Lang): string {
  return typeLabels[lang]?.[type] ?? type;
}

export function tCity(city: string, lang: Lang): string {
  return cityLabels[lang]?.[city] ?? city;
}

export function tArea(area: string, lang: Lang): string {
  return areaLabels[lang]?.[area] ?? area;
}
