import { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { applyPaletteToDocument, removePaletteFromDocument } from '../utils/palettes';
import {
  COLOR_PALETTE,
  BRIDE_NAME,
  GROOM_NAME,
  COUPLE_NAMES,
  WEDDING_DATE_ISO,
  WEDDING_DATE_DISPLAY,
  EVENTS_MODE,
  CEREMONY_TIME,
  CEREMONY_VENUE_NAME,
  CEREMONY_VENUE_ADDRESS,
  CEREMONY_MAPS_LINK,
  CEREMONY_MAPS_EMBED_SRC,
  RECEPTION_TIME,
  RECEPTION_VENUE_NAME,
  RECEPTION_VENUE_ADDRESS,
  RECEPTION_MAPS_LINK,
  RECEPTION_MAPS_EMBED_SRC,
  STORY_INTRO,
  STORY_ITEMS,
  SCHEDULE_INTRO,
  SCHEDULE_ITEMS,
  DRESS_CODE_STYLE,
  DRESS_CODE_DESCRIPTION,
  DRESS_CODE_WOMEN,
  DRESS_CODE_MEN,
  DRESS_CODE_PALETTE,
  GIFT_REGISTRY_INTRO,
  BANK_ACCOUNTS,
  RSVP_DEADLINE,
  RSVP_TYPE,
  RSVP_WHATSAPP,
  RSVP_COMPANIONS_MODE,
  RSVP_CUPOS,
  RSVP_QUESTIONS,
  RSVP_GUESTS,
  FOOTER_MESSAGE,
  IMAGE_HERO,
  IMAGE_DRESS_CODE,
} from '../constants';

const defaultData = {
  brideName: BRIDE_NAME,
  groomName: GROOM_NAME,
  coupleNames: COUPLE_NAMES,
  weddingDateIso: WEDDING_DATE_ISO,
  weddingDateDisplay: WEDDING_DATE_DISPLAY,
  eventsMode: EVENTS_MODE,
  ceremonyTime: CEREMONY_TIME,
  ceremonyVenueName: CEREMONY_VENUE_NAME,
  ceremonyVenueAddress: CEREMONY_VENUE_ADDRESS,
  ceremonyMapsLink: CEREMONY_MAPS_LINK,
  ceremonyMapsEmbedSrc: CEREMONY_MAPS_EMBED_SRC,
  receptionTime: RECEPTION_TIME,
  receptionVenueName: RECEPTION_VENUE_NAME,
  receptionVenueAddress: RECEPTION_VENUE_ADDRESS,
  receptionMapsLink: RECEPTION_MAPS_LINK,
  receptionMapsEmbedSrc: RECEPTION_MAPS_EMBED_SRC,
  storyIntro: STORY_INTRO,
  storyItems: STORY_ITEMS,
  scheduleIntro: SCHEDULE_INTRO,
  scheduleItems: SCHEDULE_ITEMS,
  dressCodeStyle: DRESS_CODE_STYLE,
  dressCodeDescription: DRESS_CODE_DESCRIPTION,
  dressCodeWomen: DRESS_CODE_WOMEN,
  dressCodeMen: DRESS_CODE_MEN,
  dressCodePalette: DRESS_CODE_PALETTE,
  giftRegistryIntro: GIFT_REGISTRY_INTRO,
  bankAccounts: BANK_ACCOUNTS,
  rsvpDeadline: RSVP_DEADLINE,
  rsvpType: RSVP_TYPE,
  rsvpWhatsapp: RSVP_WHATSAPP,
  rsvpCompanionsMode: RSVP_COMPANIONS_MODE,
  rsvpCupos: RSVP_CUPOS,
  rsvpQuestions: RSVP_QUESTIONS,
  rsvpGuests: RSVP_GUESTS,
  footerMessage: FOOTER_MESSAGE,
  imageHero: IMAGE_HERO,
  imageDressCode: IMAGE_DRESS_CODE,
  colorPalette: COLOR_PALETTE,
};

const TemplateContext = createContext(defaultData);

export const TemplateProvider = ({ data, children }) => {
  const value = { ...defaultData, ...data };
  const { colorPalette } = value;

  // La paleta se aplica como variables CSS inline en <html>, pisando las del
  // :root compilado. Con paleta null quedan los colores originales del SCSS.
  // La key evita re-aplicar en cada render del editor (el objeto cambia de
  // referencia aunque los colores sean los mismos).
  const paletteKey = colorPalette
    ? `${colorPalette.bg}|${colorPalette.accent}|${colorPalette.text}`
    : '';

  useEffect(() => {
    if (!colorPalette) return undefined;
    applyPaletteToDocument(colorPalette);
    return () => removePaletteFromDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paletteKey]);

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};

TemplateProvider.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node.isRequired,
};

TemplateProvider.defaultProps = {
  data: {},
};

export const useTemplateData = () => useContext(TemplateContext);
