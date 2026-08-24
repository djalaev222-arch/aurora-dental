import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'motion/react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Button } from '../ui/Button.jsx'
import { Icon } from '../ui/Icon.jsx'
import { Field, inputClasses, inputErrorClasses } from './Field.jsx'
import { useAvailability } from '../../hooks/useAvailability.js'
import { apiUrl } from '../../lib/api.js'
import { services, doctors, clinic } from '../../data/content.js'
import clsx from 'clsx'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function maxDateISO() {
  const d = new Date()
  d.setDate(d.getDate() + 45)
  return d.toISOString().slice(0, 10)
}

export function BookingForm({ selectedServiceId, formRef }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      serviceId: selectedServiceId || '',
      doctorId: '',
      date: '',
      time: '',
      comment: '',
      consent: false,
    },
  })

  const [submitStatus, setSubmitStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')

  const doctorId = watch('doctorId')
  const date = watch('date')
  const { slots, status: availabilityStatus } = useAvailability(doctorId, date)

  useEffect(() => {
    if (selectedServiceId) {
      setValue('serviceId', selectedServiceId)
    }
  }, [selectedServiceId, setValue])

  const bounds = useMemo(() => ({ min: todayISO(), max: maxDateISO() }), [])

  const onSubmit = async (values) => {
    setSubmitStatus('idle')
    setSubmitError('')
    try {
      const res = await fetch(apiUrl('/booking'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const contentType = res.headers.get('content-type') ?? ''
      if (!contentType.includes('application/json')) {
        throw new Error('unexpected response')
      }
      const data = await res.json()

      if (!res.ok) {
        setSubmitError(
          data?.errors
            ? 'Проверьте правильность заполнения полей формы'
            : data?.error || 'Не удалось отправить заявку. Попробуйте ещё раз.',
        )
        setSubmitStatus('error')
        return
      }

      setSubmitStatus('success')
      reset({
        name: '',
        phone: '',
        serviceId: '',
        doctorId: '',
        date: '',
        time: '',
        comment: '',
        consent: false,
      })
    } catch {
      setSubmitError(
        `Не удалось отправить форму онлайн. Позвоните нам по ${clinic.phone} или напишите в WhatsApp — запишем вручную.`,
      )
      setSubmitStatus('error')
    }
  }

  return (
    <section id="booking" ref={formRef} className="bg-surface-muted dark:bg-surface-muted-dark py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            title="Запишитесь на приём онлайн"
            description="Заполните форму — администратор свяжется с вами в течение 15 минут, чтобы подтвердить время."
          />
          <div className="mt-8 flex flex-col gap-4">
            <a
              href={clinic.phoneHref}
              className="flex items-center gap-3 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-800/40 text-primary-600 dark:text-primary-300">
                <Icon name="Phone" weight="fill" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink dark:text-ink-dark">{clinic.phone}</p>
                <p className="text-xs text-ink-soft dark:text-ink-soft-dark">Ежедневно, {clinic.hoursWeekday}</p>
              </div>
            </a>
            <a
              href={clinic.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-800/40 text-primary-600 dark:text-primary-300">
                <Icon name="WhatsappLogo" weight="fill" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink dark:text-ink-dark">WhatsApp</p>
                <p className="text-xs text-ink-soft dark:text-ink-soft-dark">Ответим в мессенджере</p>
              </div>
            </a>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6 shadow-soft sm:p-8">
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-800/40 text-primary-600 dark:text-primary-300">
                    <Icon name="CheckCircle" weight="fill" className="h-9 w-9" />
                  </span>
                  <h3 className="text-xl font-bold text-ink dark:text-ink-dark">Заявка отправлена</h3>
                  <p className="max-w-sm text-sm text-ink-soft dark:text-ink-soft-dark">
                    Мы свяжемся с вами по указанному телефону, чтобы подтвердить дату и время приёма.
                  </p>
                  <Button type="button" variant="secondary" onClick={() => setSubmitStatus('idle')}>
                    Записать ещё одного пациента
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Имя" htmlFor="name" error={errors.name?.message}>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Как к вам обращаться"
                        className={clsx(inputClasses, errors.name && inputErrorClasses)}
                        {...register('name', {
                          required: 'Укажите имя',
                          minLength: { value: 2, message: 'Минимум 2 символа' },
                        })}
                      />
                    </Field>
                    <Field label="Телефон" htmlFor="phone" error={errors.phone?.message}>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+7 (___) ___-__-__"
                        className={clsx(inputClasses, errors.phone && inputErrorClasses)}
                        {...register('phone', {
                          required: 'Укажите телефон',
                          pattern: {
                            value: /^[+]?\d[\d\s()-]{9,17}$/,
                            message: 'Проверьте формат номера',
                          },
                        })}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Услуга" htmlFor="serviceId" error={errors.serviceId?.message}>
                      <select
                        id="serviceId"
                        className={clsx(inputClasses, errors.serviceId && inputErrorClasses)}
                        {...register('serviceId', { required: 'Выберите услугу' })}
                      >
                        <option value="">Выберите услугу</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Врач" htmlFor="doctorId" error={errors.doctorId?.message}>
                      <select
                        id="doctorId"
                        className={clsx(inputClasses, errors.doctorId && inputErrorClasses)}
                        {...register('doctorId', { required: 'Выберите врача' })}
                      >
                        <option value="">Любой свободный врач</option>
                        {doctors.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} — {d.role}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Дата" htmlFor="date" error={errors.date?.message}>
                      <input
                        id="date"
                        type="date"
                        min={bounds.min}
                        max={bounds.max}
                        className={clsx(inputClasses, errors.date && inputErrorClasses)}
                        {...register('date', { required: 'Выберите дату' })}
                      />
                    </Field>
                    <Field
                      label="Время"
                      htmlFor="time"
                      error={errors.time?.message}
                      hint={
                        !doctorId || !date
                          ? 'Сначала выберите врача и дату'
                          : availabilityStatus === 'loading'
                            ? 'Загружаем свободное время…'
                            : availabilityStatus === 'error'
                              ? 'Не удалось загрузить время — позвоните нам напрямую'
                              : undefined
                      }
                    >
                      <select
                        id="time"
                        disabled={!doctorId || !date || availabilityStatus === 'loading'}
                        className={clsx(inputClasses, errors.time && inputErrorClasses)}
                        {...register('time', { required: 'Выберите время' })}
                      >
                        <option value="">
                          {availabilityStatus === 'loading' ? 'Загрузка…' : 'Выберите время'}
                        </option>
                        {slots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Комментарий (необязательно)" htmlFor="comment">
                    <textarea
                      id="comment"
                      rows={3}
                      placeholder="Опишите жалобу или пожелания к приёму"
                      className={clsx(inputClasses, 'resize-none')}
                      {...register('comment')}
                    />
                  </Field>

                  <label className="flex items-start gap-3 text-xs text-ink-soft dark:text-ink-soft-dark">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 flex-none rounded border-border dark:border-border-dark text-primary-500 focus-visible:outline-primary-500"
                      {...register('consent', { required: true })}
                    />
                    Я согласен(на) на обработку персональных данных в соответствии с
                    политикой конфиденциальности клиники.
                  </label>
                  {errors.consent ? (
                    <p className="-mt-3 text-xs font-medium text-accent-600 dark:text-accent-400">
                      Нужно согласие на обработку данных
                    </p>
                  ) : null}

                  {submitStatus === 'error' ? (
                    <p className="rounded-xl bg-accent-100 dark:bg-accent-700/20 px-4 py-3 text-sm text-accent-700 dark:text-accent-300">
                      {submitError}
                    </p>
                  ) : null}

                  <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="mt-1">
                    {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
