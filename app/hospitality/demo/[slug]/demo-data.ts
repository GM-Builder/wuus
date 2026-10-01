export interface Room {
  id: string;
  name: string;
  rate: number;
  otaRate: number;
  size: string;
  bed: string;
  view: string;
  image: string;
  gallery: string[];
  perk: string;
  amenities: string[];
  description: string;
}

export interface LocalGuideItem {
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
  location: string;
  coords: string;
  motto: string;
  tagline: string;
  heroImage: string;
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
    location: 'Himara, Albanian Riviera · Albania',
    coords: '39.8617° N, 19.9822° E',
    motto: 'A quiet stone haven above the Ionian Sea',
    tagline: 'Handcrafted stone architecture, morning sea breeze, and homemade courtyard breakfast.',
    heroImage: '/images/hospitality/guesthouse.webp',
    startingRate: 95,
    otaStartingRate: 115,
    directPerk: 'Complimentary bottle of chilled local white wine + flexible late check-in',
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
        rate: 95,
        otaRate: 115,
        size: '34 m²',
        bed: 'King Bed (180×200cm)',
        view: 'Olive Garden & Patio View',
        image: '/images/hospitality/guesthouse.webp',
        gallery: [
          '/images/hospitality/guesthouse.webp',
          '/images/hospitality/coastal-retreat.jpg'
        ],
        perk: 'Free Artisan Breakfast & Welcome Chilled Wine',
        amenities: ['High-speed Wi-Fi', 'Artisan Breakfast', 'Rain Shower', 'Espresso Bar', 'Quiet Patio', 'Eco Toiletries'],
        description: 'Native white limestone walls keep the room naturally cool under the Mediterranean sun. Opens directly onto the secluded citrus garden.'
      },
      {
        id: 'sea-terrace',
        name: 'Panoramic Sea Terrace Studio',
        rate: 135,
        otaRate: 165,
        size: '48 m²',
        bed: 'King Bed + Daybed',
        view: 'Direct Ionian Sea Sunset View',
        image: '/images/hospitality/coastal-retreat.jpg',
        gallery: [
          '/images/hospitality/coastal-retreat.jpg',
          '/images/hospitality/guesthouse.webp'
        ],
        perk: 'Private Sunset Sunbeds, Breakfast & Late Checkout',
        amenities: ['Private Sun Terrace', 'Outdoor Shower', 'King Bed', 'Ionian Sea View', 'High-speed Wi-Fi', 'Espresso Machine'],
        description: 'Unobstructed horizon views over the Ionian Sea and Corfu island. Watch sunset colors directly from your private outdoor teak loungers.'
      }
    ],
    localGuide: [
      {
        title: 'Secret Pebble Cove',
        dist: '4 min walk',
        desc: 'Follow the stone path past the olive grove directly to a quiet crystal-clear turquoise swimming cove.'
      },
      {
        title: 'Taverna Kosta',
        dist: '8 min walk',
        desc: 'Family-run tavern catching fresh sea bream and octopus daily, grilled over olive wood.'
      },
      {
        title: 'Old Town Castle Ruins',
        dist: '12 min drive',
        desc: 'Centuries-old stone ruins offering 360-degree panoramic views of the entire coastal mountain range.'
      }
    ],
    faq: [
      { q: 'Is there safe parking on-site?', a: 'Yes, we have free private parking in our shaded courtyard for all guest vehicles.' },
      { q: 'Can we check in after 22:30?', a: 'Yes. We offer seamless contactless check-in via our entrance keybox. The code is sent to your WhatsApp.' },
      { q: 'What is included with direct booking?', a: 'Direct bookings include our homemade artisan breakfast daily, a welcome bottle of local wine, and priority room allocation.' }
    ],
    conciergeQA: {
      parking: 'Yes, we provide free private parking in our private stone courtyard for all staying guests.',
      checkin: 'Check-in is from 14:00. If you arrive late after 22:30, we arrange contactless keybox entry with instructions sent to WhatsApp.',
      breakfast: 'Artisan breakfast is freshly prepared every morning from 08:00 to 10:30 on the courtyard garden terrace.',
      beach: 'The nearest quiet pebble beach is just a 4-minute walk down our private stone footpath.',
      directPerks: 'When booking directly with us, you get our guaranteed best rate, free breakfast daily, and a complimentary bottle of local wine.'
    }
  },
  'lakeside-wine-estate': {
    slug: 'lakeside-wine-estate',
    name: 'Savoria Estate & Vineyard Suites',
    location: 'Lake Ohrid · North Macedonia',
    coords: '41.1172° N, 20.8016° E',
    motto: 'Heritage suites overlooking ancient waters and terraced vineyards',
    tagline: '150-year-old historic winery estate, organic vineyard breakfast, and private tastings.',
    heroImage: '/images/hospitality/savoria-wine-estate.jpg',
    startingRate: 110,
    otaStartingRate: 135,
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
        rate: 110,
        otaRate: 135,
        size: '42 m²',
        bed: 'King Bed (180×200cm)',
        view: 'Lake Ohrid & Terraced Vineyards',
        image: '/images/hospitality/savoria-wine-estate.jpg',
        gallery: [
          '/images/hospitality/savoria-wine-estate.jpg',
          '/images/hospitality/palazzo-suites.jpg'
        ],
        perk: 'Welcome Reserve Wine, Cellar Tour & Vineyard Breakfast',
        amenities: ['Lake View Balcony', 'Stone Fireplace', 'Vineyard Breakfast', 'Wine Mini-cellar', 'Fast Wi-Fi', 'Plush Bathrobes'],
        description: 'Features exposed oak beams, private balcony overlooking the calm lake, and a crackling wood fireplace for cozy evenings.'
      },
      {
        id: 'cellar-loft',
        name: 'Cellar Master Loft',
        rate: 150,
        otaRate: 185,
        size: '55 m²',
        bed: 'Super King Bed (200×200cm)',
        view: 'Historic Winery Courtyard & Cellars',
        image: '/images/hospitality/palazzo-suites.jpg',
        gallery: [
          '/images/hospitality/palazzo-suites.jpg',
          '/images/hospitality/savoria-wine-estate.jpg'
        ],
        perk: 'Private Barrel Room Tasting & Late Checkout',
        amenities: ['Freestanding Copper Tub', 'Private Wine Tasting', 'Lounge Seating', 'Super King Bed', 'Garden Access', 'Espresso Bar'],
        description: 'Located in the historic east wing above the aging cellars. Handcrafted wrought-iron accents, copper soaking tub, and sommelier service.'
      }
    ],
    localGuide: [
      {
        title: 'Historic Wine Cellars',
        dist: 'On-site',
        desc: 'Explore underground stone barrel vaults dating back to 1894 with daily sommelier-guided tastings.'
      },
      {
        title: 'St. John at Kaneo Church',
        dist: '10 min boat ride',
        desc: 'Iconic 13th-century cliffside Byzantine church with the most famous lake vista in the Balkans.'
      },
      {
        title: 'Galicica Mountain National Park',
        dist: '15 min drive',
        desc: 'Scenic mountain trails where you can simultaneously view two major Balkan lakes.'
      }
    ],
    faq: [
      { q: 'Are wine tastings included?', a: 'Direct booking guests receive a complimentary welcome cellar tour and a signature bottle of Reserve Vranec.' },
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
    location: 'Sarajevo Old Town · Bosnia and Herzegovina',
    coords: '43.8594° N, 18.4318° E',
    motto: 'Historic boutique lofts in the vibrant heart of the old artisan quarter',
    tagline: 'Exposed Austrian-era brick, high-speed fiber WiFi, and seamless contactless keyless entry.',
    heroImage: '/images/hospitality/urban-loft.jpg',
    startingRate: 85,
    otaStartingRate: 105,
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
        rate: 85,
        otaRate: 105,
        size: '40 m²',
        bed: 'Queen Bed (160×200cm)',
        view: 'Old Town Minarets & Hillside Rooftops',
        image: '/images/hospitality/urban-loft.jpg',
        gallery: [
          '/images/hospitality/urban-loft.jpg',
          '/images/hospitality/mobile-stay-ui.jpg'
        ],
        perk: '24/7 Keyless Check-in, Coffee Set & Fast Fiber',
        amenities: ['300 Mbps Fiber Wi-Fi', 'Smart Keyless Lock', 'Air Conditioning', 'Ergonomic Desk', 'Rain Shower', 'Washer/Dryer'],
        description: 'Cathedral ceiling with skylights framing the historic minarets. Perfect for independent couples and digital remote workers.'
      },
      {
        id: 'atelier-studio',
        name: 'Atelier Courtyard Studio',
        rate: 70,
        otaRate: 88,
        size: '30 m²',
        bed: 'Double Bed (150×200cm)',
        view: 'Quiet Inner Courtyard Garden',
        image: '/images/hospitality/mobile-stay-ui.jpg',
        gallery: [
          '/images/hospitality/mobile-stay-ui.jpg',
          '/images/hospitality/urban-loft.jpg'
        ],
        perk: 'Peaceful Courtyard, Neighborhood Map & Espresso',
        amenities: ['Quiet Garden View', 'Walk-in Rain Shower', 'Espresso Bar', 'Fiber Wi-Fi', 'Keyless Access', 'Blackout Blinds'],
        description: 'Peaceful garden sanctuary tucked behind the main cobblestone bazaar. Minimalist Scandinavian-Balkan oak furnishings.'
      }
    ],
    localGuide: [
      {
        title: 'Sebilj Fountain & Bazaar',
        dist: '2 min walk',
        desc: 'The beating heart of Baščaršija with artisan coppersmiths and traditional pigeon square.'
      },
      {
        title: 'Café Divan (Morića Han)',
        dist: '3 min walk',
        desc: 'Historic 16th-century caravan inn courtyard serving authentic Bosnian coffee in traditional copper dzezva.'
      },
      {
        title: 'Trebević Cable Car',
        dist: '6 min walk',
        desc: 'Panoramic gondola gliding high above the valley for breathtaking city skyline views.'
      }
    ],
    faq: [
      { q: 'How does check-in work?', a: 'We have 24/7 smart keycode access. Your private code is sent directly to your WhatsApp on the morning of check-in.' },
      { q: 'Is there parking near Old Town?', a: 'Yes, we have a partner secured underground garage 150m away (€12/day).' },
      { q: 'Is the internet reliable for video calls?', a: 'Yes! We have dedicated symmetrical 300 Mbps fiber internet in every loft.' }
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
