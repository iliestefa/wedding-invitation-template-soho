import { useMemo, useState } from 'react';

import {
  FORM_LABELS,
  FORM_MESSAGES,
  FORM_PLACEHOLDERS,
  FORM_STATUS,
} from '../../constants';
import { submitRsvp } from '../../services/rsvpService';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import { useTemplateData } from '../../context/TemplateContext';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import FormField from './FormField/FormField';
import FormStatus from './FormStatus/FormStatus';

import './RsvpForm.scss';

// En modo 'limited' cada cupo tiene su propio link: ?cupos=N
const getCupoParam = () => {
  const raw = new URLSearchParams(window.location.search).get('cupos');
  if (raw === null) return null;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 0 ? n : null;
};

const buildWhatsappUrl = (number, message) => {
  const digits = (number || '').replace(/\D/g, '');
  // Sin número configurado: WhatsApp genérico — abre el selector de contacto
  // con el mensaje ya escrito, y el invitado elige a quién enviárselo.
  if (!digits) return `https://wa.me/?text=${encodeURIComponent(message)}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

const RsvpForm = () => {
  const {
    coupleNames,
    rsvpDeadline,
    rsvpType,
    rsvpWhatsapp,
    rsvpCompanionsMode,
    rsvpCupos,
    rsvpQuestions,
    weddingSlug,
  } = useTemplateData();

  const revealRef = useIntersectionObserver();

  const type = rsvpType ?? 'sheets';
  const questions = rsvpQuestions ?? [];
  const limited = type === 'sheets' && rsvpCompanionsMode === 'limited';

  // Cupo del link actual; sin parámetro (o inválido) se usa el cupo más alto
  const cupo = useMemo(() => {
    if (!limited) return null;
    const available = rsvpCupos?.length ? rsvpCupos : [0, 1, 2];
    const param = getCupoParam();
    return param !== null && available.includes(param) ? param : Math.max(...available);
  }, [limited, rsvpCupos]);

  // Con cupos, la respuesta de asistencia ya incluye los acompañantes
  const attendanceChoices = useMemo(() => {
    if (cupo === null) {
      return [
        { value: 'yes', label: 'Sí, asistiré' },
        { value: 'no',  label: 'No podré asistir' },
      ];
    }
    return [
      { value: 'yes-0', label: 'Sí, asistiré solo/a' },
      ...Array.from({ length: cupo }, (_, i) => {
        const n = i + 1;
        return {
          value: `yes-${n}`,
          label: n === 1 ? 'Sí, con 1 acompañante' : `Sí, con ${n} acompañantes`,
        };
      }),
      { value: 'no', label: 'No podré asistir' },
    ];
  }, [cupo]);

  const [guestName, setGuestName]   = useState('');
  const [attendance, setAttendance] = useState('');
  const [companions, setCompanions] = useState('1');
  const [answers, setAnswers]       = useState({});
  const [errors, setErrors]         = useState({});
  const [status, setStatus]         = useState(FORM_STATUS.IDLE);

  const isSubmitting = status === FORM_STATUS.LOADING;
  const isSuccess    = status === FORM_STATUS.SUCCESS;
  const isAttending  = attendance !== '' && attendance !== 'no';

  const setAnswer = (id, value) => setAnswers((prev) => ({ ...prev, [id]: value }));

  // Modo WhatsApp: sin formulario, dos botones directos (Sí / No) que abren
  // WhatsApp con un mensaje corto ya armado — no hay datos que recolectar acá.
  const handleWhatsappChoice = (attending) => {
    const message = attending
      ? `¡Hola! Confirmo que SÍ asistiré a la boda de ${coupleNames}. 🎉`
      : `Hola, les escribo para confirmar que lamentablemente NO podré asistir a la boda de ${coupleNames}.`;
    const url = buildWhatsappUrl(rsvpWhatsapp, message);
    if (!url) {
      setStatus(FORM_STATUS.ERROR);
      return;
    }
    window.open(url, '_blank', 'noopener');
    setStatus(FORM_STATUS.SUCCESS);
  };

  const validate = () => {
    const nextErrors = {};
    if (!guestName.trim()) nextErrors.guestName = FORM_MESSAGES.VALIDATION_NAME;
    if (!attendance) nextErrors.attendance = FORM_MESSAGES.VALIDATION_ATTENDANCE;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const attendanceLabel =
      attendanceChoices.find((o) => o.value === attendance)?.label ?? attendance;
    const companionsCount = cupo !== null
      ? (attendance.startsWith('yes-') ? Number(attendance.slice(4)) : 0)
      : companions;
    const answeredQuestions = questions
      .map((q) => ({ label: q.label, value: (answers[q.id] ?? '').trim() }))
      .filter((q) => q.value);

    setStatus(FORM_STATUS.LOADING);
    // Personas totales que representa esta confirmación (0 si no asiste).
    // En modo cupos la respuesta trae N acompañantes → N + el invitado;
    // en modo libre el campo ya incluye al invitado.
    const totalGuests = !isAttending
      ? 0
      : cupo !== null
        ? (attendance.startsWith('yes-') ? Number(attendance.slice(4)) + 1 : 1)
        : Math.max(1, Number(companions) || 1);
    // Formato del RSVP universal: el slug identifica al cliente y
    // questionLabels define las columnas dinámicas de su hoja.
    const payload = {
      slug: weddingSlug,
      template: 'soho',
      coupleNames,
      questionLabels: questions.map((q) => q.label),
      guestName,
      attendance: isAttending ? 'yes' : 'no',
      attendanceDetail: attendanceLabel,
      companions: companionsCount,
      totalGuests,
      cupo: cupo ?? '',
      answers: Object.fromEntries(answeredQuestions.map((q) => [q.label, q.value])),
    };
    const success = await submitRsvp(payload);
    setStatus(success ? FORM_STATUS.SUCCESS : FORM_STATUS.ERROR);
  };

  // Éxito: reemplaza el formulario completo — en móvil un mensaje debajo
  // del botón queda fuera de vista y parece que no pasó nada.
  if (isSuccess) {
    return (
      <section className="rsvp" id="rsvp">
        <div className="rsvp__inner">
          <div className="rsvp__success" role="status" aria-live="polite">
            <span className="rsvp__success-icon" aria-hidden="true">✓</span>
            <h2 className="rsvp__success-title">¡Hemos recibido tu confirmación!</h2>
            <p className="rsvp__success-text">
              {type === 'whatsapp'
                ? 'Termina de enviar el mensaje en WhatsApp para que nos llegue.'
                : `Gracias por acompañarnos en este día tan especial. ¡Nos vemos en la boda! — ${coupleNames}`}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (type === 'whatsapp') {
    return (
      <section className="rsvp" id="rsvp">
        <div className="rsvp__inner">
          <SectionHeader eyebrow={`Confirmar antes del ${rsvpDeadline}`} title="¿Nos acompañas?" />

          <div ref={revealRef} className="rsvp__whatsapp-choice">
            <button
              type="button"
              className="rsvp__whatsapp-btn rsvp__whatsapp-btn--yes"
              onClick={() => handleWhatsappChoice(true)}
            >
              Sí, asistiré
            </button>
            <button
              type="button"
              className="rsvp__whatsapp-btn rsvp__whatsapp-btn--no"
              onClick={() => handleWhatsappChoice(false)}
            >
              No podré asistir
            </button>
          </div>

          <FormStatus status={status} />
        </div>
      </section>
    );
  }

  return (
    <section className="rsvp" id="rsvp">
      <div className="rsvp__inner">
        <SectionHeader eyebrow={`Confirmar antes del ${rsvpDeadline}`} title="¿Nos acompañas?" />

        <form
          ref={revealRef}
          className="rsvp__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <FormField
            label={FORM_LABELS.GUEST_NAME}
            htmlFor="guestName"
            error={errors.guestName}
          >
            <input
              id="guestName"
              type="text"
              placeholder={FORM_PLACEHOLDERS.GUEST_NAME}
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              disabled={isSubmitting}
              autoComplete="name"
            />
          </FormField>

          <FormField
            label={FORM_LABELS.ATTENDANCE}
            htmlFor="attendance"
            error={errors.attendance}
          >
            <select
              id="attendance"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="">Selecciona una opción</option>
              {attendanceChoices.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </FormField>

          {cupo === null && isAttending && (
            <FormField label={FORM_LABELS.GUEST_COUNT} htmlFor="companions">
              <input
                id="companions"
                type="number"
                min="1"
                max="10"
                placeholder={FORM_PLACEHOLDERS.GUEST_COUNT}
                value={companions}
                onChange={(e) => setCompanions(e.target.value)}
                disabled={isSubmitting}
              />
            </FormField>
          )}

          {questions.map((q) => (
            <FormField key={q.id} label={q.label} htmlFor={`question-${q.id}`}>
              {q.type === 'textarea' ? (
                <textarea
                  id={`question-${q.id}`}
                  value={answers[q.id] ?? ''}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  disabled={isSubmitting}
                  rows="4"
                />
              ) : (
                <input
                  id={`question-${q.id}`}
                  type="text"
                  value={answers[q.id] ?? ''}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  disabled={isSubmitting}
                />
              )}
            </FormField>
          ))}

          <div className="rsvp__submit-row">
            <button
              type="submit"
              className="rsvp__submit"
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? 'Enviando…' : FORM_LABELS.SUBMIT}
            </button>
          </div>

          <FormStatus status={status} />
        </form>
      </div>
    </section>
  );
};

export default RsvpForm;
