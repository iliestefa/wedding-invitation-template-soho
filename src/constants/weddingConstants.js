// ─── Pareja ───────────────────────────────────────────────────────────────────
export const BRIDE_NAME = "Sofia";
export const GROOM_NAME = "Alejandro";
export const COUPLE_NAMES = `${BRIDE_NAME} & ${GROOM_NAME}`;

// ─── Fecha ────────────────────────────────────────────────────────────────────
export const WEDDING_DATE_ISO = "2026-09-05";
export const WEDDING_DATE_DISPLAY = "05 · 09 · 2026";
export const WEDDING_YEAR = "2026";

// ─── Ceremonia ────────────────────────────────────────────────────────────────
export const CEREMONY_TIME = "17:00 hrs";
export const CEREMONY_VENUE_NAME = "Iglesia del Pilar";
export const CEREMONY_VENUE_ADDRESS = "Junín 1904, Recoleta, Buenos Aires";
export const CEREMONY_MAPS_LINK =
  "https://maps.google.com/?q=Iglesia+Nuestra+Señora+del+Pilar+Buenos+Aires";
export const CEREMONY_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.168839143649!2d-58.39340898477058!3d-34.58760218046614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca7e9bc3c1a5%3A0x8b1c17b4f5c2c4a0!2sIglesia%20de%20Nuestra%20Se%C3%B1ora%20del%20Pilar!5e0!3m2!1ses!2sar!4v1700000000000";

// ─── Recepcion ────────────────────────────────────────────────────────────────
export const RECEPTION_TIME = "20:00 hrs";
export const RECEPTION_VENUE_NAME = "Palacio Duhau";
export const RECEPTION_VENUE_ADDRESS =
  "Av. Alvear 1661, Recoleta, Buenos Aires";
export const RECEPTION_MAPS_LINK =
  "https://maps.google.com/?q=Park+Hyatt+Buenos+Aires+Palacio+Duhau";
export const RECEPTION_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.3290060978736!2d-58.38766678477066!3d-34.58393378046617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca7bb0fc14ab%3A0x49b9fbb3caaf99c2!2sPark%20Hyatt%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000001";

// ─── Historia ─────────────────────────────────────────────────────────────────
export const STORY_INTRO =
  "Con el corazón lleno de gratitud y amor, los invitamos a ser parte del día más especial de nuestras vidas.";

export const STORY_ITEMS = [
  {
    id: "primer-encuentro",
    year: "2019",
    label: "Primer Encuentro",
    text: "Una tarde de otoño en un café de Palermo. Una sonrisa cruzó el salón y cambió todo para siempre.",
  },
  {
    id: "primer-viaje",
    year: "2021",
    label: "Nuestro Primer Viaje",
    text: "Recorrimos la Patagonia de la mano. Entre montañas y lagos supimos que queríamos explorar el mundo juntos.",
  },
  {
    id: "compromiso",
    year: "2025",
    label: "La Propuesta",
    text: 'Frente al mar, al atardecer en Punta del Este, con un "sí" que resonó en todo el universo.',
  },
  {
    id: "boda",
    year: "2026",
    label: "El Gran Día",
    text: "Rodeados de quienes más amamos, comenzamos el capítulo más hermoso de nuestra historia.",
  },
];

// ─── Cronograma ───────────────────────────────────────────────────────────────
export const SCHEDULE_ITEMS = [
  { id: "llegada", time: "16:30", label: "Llegada a la Iglesia", icon: "🕌" },
  { id: "ceremonia", time: "17:00", label: "Ceremonia Religiosa", icon: "💍" },
  { id: "fotos", time: "18:30", label: "Sesión de Fotos", icon: "📷" },
  {
    id: "recepcion",
    time: "20:00",
    label: "Apertura de Recepción",
    icon: "🥂",
  },
  { id: "cena", time: "21:00", label: "Cena de Gala", icon: "🍽️" },
  { id: "brindis", time: "22:00", label: "Brindis de los Novios", icon: "✨" },
  { id: "pastel", time: "23:00", label: "Corte del Pastel", icon: "🎂" },
  { id: "baile", time: "23:30", label: "Pista de Baile", icon: "🎶" },
];

// ─── Dress Code ───────────────────────────────────────────────────────────────
export const DRESS_CODE_STYLE = "Cocktail Elegante";
export const DRESS_CODE_DESCRIPTION =
  "Les pedimos que acompañen el estilo de nuestra celebración con tonos cálidos y neutros. Evitar el blanco, negro puro y estampados muy llamativos.";
export const DRESS_CODE_WOMEN =
  "Vestido de cóctel o largo en tonos tierra, champagne, rosa pálido o nude.";
export const DRESS_CODE_MEN =
  "Traje con corbata o moñito. Tonos crema, camel, gris claro o azul marino.";

export const DRESS_CODE_PALETTE = [
  { id: "champagne", label: "Champagne", hex: "#f5e6c8" },
  { id: "sand", label: "Arena", hex: "#d4b896" },
  { id: "terracotta", label: "Terracota", hex: "#c17047" },
  { id: "sage", label: "Sage", hex: "#a8b5a0" },
  { id: "dusty-rose", label: "Rosa Pálido", hex: "#d4a0a0" },
  { id: "camel", label: "Camel", hex: "#c19a6b" },
  { id: "navy", label: "Azul Marino", hex: "#2c3e6b" },
  { id: "ivory", label: "Marfil", hex: "#f8f4ec" },
];

// ─── Cuentas para Regalo ──────────────────────────────────────────────────────
export const GIFT_REGISTRY_INTRO =
  "El regalo más grande es su presencia. Si desean hacernos un obsequio, aquí encontrarán nuestras cuentas:";

export const BANK_ACCOUNTS = [
  {
    id: "sofia-pichincha",
    ownerName: "Sofia Morales",
    bankName: "Banco Pichincha",
    accountType: "Cuenta de Ahorros",
    accountAlias: "sofia.morales",
    cbu: "2200123456789012",
    accountNumberLabel: "N° de Cuenta",
  },
  {
    id: "alejandro-guayaquil",
    ownerName: "Alejandro Gómez",
    bankName: "Banco Guayaquil",
    accountType: "Cuenta Corriente",
    accountAlias: "alejandro.gomez",
    cbu: "0200987654321098",
    accountNumberLabel: "N° de Cuenta",
  },
];

// ─── RSVP ─────────────────────────────────────────────────────────────────────
export const RSVP_DEADLINE = "01 de Julio 2026";

// ─── Footer ───────────────────────────────────────────────────────────────────
export const FOOTER_MESSAGE = "Nos mueve el amor, nos une la familia.";
export const FOOTER_CONTACT_EMAIL = "boda@sofiayalejandro2026.com";

// ─── Imágenes (Unsplash, sin API key) ─────────────────────────────────────────
export const IMAGE_HERO =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80&auto=format&fit=crop";
export const IMAGE_STORY =
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop";
export const IMAGE_DRESS_CODE =
  "https://images.unsplash.com/photo-1765615191957-eaa2feb8c00d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const IMAGE_RINGS =
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=900&q=80&auto=format&fit=crop";
