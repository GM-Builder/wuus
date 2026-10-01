export interface RatePlan {
  id: string;
  name: string;
  description: string;
  rate: number;
  otaRate: number;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
  perks: string[];
  recommended?: boolean;
}

export interface Room {
  id: string;
  name: string;
  rate: number;
  otaRate: number;
  size: string;
  bed: string;
  maxGuests: number;
  view: string;
  image: string;
  gallery: string[];
  perk: string;
  amenities: string[];
  description: string;
  ratePlans: RatePlan[];
}

export interface LocalGuideItem {
  category: string;
  title: string;
  dist: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface PropertyData {
  slug: string;
  name: string;
  category: string;
  ratingScore: number;
  reviewsCount: number;
  ratingLabel: string;
  location: string;
  locationHighlight: string;
  coords: string;
  motto: string;
  tagline: string;
  heroImage: string;
  atmosphereImage: string;
  startingRate: number;
  otaStartingRate: number;
  directPerk: string;
  host: {
    names: string;
    role: string;
    image: string;
    note: string;
  };
  rooms: Room[];
  localGuide: LocalGuideItem[];
  faq: FAQItem[];
  conciergeQA: Record<string, string>;
}

export const propertiesData: Record<string, PropertyData> = {
  'seaside-guesthouse': {
    slug: 'seaside-guesthouse',
    name: 'Villa Mare Riviera Guesthouse',
    category: 'Boutique Seaside Guesthouse',
    ratingScore: 9.8,
    reviewsCount: 142,
    ratingLabel: 'Exceptional',
    location: 'Himara, Albanian Riviera · Albania',
    locationHighlight: '120m from quiet pebble beach · 9.9 Location rating',
    coords: '39.8617° N, 19.9822° E',
    motto: 'A quiet stone haven above the turquoise Ionian Sea',
    tagline: 'Handcrafted limestone architecture, morning sea breeze, and homemade courtyard artisan breakfast.',
    heroImage: '/images/hospitality/guesthouse.webp',
    atmosphereImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85',
    startingRate: 85,
    otaStartingRate: 105,
    directPerk: 'Complimentary chilled local reserve white wine + flexible late check-in',
    host: {
      names: 'Nikolin & Elena',
      role: 'Founding Hosts & Caretakers',
      image: '/images/hospitality/host-portrait.jpg',
      note: 'We restored our family’s 19th-century stone estate so travelers could experience the authentic Albanian coast at their own pace—away from crowded mega-resorts.'
    },
    rooms: [
      {
        id: 'stone-suite',
        name: 'Stone Courtyard Suite',
        rate: 85,
        otaRate: 105,
        size: '34 m²',
        bed: 'King Bed (180×200cm)',
        maxGuests: 2,
        view: 'Olive Garden & Private Patio',
        image: '/images/hospitality/stone-suite-main.jpg',
        gallery: [
          '/images/hospitality/stone-suite-main.jpg',
          '/images/hospitality/stone-suite-breakfast.jpg',
          '/images/hospitality/guesthouse.webp'
        ],
        perk: 'Artisan Breakfast & Welcome Chilled Wine',
        amenities: ['High-speed Wi-Fi', 'Artisan Breakfast', 'Rain Shower', 'Espresso Bar', 'Private Patio', 'Eco Toiletries', 'Air Conditioning'],
        description: 'Native white limestone walls keep the room naturally cool under the Mediterranean sun. Large arched window overlooking centuries-old olive trees and azure sea.',
        ratePlans: [
          {
            id: 'stone-standard',
            name: 'Room Only Direct',
            description: 'Room-only flexibility with direct booking rate defense.',
            rate: 85,
            otaRate: 105,
            breakfastIncluded: false,
            freeCancellation: true,
            perks: [
              'Direct booking rate (0% OTA commission)',
              'Free cancellation up to 48 hours before arrival',
              'Payment upon arrival at property',
              'High-speed Wi-Fi'
            ]
          },
          {
            id: 'stone-vip',
            name: 'Bed & Breakfast Direct',
            description: 'Our signature stay package with homemade courtyard artisan breakfast.',
            rate: 95,
            otaRate: 115,
            breakfastIncluded: true,
            freeCancellation: true,
            recommended: true,
            perks: [
              'Daily homemade artisan courtyard breakfast included',
              'Complimentary bottle of chilled local reserve wine',
              'Priority early check-in from 12:00 (upon availability)',
              'Free cancellation up to 48 hours before arrival',
              'Payment upon arrival (No deposit required)'
            ]
          }
        ]
      },
      {
        id: 'sea-terrace',
        name: 'Panoramic Sea Terrace Studio',
        rate: 120,
        otaRate: 145,
        size: '48 m²',
        bed: 'King Bed + Daybed',
        maxGuests: 3,
        view: 'Direct Ionian Sea Sunset View',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
          '/images/hospitality/stone-suite-breakfast.jpg'
        ],
        perk: 'Private Sunset Sunbeds, Breakfast & Late Checkout',
        amenities: ['Private Sun Terrace', 'Outdoor Teak Loungers', 'King Bed', 'Ionian Sea View', 'High-speed Wi-Fi', 'Espresso Machine', 'Air Conditioning'],
        description: 'Unobstructed horizon views over the Ionian Sea and Corfu island. Watch golden hour colors directly from your private outdoor teak loungers.',
        ratePlans: [
          {
            id: 'terrace-standard',
            name: 'Room Only Direct',
            description: 'Direct rate with flexible arrival and full terrace access.',
            rate: 120,
            otaRate: 145,
            breakfastIncluded: false,
            freeCancellation: true,
            perks: [
              'Direct booking rate (0% OTA commission)',
              'Free cancellation up to 48 hours before arrival',
              'Private sun terrace access with loungers'
            ]
          },
          {
            id: 'terrace-vip',
            name: 'Signature Terrace Stay',
            description: 'Includes courtyard breakfast, welcome reserve wine, and flexible checkout.',
            rate: 135,
            otaRate: 165,
            breakfastIncluded: true,
            freeCancellation: true,
            recommended: true,
            perks: [
              'Daily homemade artisan courtyard breakfast included',
              'Chilled bottle of Albanian reserve wine on arrival',
              'Complimentary late check-out until 13:00',
              'Private sunbeds with fresh beach towels provided',
              'Payment upon arrival at property'
            ]
          }
        ]
      }
    ],
    localGuide: [
      {
        category: 'COVE',
        title: 'Secret Pebble Cove',
        dist: '4 min walk',
        desc: 'Follow the stone path past the olive grove directly to a quiet crystal-clear turquoise swimming cove.'
      },
      {
        category: 'DINING',
        title: 'Taverna Kosta',
        dist: '8 min walk',
        desc: 'Family-run tavern catching fresh sea bream and octopus daily, grilled over olive wood.'
      },
      {
        category: 'HERITAGE',
        title: 'Old Town Castle Ruins',
        dist: '12 min drive',
        desc: 'Centuries-old stone ruins offering 360-degree panoramic views of the entire coastal mountain range.'
      }
    ],
    faq: [
      { q: 'Is there safe parking on-site?', a: 'Yes, we provide free private parking in our shaded stone courtyard for all staying guest vehicles.' },
      { q: 'Can we check in after 22:30?', a: 'Yes. We offer seamless contactless check-in via our entrance keybox. The code is sent to your WhatsApp on arrival morning.' },
      { q: 'What is included with direct booking?', a: 'Direct bookings include our guaranteed lowest rate, homemade artisan breakfast, welcome chilled reserve wine, and priority room allocation.' }
    ],
    conciergeQA: {
      parking: 'Yes, we provide free private parking in our private stone courtyard for all staying guests.',
      checkin: 'Check-in is from 14:00. If you arrive late after 22:30, we arrange contactless keybox entry with instructions sent to your WhatsApp.',
      breakfast: 'Artisan breakfast is freshly prepared every morning from 08:00 to 10:30 on the courtyard garden terrace.',
      beach: 'The nearest quiet pebble beach is just a 4-minute walk down our private stone footpath.',
      directPerks: 'When booking directly with us, you receive our guaranteed best rate (15-20% lower than OTAs), artisan breakfast daily, and a complimentary bottle of local wine.'
    }
  },
  'lakeside-wine-estate': {
    slug: 'lakeside-wine-estate',
    name: 'Savoria Estate & Vineyard Suites',
    category: 'Historic Boutique Winery Estate',
    ratingScore: 9.9,
    reviewsCount: 168,
    ratingLabel: 'Exceptional',
    location: 'Lake Ohrid · North Macedonia',
    locationHighlight: 'Lakefront private dock · 10 min scenic boat to Old Town',
    coords: '41.1172° N, 20.8016° E',
    motto: 'Heritage suites overlooking ancient waters and terraced vineyards',
    tagline: '150-year-old historic winery estate, organic vineyard breakfast, and private sommelier tastings.',
    heroImage: '/images/hospitality/savoria-wine-estate.jpg',
    atmosphereImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=85',
    startingRate: 95,
    otaStartingRate: 120,
    directPerk: 'Complimentary cellar tour + welcome bottle of Reserve Vranec wine',
    host: {
      names: 'Stefan & Maria',
      role: 'Estate Owners & Winemakers',
      image: '/images/hospitality/host-portrait.jpg',
      note: 'Our family has cultivated indigenous Vranec and Stanushina grapes on these terraced slopes for four generations. We welcome guests to experience real wine country hospitality.'
    },
    rooms: [
      {
        id: 'heritage-balcony',
        name: 'Heritage Balcony Suite',
        rate: 95,
        otaRate: 120,
        size: '42 m²',
        bed: 'King Bed (180×200cm)',
        maxGuests: 2,
        view: 'Lake Ohrid & Terraced Vineyards',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85',
          '/images/hospitality/savoria-wine-estate.jpg',
          '/images/hospitality/stone-suite-breakfast.jpg'
        ],
        perk: 'Welcome Reserve Wine, Cellar Tour & Vineyard Breakfast',
        amenities: ['Lake View Balcony', 'Stone Fireplace', 'Vineyard Breakfast', 'Wine Mini-cellar', 'Fast Wi-Fi', 'Plush Bathrobes'],
        description: 'Features exposed oak beams, private balcony overlooking the calm lake, and a crackling wood fireplace for cozy evenings.',
        ratePlans: [
          {
            id: 'heritage-standard',
            name: 'Room Only Direct',
            description: 'Direct room rate with vineyard and lake views.',
            rate: 95,
            otaRate: 120,
            breakfastIncluded: false,
            freeCancellation: true,
            perks: [
              'Direct booking rate (0% OTA commission)',
              'Free cancellation up to 48 hours before arrival',
              'Complimentary estate-wide Wi-Fi'
            ]
          },
          {
            id: 'heritage-vip',
            name: 'Vineyard Bed & Breakfast',
            description: 'Includes organic farm breakfast and private cellar tasting tour.',
            rate: 110,
            otaRate: 135,
            breakfastIncluded: true,
            freeCancellation: true,
            recommended: true,
            perks: [
              'Daily organic farm breakfast included',
              'Complimentary bottle of estate Reserve Vranec wine',
              'Private sommelier cellar tour at 18:30',
              'Complimentary late check-out until 13:00',
              'Payment upon arrival at estate'
            ]
          }
        ]
      },
      {
        id: 'cellar-loft',
        name: 'Cellar Master Loft',
        rate: 135,
        otaRate: 165,
        size: '55 m²',
        bed: 'Super King Bed (200×200cm)',
        maxGuests: 3,
        view: 'Historic Winery Courtyard & Cellars',
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85',
          '/images/hospitality/savoria-wine-estate.jpg',
          '/images/hospitality/palazzo-suites.jpg'
        ],
        perk: 'Private Barrel Room Tasting & Late Checkout',
        amenities: ['Freestanding Copper Tub', 'Private Wine Tasting', 'Lounge Seating', 'Super King Bed', 'Garden Access', 'Espresso Bar'],
        description: 'Located in the historic east wing above the aging cellars. Handcrafted wrought-iron accents, freestanding copper soaking tub, and sommelier service.',
        ratePlans: [
          {
            id: 'cellar-standard',
            name: 'Room Only Direct',
            description: 'Full loft suite access with direct booking privilege.',
            rate: 135,
            otaRate: 165,
            breakfastIncluded: false,
            freeCancellation: true,
            perks: [
              'Direct booking rate (0% OTA commission)',
              'Free cancellation up to 48 hours before arrival',
              'Copper soaking tub & garden access'
            ]
          },
          {
            id: 'cellar-vip',
            name: 'Cellar Master Experience',
            description: 'The ultimate winery escape with private barrel tasting and vineyard breakfast.',
            rate: 150,
            otaRate: 185,
            breakfastIncluded: true,
            freeCancellation: true,
            recommended: true,
            perks: [
              'Daily gourmet vineyard breakfast included',
              'Private reserve tasting in ancient barrel vault',
              'Complimentary wine library access & firewood',
              'Flexible early arrival & late checkout',
              'Payment upon arrival at estate'
            ]
          }
        ]
      }
    ],
    localGuide: [
      {
        category: 'ESTATE',
        title: 'Historic Wine Cellars',
        dist: 'On-site',
        desc: 'Explore underground stone barrel vaults dating back to 1894 with daily sommelier-guided tastings.'
      },
      {
        category: 'HERITAGE',
        title: 'St. John at Kaneo Church',
        dist: '10 min boat ride',
        desc: 'Iconic 13th-century cliffside Byzantine church with the most famous lake vista in the Balkans.'
      },
      {
        category: 'NATURE',
        title: 'Galicica Mountain National Park',
        dist: '15 min drive',
        desc: 'Scenic mountain trails where you can simultaneously view two major Balkan lakes.'
      }
    ],
    faq: [
      { q: 'Are wine tastings included?', a: 'Direct booking guests receive a complimentary welcome cellar tour and a signature bottle of Reserve Vranec on arrival.' },
      { q: 'Is transportation from Ohrid Airport available?', a: 'Yes, private estate driver transfer takes 18 minutes and costs €25 fixed.' },
      { q: 'What are breakfast hours?', a: 'Organic breakfast featuring farm cheeses, homemade figs, and lake trout spreads is served from 08:00 to 10:30.' }
    ],
    conciergeQA: {
      parking: 'Yes, we provide secure private parking on the winery grounds with EV charging available.',
      checkin: 'Check-in begins at 14:00. Early check-in or late arrival after 22:00 is easily arranged via WhatsApp.',
      breakfast: 'Artisan vineyard breakfast is served every morning from 08:00 to 10:30 in our glass-fronted courtyard salon.',
      tasting: 'Complimentary cellar tours for direct guests run daily at 18:30 in the historic barrel cellar.',
      directPerks: 'Direct booking saves 15-20% in OTA fees and includes a complimentary bottle of our reserve wine and daily breakfast.'
    }
  },
  'city-apartments': {
    slug: 'city-apartments',
    name: 'Baščaršija Heritage Lofts',
    category: 'Historic Boutique City Apartments',
    ratingScore: 9.7,
    reviewsCount: 215,
    ratingLabel: 'Superb',
    location: 'Sarajevo Old Town · Bosnia and Herzegovina',
    locationHighlight: 'Heart of Old Bazaar · Steps from artisan coppersmiths & cafés',
    coords: '43.8594° N, 18.4318° E',
    motto: 'Historic boutique lofts in the vibrant heart of the old artisan quarter',
    tagline: 'Exposed Austrian-era brick, high-speed fiber WiFi, and seamless contactless keyless entry.',
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85',
    atmosphereImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    startingRate: 75,
    otaStartingRate: 95,
    directPerk: '24/7 keybox arrival + welcome Bosnian coffee set & neighborhood guide',
    host: {
      names: 'Dino & Lejla',
      role: 'Architects & Urban Hosts',
      image: '/images/hospitality/host-portrait.jpg',
      note: 'Located right where the Ottoman and Austro-Hungarian quarters meet. Quiet sleep inside double-glazed lofts, yet steps from Sarajevo’s best coffee and culture.'
    },
    rooms: [
      {
        id: 'historic-penthouse',
        name: 'Historic Penthouse Loft',
        rate: 75,
        otaRate: 95,
        size: '40 m²',
        bed: 'Queen Bed (160×200cm)',
        maxGuests: 2,
        view: 'Old Town Minarets & Hillside Rooftops',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85'
        ],
        perk: '24/7 Keyless Check-in, Coffee Set & Fast Fiber',
        amenities: ['300 Mbps Fiber Wi-Fi', 'Smart Keyless Lock', 'Air Conditioning', 'Ergonomic Desk', 'Rain Shower', 'Washer/Dryer'],
        description: 'Cathedral ceiling with skylights framing the historic minarets. Perfect for independent couples and digital remote workers.',
        ratePlans: [
          {
            id: 'penthouse-standard',
            name: 'Room Only Direct',
            description: 'Full loft access with 300 Mbps fiber internet.',
            rate: 75,
            otaRate: 95,
            breakfastIncluded: false,
            freeCancellation: true,
            perks: [
              'Direct booking rate (0% OTA commission)',
              'Free cancellation up to 48 hours before arrival',
              '300 Mbps dedicated fiber Wi-Fi'
            ]
          },
          {
            id: 'penthouse-vip',
            name: 'Urban Breakfast & Coffee Stay',
            description: 'Includes artisanal Bosnian coffee welcome set and partner bakery breakfast.',
            rate: 85,
            otaRate: 105,
            breakfastIncluded: true,
            freeCancellation: true,
            recommended: true,
            perks: [
              'Traditional artisan Bosnian coffee kit with Turkish delight',
              'Daily fresh bakery voucher at historic Old Town bakery',
              '24/7 contactless smart digital keycode access',
              'Luggage storage facility access',
              'Payment upon arrival'
            ]
          }
        ]
      },
      {
        id: 'atelier-studio',
        name: 'Atelier Courtyard Studio',
        rate: 60,
        otaRate: 75,
        size: '30 m²',
        bed: 'Double Bed (150×200cm)',
        maxGuests: 2,
        view: 'Quiet Inner Courtyard Garden',
        image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85'
        ],
        perk: 'Peaceful Courtyard, Neighborhood Map & Espresso',
        amenities: ['Quiet Garden View', 'Walk-in Rain Shower', 'Espresso Bar', 'Fiber Wi-Fi', 'Keyless Access', 'Blackout Blinds'],
        description: 'Peaceful garden sanctuary tucked behind the main cobblestone bazaar. Minimalist Scandinavian-Balkan oak furnishings.',
        ratePlans: [
          {
            id: 'atelier-standard',
            name: 'Room Only Direct',
            description: 'Quiet studio retreat in historic Old Town centre.',
            rate: 60,
            otaRate: 75,
            breakfastIncluded: false,
            freeCancellation: true,
            perks: [
              'Direct booking rate (0% OTA commission)',
              'Free cancellation up to 48 hours before arrival',
              'Keyless 24/7 digital access'
            ]
          },
          {
            id: 'atelier-vip',
            name: 'Explorer Direct Stay',
            description: 'Complimentary artisan coffee, curated local map, and flexible check-in.',
            rate: 70,
            otaRate: 88,
            breakfastIncluded: true,
            freeCancellation: true,
            recommended: true,
            perks: [
              'Daily partner bakery breakfast voucher included',
              'Curated Sarajevo insider map by hosts Dino & Lejla',
              'Flexible 24/7 digital check-in',
              'Payment upon arrival (No deposit required)'
            ]
          }
        ]
      }
    ],
    localGuide: [
      {
        category: 'BAZAAR',
        title: 'Sebilj Fountain & Bazaar',
        dist: '2 min walk',
        desc: 'The beating heart of Baščaršija with artisan coppersmiths and traditional pigeon square.'
      },
      {
        category: 'CAFE',
        title: 'Café Divan (Morića Han)',
        dist: '3 min walk',
        desc: 'Historic 16th-century caravan inn courtyard serving authentic Bosnian coffee in traditional copper dzezva.'
      },
      {
        category: 'PANORAMA',
        title: 'Trebević Cable Car',
        dist: '6 min walk',
        desc: 'Panoramic gondola gliding high above the valley for breathtaking city skyline views.'
      }
    ],
    faq: [
      { q: 'How does check-in work?', a: 'We use 24/7 smart keycode access. Your private code is sent directly to your WhatsApp on the morning of check-in.' },
      { q: 'Is there parking near Old Town?', a: 'Yes, we have an agreement with a secured underground garage 150m away (€12/day).' },
      { q: 'Is the internet reliable for video calls?', a: 'Yes, every apartment has dedicated symmetrical 300 Mbps fiber internet.' }
    ],
    conciergeQA: {
      parking: 'We have an arrangement with a secure covered parking garage 150m away (€12 per day).',
      checkin: 'Check-in is completely contactless 24/7 via digital keypad. Your code is sent to WhatsApp on arrival day.',
      breakfast: 'While the lofts have full espresso bars, we also recommend our partner bakery just 40 meters away for fresh burek.',
      wifi: 'All apartments have dedicated 300 Mbps fiber internet with seamless coverage for Zoom video calls.',
      directPerks: 'Direct booking includes our guaranteed lowest price, free artisanal coffee set, and flexible self check-in.'
    }
  }
};
