const venues = [
  {
    id: '1',
    name: 'Mani Mahal',
    location: 'Peelamedu - Coimbatore, Tamil Nadu',
    price: 150000,
    capacity: 500,
    rating: 4.8,
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipObAoMfoBM1JirkX9hMLxWRfpsE8RztWPUSgMot=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipOpPlRchog1RJ0fONmBtwkafqMW7wTdyRxk3FjM=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipP2i-FODgF3o46yTm7Hny_dgVjVOQ6Nbe0p-W2T=s1360-w1360-h1020',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'DJ'],
    description:
      'Luxurious wedding venue with modern amenities and elegant decor. Perfect for grand celebrations.',
    reviews: [
      {
        id: '1',
        userName: 'Priya S.',
        rating: 5,
        comment: 'Amazing venue! Our wedding was perfect.',
        date: '2024-02-15',
      },
    ],
  },
  {
    id: '2',
    name: 'Ramalakshmi Mahal',
    location: 'Peelamedu - Coimbatore, Tamil Nadu',
    price: 200000,
    capacity: 700,
    rating: 4.9,
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipO3lI0KvJSZ60TCHtUZKkndQL0ae7qTldw6quJH=s1360-w1360-h1020',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6A_oGbJGjp0C5wEG6z30EaPs2t2XTPSB9wfB60Ts7jt8KmpfwxTrfzI2GKWfm_qJBfIM&usqp=CAU',
      'https://img.weddingbazaar.com/shaadisaga_production/photos/pictures/006/308/872/original/ss20230327-31865-q5tam6.jpg?1679906154',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'Live Music'],
    description:
      'A serene garden venue with lush greenery and stunning setups. Ideal for nature-inspired weddings.',
    reviews: [
      {
        id: '2',
        userName: 'Arjun R.',
        rating: 5,
        comment: 'Beautiful venue with amazing service!',
        date: '2024-01-10',
      },
    ],
  },
  {
    id: '3',
    name: 'Suguna Kalyana Mahal',
    location: 'Peelamedu - Coimbatore, Tamil Nadu',
    price: 250000,
    capacity: 600,
    rating: 4.7,
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipM_VyAmbI4ZthsZ5ihIuMyb5CHrNFlZn0W8rEl-=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipNgMVf6H11unaKzRbHLbYwDeEpkkY0kDecwHIrW=s1360-w1360-h1020',
      'https://lh5.googleusercontent.com/p/AF1QipO_s7QjVFGIoYzOJeLYQvE4fmcMrvqXVOfPIjNO=w141-h101-n-k-no-nu',
    ],
    amenities: ['Beachfront', 'WiFi', 'Parking', 'Pool Access'],
    description:
      'A stunning beachfront resort with breathtaking views and premium facilities. Perfect for destination weddings.',
    reviews: [
      {
        id: '3',
        userName: 'Sneha K.',
        rating: 4.5,
        comment: 'The location is heavenly, and the amenities were top-notch.',
        date: '2024-03-20',
      },
    ],
  },
  {
    id: '4',
    name: 'GP GRAND GALAXY',
    location: 'Gandhipuram - Coimbatore, Tamil Nadu',
    price: 180000,
    capacity: 550,
    rating: 4.6,
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipMP9CQlAr47_2IMqVB_xUFaKmzYFT7oyT4VtLWR=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipNmiOmNK4Tc3Hv0bV7n72f1kJ-NQX2ztoy2LPId=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipN43cWiEb7boDkfJppk5GFawyaVp2YE-3eNwB1d=s1360-w1360-h1020',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'AC Halls'],
    description:
      'A modern convention center with state-of-the-art facilities. Ideal for weddings, conferences, and events.',
    reviews: [
      {
        id: '4',
        userName: 'Karthik N.',
        rating: 4.7,
        comment: 'Great facilities and spacious venue.',
        date: '2024-04-05',
      },
    ],
  },
  {
    id: '5',
    name: 'Balija Naidu Hall',
    location: 'RS Puram - Coimbatore, Tamil Nadu',
    price: 170000,
    capacity: 450,
    rating: 4.4,
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipPPPZ0lXWTaO6onC0uSDeodSh_Ot24H___pVUGF=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipPPPZ0lXWTaO6onC0uSDeodSh_Ot24H___pVUGF=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipPPPZ0lXWTaO6onC0uSDeodSh_Ot24H___pVUGF=s1360-w1360-h1020',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'Projector'],
    description:
      'Charming wedding venue with excellent service and modern amenities.',
    reviews: [
      {
        id: '5',
        userName: 'Divya P.',
        rating: 4.4,
        comment: 'Loved the ambiance and arrangements!',
        date: '2024-05-20',
      },
    ],
  },
  {
    id: '6',
    name: 'Sree Ramalingasowdeswari Hall',
    location: 'R.S. Puram - Coimbatore, Tamil Nadu',
    price: 220000,
    capacity: 800,
    rating: 4.9,
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipNlxm4D_vF92w-vsksTsItzzycEaoQY18sdOGlB=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipPzbnD2M6imz9hF0XqBHcpNvVpdHNe59aLCK3X6=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipOUQ--qdVXuRfxsG8nAbDY4tdVm_niRawSL9nrf=s1360-w1360-h1020',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'Stage Lighting'],
    description:
      'Grand and elegant wedding venue with premium facilities and spacious interiors.',
    reviews: [
      {
        id: '6',
        userName: 'Rahul M.',
        rating: 5,
        comment: 'An amazing place for large weddings.',
        date: '2024-06-15',
      },
    ],
  },
  {
    id: '7',
    name: 'Brookefields Banquet Hall',
    location: 'RS Puram - Coimbatore, Tamil Nadu',
    price: 170000,
    capacity: 450,
    rating: 4.4,
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipPAyMecWUJGByzjeYQj698cLSXjIDA6IYKw9svt=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipPk4Bnbd5DBSLbh2uAWPGi5n1N6D0tNjGimQUK1=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipNjiWuhLGukhnCIJbYoyWglD9GNhuoaVjYR8pUT=s1360-w1360-h1020',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'Projector'],
    description:
      'Charming wedding venue with excellent service and modern amenities.',
    reviews: [
      {
        id: '7',
        userName: 'Divya P.',
        rating: 4.4,
        comment: 'Loved the ambiance and arrangements!',
        date: '2024-05-20',
      },
    ],
  },
  {
    id: '8',
    name: 'Subashree Hall',
    location: 'Ramnagar, Coimbatore, Tamil Nadu',
    price: 120000,
    capacity: 400,
    rating: 4.3,
    images: [
      'https://g.co/kgs/TsXM33W',
    ],
    amenities: ['WiFi', 'Parking', 'Catering'],
    description:
      'A cozy hall suitable for small and medium-sized gatherings.',
    reviews: [
      {
        id: '8',
        userName: 'Kiran R.',
        rating: 4.3,
        comment: 'Perfect for family gatherings.',
        date: '2024-07-10',
      },
    ],
  },
  {
    id: '9',
    name: 'Lemon Park',
    location: 'Ramnagar, Coimbatore, Tamil Nadu',
    price: 100000,
    capacity: 300,
    rating: 4.1,
    images: [
      'https://g.co/kgs/Zq7Fcx7',
    ],
    amenities: ['WiFi', 'Parking'],
    description:
      'A vibrant park ideal for outdoor wedding ceremonies.',
    reviews: [
      {
        id: '9',
        userName: 'Suma P.',
        rating: 4.1,
        comment: 'Beautiful and spacious!',
        date: '2024-08-15',
      },
    ],
  },
  {
    id: '10',
    name: 'Sri Snv Kalyana Mandapam',
    location: 'Ramnagar, Coimbatore, Tamil Nadu',
    price: 110000,
    capacity: 350,
    rating: 4.2,
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipM_VyAmbI4ZthsZ5ihIuMyb5CHrNFlZn0W8rEl-=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipNgMVf6H11unaKzRbHLbYwDeEpkkY0kDecwHIrW=s1360-w1360-h1020',
      'https://lh5.googleusercontent.com/p/AF1QipO_s7QjVFGIoYzOJeLYQvE4fmcMrvqXVOfPIjNO=w141-h101-n-k-no-nu',
    ],
    amenities: ['Parking', 'Catering'],
    description:
      'Traditional hall suitable for cultural and religious events.',
    reviews: [
      {
        id: '10',
        userName: 'Vikram R.',
        rating: 4.2,
        comment: 'Great for traditional ceremonies.',
        date: '2024-09-10',
      },
    ],
  },
  {
    id: '11',
    name: 'Sri Guru Krupa Hall',
    location: 'Ramnagar, Coimbatore, Tamil Nadu',
    price: 95000,
    capacity: 300,
    rating: 4.0,
    images: [
      'https://g.co/kgs/xsm6J5M',
    ],
    amenities: ['WiFi', 'Catering'],
    description:
      'Simple and affordable hall, ideal for small gatherings.',
    reviews: [
      {
        id: '11',
        userName: 'Meena K.',
        rating: 4.0,
        comment: 'Budget-friendly option.',
        date: '2024-10-20',
      },
    ],
  },
  {
    id: '12',
    name: 'Sri Ayyapan Pooja Sangam',
    location: 'Ramnagar, Coimbatore, Tamil Nadu',
    price: 88000,
    capacity: 280,
    rating: 3.9,
    images: [
      'https://g.co/kgs/vPBGvtH',
    ],
    amenities: ['Parking'],
    description:
      'A simple place suitable for small family functions.',
    reviews: [
      {
        id: '12',
        userName: 'Manoj P.',
        rating: 3.9,
        comment: 'Nice place for small events.',
        date: '2024-11-15',
      },
    ],
  },
  {
    id: '13',
    name: 'Rajasthani Sangh',
    location: 'RS Puram, Coimbatore, Tamil Nadu',
    price: 140000,
    capacity: 450,
    rating: 4.5,
    images: [
      'https://g.co/kgs/s7qkTuQ',
    ],
    amenities: ['WiFi', 'Parking', 'Catering'],
    description:
      'A well-maintained hall suitable for community events and weddings.',
    reviews: [
      {
        id: '13',
        userName: 'Radhika S.',
        rating: 4.5,
        comment: 'Excellent for community celebrations.',
        date: '2024-12-05',
      },
    ],
  },
  {
    id: '14',
    name: 'Terapanth Jain Bhavan',
    location: 'RS Puram, Coimbatore, Tamil Nadu',
    price: 130000,
    capacity: 400,
    rating: 4.3,
    images: [
      'https://g.co/kgs/HEpMjKH',
    ],
    amenities: ['WiFi', 'Parking'],
    description:
      'A peaceful venue suitable for religious and cultural gatherings.',
    reviews: [
      {
        id: '14',
        userName: 'Preetha V.',
        rating: 4.3,
        comment: 'Peaceful and spacious venue.',
        date: '2024-12-20',
      },
    ],
  },
  {
    id: '15',
    name: 'Balija Naidu Kalyana Mandapam',
    location: 'RS Puram - Coimbatore, Tamil Nadu',
    price: 160000,
    capacity: 400,
    rating: 4.2,
    images: [
      'https://g.co/kgs/WvKXnJ8',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'Projector'],
    description:
      'Affordable and cozy wedding venue for smaller gatherings.',
    reviews: [
      {
        id: '15',
        userName: 'Ravi S.',
        rating: 4.2,
        comment: 'Nice venue for family gatherings!',
        date: '2024-07-25',
      },
    ],
  },
  {
    id: '16',
    name: 'Sree Ramalingasowdeswari Hall',
    location: 'RS Puram - Coimbatore, Tamil Nadu',
    price: 200000,
    capacity: 600,
    rating: 4.6,
    images: [
      'https://g.co/kgs/uFkNYCk',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'Stage Lighting'],
    description:
      'Spacious and elegant hall with excellent acoustics for medium-sized weddings.',
    reviews: [
      {
        id: '16',
        userName: 'Priya T.',
        rating: 4.5,
        comment: 'Very well-organized and elegant!',
        date: '2024-08-10',
      },
    ],
  },
  {
    id: '17',
    name: 'Sree Coimbatore Gujarati Samaj',
    location: 'RS Puram - Coimbatore, Tamil Nadu',
    price: 170000,
    capacity: 450,
    rating: 4.4,
    images: [
      'https://g.co/kgs/q5kNco8',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'Air-conditioned Halls'],
    description:
      'Traditional Gujarati-style wedding hall with authentic cuisine and cultural ambiance.',
    reviews: [
      {
        id: '17',
        userName: 'Aarti P.',
        rating: 4.3,
        comment: 'Loved the traditional setup and food!',
        date: '2024-08-20',
      },
    ],
  },
  {
    id: '18',
    name: 'SaiDeep Kalyana Mandapam',
    location: 'SaiBaba Colony - Coimbatore, Tamil Nadu',
    price: 140000,
    capacity: 350,
    rating: 4.1,
    images: [
      'https://g.co/kgs/mA1kDfS',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'Projector'],
    description:
      'Compact and cozy venue perfect for intimate family gatherings.',
    reviews: [
      {
        id: '18',
        userName: 'Sunita K.',
        rating: 4.1,
        comment: 'Perfect for small family functions!',
        date: '2024-09-15',
      },
    ],
  },
  {
    id: '19',
    name: 'Suguna Kalyana Mandapam',
    location: 'Peelamedu - Coimbatore, Tamil Nadu',
    price: 250000,
    capacity: 600,
    rating: 4.7,
    images: [
      'https://jsdl.in/RSL-WZY1736966505',
    ],
    amenities: ['Beachfront', 'WiFi', 'Parking', 'Pool Access'],
    description:
      'A stunning beachfront resort with breathtaking views and premium facilities. Perfect for destination weddings.',
    reviews: [
      {
        id: '19',
        userName: 'Sneha K.',
        rating: 4.5,
        comment: 'The location is heavenly, and the amenities were top-notch.',
        date: '2024-10-20',
      },
    ],
  },
  {
    id: '20',
    name: 'SNR Auditorium',
    location: 'Peelamedu - Coimbatore, Tamil Nadu',
    price: 300000,
    capacity: 1000,
    rating: 5.0,
    images: [
      'https://g.co/kgs/7FJgo7r',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'Stage Lighting'],
    description:
      'A large auditorium with state-of-the-art sound and lighting facilities, ideal for grand weddings.',
    reviews: [
      {
        id: '20',
        userName: 'Rajesh M.',
        rating: 5.0,
        comment: 'Perfect venue for large-scale events!',
        date: '2024-11-10',
      },
    ],
  },
  {
    id: '21',
    name: 'AP Kalyana Mandapam',
    location: 'Peelamedu - Coimbatore, Tamil Nadu',
    price: 230000,
    capacity: 700,
    rating: 4.8,
    images: [
      'https://g.co/kgs/uKJHZ7L',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'Live Music'],
    description:
      'A well-equipped and spacious venue ideal for medium-sized wedding functions.',
    reviews: [
      {
        id: '21',
        userName: 'Meera R.',
        rating: 4.8,
        comment: 'Spacious and well-organized!',
        date: '2024-12-05',
      },
    ],
  },
  {
    id: '22',
    name: 'Rangasamy Gounder Kalyana Mandapam',
    location: 'Peelamedu - Coimbatore, Tamil Nadu',
    price: 170000,
    capacity: 450,
    rating: 4.6,
    images: [
      'https://g.co/kgs/cQX22xa',
    ],
    amenities: ['WiFi', 'Parking', 'Catering', 'Air-conditioned Halls'],
    description:
      'An affordable and comfortable venue for mid-sized weddings and events.',
    reviews: [
      {
        id: '22',
        userName: 'Kavitha J.',
        rating: 4.5,
        comment: 'Nice place with decent arrangements.',
        date: '2024-12-20',
      },
    ],
  },
  {
    id: '23',
    name: 'Snr Auditorium',
    location: 'Peelamedu - Coimbatore, Tamil Nadu',
    price: 300000,
    capacity: 1000,
    rating: 4.9,
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipM_VyAmbI4ZthsZ5ihIuMyb5CHrNFlZn0W8rEl-=s1360-w1360-h1020',
      'https://lh3.googleusercontent.com/p/AF1QipNgMVf6H11unaKzRbHLbYwDeEpkkY0kDecwHIrW=s1360-w1360-h1020',
      'https://lh5.googleusercontent.com/p/AF1QipO_s7QjVFGIoYzOJeLYQvE4fmcMrvqXVOfPIjNO=w141-h101-n-k-no-nu',
    ], 
    amenities: ['WiFi', 'Parking', 'Catering', 'Stage Lighting'],
    description:
      'A grand auditorium with top-notch amenities, perfect for large events.',
    reviews: [
      {
        id: '23',
        userName: 'Anil K.',
        rating: 5,
        comment: 'Spacious and well-equipped!',
        date: '2024-12-25',
      },
    ],
  },
];

export default venues;
