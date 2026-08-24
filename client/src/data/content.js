function unsplash(id, w, h) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`
}

const PHOTOS = {
  heroClinic: '1609207825181-52d3214556dd',
  clinicInterior: '1629909613654-28e377c37b09',
  doctorSokolova: '1594824476967-48c8b964273f',
  doctorBeketov: '1612531386530-97286d97c2d2',
  doctorLitvinova: '1651008376811-b90baee60c1f',
  doctorOgarkov: '1622902046580-2b47f47f5471',
  patientNeutral1: '1524504388940-b1c1722653e1',
  patientNeutral2: '1519085360753-af0119f7cbe7',
  aligner: '1609840114035-3c981b782dfe',
  smileBright1: '1573496359142-b8d87734a5a2',
  smileBright2: '1567532939604-b6b5b0db2604',
  smileBright3: '1595152772835-219674b2a8a6',
  patientMan: '1500648767791-00dcc994a43e',
  patientWoman1: '1531123897727-8f129e1688ce',
  patientWoman2: '1508214751196-bcfd4ca60f91',
}

export const heroPhoto = unsplash(PHOTOS.heroClinic, 900, 1120)
export const clinicInteriorPhoto = unsplash(PHOTOS.clinicInterior, 900, 1120)
export const heroAvatarPhotos = [
  unsplash(PHOTOS.smileBright3, 64, 64),
  unsplash(PHOTOS.patientWoman2, 64, 64),
  unsplash(PHOTOS.patientWoman1, 64, 64),
]

export const clinic = {
  name: 'Аврора Дентал',
  phone: '+7 (495) 123-45-67',
  phoneHref: 'tel:+74951234567',
  whatsapp: 'https://wa.me/74951234567',
  telegram: 'https://t.me/auroradental',
  address: 'Москва, ул. Тверская, 14',
  hoursWeekday: '09:00 — 21:00',
  hoursWeekend: '10:00 — 18:00',
  email: 'hello@aurora-dental.example',
  mapEmbedUrl:
    'https://yandex.ru/map-widget/v1/?ll=37.605%2C55.765&z=15&pt=37.605,55.765,pm2rdm',
}

export const services = [
  {
    id: 'therapy',
    icon: 'FirstAidKit',
    title: 'Терапия',
    description: 'Лечение кариеса и пульпита современными материалами без боли.',
    priceFrom: 4500,
  },
  {
    id: 'implants',
    icon: 'Anchor',
    title: 'Имплантация',
    description: 'Имплантация под ключ с 3D-планированием и гарантией.',
    priceFrom: 42000,
  },
  {
    id: 'orthodontics',
    icon: 'Smiley',
    title: 'Ортодонтия',
    description: 'Брекет-системы и прозрачные элайнеры для ровной улыбки.',
    priceFrom: 65000,
  },
  {
    id: 'aesthetics',
    icon: 'Sparkle',
    title: 'Эстетическая стоматология',
    description: 'Виниры, реставрация и профессиональное отбеливание.',
    priceFrom: 12000,
  },
  {
    id: 'children',
    icon: 'Baby',
    title: 'Детская стоматология',
    description: 'Бережный приём для самых маленьких пациентов с 2 лет.',
    priceFrom: 3200,
  },
  {
    id: 'surgery',
    icon: 'Syringe',
    title: 'Хирургия',
    description: 'Удаление и костная пластика с компьютерной анестезией.',
    priceFrom: 5800,
  },
]

export const whyUs = [
  {
    icon: 'Scan',
    title: 'Современное оборудование',
    description: '3D-томограф и цифровая диагностика на каждом приёме.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Лечение без боли',
    description: 'Компьютерная анестезия и седация для спокойного визита.',
  },
  {
    icon: 'Certificate',
    title: 'Гарантия на работы',
    description: 'Официальная гарантия до 5 лет на имплантацию и реставрацию.',
  },
  {
    icon: 'CreditCard',
    title: 'Рассрочка 0%',
    description: 'Разбиваем оплату на 12 месяцев без переплат и справок.',
  },
]

export const stats = [
  { value: 12400, suffix: '+', label: 'довольных пациентов' },
  { value: 14, suffix: ' лет', label: 'на рынке Москвы' },
  { value: 38, suffix: '', label: 'врачей в штате' },
  { value: 98, suffix: '%', label: 'лечат без боли повторно у нас' },
]

export const doctors = [
  {
    id: 'sokolova',
    name: 'Ирина Соколова',
    role: 'Стоматолог-терапевт',
    experience: 14,
    photo: unsplash(PHOTOS.doctorSokolova, 480, 600),
    bio: 'Специализируется на эстетической реставрации и лечении каналов под микроскопом.',
  },
  {
    id: 'beketov',
    name: 'Марат Бекетов',
    role: 'Хирург-имплантолог',
    experience: 11,
    photo: unsplash(PHOTOS.doctorBeketov, 480, 600),
    bio: 'Проводит имплантацию любой сложности, включая костную пластику за один визит.',
  },
  {
    id: 'litvinova',
    name: 'Дарья Литвинова',
    role: 'Ортодонт',
    experience: 8,
    photo: unsplash(PHOTOS.doctorLitvinova, 480, 600),
    bio: 'Работает с брекет-системами и элайнерами, ведёт взрослых и подростков.',
  },
  {
    id: 'ogarkov',
    name: 'Павел Огарков',
    role: 'Детский стоматолог',
    experience: 9,
    photo: unsplash(PHOTOS.doctorOgarkov, 480, 600),
    bio: 'Находит подход к самым тревожным маленьким пациентам с первого визита.',
  },
]

export const pricing = [
  {
    category: 'Терапия',
    items: [
      { name: 'Лечение кариеса', price: 4500 },
      { name: 'Лечение пульпита (1 канал)', price: 7200 },
      { name: 'Художественная реставрация', price: 8900 },
    ],
  },
  {
    category: 'Имплантация',
    items: [
      { name: 'Имплант под ключ', price: 42000 },
      { name: 'Костная пластика', price: 18000 },
      { name: 'Протезирование на импланте', price: 26000 },
    ],
  },
  {
    category: 'Ортодонтия',
    items: [
      { name: 'Брекет-система (металл)', price: 65000 },
      { name: 'Брекет-система (керамика)', price: 92000 },
      { name: 'Элайнеры (полный курс)', price: 120000 },
    ],
  },
  {
    category: 'Эстетика',
    items: [
      { name: 'Винир E-max (1 шт.)', price: 22000 },
      { name: 'Профессиональное отбеливание', price: 12000 },
      { name: 'Гигиена и полировка', price: 4200 },
    ],
  },
]

export const technologies = [
  {
    icon: 'Cube',
    title: '3D-сканирование',
    description: 'Точная цифровая модель полости рта вместо слепков за пару минут.',
  },
  {
    icon: 'Lightning',
    title: 'Лазерная стоматология',
    description: 'Быстрое заживление тканей и минимальный дискомфорт после процедур.',
  },
  {
    icon: 'Drop',
    title: 'Компьютерная анестезия',
    description: 'Точная дозировка и безболезненное введение препарата.',
  },
  {
    icon: 'Aperture',
    title: 'Цифровая рентгенография',
    description: 'Низкая доза облучения и мгновенный снимок на экране врача.',
  },
]

export const beforeAfter = [
  {
    id: 'whitening',
    title: 'Профессиональное отбеливание',
    before: unsplash(PHOTOS.patientNeutral1, 900, 700),
    after: unsplash(PHOTOS.smileBright3, 900, 700),
  },
  {
    id: 'veneers',
    title: 'Виниры E-max',
    before: unsplash(PHOTOS.patientNeutral2, 900, 700),
    after: unsplash(PHOTOS.smileBright2, 900, 700),
  },
  {
    id: 'alignment',
    title: 'Выравнивание элайнерами',
    before: unsplash(PHOTOS.aligner, 900, 700),
    after: unsplash(PHOTOS.smileBright1, 900, 700),
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Анна Ковалёва',
    rating: 5,
    photo: unsplash(PHOTOS.smileBright1, 96, 96),
    quote:
      'Первый раз не боялась идти к стоматологу. Врач объяснил каждый шаг, было совсем не больно.',
  },
  {
    id: 2,
    name: 'Дмитрий Уваров',
    rating: 5,
    photo: unsplash(PHOTOS.patientMan, 96, 96),
    quote:
      'Поставил имплант с диагностикой за один визит. Через полгода ощущается как родной зуб.',
  },
  {
    id: 3,
    name: 'Ксения Мальцева',
    rating: 5,
    photo: unsplash(PHOTOS.patientWoman1, 96, 96),
    quote:
      'Дочке 4 года и она боялась докторов. Здесь нашли подход, теперь сама просится на осмотр.',
  },
  {
    id: 4,
    name: 'Игорь Панфилов',
    rating: 4.8,
    photo: unsplash(PHOTOS.patientNeutral2, 96, 96),
    quote: 'Отбеливание и виниры сделали за неделю. Результат превзошёл ожидания.',
  },
  {
    id: 5,
    name: 'Наталья Ерохина',
    rating: 5,
    photo: unsplash(PHOTOS.smileBright2, 96, 96),
    quote: 'Ношу элайнеры полгода, прогресс виден уже сейчас. Врач всегда на связи.',
  },
]

export const faq = [
  {
    question: 'Больно ли лечить зубы у вас?',
    answer:
      'Мы используем компьютерную анестезию с точной дозировкой и современные обезболивающие препараты. Большинство пациентов отмечают, что не чувствуют укола вообще.',
  },
  {
    question: 'Сколько служит имплант?',
    answer:
      'При соблюдении гигиены и регулярных осмотрах имплант служит 15-20 лет и дольше. Мы даём официальную гарантию на все этапы имплантации.',
  },
  {
    question: 'Что взять с собой на первый приём?',
    answer:
      'Возьмите паспорт и, если есть, предыдущие снимки или карту из другой клиники. Остальное диагностическое оборудование уже готово у нас.',
  },
  {
    question: 'Есть ли рассрочка на лечение?',
    answer:
      'Да, мы предлагаем рассрочку 0% на срок до 12 месяцев без банковских справок и переплат.',
  },
  {
    question: 'Принимаете ли вы экстренных пациентов?',
    answer:
      'Да, при острой боли мы принимаем в день обращения. Позвоните заранее, чтобы мы подготовили свободное окно.',
  },
  {
    question: 'С какого возраста вы принимаете детей?',
    answer:
      'Мы принимаем маленьких пациентов с 2 лет. Первый визит обычно ознакомительный, чтобы ребёнок привык к кабинету без стресса.',
  },
]

export const navLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#doctors', label: 'Врачи' },
  { href: '#pricing', label: 'Цены' },
  { href: '#before-after', label: 'До и после' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#faq', label: 'Вопросы' },
  { href: '#contacts', label: 'Контакты' },
]
