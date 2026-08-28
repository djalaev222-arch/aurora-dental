import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'motion/react'
import clsx from 'clsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { Button } from '../ui/Button.jsx'
import { Icon } from '../ui/Icon.jsx'
import { Field, inputClasses, inputErrorClasses } from './Field.jsx'
import { useAvailability } from '../../hooks/useAvailability.js'
import { apiUrl } from '../../lib/api.js'
import { services, doctors, clinic } from '../../data/content.js'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function maxDateISO() {
  const d = new Date()
  d.setDate(d.getDate() + 45)
  return d.toISOString().slice(0, 10)
}

const CONTACT_METHODS = [
  {
    icon: 'Phone',
    title: 'Позвонить',
    detail: clinic.phone,
    sub: `Ежедневно, ${clinic.hoursWeekday}`,
    href: clinic.phoneHref,
    external: false,
  },
  {
    icon: 'WhatsappLogo',
    title: 'WhatsApp',
    detail: 'Написать в мессенджер',
    sub: 'Отвечаем в течение часа в рабочее время',
    href: clinic.whatsapp,
    external: true,
  },
]

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
        `Форма не отправилась онлайн. Позвоните по ${clinic.phone} или напишите в WhatsApp, мы запишем вручную.`,
      )
      setSubmitStatus('error')
    }
  }

  return (
    <section id="booking" ref={formRef} className="bg-bg-alt py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            title={
              <>
                Оставьте заявку, <em>остальное</em> берём на себя
              </>
            }
            description="Администратор перезвонит в течение 15 минут в рабочее время, подтвердит врача и время и ответит на вопросы до визита."
          />

          <div className="mt-10 border-t border-line-strong">
            {CONTACT_METHODS.map((method) => (
              <a
                key={method.title}
                href={method.href}
                {...(method.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex items-center gap-4 border-b border-line py-5"
              >
                <Icon name={method.icon} weight="regular" className="h-5 w-5 flex-none text-accent" />
                <div className="flex-1">
                  <p className="text-[0.95rem] font-semibold text-ink">{method.detail}</p>
                  <p className="text-[0.8rem] text-ink-soft">{method.sub}</p>
                </div>
                <Icon
                  name="ArrowUpRight"
                  weight="bold"
                  className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="border border-line-strong bg-surface p-6 shadow-soft sm:p-9">
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <Icon name="CheckCircle" weight="regular" className="h-12 w-12 text-accent" />
                  <h3 className="text-[1.5rem] text-ink">Заявка принята</h3>
                  <p className="max-w-sm text-[0.92rem] leading-relaxed text-ink-soft">
                    Мы позвоним по указанному номеру, чтобы подтвердить дату и время приёма.
                  </p>
                  <Button type="button" variant="secondary" onClick={() => setSubmitStatus('idle')}>
                    Записать ещё одного человека
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
                            {d.name}, {d.role}
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
                            ? 'Загружаем свободное время'
                            : availabilityStatus === 'error'
                              ? 'Не удалось загрузить время, позвоните нам напрямую'
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
                          {availabilityStatus === 'loading' ? 'Загрузка' : 'Выберите время'}
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

                  <label className="flex items-start gap-3 text-[0.78rem] leading-relaxed text-ink-soft">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 flex-none rounded-[2px] border-line-strong text-accent focus-visible:outline-accent"
                      {...register('consent', { required: true })}
                    />
                    Я согласен на обработку персональных данных в соответствии с политикой
                    конфиденциальности клиники.
                  </label>
                  {errors.consent ? (
                    <p className="-mt-3 text-[0.78rem] font-medium text-accent-strong">
                      Нужно согласие на обработку данных
                    </p>
                  ) : null}

                  {submitStatus === 'error' ? (
                    <p className="border border-accent/40 bg-accent-tint/50 px-4 py-3 text-[0.85rem] text-accent-ink">
                      {submitError}
                    </p>
                  ) : null}

                  <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="mt-1">
                    {isSubmitting ? 'Отправляем' : 'Отправить заявку'}
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
