// ─── Paletas de colores ───────────────────────────────────────────────────────
// Cada paleta se define con solo 3 colores semánticos:
//   bg     → fondo base de la invitación (claro en esta plantilla)
//   accent → color protagonista (títulos, botones, bordes, detalles)
//   text   → color de texto principal
// El resto de variables (tonos alternos, muted, bordes, tints) se derivan
// automáticamente en buildPaletteVars, así cualquier combinación se ve
// armónica sin que la novia tenga que elegir 10 colores.

// ─── Utilidades de color ──────────────────────────────────────────────────────
const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgbToHex = (rgb) =>
  `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;

// Mezcla `a` con `b`; weight = proporción de `b` (0 a 1)
const mix = (a, b, weight) => {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return rgbToHex(A.map((v, i) => v * (1 - weight) + B[i] * weight));
};

// Luminancia relativa (WCAG) para medir contraste texto/fondo
const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
};

// Si el texto elegido no contrasta lo suficiente con el fondo, se corrige
// solo (hacia negro o blanco según el fondo) — evita invitaciones ilegibles.
const ensureContrast = (text, bg, min = 4.5) => {
  let adjusted = text;
  const target = luminance(bg) > 0.4 ? '#111111' : '#ffffff';
  for (let i = 0; i < 12 && contrast(adjusted, bg) < min; i += 1) {
    adjusted = mix(adjusted, target, 0.2);
  }
  return adjusted;
};

// ─── Paletas predefinidas ─────────────────────────────────────────────────────
// La primera es la paleta original de la plantilla.
export const PRESET_PALETTES = [
  { id: 'terracota', label: 'Terracota',  bg: '#faf5ef', accent: '#c4985a', text: '#1e1610' },
  { id: 'salvia',    label: 'Salvia',     bg: '#f5f7f1', accent: '#8a9b7a', text: '#1f241b' },
  { id: 'azul',      label: 'Azul Polvo', bg: '#f4f6f9', accent: '#7f95ad', text: '#1a2027' },
  { id: 'rosa',      label: 'Rosa Viejo', bg: '#faf4f2', accent: '#bd8a85', text: '#261b19' },
];

// ─── Derivación de variables CSS ──────────────────────────────────────────────
// Devuelve el set completo de custom properties que consumen los estilos.
export const buildPaletteVars = ({ bg, accent, text }) => {
  const safeText = ensureContrast(text, bg);
  return {
    '--color-bg':          bg,
    '--color-bg-alt':      mix(bg, safeText, 0.04),
    '--color-bg-dark':     mix(safeText, '#ffffff', 0.06),
    '--color-text':        safeText,
    '--color-text-muted':  mix(safeText, bg, 0.42),
    '--color-gold':        accent,
    '--color-gold-light':  mix(accent, '#ffffff', 0.25),
    '--color-gold-pale':   mix(accent, bg, 0.78),
    '--color-terracotta':  mix(accent, safeText, 0.25),
    '--color-border':      mix(bg, safeText, 0.12),
    '--color-border-gold': accent,
    '--color-white':       '#ffffff',
  };
};

// Aplica (o limpia, si palette es null) la paleta sobre el documento.
// Al setear las variables inline en <html>, pisan a las del :root compilado.
export const applyPaletteToDocument = (palette) => {
  const root = document.documentElement;
  if (!palette) return;
  Object.entries(buildPaletteVars(palette)).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

export const removePaletteFromDocument = () => {
  const root = document.documentElement;
  Object.keys(buildPaletteVars(PRESET_PALETTES[0])).forEach((key) => {
    root.style.removeProperty(key);
  });
};
