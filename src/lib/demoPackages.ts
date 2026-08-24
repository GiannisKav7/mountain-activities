export type PackageCard = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  duration: string;
  accommodation: string;
  activityType: string;
  difficulty: number;
  priceFrom: number | null;
};

export const demoPackages: Record<string, PackageCard[]> = {
  de: [
    {
      slug: "menalo-trekking",
      title: "Menalo Trekking",
      summary:
        "Fünf Tage durch die unberührte Bergwelt des Menalo-Massivs – mit Übernachtungen in traditionellen Berghütten und Blicken in die wilden Schluchten Arkadiens.",
      image: "https://picsum.photos/seed/menalo/800/600",
      duration: "5 Tage",
      accommodation: "Berghütten",
      activityType: "Wandern",
      difficulty: 2,
      priceFrom: 720,
    },
    {
      slug: "taygetos-ridge",
      title: "Taygetos-Gratwanderung",
      summary:
        "Die Königin der Peloponnes: spektakuläre Grate, alpin geprägte Pfade und atemberaubende Blicke bis zum Meer – für geübte Wanderer.",
      image: "https://picsum.photos/seed/taygetos/800/600",
      duration: "6 Tage",
      accommodation: "Gästehäuser",
      activityType: "Trekking",
      difficulty: 4,
      priceFrom: 890,
    },
    {
      slug: "leonidio-climbing",
      title: "Leonidio Klettern & Meer",
      summary:
        "Klettern an den berühmten Marmorwänden von Leonidio – kombiniert mit Küstenwanderungen und einem Sprung ins Ägäische Meer.",
      image: "https://picsum.photos/seed/leonidio/800/600",
      duration: "7 Tage",
      accommodation: "Hotel",
      activityType: "Klettern & Wandern",
      difficulty: 3,
      priceFrom: 1040,
    },
  ],
  en: [
    {
      slug: "menalo-trekking",
      title: "Menalo Trekking",
      summary:
        "Five days through the untouched mountain world of the Menalo massif – with nights in traditional mountain huts and views over the wild gorges of Arcadia.",
      image: "https://picsum.photos/seed/menalo/800/600",
      duration: "5 days",
      accommodation: "Mountain huts",
      activityType: "Hiking",
      difficulty: 2,
      priceFrom: 720,
    },
    {
      slug: "taygetos-ridge",
      title: "Taygetos Ridge Traverse",
      summary:
        "The queen of the Peloponnese: spectacular ridges, alpine trails and breathtaking views all the way to the sea – for experienced hikers.",
      image: "https://picsum.photos/seed/taygetos/800/600",
      duration: "6 days",
      accommodation: "Guesthouses",
      activityType: "Trekking",
      difficulty: 4,
      priceFrom: 890,
    },
    {
      slug: "leonidio-climbing",
      title: "Leonidio Climbing & Sea",
      summary:
        "Climbing at the famous marble crags of Leonidio – combined with coastal hikes and a swim in the Aegean Sea.",
      image: "https://picsum.photos/seed/leonidio/800/600",
      duration: "7 days",
      accommodation: "Hotel",
      activityType: "Climbing & Hiking",
      difficulty: 3,
      priceFrom: 1040,
    },
  ],
};