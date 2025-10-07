
export interface Event {
  id: string;
  title: string;
  category: string;
  distance: number; // in miles
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  price?: string;
}

export const eventCategories = [
  'All',
  'Music',
  'Sports',
  'Arts',
  'Food',
  'Technology',
  'Business',
  'Health',
  'Education',
  'Entertainment'
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    category: 'Music',
    distance: 2.5,
    description: 'Join us for an amazing outdoor music festival featuring local and international artists. Experience great music, food, and atmosphere.',
    date: '2024-07-15',
    time: '6:00 PM',
    location: 'Central Park Amphitheater',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    price: '$45'
  },
  {
    id: '2',
    title: 'Tech Startup Meetup',
    category: 'Technology',
    distance: 1.2,
    description: 'Network with fellow entrepreneurs and learn about the latest trends in technology and startups.',
    date: '2024-07-18',
    time: '7:00 PM',
    location: 'Innovation Hub Downtown',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400',
    price: 'Free'
  },
  {
    id: '3',
    title: 'Local Basketball Tournament',
    category: 'Sports',
    distance: 3.8,
    description: 'Watch exciting basketball games featuring local teams competing for the championship title.',
    date: '2024-07-20',
    time: '2:00 PM',
    location: 'Community Sports Center',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
    price: '$15'
  },
  {
    id: '4',
    title: 'Art Gallery Opening',
    category: 'Arts',
    distance: 0.8,
    description: 'Discover contemporary art from emerging local artists. Wine and refreshments will be served.',
    date: '2024-07-22',
    time: '5:30 PM',
    location: 'Modern Art Gallery',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    price: 'Free'
  },
  {
    id: '5',
    title: 'Food Truck Festival',
    category: 'Food',
    distance: 4.2,
    description: 'Taste delicious food from over 20 local food trucks. Live music and family-friendly activities.',
    date: '2024-07-25',
    time: '11:00 AM',
    location: 'Riverside Park',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    price: 'Free Entry'
  },
  {
    id: '6',
    title: 'Business Networking Event',
    category: 'Business',
    distance: 2.1,
    description: 'Connect with local business professionals and expand your network. Includes dinner and presentations.',
    date: '2024-07-28',
    time: '6:30 PM',
    location: 'Grand Hotel Conference Center',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
    price: '$35'
  },
  {
    id: '7',
    title: 'Yoga in the Park',
    category: 'Health',
    distance: 1.5,
    description: 'Start your morning with a relaxing yoga session in the beautiful park setting. All levels welcome.',
    date: '2024-07-30',
    time: '8:00 AM',
    location: 'Sunset Park',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    price: '$10'
  },
  {
    id: '8',
    title: 'Comedy Night',
    category: 'Entertainment',
    distance: 2.8,
    description: 'Laugh out loud with performances from top local comedians. Great food and drinks available.',
    date: '2024-08-02',
    time: '8:00 PM',
    location: 'The Laugh Track Club',
    imageUrl: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400',
    price: '$25'
  },
  {
    id: '9',
    title: 'Photography Workshop',
    category: 'Education',
    distance: 3.5,
    description: 'Learn professional photography techniques from experienced photographers. Camera equipment provided.',
    date: '2024-08-05',
    time: '10:00 AM',
    location: 'Creative Learning Center',
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
    price: '$50'
  },
  {
    id: '10',
    title: 'Jazz Concert',
    category: 'Music',
    distance: 1.9,
    description: 'Enjoy smooth jazz performances by renowned musicians in an intimate venue setting.',
    date: '2024-08-08',
    time: '7:30 PM',
    location: 'Blue Note Cafe',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    price: '$30'
  }
];
