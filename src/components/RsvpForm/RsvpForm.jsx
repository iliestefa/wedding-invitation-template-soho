import { useState, useEffect } from 'react';

import {
  ATTENDANCE_BY_COUNT,
  FORM_FIELD_NAMES,
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_STATUS,
} from '../../constants';
import useRsvpForm from '../../hooks/useRsvpForm';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import { useTemplateData } from '../../context/TemplateContext';

import SectionHeader from '../shared/SectionHeader/SectionHeader';
import FormField from './FormField/FormField';
import FormStatus from './FormStatus/FormStatus';
import ConfirmationModal from './ConfirmationModal/ConfirmationModal';

import './RsvpForm.scss';

const RsvpForm = () => {
  const { rsvpDeadline } = useTemplateData();
  const { formState, errors, status, handleFieldChange, handleSubmit } = useRsvpForm();
  const revealRef = useIntersectionObserver();
  const [showModal, setShowModal] = useState(false);

  const maxCupos = Math.min(
    parseInt(new URLSearchParams(window.location.search).get('cupos') || '1', 10),
    4
  );
  const attendanceOptions = ATTENDANCE_BY_COUNT[maxCupos] || ATTENDANCE_BY_COUNT[4];

  useEffect(() => {
    if (status === FORM_STATUS.SUCCESS) setShowModal(true);
  }, [status]);

  const isSubmitting = status === FORM_STATUS.LOADING;
  const isSuccess    = status === FORM_STATUS.SUCCESS;

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
            htmlFor={FORM_FIELD_NAMES.GUEST_NAME}
            error={errors[FORM_FIELD_NAMES.GUEST_NAME]}
          >
            <input
              id={FORM_FIELD_NAMES.GUEST_NAME}
              type="text"
              placeholder={FORM_PLACEHOLDERS.GUEST_NAME}
              value={formState[FORM_FIELD_NAMES.GUEST_NAME]}
              onChange={(e) => handleFieldChange(FORM_FIELD_NAMES.GUEST_NAME, e.target.value)}
              disabled={isSubmitting}
              autoComplete="name"
            />
          </FormField>

          <FormField
            label={FORM_LABELS.ATTENDANCE}
            htmlFor={FORM_FIELD_NAMES.ATTENDANCE}
            error={errors[FORM_FIELD_NAMES.ATTENDANCE]}
          >
            <select
              id={FORM_FIELD_NAMES.ATTENDANCE}
              value={formState[FORM_FIELD_NAMES.ATTENDANCE]}
              onChange={(e) => handleFieldChange(FORM_FIELD_NAMES.ATTENDANCE, e.target.value)}
              disabled={isSubmitting}
            >
              <option value="">Selecciona una opción</option>
              {attendanceOptions.map(({ id, value, label }) => (
                <option key={id} value={value}>{label}</option>
              ))}
            </select>
          </FormField>

          <FormField
            label={FORM_LABELS.DIETARY}
            htmlFor={FORM_FIELD_NAMES.DIETARY}
          >
            <input
              id={FORM_FIELD_NAMES.DIETARY}
              type="text"
              placeholder={FORM_PLACEHOLDERS.DIETARY}
              value={formState[FORM_FIELD_NAMES.DIETARY]}
              onChange={(e) => handleFieldChange(FORM_FIELD_NAMES.DIETARY, e.target.value)}
              disabled={isSubmitting}
            />
          </FormField>

          <FormField
            label={FORM_LABELS.SONG_REQUEST}
            htmlFor={FORM_FIELD_NAMES.SONG_REQUEST}
          >
            <input
              id={FORM_FIELD_NAMES.SONG_REQUEST}
              type="text"
              placeholder={FORM_PLACEHOLDERS.SONG_REQUEST}
              value={formState[FORM_FIELD_NAMES.SONG_REQUEST]}
              onChange={(e) => handleFieldChange(FORM_FIELD_NAMES.SONG_REQUEST, e.target.value)}
              disabled={isSubmitting}
            />
          </FormField>

          <FormField
            label={FORM_LABELS.MESSAGE}
            htmlFor={FORM_FIELD_NAMES.MESSAGE}
          >
            <textarea
              id={FORM_FIELD_NAMES.MESSAGE}
              placeholder={FORM_PLACEHOLDERS.MESSAGE}
              value={formState[FORM_FIELD_NAMES.MESSAGE]}
              onChange={(e) => handleFieldChange(FORM_FIELD_NAMES.MESSAGE, e.target.value)}
              disabled={isSubmitting}
              rows="4"
            />
          </FormField>

          <div className="rsvp__submit-row">
            <button
              type="submit"
              className="rsvp__submit"
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? 'Enviando…' : FORM_LABELS.SUBMIT}
            </button>
          </div>

          {status === FORM_STATUS.ERROR && <FormStatus status={status} />}
        </form>
      </div>

      {showModal && <ConfirmationModal onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default RsvpForm;
