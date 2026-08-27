/**
 * Seed script — generates initial-content.ndjson for Sanity import.
 *
 * Usage:
 *   npm run sanity:export-content
 *   npx sanity dataset import sanity/import/initial-content.ndjson production
 *
 * Produces one document of each type:
 *   - siteSettings   (brand, address, SEO defaults)
 *   - siteContent    (nav labels, footer copy, all homepage sections)
 *   - page × 5      (activities, region, about, practicalInformation, contact)
 *   - package × 3   (demo packages with specs)
 *
 * All content is inlined here so this script remains self-contained after
 * the original TypeScript source files have been removed.
 */

import { mkdir, writeFile } from "node:fs/promises";

// ─── Helpers ────────────────────────────────────────────────────────────────

const loc = (de, en) => ({ de, en });
const key = () => Math.random().toString(36).slice(2, 10);

// ─── siteSettings ────────────────────────────────────────────────────────────

const siteSettings = {
  _id: "site-settings",
  _type: "siteSettings",
  brandName: "OLVIOS",
  tagline: loc("Outdoor Activities", "Outdoor Activities"),
  address: "Kato Trikala Korinthias, Greece",
  email: "",
  phone: "",
  defaultSeoTitle: loc("OLVIOS Outdoor Activities", "OLVIOS Outdoor Activities"),
  defaultSeoDescription: loc(
    "Persönlich geplante Outdoor-Reisen in der Nördlichen Peloponnes.",
    "Personally planned outdoor journeys in the Northern Peloponnese.",
  ),
  skipToContent: loc("Zum Inhalt springen", "Skip to content"),
  onThisPage: loc("Auf dieser Seite", "On this page"),
};

// ─── siteContent ─────────────────────────────────────────────────────────────

const siteContent = {
  _id: "site-content",
  _type: "siteContent",
  title: "Website content",
  navigation: {
    activities: loc("Aktivitäten", "Activities"),
    region: loc("Die Region", "The Region"),
    about: loc("Über OLVIOS", "About OLVIOS"),
    practicalInformation: loc("Praktische Informationen", "Practical Information"),
    contact: loc("Kontakt", "Contact Us"),
  },
  inquireLabel: { label: loc("Unverbindlich anfragen", "Send Inquiry") },
  footer: {
    tagline: loc(
      "Persönlich geplante Outdoor-Reisen in der Nördlichen Peloponnes.",
      "Personally planned outdoor journeys in the Northern Peloponnese.",
    ),
    quickLinks: loc("Schnellzugriff", "Quick Links"),
    contact: loc("Kontakt", "Contact"),
    contactText: loc("Erzählen Sie uns von Ihrer Reiseidee.", "Tell us about your travel idea."),
    rights: loc("Alle Rechte vorbehalten.", "All rights reserved."),
  },
  home: {
    seo: {
      title: loc(
        "OLVIOS Outdoor Activities | Nördliche Peloponnes",
        "OLVIOS Outdoor Activities | Northern Peloponnese",
      ),
      description: loc(
        "Persönlich geplante Outdoor-Reisen, Wanderungen und regionale Erlebnisse in der Nördlichen Peloponnes.",
        "Personally planned outdoor journeys, hiking and regional experiences in the Northern Peloponnese.",
      ),
    },
    hero: {
      kicker: loc("Peloponnes · Griechenland", "Peloponnese · Greece"),
      title: loc(
        "Die Berge Griechenlands, Schritt für Schritt entdeckt",
        "The mountains of Greece, discovered step by step",
      ),
      subtitle: loc(
        "Geführte Trekking- und Klettertouren abseits der Küstenströme – vom wilden Taygetos bis zum ruhigen Menalo.",
        "Guided trekking and climbing tours far from the coastal crowds – from the wild Taygetos to the gentle Menalo.",
      ),
      ctaPrimary: loc("Pakete entdecken", "Discover packages"),
      ctaSecondary: loc("Kontakt aufnehmen", "Get in touch"),
      stats: [
        { _key: key(), value: loc("12+", "12+"), label: loc("Jahre Erfahrung", "Years of experience") },
        { _key: key(), value: loc("8", "8"), label: loc("Personen max. pro Gruppe", "Max people per group") },
        { _key: key(), value: loc("100%", "100%"), label: loc("Lokale Gastgeber", "Local hosts") },
      ],
    },
    gallery: {
      caption: loc("Die Bergwelt der Peloponnes", "The mountain world of the Peloponnese"),
      cta: loc("Unsere Pakete entdecken", "Discover our packages"),
      // Images are uploaded via Sanity Studio — no assets can be seeded here.
      images: [],
    },
    welcome: {
      eyebrow: loc("Willkommen", "Welcome"),
      title: loc("Willkommen", "Welcome"),
      body: loc(
        "Willkommen bei Mountain Greece! Wir sind ein kleines, leidenschaftliches Team von Bergliebhabern und bringen deutsche Wanderer in die unentdeckten Berge der Peloponnes. Vom wilden Taygetos bis zum ruhigen Menalo – erleben Sie Griechenland abseits der Küstenströme, Schritt für Schritt.",
        "Welcome to Mountain Greece! We are a small, passionate team of mountain lovers bringing German hikers to the undiscovered mountains of the Peloponnese. From the wild Taygetos to the gentle Menalo – experience Greece far from the coastal crowds, step by step.",
      ),
    },
    philosophy: {
      eyebrow: loc("Unsere Philosophie", "Our Philosophy"),
      title: loc("Unsere Philosophie", "Our Philosophy"),
      body: loc(
        "Für uns ist eine Wanderreise mehr als eine Route: Es ist Begegnung mit Menschen, Geschichte und Natur. Wir reisen in kleinen Gruppen, unterstützen lokale Gastgeber und wählen Wege, die Sie wirklich zu den Schätzen dieser Halbinsel führen. Nachhaltigkeit und Qualität stehen bei jedem Paket an erster Stelle.",
        "To us, a hiking trip is more than a route: it is an encounter with people, history, and nature. We travel in small groups, support local hosts, and choose trails that truly lead you to the treasures of this peninsula. Sustainability and quality come first in every package.",
      ),
      pillars: [
        {
          _key: key(),
          icon: "users",
          title: loc("Kleine Gruppen", "Small groups"),
          text: loc(
            "Maximal acht Personen – damit jede Tour persönlich, sicher und flexibel bleibt.",
            "Maximum eight people – so every tour stays personal, safe and flexible.",
          ),
        },
        {
          _key: key(),
          icon: "home",
          title: loc("Lokale Gastgeber", "Local hosts"),
          text: loc(
            "Wir arbeiten mit Familienbetrieben zusammen und stärken die Region nachhaltig.",
            "We work with family-run businesses and strengthen the region sustainably.",
          ),
        },
        {
          _key: key(),
          icon: "globe",
          title: loc("Wilde Natur", "Wild nature"),
          text: loc(
            "Authentische Wege fernab der Massen, die zu den verborgenen Schätzen der Halbinsel führen.",
            "Authentic trails away from the crowds, leading to the hidden treasures of the peninsula.",
          ),
        },
      ],
    },
    packages: {
      heading: loc("Unsere Pakete", "Our Packages"),
      subtitle: loc(
        "Handverlesene Touren für jedes Können – vom sanften Einstieg bis zur alpinen Gratwanderung.",
        "Handpicked tours for every level – from a gentle start to an alpine ridge traverse.",
      ),
      difficulty: loc("Schwierigkeit", "Difficulty"),
      viewAll: loc("Aktivitäten ansehen", "View activities"),
      pricePrefix: loc("ab ", "from "),
    },
  },
};

// ─── Content pages ───────────────────────────────────────────────────────────

const pages = [
  // ── activities ──────────────────────────────────────────────────────
  {
    _id: "page-activities",
    _type: "page",
    slug: { _type: "slug", current: "activities" },
    seoTitle: loc("Aktivitäten in der Nördlichen Peloponnes | OLVIOS", "Activities in the Northern Peloponnese | OLVIOS"),
    seoDescription: loc(
      "Geführte Wanderungen, saisonale Naturerlebnisse und Kulturtage rund um das Ziria-Massiv und den Korinthischen Golf.",
      "Guided walks, seasonal nature experiences and cultural days around Mount Ziria and the Corinthian Gulf.",
    ),
    eyebrow: loc("Draußen unterwegs", "Explore outdoors"),
    title: loc("Aktivitäten in der Nördlichen Peloponnes", "Activities in the Northern Peloponnese"),
    intro: loc(
      "Geführte Wanderungen, saisonale Naturerlebnisse und Kulturtage zwischen dem Ziria-Massiv und dem Korinthischen Golf.",
      "Guided walks, seasonal nature experiences and cultural days between Mount Ziria and the Corinthian Gulf.",
    ),
    highlights: [
      { _key: key(), value: loc("4", "4"), label: loc("ausgewählte Wanderungen", "selected hikes") },
      { _key: key(), value: loc("Juni-Nov.", "Jun-Nov"), label: loc("saisonale Erlebnisse", "seasonal experiences") },
      { _key: key(), value: loc("ca. 30 Min.", "about 30 min"), label: loc("von den Bergen zum Meer", "from mountain to sea") },
    ],
    sections: [
      {
        _key: key(), id: "experience-overview",
        eyebrow: loc("Vielfalt der Region", "A varied landscape"),
        title: loc("Vier Perspektiven auf Nordkorinthia", "Four ways to experience Northern Corinthia"),
        intro: loc(
          "Die Aktivitäten ergänzen die Reise auf der Startseite. Welche Erlebnisse tatsächlich stattfinden, wird passend zur Jahreszeit und zur Gruppe bestätigt.",
          "These activities support the journey presented on the homepage. The final experiences are confirmed according to season and group.",
        ),
        layout: "cards",
        items: [
          { _key: key(), eyebrow: loc("01", "01"), title: loc("Geführte Wanderungen", "Guided hiking"), text: loc("Ausgewählte Wege führen durch Wälder, Täler und Hochlagen des Ziria-Massivs.", "Selected trails lead through the forests, valleys and higher slopes of Mount Ziria.") },
          { _key: key(), eyebrow: loc("02", "02"), title: loc("Saisonale Erlebnisse", "Seasonal experiences"), text: loc("Bergtee, Oregano, Korinthen, Äpfel und Oliven machen den Rhythmus der Landschaft sichtbar.", "Mountain tea, oregano, currants, apples and olives reveal the rhythm of the landscape.") },
          { _key: key(), eyebrow: loc("03", "03"), title: loc("Kultur und Archäologie", "Culture and archaeology"), text: loc("Ausflüge verbinden die Bergregion mit bedeutenden historischen Orten der Umgebung.", "Excursions connect the mountain region with important historical places nearby.") },
          { _key: key(), eyebrow: loc("04", "04"), title: loc("Berge und Meer", "Mountains and sea"), text: loc("Vom Bergdorf führt der Weg in kurzer Zeit zum Korinthischen Golf und nach Xylokastro.", "The Corinthian Gulf and Xylokastro are a short journey from the mountain villages.") },
        ],
      },
      {
        _key: key(), id: "hiking",
        eyebrow: loc("Zu Fuß entdecken", "Discover on foot"),
        title: loc("Geführte Wanderungen", "Guided hikes"),
        intro: loc(
          "Die Anforderungen unterscheiden sich je nach Route, Wetter und gewählter Variante. Wir beraten Sie vor der Reise persönlich zur passenden Aktivität.",
          "Requirements vary according to the route, weather and selected variation. We will help you choose a suitable activity before your trip.",
        ),
        layout: "cards",
        items: [
          { _key: key(), title: loc("Flampouritsa-Weg", "Flampouritsa Trail"), text: loc("Ein Waldweg entlang des Sythas durch Tannen, Kiefern und Buchen bis in das grüne Quellgebiet des Flusses.", "A forest trail follows the Sythas through fir, pine and beech trees to the green area around the river's springs."), meta: { de: ["ca. 5 Std.", "Wald und Fluss", "Ziria"], en: ["about 5 hours", "forest and river", "Mount Ziria"] } },
          { _key: key(), title: loc("Perdikoula-Weg", "Perdikoula Trail"), text: loc("Vom historischen Kloster Agios Vlasios führt der Weg durch dichten Wald zur Anhöhe von Perdikoula.", "From the historic Agios Vlasios Monastery, the route enters dense forest and climbs to the Perdikoula viewpoint."), meta: { de: ["ca. 3-4 Std.", "Wald und Aussicht", "variable Route"], en: ["about 3-4 hours", "forest and views", "variable route"] } },
          { _key: key(), title: loc("Weg zur Hermes-Höhle", "Trail to the Cave of Hermes"), text: loc("Vom kleinen Skigebiet steigt die Route mit Blick auf das Flampouritsa-Tal zum Höhleneingang.", "From the small ski centre, the route climbs above the Flampouritsa Valley to the cave entrance."), meta: { de: ["ca. 3 Std.", "bis ca. 1.600 m", "Höhle und Mythologie"], en: ["about 3 hours", "up to about 1,600 m", "cave and mythology"] }, note: loc("Der Zugang zur Höhle erfolgt ausschließlich mit einem professionellen Höhlenführer.", "Entry into the cave takes place exclusively with a professional cave guide.") },
          { _key: key(), title: loc("Doxa-See und Jägerpass", "Lake Doxa and Hunter's Pass"), text: loc("Die Wanderung verbindet das Ufer des Doxa-Sees mit dem Anstieg zum Jägerpass.", "This walk links the shore of Lake Doxa with an ascent to Hunter's Pass."), meta: { de: ["ca. 3 Std. Gehzeit", "See und Bergpass", "Klosterbesuch"], en: ["about 3 hours walking", "lake and mountain pass", "monastery visit"] } },
        ],
        note: loc(
          "Die Schwierigkeitsgrade bleiben bis zur erneuten Bewertung aller Wege unveröffentlicht.",
          "Difficulty grades will remain unpublished until every route has been reassessed.",
        ),
      },
      {
        _key: key(), id: "seasonal-experiences",
        eyebrow: loc("Im Rhythmus der Landschaft", "The landscape's rhythm"),
        title: loc("Saisonale Erlebnisse", "Seasonal experiences"),
        intro: loc(
          "Jede Jahreszeit bringt andere Pflanzen und Ernten hervor.",
          "Each season brings different plants and harvests.",
        ),
        layout: "timeline",
        items: [
          { _key: key(), eyebrow: loc("Juni", "June"), title: loc("Wilder Oregano", "Wild oregano"), text: loc("Aromatischer wilder Oregano wächst an den Hängen des Mavro Oros.", "Aromatic wild oregano grows on the slopes of Mavro Oros.") },
          { _key: key(), eyebrow: loc("Juli", "July"), title: loc("Griechischer Bergtee", "Greek mountain tea"), text: loc("Sideritis wird an den Hängen des Ziria-Massivs gesammelt.", "Sideritis is gathered on the slopes of Mount Ziria.") },
          { _key: key(), eyebrow: loc("Juli-August", "July-August"), title: loc("Korinthische Korinthe", "Corinthian currants"), text: loc("In dieser Zeit findet die Ernte der Trauben für die berühmte Korinthische Korinthe statt.", "This is the harvest period for the grapes used to make the renowned Corinthian currant.") },
          { _key: key(), eyebrow: loc("Herbst", "Autumn"), title: loc("Äpfel aus Mana", "Apples from Mana"), text: loc("Im benachbarten Bergdorf Mana werden die regional bekannten Äpfel geerntet.", "The locally renowned apples are harvested in the neighbouring mountain village of Mana.") },
          { _key: key(), eyebrow: loc("Oktober", "October"), title: loc("Trocknung der Korinthen", "Currant drying"), text: loc("Die geernteten Trauben durchlaufen den traditionellen Trocknungsprozess.", "The harvested grapes go through the traditional drying process.") },
          { _key: key(), eyebrow: loc("November", "November"), title: loc("Oliven und Olivenöl", "Olives and olive oil"), text: loc("Die Olivenernte bildet den Ausgangspunkt für das native Olivenöl extra der Region.", "The olive harvest begins the process behind the region's extra virgin olive oil.") },
        ],
        note: loc(
          "Saisonale Erlebnisse hängen von Wetter, Erntezeitpunkt, Zugang und der Verfügbarkeit lokaler Erzeuger ab.",
          "Seasonal experiences depend on weather, harvest timing, access and the availability of local producers.",
        ),
      },
      {
        _key: key(), id: "culture",
        eyebrow: loc("Geschichte vor Ort", "History in place"),
        title: loc("Kultur- und Archäologietage", "Cultural and archaeological days"),
        layout: "cards",
        items: [
          { _key: key(), title: loc("Mykene und Epidauros", "Mycenae and Epidaurus"), text: loc("Ein möglicher Tagesausflug verbindet Mykene mit Epidauros und dem Heiligtum des Asklepios.", "A possible day excursion connects Mycenae with Epidaurus and the Sanctuary of Asclepius.") },
          { _key: key(), title: loc("Akrokorinth und antikes Korinth", "Acrocorinth and Ancient Corinth"), text: loc("Der Aufstieg zum Akrokorinth kann mit dem antiken Korinth und dem Isthmus verbunden werden.", "An ascent to Acrocorinth can be combined with Ancient Corinth and the Corinth Isthmus.") },
          { _key: key(), title: loc("Isthmia, Diolkos und Heraion", "Isthmia, the Diolkos and the Heraion"), text: loc("Dieser Kulturtag führt zu Orten, die vom Verkehr, Glauben und Alltag der antiken Region erzählen.", "This cultural day visits places that reflect movement, belief and everyday life in the ancient region.") },
        ],
        note: loc(
          "Transport, Mahlzeiten und Badeaufenthalte sind optionale Elemente.",
          "Transport, meals and swimming stops are optional elements.",
        ),
      },
      {
        _key: key(), id: "mountains-and-sea",
        eyebrow: loc("Kontraste an einem Tag", "Contrasts in one day"),
        title: loc("Von den Bergen zum Korinthischen Golf", "From the mountains to the Corinthian Gulf"),
        layout: "paragraphs",
        paragraphs: [
          { _key: key(), de: "Von der Basis in Kato Trikala erreicht man den vorgesehenen Küstenabschnitt in ungefähr 30 Minuten mit dem Auto.", en: "The intended coastal area is approximately 30 minutes by car from the base in Kato Trikala." },
          { _key: key(), de: "Ein Tag in Xylokastro kann einen Spaziergang durch den Pefkias-Küstenwald, einen Besuch im Museum für Schiffbaukunst und auf Wunsch Zeit zum Baden umfassen.", en: "A day in Xylokastro may include a walk through the Pefkias coastal forest, a visit to the Museum of Shipbuilding Art and, if requested, time for swimming." },
        ],
      },
      {
        _key: key(), id: "expectations",
        eyebrow: loc("Gut vorbereitet", "Prepared for the day"),
        title: loc("Was Sie erwarten können", "What to expect"),
        layout: "list",
        items: [
          { _key: key(), title: loc("Qualifizierte Begleitung", "Qualified guidance"), text: loc("Die Wanderungen werden von qualifizierten und versicherten Guides begleitet.", "Hikes are led by qualified and insured guides.") },
          { _key: key(), title: loc("An die Gruppe angepasst", "Adapted to the group"), text: loc("Route und Tagesablauf berücksichtigen Wetter, Bedingungen vor Ort und die Erfahrung der Teilnehmenden.", "The route and daily plan take account of weather, local conditions and participants' experience.") },
          { _key: key(), title: loc("Optionale Ergänzungen", "Optional additions"), text: loc("Transport, Mahlzeiten und Badeaufenthalte werden nur dort eingeplant, wo sie für die konkrete Reise vereinbart wurden.", "Transport, meals and swimming stops are included only where agreed for the specific trip.") },
        ],
      },
    ],
    closing: {
      eyebrow: loc("Ihre Reise", "Your journey"),
      title: loc("Welche Erlebnisse passen zu Ihnen?", "Which experiences would suit you?"),
      text: loc(
        "Nennen Sie uns Reisezeit, Gruppengröße und Wandererfahrung. Gemeinsam stellen wir die passenden Aktivitäten zusammen.",
        "Tell us your travel dates, group size and hiking experience. We can then shape a suitable combination of activities.",
      ),
      action: loc("Reise anfragen", "Enquire now"),
      hrefPageId: "contact",
    },
  },

  // ── region ──────────────────────────────────────────────────────────
  {
    _id: "page-region",
    _type: "page",
    slug: { _type: "slug", current: "region" },
    seoTitle: loc("Die Region | OLVIOS Outdoor Activities", "The Region | OLVIOS Outdoor Activities"),
    seoDescription: loc(
      "Trikala Korinthias, das Ziria-Massiv und der Korinthische Golf: eine Bergregion im Norden der Peloponnes.",
      "Trikala Korinthias, Mount Ziria and the Corinthian Gulf: a mountain region in the Northern Peloponnese.",
    ),
    eyebrow: loc("Nördliche Peloponnes", "Northern Peloponnese"),
    title: loc("Eine Region zwischen Bergdörfern und Meer", "A region of mountain villages and sea"),
    intro: loc(
      "Rund um Trikala Korinthias treffen bewaldete Berghänge, lebendige Dörfer, alte Geschichten und die Küste des Korinthischen Golfs aufeinander.",
      "Around Trikala Korinthias, wooded slopes, lived-in villages, ancient stories and the coast of the Corinthian Gulf meet within one compact region.",
    ),
    highlights: [
      { _key: key(), value: loc("950 m", "950 m"), label: loc("Basis in Kato Trikala", "base in Kato Trikala") },
      { _key: key(), value: loc("3", "3"), label: loc("historische Bergdörfer", "historic mountain villages") },
      { _key: key(), value: loc("ca. 30 Min.", "about 30 min"), label: loc("bis zur Küste", "to the coast") },
    ],
    sections: [
      {
        _key: key(), id: "trikala",
        eyebrow: loc("Unsere Basis", "Our base"),
        title: loc("Trikala Korinthias", "Trikala Korinthias"),
        layout: "paragraphs",
        paragraphs: [
          { _key: key(), de: "Kato Trikala liegt auf ungefähr 950 Metern Höhe. Darüber folgen Mesaia Trikala auf etwa 1.050 Metern und Ano Trikala auf rund 1.200 Metern.", en: "Kato Trikala lies at approximately 950 metres. Above it are Mesaia Trikala at around 1,050 metres and Ano Trikala at roughly 1,200 metres." },
          { _key: key(), de: "Alte Fußwege und kurze Straßenabschnitte verbinden die drei Dörfer. Tavernen, Cafés und kleine Läden mit regionalen Produkten machen sie zu einem praktischen Ausgangspunkt.", en: "Old footpaths and short stretches of road link the three villages. Tavernas, cafes and small shops selling regional products make them a practical base for days in the mountains." },
        ],
      },
      {
        _key: key(), id: "ziria",
        eyebrow: loc("Berglandschaft", "Mountain landscape"),
        title: loc("Das Ziria-Massiv", "Mount Ziria"),
        intro: loc("Wälder, Hochflächen, Quellen und Bergpfade prägen die Landschaft rund um die Dörfer.", "Forests, high ground, springs and mountain trails define the landscape around the villages."),
        layout: "cards",
        items: [
          { _key: key(), title: loc("Flampouritsa-Tal", "Flampouritsa Valley"), text: loc("Ein grünes Tal mit Waldwegen und dem Quellgebiet des Sythas.", "A green valley of forest paths and the source area of the Sythas River.") },
          { _key: key(), title: loc("Dasiou-See", "Lake Dasiou"), text: loc("Ein kleiner Bergsee, der in längere Varianten ausgewählter Wanderungen eingebunden werden kann.", "A small mountain lake that can form part of longer variations of selected walks.") },
          { _key: key(), title: loc("Hermes-Höhle", "Cave of Hermes"), text: loc("Der Überlieferung nach ist die Höhle mit der Geburt des Gottes Hermes verbunden.", "According to tradition, the cave is connected with the birth of the god Hermes.") },
        ],
      },
      {
        _key: key(), id: "history",
        eyebrow: loc("Geschichte und Mythologie", "History and mythology"),
        title: loc("Das Land des antiken Pellene", "The land of ancient Pellene"),
        layout: "paragraphs",
        paragraphs: [
          { _key: key(), de: "Die Umgebung gehörte zur historischen Landschaft des antiken Pellene. In der Region befand sich das Heiligtum der Mysischen Demeter, das als Mysaion bekannt war.", en: "The surrounding area formed part of the historic territory of ancient Pellene. The sanctuary of Mysian Demeter, known as the Mysaeum, was located in the region." },
          { _key: key(), de: "Mythologische Erzählungen, Klöster und archäologische Orte geben den Wanderungen einen kulturellen Rahmen.", en: "Mythological stories, monasteries and archaeological places give the walks a cultural setting without pushing nature into the background." },
        ],
      },
      {
        _key: key(), id: "coast",
        eyebrow: loc("Der Korinthische Golf", "The Corinthian Gulf"),
        title: loc("Die Küste bleibt nah", "The coast remains close"),
        layout: "paragraphs",
        paragraphs: [
          { _key: key(), de: "Von Kato Trikala erreicht man den vorgesehenen Küstenabschnitt in ungefähr 30 Minuten. Xylokastro und der Pefkias-Wald bieten einen deutlichen Kontrast zur Berglandschaft.", en: "The intended coastal area is approximately 30 minutes from Kato Trikala. Xylokastro and the Pefkias forest create a clear contrast with the mountain landscape." },
          { _key: key(), de: "Badeaufenthalte, Mahlzeiten und Transfers sind optionale Reiseelemente und werden für die konkrete Reise abgestimmt.", en: "Swimming stops, meals and transfers are optional trip elements and are agreed for each itinerary." },
        ],
      },
    ],
    closing: {
      eyebrow: loc("Die Region erleben", "Experience the region"),
      title: loc("Entdecken Sie die Landschaft zu Fuß", "Explore the landscape on foot"),
      text: loc("Lernen Sie die ausgewählten Wanderungen und saisonalen Erlebnisse rund um Ziria kennen.", "Discover the selected hikes and seasonal experiences around Mount Ziria."),
      action: loc("Aktivitäten ansehen", "View activities"),
      hrefPageId: "activities",
    },
  },

  // ── about ────────────────────────────────────────────────────────────
  {
    _id: "page-about",
    _type: "page",
    slug: { _type: "slug", current: "about" },
    seoTitle: loc("Über OLVIOS | OLVIOS Outdoor Activities", "About OLVIOS | OLVIOS Outdoor Activities"),
    seoDescription: loc(
      "Die Idee hinter OLVIOS Outdoor Activities und unser persönlicher Zugang zur Nördlichen Peloponnes.",
      "The idea behind OLVIOS Outdoor Activities and our personal approach to the Northern Peloponnese.",
    ),
    eyebrow: loc("Über OLVIOS", "About OLVIOS"),
    title: loc("Eine persönliche Einladung in unsere Region", "A personal invitation to our region"),
    intro: loc(
      "OLVIOS Outdoor Activities möchte Gästen aus Europa die Natur, Dörfer und lokale Kultur der Nördlichen Peloponnes näherbringen.",
      "OLVIOS Outdoor Activities aims to introduce visitors from Europe to the nature, villages and local culture of the Northern Peloponnese.",
    ),
    highlights: [
      { _key: key(), value: loc("lokal", "local"), label: loc("in der Region verankert", "rooted in the region") },
      { _key: key(), value: loc("persönlich", "personal"), label: loc("mit direkter Begleitung", "directly accompanied") },
      { _key: key(), value: loc("bewusst", "considered"), label: loc("abseits üblicher Ziele", "away from usual routes") },
    ],
    sections: [
      {
        _key: key(), id: "story",
        eyebrow: loc("Unsere Geschichte", "Our story"),
        title: loc("Ein langjähriger Traum", "A long-held dream"),
        layout: "paragraphs",
        paragraphs: [
          { _key: key(), de: "Nach einem langen Aufenthalt in Nordeuropa und vielen Wanderungen durch die dortigen Berge und Wälder kehrten wir nach Griechenland zurück.", en: "After living in Northern Europe for many years and walking extensively through its mountains and forests, we returned to Greece." },
          { _key: key(), de: "In den historischen Dörfern von Trikala Korinthias entstand ein Berggasthof und daraus die Idee, unsere Heimat mit Gästen zu teilen.", en: "A mountain guesthouse took shape in the historic villages of Trikala Korinthias, followed by the idea of sharing our home with visitors who want to encounter Greece beyond its familiar coastal destinations." },
        ],
      },
      {
        _key: key(), id: "approach",
        eyebrow: loc("Unser Ansatz", "Our approach"),
        title: loc("Natur, Menschen und Herkunft verbinden", "Connecting nature, people and place"),
        layout: "cards",
        items: [
          { _key: key(), title: loc("Ausgewählte Wege", "Selected paths"), text: loc("Wir konzentrieren uns auf Routen, die Landschaft und Charakter der Region verständlich machen.", "We focus on routes that communicate the landscape and character of the region.") },
          { _key: key(), title: loc("Lokaler Alltag", "Local life"), text: loc("Dörfer, Landwirtschaft und saisonale Produkte gehören zum Reiseerlebnis, wenn die Begegnungen vor Ort bestätigt sind.", "Villages, agriculture and seasonal produce can become part of the journey when local arrangements are confirmed.") },
          { _key: key(), title: loc("Persönliche Planung", "Personal planning"), text: loc("Die Aktivitäten werden an Reisezeit, Interessen und Erfahrung der Gruppe angepasst.", "Activities are shaped around the group's dates, interests and experience.") },
        ],
      },
      {
        _key: key(), id: "purpose",
        eyebrow: loc("Unser Ziel", "Our purpose"),
        title: loc("Die Nördliche Peloponnes näherbringen", "Bringing the Northern Peloponnese closer"),
        layout: "paragraphs",
        paragraphs: [
          { _key: key(), de: "OLVIOS verbindet Bergwanderungen mit der Geschichte und Landwirtschaft Nordkorinthias.", en: "OLVIOS connects mountain walking with the history and agriculture of Northern Corinthia." },
          { _key: key(), de: "Wir möchten keine möglichst lange Liste von Orten anbieten, sondern eine sorgfältig zusammengestellte Reise mit nachvollziehbaren, bestätigten Erlebnissen.", en: "Rather than presenting the longest possible list of places, we aim to create a considered journey made up of understandable, confirmed experiences." },
        ],
      },
    ],
    closing: {
      eyebrow: loc("OLVIOS kennenlernen", "Meet OLVIOS"),
      title: loc("Planen wir Ihre Reise gemeinsam", "Let us plan your journey together"),
      text: loc("Erzählen Sie uns, wann Sie reisen möchten und was Sie an der Region besonders interessiert.", "Tell us when you would like to travel and what interests you most about the region."),
      action: loc("Reise anfragen", "Enquire now"),
      hrefPageId: "contact",
    },
  },

  // ── practicalInformation ─────────────────────────────────────────────
  {
    _id: "page-practical-information",
    _type: "page",
    slug: { _type: "slug", current: "practical-information" },
    seoTitle: loc("Praktische Informationen | OLVIOS", "Practical Information | OLVIOS"),
    seoDescription: loc(
      "Hinweise zur Vorbereitung, Ausrüstung und Planung einer Reise mit OLVIOS Outdoor Activities.",
      "Preparation, equipment and planning information for a journey with OLVIOS Outdoor Activities.",
    ),
    eyebrow: loc("Gut vorbereitet", "Be prepared"),
    title: loc("Praktische Informationen für Ihre Reise", "Practical information for your journey"),
    intro: loc(
      "Die endgültigen Angaben zu Treffpunkt, Transfers, Ausrüstung und Tagesablauf erhalten Sie passend zu Ihrer bestätigten Reise.",
      "Final meeting points, transfers, equipment and daily arrangements will be provided for your confirmed trip.",
    ),
    highlights: [
      { _key: key(), value: loc("persönlich", "personal"), label: loc("Beratung vor der Reise", "pre-trip advice") },
      { _key: key(), value: loc("flexibel", "flexible"), label: loc("Planung nach Bedingungen", "conditions-led planning") },
      { _key: key(), value: loc("geführt", "guided"), label: loc("qualifizierte Begleitung", "qualified support") },
    ],
    sections: [
      {
        _key: key(), id: "before-booking",
        eyebrow: loc("Vor der Anfrage", "Before enquiring"),
        title: loc("Was wir von Ihnen wissen sollten", "What we need to know"),
        layout: "list",
        items: [
          { _key: key(), title: loc("Reisezeit und Gruppengröße", "Travel dates and group size"), text: loc("Nennen Sie uns mögliche Termine, die Zahl der Reisenden und besondere Anforderungen.", "Share your possible dates, number of travellers and any particular requirements.") },
          { _key: key(), title: loc("Wandererfahrung", "Hiking experience"), text: loc("Beschreiben Sie ehrlich Ihre Kondition, Erfahrung auf Bergwegen und eventuelle Einschränkungen.", "Describe your fitness, experience on mountain paths and any relevant limitations honestly.") },
          { _key: key(), title: loc("Interessen", "Interests"), text: loc("Teilen Sie uns mit, ob Wandern, Kultur, saisonale Produkte oder Zeit am Meer im Mittelpunkt stehen sollen.", "Tell us whether hiking, culture, seasonal produce or time by the sea should be central to the journey.") },
        ],
      },
      {
        _key: key(), id: "equipment",
        eyebrow: loc("Unterwegs", "On the trail"),
        title: loc("Ausrüstung und Bedingungen", "Equipment and conditions"),
        layout: "paragraphs",
        paragraphs: [
          { _key: key(), de: "Feste Schuhe, der Jahreszeit entsprechende Kleidung sowie Sonnen- und Wetterschutz gehören zur Grundausstattung. Eine genaue Packliste folgt mit den Reiseunterlagen.", en: "Sturdy footwear, clothing appropriate to the season, sun protection and weather protection are basic requirements. A detailed packing list will accompany confirmed trip information." },
          { _key: key(), de: "Wetter und Wegzustand können Änderungen am Tagesplan erforderlich machen. Sicherheit und Eignung der Gruppe haben Vorrang vor dem vorgesehenen Ablauf.", en: "Weather and trail conditions may require changes to the daily plan. Group safety and suitability take priority over the intended schedule." },
        ],
      },
      {
        _key: key(), id: "guiding",
        eyebrow: loc("Begleitung", "Guidance"),
        title: loc("Guides und besondere Aktivitäten", "Guides and specialist activities"),
        layout: "paragraphs",
        paragraphs: [
          { _key: key(), de: "Die Wanderungen werden von qualifizierten und versicherten Guides begleitet. Der Zugang zur Hermes-Höhle findet ausschließlich mit einem professionellen Höhlenführer statt.", en: "Hikes are accompanied by qualified and insured guides. Entry to the Cave of Hermes takes place exclusively with a professional cave guide." },
          { _key: key(), de: "Das öffentliche A/B/C-System für die Schwierigkeit wird erst ergänzt, nachdem alle Routen anhand derselben kombinierten Kriterien neu bewertet wurden.", en: "The public A/B/C difficulty system will be added only after all routes have been reassessed using the same combined criteria." },
        ],
      },
      {
        _key: key(), id: "optional-services",
        eyebrow: loc("Reisebausteine", "Trip elements"),
        title: loc("Was optional vereinbart wird", "What is arranged optionally"),
        layout: "cards",
        items: [
          { _key: key(), title: loc("Transfers", "Transfers"), text: loc("Notwendige oder gewünschte Fahrten werden im konkreten Reisevorschlag ausgewiesen.", "Required or requested journeys will be identified in the specific trip proposal.") },
          { _key: key(), title: loc("Mahlzeiten", "Meals"), text: loc("Restaurantbesuche und Verpflegung außerhalb bestätigter Leistungen bleiben optional.", "Restaurant visits and food outside confirmed inclusions remain optional.") },
          { _key: key(), title: loc("Badeaufenthalte", "Swimming stops"), text: loc("Zeit am Meer kann passend zu Wetter, Saison und Tagesprogramm ergänzt werden.", "Time by the sea can be added according to weather, season and the day's programme.") },
        ],
      },
    ],
    closing: {
      eyebrow: loc("Noch Fragen?", "Any questions?"),
      title: loc("Sprechen Sie mit uns über Ihre Reise", "Talk to us about your journey"),
      text: loc("Wir klären Anforderungen und mögliche Reisebausteine vor einer verbindlichen Planung persönlich.", "We will discuss requirements and possible trip elements personally before any binding plan is made."),
      action: loc("Kontakt aufnehmen", "Contact us"),
      hrefPageId: "contact",
    },
  },

  // ── contact ──────────────────────────────────────────────────────────
  {
    _id: "page-contact",
    _type: "page",
    slug: { _type: "slug", current: "contact" },
    seoTitle: loc("Kontakt | OLVIOS Outdoor Activities", "Contact Us | OLVIOS Outdoor Activities"),
    seoDescription: loc(
      "Fragen Sie eine individuell geplante Reise mit OLVIOS Outdoor Activities in der Nördlichen Peloponnes an.",
      "Enquire about a personally planned OLVIOS Outdoor Activities journey in the Northern Peloponnese.",
    ),
    eyebrow: loc("Reise anfragen", "Enquire now"),
    title: loc("Erzählen Sie uns von Ihrer Reiseidee", "Tell us about your travel idea"),
    intro: loc(
      "Mit einigen Angaben zu Reisezeit, Gruppe und Interessen können wir die nächsten Schritte persönlich mit Ihnen abstimmen.",
      "A few details about your dates, group and interests will help us discuss the next steps with you personally.",
    ),
    highlights: [
      { _key: key(), value: loc("1", "1"), label: loc("persönliche Ansprechperson", "personal point of contact") },
      { _key: key(), value: loc("DE / EN", "DE / EN"), label: loc("Kommunikation", "communication") },
      { _key: key(), value: loc("individuell", "personal"), label: loc("Reisevorschlag", "trip proposal") },
    ],
    sections: [
      {
        _key: key(), id: "enquiry-details",
        eyebrow: loc("Ihre Anfrage", "Your enquiry"),
        title: loc("Diese Angaben helfen uns", "Information that helps us"),
        layout: "list",
        items: [
          { _key: key(), title: loc("Wann möchten Sie reisen?", "When would you like to travel?"), text: loc("Nennen Sie einen festen Zeitraum oder mehrere mögliche Termine.", "Provide a fixed period or several possible dates.") },
          { _key: key(), title: loc("Wer reist mit?", "Who will be travelling?"), text: loc("Teilen Sie uns Gruppengröße, Altersstruktur und relevante Anforderungen mit.", "Share the group size, age range and any relevant requirements.") },
          { _key: key(), title: loc("Was möchten Sie erleben?", "What would you like to experience?"), text: loc("Beschreiben Sie Ihre Wandererfahrung und Ihr Interesse an Natur, Kultur, lokalen Produkten oder dem Meer.", "Describe your hiking experience and interest in nature, culture, local produce or the coast.") },
          { _key: key(), title: loc("Welche Unterkunft benötigen Sie?", "What accommodation do you need?"), text: loc("Nennen Sie Zimmeraufteilung und besondere Wünsche für den Aufenthalt in Trikala Korinthias.", "Tell us the preferred room arrangement and any particular needs for your stay in Trikala Korinthias.") },
        ],
      },
      {
        _key: key(), id: "contact-method",
        eyebrow: loc("Kontaktweg", "How to contact us"),
        title: loc("Das Anfrageformular folgt vor dem Start", "The enquiry form will be added before launch"),
        layout: "paragraphs",
        paragraphs: [
          { _key: key(), de: "Die verifizierte E-Mail-Adresse, Telefonnummer und das datenschutzkonforme Anfrageformular werden ergänzt, sobald die geschäftlichen Kontaktdaten und Rechtstexte freigegeben sind.", en: "The verified email address, telephone number and privacy-compliant enquiry form will be added once the business contact details and legal wording have been approved." },
          { _key: key(), de: "Bis dahin dient diese Seite als inhaltliches Gerüst und nimmt noch keine personenbezogenen Daten entgegen.", en: "Until then, this page is a content scaffold and does not collect personal information." },
        ],
        note: loc(
          "Bitte veröffentlichen Sie diese Seite erst, wenn mindestens ein funktionierender und geprüfter Kontaktweg eingerichtet ist.",
          "Do not publish this page until at least one working and verified contact method is available.",
        ),
      },
    ],
    closing: {
      eyebrow: loc("Inspiration", "Inspiration"),
      title: loc("Entdecken Sie zuerst die möglichen Aktivitäten", "Explore the possible activities first"),
      text: loc("Die Übersicht hilft Ihnen dabei, Interessen und passende Reisezeit einzugrenzen.", "The overview will help you identify your interests and the right season for your trip."),
      action: loc("Aktivitäten ansehen", "View activities"),
      hrefPageId: "activities",
    },
  },
];

// ─── Demo packages ───────────────────────────────────────────────────────────

const packages = [
  {
    _id: "package-menalo-trekking",
    _type: "package",
    title: loc("Menalo Trekking", "Menalo Trekking"),
    slug: { _type: "slug", current: "menalo-trekking" },
    summary: loc(
      "Fünf Tage durch die unberührte Bergwelt des Menalo-Massivs – mit Übernachtungen in traditionellen Berghütten und Blicken in die wilden Schluchten Arkadiens.",
      "Five days through the untouched mountain world of the Menalo massif – with nights in traditional mountain huts and views over the wild gorges of Arcadia.",
    ),
    specs: {
      duration: loc("5 Tage", "5 days"),
      accommodation: loc("Berghütten", "Mountain huts"),
      difficultyRating: 2,
      activityType: loc("Wandern", "Hiking"),
      priceFrom: 720,
    },
    featured: true,
  },
  {
    _id: "package-taygetos-ridge",
    _type: "package",
    title: loc("Taygetos-Gratwanderung", "Taygetos Ridge Traverse"),
    slug: { _type: "slug", current: "taygetos-ridge" },
    summary: loc(
      "Die Königin der Peloponnes: spektakuläre Grate, alpin geprägte Pfade und atemberaubende Blicke bis zum Meer – für geübte Wanderer.",
      "The queen of the Peloponnese: spectacular ridges, alpine trails and breathtaking views all the way to the sea – for experienced hikers.",
    ),
    specs: {
      duration: loc("6 Tage", "6 days"),
      accommodation: loc("Gästehäuser", "Guesthouses"),
      difficultyRating: 4,
      activityType: loc("Trekking", "Trekking"),
      priceFrom: 890,
    },
    featured: true,
  },
  {
    _id: "package-leonidio-climbing",
    _type: "package",
    title: loc("Leonidio Klettern & Meer", "Leonidio Climbing & Sea"),
    slug: { _type: "slug", current: "leonidio-climbing" },
    summary: loc(
      "Klettern an den berühmten Marmorwänden von Leonidio – kombiniert mit Küstenwanderungen und einem Sprung ins Ägäische Meer.",
      "Climbing at the famous marble crags of Leonidio – combined with coastal hikes and a swim in the Aegean Sea.",
    ),
    specs: {
      duration: loc("7 Tage", "7 days"),
      accommodation: loc("Hotel", "Hotel"),
      difficultyRating: 3,
      activityType: loc("Klettern & Wandern", "Climbing & Hiking"),
      priceFrom: 1040,
    },
    featured: true,
  },
];

// ─── Write NDJSON ─────────────────────────────────────────────────────────────

const documents = [siteSettings, siteContent, ...pages, ...packages];

const outputDir = new URL("../import/", import.meta.url);
const outputFile = new URL("initial-content.ndjson", outputDir);

await mkdir(outputDir, { recursive: true });
await writeFile(outputFile, documents.map((d) => JSON.stringify(d)).join("\n") + "\n");

console.log(`Wrote ${documents.length} documents to ${outputFile.pathname}`);
console.log(`  1 siteSettings, 1 siteContent, ${pages.length} pages, ${packages.length} packages`);
