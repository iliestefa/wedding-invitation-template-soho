export const ATTENDANCE_BY_COUNT = {
  1: [
    { id: 'yes-1', value: 'yes_1', label: 'Sí, asistiré solo/a', count: 1 },
    { id: 'no',    value: 'no',    label: 'No podré asistir',     count: 0 },
  ],
  2: [
    { id: 'yes-1', value: 'yes_1', label: 'Sí, asistiré solo/a',              count: 1 },
    { id: 'yes-2', value: 'yes_2', label: 'Sí, asistiré con 1 acompañante',   count: 2 },
    { id: 'no',    value: 'no',    label: 'No podré asistir',                  count: 0 },
  ],
  3: [
    { id: 'yes-1', value: 'yes_1', label: 'Sí, asistiré solo/a',              count: 1 },
    { id: 'yes-2', value: 'yes_2', label: 'Sí, asistiré con 1 acompañante',   count: 2 },
    { id: 'yes-3', value: 'yes_3', label: 'Sí, asistiré con 2 acompañantes',  count: 3 },
    { id: 'no',    value: 'no',    label: 'No podré asistir',                  count: 0 },
  ],
  4: [
    { id: 'yes-1', value: 'yes_1', label: 'Sí, asistiré solo/a',              count: 1 },
    { id: 'yes-2', value: 'yes_2', label: 'Sí, asistiré con 1 acompañante',   count: 2 },
    { id: 'yes-3', value: 'yes_3', label: 'Sí, asistiré con 2 acompañantes',  count: 3 },
    { id: 'yes-4', value: 'yes_4', label: 'Sí, asistiré con 3 acompañantes',  count: 4 },
    { id: 'no',    value: 'no',    label: 'No podré asistir',                  count: 0 },
  ],
};

export const ATTENDANCE_OPTIONS = ATTENDANCE_BY_COUNT[4];

export const GUEST_COUNT_OPTIONS = [
  { id: 'simple',    value: '1', label: 'Individual (1 persona)' },
  { id: 'doble',     value: '2', label: 'Doble (2 personas)' },
  { id: 'triple',    value: '3', label: 'Triple (3 personas)' },
  { id: 'cuadruple', value: '4', label: 'Cuádruple (4 personas)' },
];

export const FORM_FIELD_NAMES = {
  GUEST_NAME:   'guestName',
  ATTENDANCE:   'attendance',
  GUEST_COUNT:  'guestCount',
  DIETARY:      'dietary',
  SONG_REQUEST: 'songRequest',
  MESSAGE:      'message',
};

export const FORM_LABELS = {
  GUEST_NAME:   'Nombre completo *',
  ATTENDANCE:   '¿Asistirás a la boda? *',
  GUEST_COUNT:  'Tipo de invitación',
  DIETARY:      'Restricciones alimentarias o alergias',
  SONG_REQUEST: 'Una canción que no puede faltar en la pista',
  MESSAGE:      'Un mensaje para los novios',
  SUBMIT:       'CONFIRMAR ASISTENCIA',
};

export const FORM_PLACEHOLDERS = {
  GUEST_NAME:   'Tu nombre y apellido',
  GUEST_COUNT:  '1',
  DIETARY:      'Vegetariano, celíaco, alérgico a…',
  SONG_REQUEST: 'Artista – Canción',
  MESSAGE:      'Escríbeles algo desde el corazón…',
};

export const FORM_STATUS = {
  IDLE:    'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR:   'error',
};

export const FORM_MESSAGES = {
  SUCCESS:              '¡Gracias! Hemos recibido tu confirmación. ¡No podemos esperar para celebrar juntos!',
  ERROR:                'Algo salió mal. Por favor inténtalo de nuevo o escríbenos directamente.',
  VALIDATION_NAME:      'Por favor ingresa tu nombre completo.',
  VALIDATION_ATTENDANCE:'Por favor indica si podrás asistir.',
};
