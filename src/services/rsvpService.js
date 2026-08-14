import { APPS_SCRIPT_URL, FETCH_MODE } from '../constants';

// El body va como text/plain a propósito: application/json dispara un
// preflight CORS que Apps Script no responde. El script parsea el JSON
// del cuerpo igual (ver wedding-editor/apps-script/rsvp-universal.gs).
export const submitRsvp = async (formData) => {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: FETCH_MODE,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(formData),
    });
    return true;
  } catch {
    return false;
  }
};
