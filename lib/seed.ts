export type ActivityTag =
  | 'ticket'
  | 'free'
  | 'transit'
  | 'tip'
  | 'flame'
  | 'confirm'
  | 'manga';

export type DayBadge = 'travel' | 'london' | 'paris' | 'rest';

export interface ActivityItem {
  id: string;
  time: string;
  text: string;
  tag?: ActivityTag;
  tagLabel?: string;
  note?: string;
  booking?: string;
}

export interface ItineraryDay {
  id: string;
  date: string; // ISO date string: "2026-05-19"
  label: string;
  badge: DayBadge;
  title: string;
  hotel?: string;
  activities: ActivityItem[];
}

export interface FlightInfo {
  id: string;
  flightNumber: string;
  from: string;
  to: string;
  departs: string;
  arrives: string;
  airline: string;
  notes: string;
}

export interface TrainInfo {
  id: string;
  ref: string;
  trainNumber: string;
  coach: string;
  seats: string;
  from: string;
  to: string;
  departs: string;
  arrives: string;
}

export interface HotelInfo {
  id: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  notes: string;
}

export interface TravelData {
  flights: FlightInfo[];
  train: TrainInfo;
  hotels: HotelInfo[];
}

export interface PackingItem {
  id: string;
  text: string;
  checked: boolean;
  category: string;
}

export interface BookingActivity {
  id: string;
  name: string;
  date: string;
  cost: string;
  tier: number;
  urgency: string;
  detail: string;
  url?: string;
  booked: boolean;
  confirmed: boolean;
}

export interface TripData {
  itinerary: ItineraryDay[];
  travel: TravelData;
  packing: PackingItem[];
  activities: BookingActivity[];
}

export const SEED_DATA: TripData = {
  itinerary: [
    {
      id: 'day-1',
      date: '2026-05-19',
      label: 'Tuesday, May 19 — Departure day (Chicago)',
      badge: 'travel',
      title: 'Fly Chicago ORD → London Heathrow',
      activities: [
        { id: 'a1-1', time: 'Afternoon', text: "Get to O'Hare — check in, clear security", tag: 'tip', tagLabel: 'Arrive 3 hrs early for international' },
        { id: 'a1-2', time: '6:31 PM', text: 'DL 4923 departs ORD → JFK (Endeavor / Delta Connection)' },
        { id: 'a1-3', time: '~9:00 PM', text: 'Connect at JFK — 1h 40m layover' },
        { id: 'a1-4', time: '~10:40 PM', text: 'DL 5988 departs JFK → LHR (Virgin Atlantic A330-900neo)', booking: 'Delta · ORD→LHR · Basic Economy · Carry-on only (no free checked bags)' },
      ],
    },
    {
      id: 'day-2',
      date: '2026-05-20',
      label: 'Wednesday, May 20 — Arrive London',
      badge: 'travel',
      title: 'Land at Heathrow, check in, get oriented',
      hotel: 'Premier Inn Aldgate',
      activities: [
        { id: 'a2-1', time: '12:05 PM', text: 'Land at London Heathrow (LHR)', note: 'Clear UK Border Control — can take 30–60 min. Have passports and hotel address ready.' },
        { id: 'a2-2', time: '1:30 PM', text: 'Elizabeth line from Heathrow toward central London', tag: 'transit', tagLabel: '~50 min to Liverpool St' },
        { id: 'a2-3', time: '2:30 PM', text: 'Check in to Premier Inn London City – Aldgate, drop bags, freshen up', note: "If room isn't ready, hotel will hold luggage — head out and come back." },
        { id: 'a2-4', time: '3:30 PM', text: 'Easy walk around Aldgate / Whitechapel — get your bearings', tag: 'free', tagLabel: 'Free' },
        { id: 'a2-5', time: '5:00 PM', text: 'Short walk to Tower Bridge — first London landmark', tag: 'free', tagLabel: 'Free' },
        { id: 'a2-6', time: '7:00 PM', text: 'Dinner nearby — Spitalfields or Brick Lane' },
        { id: 'a2-7', time: '9:00 PM', text: "Early night — you've been up for 24+ hours" },
      ],
    },
    {
      id: 'day-3',
      date: '2026-05-21',
      label: 'Thursday, May 21 — Local exploring & concert night',
      badge: 'london',
      title: 'Tower of London, Sky Garden & OVO Arena Wembley (doors 6:30 PM)',
      hotel: 'Premier Inn Aldgate',
      activities: [
        { id: 'a3-1', time: '9:30 AM', text: 'Breakfast near hotel — everything today is walkable from Aldgate' },
        { id: 'a3-2', time: '10:00 AM', text: 'Tower of London — Crown Jewels, Beefeaters, medieval fortress', tag: 'ticket', tagLabel: 'Pre-book — ~£35/person', note: 'Allow 2–2.5 hrs. One of the most visited sites in England — book in advance to skip the queue.' },
        { id: 'a3-3', time: '12:30 PM', text: 'Tower Bridge — walk across & photos (5-min walk from the Tower)', tag: 'free', tagLabel: 'Free to cross', note: 'The Tower Bridge Exhibition (glass floor walkway) is £12/person — optional but impressive if you want it.' },
        { id: 'a3-4', time: '1:00 PM', text: 'Lunch near the Tower — St Katharine Docks or Monument area' },
        { id: 'a3-5', time: '2:30 PM', text: 'Sky Garden, 20 Fenchurch St — 360° views over the City of London', tag: 'ticket', tagLabel: 'Free — must pre-book online', note: 'Allow 1–1.5 hrs. 20-min walk from the Tower. Book ASAP — slots fill weeks ahead.' },
        { id: 'a3-6', time: '4:15 PM', text: 'Walk back to hotel — 10 min from Sky Garden', tag: 'transit', tagLabel: 'Straight walk back to Aldgate' },
        { id: 'a3-7', time: '4:30 PM', text: 'Freshen up, grab a light snack before the show', note: "Don't eat a big meal — grab something at Wembley instead." },
        { id: 'a3-8', time: '5:00 PM', text: 'Leave hotel — walk to Aldgate East tube' },
        { id: 'a3-9', time: '5:15 PM', text: 'Jubilee line toward Wembley Park', tag: 'transit', tagLabel: 'Change at Canning Town or Stratford — ~45 min', note: 'First time on the tube — allow the extra time. Google Maps works great underground.' },
        { id: 'a3-10', time: '6:00 PM', text: 'Arrive Wembley Park station — follow the crowd down Olympic Way' },
        { id: 'a3-11', time: '6:15 PM', text: 'Arrive OVO Arena — grab food & drinks before doors open' },
        { id: 'a3-12', time: '6:30 PM', text: '🎵 Doors open — get inside, find your seats' },
        { id: 'a3-13', time: '~10:30 PM', text: 'Concert ends — Jubilee line back toward central London', note: 'Platforms will be packed. Be patient, let a train or two go if needed. Back at hotel ~midnight.' },
      ],
    },
    {
      id: 'day-4',
      date: '2026-05-22',
      label: 'Friday, May 22 — Full sightseeing day',
      badge: 'london',
      title: 'Buckingham Palace, Westminster & Borough Market',
      hotel: 'Premier Inn Aldgate',
      activities: [
        { id: 'a4-1', time: '8:00 AM', text: 'Breakfast near hotel — early start to catch the Changing of the Guard' },
        { id: 'a4-2', time: '8:45 AM', text: 'Tube to Green Park station', tag: 'transit', tagLabel: 'Circle → Victoria line, ~25 min' },
        { id: 'a4-3', time: '9:30 AM', text: 'Arrive Buckingham Palace — stake out a spot at the Victoria Memorial railings', tag: 'free', tagLabel: 'Free', note: 'Crowds build fast. Arrive by 9:45 AM at the latest for a clear view of the forecourt.' },
        { id: 'a4-4', time: '10:45 AM', text: '🎖️ Changing of the Guard ceremony — the full ~45 min performance', tag: 'flame', tagLabel: "Don't miss — check changing-guard.com to confirm date" },
        { id: 'a4-5', time: '11:30 AM', text: 'Walk around the Palace gates & Victoria Memorial — photos', tag: 'free', tagLabel: 'Free' },
        { id: 'a4-6', time: '12:00 PM', text: "Stroll through St James's Park toward Westminster", tag: 'free', tagLabel: '~15 min walk' },
        { id: 'a4-7', time: '12:15 PM', text: 'Jubilee line from Westminster → London Bridge', tag: 'transit', tagLabel: '~5 min, 2 stops' },
        { id: 'a4-8', time: '12:30 PM', text: 'Borough Market — leisurely lunch & browse the stalls', tag: 'free', tagLabel: 'Walk-in — peak market time', note: '2 full hours here. Iconic London food market — eat your way through it.' },
        { id: 'a4-9', time: '2:30 PM', text: 'Walk across London Bridge or tube back to Westminster', tag: 'transit', tagLabel: '~15 min walk over the bridge' },
        { id: 'a4-10', time: '2:45 PM', text: 'Westminster Abbey — timed entry', tag: 'ticket', tagLabel: 'Pre-book 2:45 PM slot — £31/person', note: 'Last admission is 3:30 PM on Fridays. Plan 1.5 hrs with the included audio guide.' },
        { id: 'a4-11', time: '4:30 PM', text: 'Big Ben & Houses of Parliament — exterior walk & photos', tag: 'free', tagLabel: 'Free' },
        { id: 'a4-12', time: '4:45 PM', text: 'Board HOHO Red Route at Westminster stop', tag: 'ticket', tagLabel: 'Buy 48h HOHO ticket online (valid Sat too)' },
        { id: 'a4-13', time: '5:00 PM', text: 'Hop off at London Eye — photos from South Bank', tag: 'free', tagLabel: 'Free' },
        { id: 'a4-14', time: '5:30 PM', text: 'Hop back on HOHO or tube toward hotel — freshen up' },
        { id: 'a4-15', time: '7:00 PM', text: 'Dinner out — nice meal before the big museum day tomorrow' },
      ],
    },
    {
      id: 'day-5',
      date: '2026-05-23',
      label: 'Saturday, May 23 — Full London sightseeing day',
      badge: 'london',
      title: 'British Museum, Natural History Museum & Thames cruise',
      hotel: 'Premier Inn Aldgate',
      activities: [
        { id: 'a5-1', time: '9:30 AM', text: 'Late start — you were out past midnight. Breakfast near hotel.' },
        { id: 'a5-2', time: '10:30 AM', text: 'HOHO Green Route to British Museum', tag: 'confirm', tagLabel: 'Day 2 of 48h HOHO ticket' },
        { id: 'a5-3', time: '11:00 AM', text: 'British Museum — Rosetta Stone, Egyptian mummies, Greek antiquities', tag: 'free', tagLabel: 'Free — timed entry recommended', note: 'Allow 1.5–2 hrs for highlights. Could easily fill a whole day.' },
        { id: 'a5-4', time: '1:00 PM', text: 'Forbidden Planet, 179 Shaftesbury Ave — comics, anime, collectibles', tag: 'manga', tagLabel: '~15 min walk from museum' },
        { id: 'a5-5', time: '2:00 PM', text: 'Lunch in Covent Garden' },
        { id: 'a5-6', time: '3:15 PM', text: 'HOHO Blue Route → Natural History Museum', tag: 'transit', tagLabel: '~30 min ride' },
        { id: 'a5-7', time: '3:45 PM', text: 'Natural History Museum — dinosaurs, blue whale, Darwin Centre', tag: 'free', tagLabel: 'Free — closes 5:50 PM', note: 'Allow 1.5 hrs. Keep an eye on closing time.' },
        { id: 'a5-8', time: '5:30 PM', text: 'HOHO Red Route back toward Westminster / South Bank' },
        { id: 'a5-9', time: '6:15 PM', text: 'Thames River Cruise — Westminster Pier to Tower Pier', tag: 'free', tagLabel: 'Included with 48h HOHO', note: '~30-min cruise. Views of St Paul\'s, Tate Modern, Tower Bridge. Last boat ~7 PM — don\'t miss it.' },
        { id: 'a5-10', time: '7:00 PM', text: 'Arrive Tower Pier — 10-min walk back to hotel' },
        { id: 'a5-11', time: '7:30 PM', text: 'Last London dinner — make it a good pub meal' },
      ],
    },
    {
      id: 'day-6',
      date: '2026-05-24',
      label: 'Sunday, May 24 — Eurostar to Paris',
      badge: 'travel',
      title: "Eurostar + Champs-Élysées & Arc de Triomphe",
      hotel: 'Airbnb La Garenne-Colombes',
      activities: [
        { id: 'a6-1', time: '7:30 AM', text: 'Wake up, pack, check out of Premier Inn' },
        { id: 'a6-2', time: '8:00 AM', text: 'Quick breakfast near hotel or grab something at St. Pancras' },
        { id: 'a6-3', time: '8:20 AM', text: 'Tube to St. Pancras International', tag: 'transit', tagLabel: 'Circle/Met line ~20 min — aim to arrive by 9:00', note: 'Your ticket says arrive by 9:16 AM. Earlier is better — St. Pancras security and passport control take time.' },
        { id: 'a6-4', time: '9:16 AM', text: 'Arrive St. Pancras — check in, passport control, gate', booking: 'Eurostar ref VXQ2X4 · Train 9018 · Coach 8 · Bryan seat 42 / Noah seat 41 · Departs 10:31 AM' },
        { id: 'a6-5', time: '10:31 AM', text: 'Eurostar departs London St. Pancras' },
        { id: 'a6-6', time: '1:59 PM', text: 'Arrive Paris Gare du Nord (Paris time — 1 hr ahead of London)' },
        { id: 'a6-7', time: '2:30 PM', text: 'RER A or Metro to La Garenne-Colombes — check in to Airbnb', tag: 'transit', tagLabel: '~25–35 min from Gare du Nord', note: 'Buy a Navigo Easy card at Gare du Nord — cheapest way to top up Metro/RER tickets for your stay.' },
        { id: 'a6-8', time: '3:30 PM', text: 'Metro Line 1 to Charles-de-Gaulle–Étoile' },
        { id: 'a6-9', time: '4:00 PM', text: 'Stroll the full Champs-Élysées toward the Arc de Triomphe', tag: 'free', tagLabel: 'Free — ~35 min walk' },
        { id: 'a6-10', time: '5:00 PM', text: 'Arc de Triomphe — underground pedestrian passage, view the carvings & reliefs up close', tag: 'free', tagLabel: 'Free' },
        { id: 'a6-11', time: '6:15 PM', text: 'Get a good spot near the Tomb of the Unknown Soldier' },
        { id: 'a6-12', time: '6:30 PM', text: '🔥 Flame rekindling ceremony — Tomb of the Unknown Soldier', tag: 'flame', tagLabel: "Don't miss — daily since 1923" },
        { id: 'a6-13', time: '7:15 PM', text: 'Dinner near Trocadéro or along the Seine — first Paris evening!' },
      ],
    },
    {
      id: 'day-7',
      date: '2026-05-25',
      label: 'Monday, May 25 — Full Paris day',
      badge: 'paris',
      title: 'Eiffel Tower, Louvre, Notre-Dame & Aaapoum Bapoum',
      hotel: 'Airbnb La Garenne-Colombes',
      activities: [
        { id: 'a7-1', time: '8:00 AM', text: 'Breakfast near the Airbnb — grab a croissant and coffee' },
        { id: 'a7-2', time: '8:30 AM', text: 'Metro/RER to Bir-Hakeim or Trocadéro stop', tag: 'transit', tagLabel: '~25 min from Airbnb area' },
        { id: 'a7-3', time: '9:00 AM', text: 'Eiffel Tower — first entry slot of the day', tag: 'ticket', tagLabel: 'Book 60 days out — summit sells out fast', note: 'Allow 1.5–2 hrs. Book a 9:00 or 9:30 AM slot if possible to beat the crowds.' },
        { id: 'a7-4', time: '11:00 AM', text: 'Walk or Metro to the Louvre', tag: 'transit', tagLabel: '~25 min walk or 2 Metro stops' },
        { id: 'a7-5', time: '11:30 AM', text: 'Louvre Museum — Mona Lisa, Venus de Milo, Winged Victory', tag: 'ticket', tagLabel: 'Pre-book timed slot — essential', note: 'Allow 2–2.5 hrs for highlights. Book an 11:30 AM or noon entry slot. The museum is enormous — pick a focus.' },
        { id: 'a7-6', time: '2:00 PM', text: 'Lunch near the Louvre — Rue de Rivoli or Tuileries garden café' },
        { id: 'a7-7', time: '3:15 PM', text: 'Metro to Cité stop → Notre-Dame Cathedral', tag: 'ticket', tagLabel: 'Free — reserve time slot online', note: 'Allow 45–60 min inside. Fully restored after the 2019 fire — stunning interior.' },
        { id: 'a7-8', time: '4:30 PM', text: 'Walk Île de la Cité, cross to the Left Bank — Latin Quarter', tag: 'free', tagLabel: 'Free' },
        { id: 'a7-9', time: '5:00 PM', text: 'Aaapoum Bapoum — 14 Rue Serpente, 5-min walk from Notre-Dame', tag: 'manga', tagLabel: 'Walk-in — open until 9 PM', note: 'One of the most famous manga & comics shops in Paris. Secondhand treasures, rare finds, great prices. Rated 4.6 with nearly 900 reviews. Easy to lose an hour in here.' },
        { id: 'a7-10', time: '6:00 PM', text: 'Wander the Latin Quarter — backstreets, bookshops, cafés', tag: 'free', tagLabel: 'Free' },
        { id: 'a7-11', time: '7:30 PM', text: 'Dinner in Le Marais or the Latin Quarter — last night in Paris, make it memorable' },
      ],
    },
    {
      id: 'day-8',
      date: '2026-05-26',
      label: 'Tuesday, May 26 — Fly home',
      badge: 'travel',
      title: 'Paris CDG → Chicago ORD',
      activities: [
        { id: 'a8-1', time: '8:00 AM', text: 'Wake up, finish packing, check out of Airbnb' },
        { id: 'a8-2', time: '8:30 AM', text: 'Head to CDG Airport', tag: 'transit', tagLabel: 'Transilien L → La Défense → RER A → RER B to CDG, ~60–70 min', note: "Check the route on Google Maps the night before — it's a multi-step journey. Allow plenty of time." },
        { id: 'a8-3', time: '10:00 AM', text: 'Arrive CDG — check in, security, passport control', tag: 'tip', tagLabel: 'CDG is large — allow plenty of time' },
        { id: 'a8-4', time: '1:10 PM', text: 'DL 8756 departs CDG → ORD (Air France A350)', booking: 'Delta · CDG→ORD · Basic Economy · Carry-on only · Arrives Chicago 3:10 PM' },
        { id: 'a8-5', time: '3:10 PM', text: '🏠 Arrive Chicago O\'Hare — welcome home!' },
      ],
    },
  ],

  travel: {
    flights: [
      {
        id: 'fl-1',
        flightNumber: 'DL 4923',
        from: 'Chicago ORD',
        to: 'New York JFK',
        departs: 'Tue May 19, 6:31 PM',
        arrives: 'Tue May 19, ~9:00 PM',
        airline: 'Delta / Endeavor Air',
        notes: 'Basic Economy · Carry-on only · Connection at JFK',
      },
      {
        id: 'fl-2',
        flightNumber: 'DL 5988',
        from: 'New York JFK',
        to: 'London Heathrow LHR',
        departs: 'Tue May 19, ~10:40 PM',
        arrives: 'Wed May 20, 12:05 PM',
        airline: 'Virgin Atlantic (A330-900neo)',
        notes: 'Basic Economy · Carry-on only · Operated by Virgin Atlantic',
      },
      {
        id: 'fl-3',
        flightNumber: 'DL 8756',
        from: 'Paris CDG',
        to: 'Chicago ORD',
        departs: 'Tue May 26, 1:10 PM',
        arrives: 'Tue May 26, 3:10 PM',
        airline: 'Air France (A350)',
        notes: 'Basic Economy · Carry-on only',
      },
    ],
    train: {
      id: 'train-1',
      ref: 'VXQ2X4',
      trainNumber: '9018',
      coach: '8',
      seats: 'Bryan seat 42 / Noah seat 41',
      from: 'London St. Pancras International',
      to: 'Paris Gare du Nord',
      departs: 'Sun May 24, 10:31 AM',
      arrives: 'Sun May 24, 1:59 PM (Paris time)',
    },
    hotels: [
      {
        id: 'hotel-1',
        name: 'Premier Inn London City – Aldgate',
        location: 'Aldgate, London',
        checkIn: 'Wed May 20',
        checkOut: 'Sun May 24',
        notes: 'Check-in from 2 PM · Hold luggage if room not ready',
      },
      {
        id: 'hotel-2',
        name: 'Airbnb',
        location: 'La Garenne-Colombes, Paris',
        checkIn: 'Sun May 24',
        checkOut: 'Tue May 26',
        notes: '~25–35 min from Gare du Nord via RER A',
      },
    ],
  },

  packing: [
    // Documents
    { id: 'pk-1', text: 'Passport (valid ≥6 months past May 26)', checked: false, category: 'Documents' },
    { id: 'pk-2', text: 'Printed/downloaded flight booking refs', checked: false, category: 'Documents' },
    { id: 'pk-3', text: 'Eurostar booking ref VXQ2X4 (printed or screenshot)', checked: false, category: 'Documents' },
    { id: 'pk-4', text: 'Hotel & Airbnb confirmation printouts', checked: false, category: 'Documents' },
    { id: 'pk-5', text: 'Travel insurance card / policy number', checked: false, category: 'Documents' },
    { id: 'pk-6', text: 'Credit/debit cards with no foreign transaction fees', checked: false, category: 'Documents' },
    // Clothing
    { id: 'pk-7', text: '5 t-shirts / casual tops', checked: false, category: 'Clothing' },
    { id: 'pk-8', text: '3 bottoms (jeans, trousers, or shorts)', checked: false, category: 'Clothing' },
    { id: 'pk-9', text: '7 pairs of underwear & socks', checked: false, category: 'Clothing' },
    { id: 'pk-10', text: '1 smart-casual outfit for concert (OVO Arena, May 21)', checked: false, category: 'Clothing' },
    { id: 'pk-11', text: 'Light jacket / layer (London can be cool/rainy)', checked: false, category: 'Clothing' },
    { id: 'pk-12', text: 'Compact rain poncho or travel umbrella', checked: false, category: 'Clothing' },
    // Shoes
    { id: 'pk-13', text: '1 pair broken-in walking shoes (you will walk 15,000+ steps/day)', checked: false, category: 'Shoes' },
    { id: 'pk-14', text: '1 pair casual/evening shoes', checked: false, category: 'Shoes' },
    // Toiletries
    { id: 'pk-15', text: 'TSA-compliant clear liquids bag (3-1-1 rule)', checked: false, category: 'Toiletries' },
    { id: 'pk-16', text: 'Toothbrush, toothpaste, deodorant, shampoo (travel size)', checked: false, category: 'Toiletries' },
    { id: 'pk-17', text: 'Sunscreen SPF 30+', checked: false, category: 'Toiletries' },
    { id: 'pk-18', text: 'Any prescription medications', checked: false, category: 'Toiletries' },
    // Tech
    { id: 'pk-19', text: 'Phone + charging cable', checked: false, category: 'Tech' },
    { id: 'pk-20', text: 'Universal travel adapter (UK Type G + EU Type C/E)', checked: false, category: 'Tech' },
    { id: 'pk-21', text: 'Portable battery pack (10,000 mAh+, must be carry-on)', checked: false, category: 'Tech' },
    { id: 'pk-22', text: 'Headphones / earbuds for the flight', checked: false, category: 'Tech' },
    { id: 'pk-23', text: 'Download offline maps (London & Paris) on Google Maps', checked: false, category: 'Tech' },
    // Luggage rules
    { id: 'pk-24', text: '⚠️ 1 carry-on bag max (≤22×14×9″) — Delta Basic Economy, NO free checked bags', checked: false, category: 'Luggage Rules' },
    { id: 'pk-25', text: '⚠️ 1 personal item (backpack or small bag) per person', checked: false, category: 'Luggage Rules' },
    { id: 'pk-26', text: '⚠️ No liquids >100ml in carry-on — UK and EU security rules apply', checked: false, category: 'Luggage Rules' },
  ],

  activities: [
    {
      id: 'act-1',
      name: 'Eiffel Tower',
      date: 'Mon May 25',
      cost: '~€29–€35/person',
      tier: 1,
      urgency: 'Book today',
      detail: 'ticket.eiffeltower.paris · Summit window opened 60 days out — top-deck slots scarce now',
      url: 'https://ticket.eiffeltower.paris',
      booked: false,
      confirmed: false,
    },
    {
      id: 'act-2',
      name: 'Louvre Museum',
      date: 'Mon May 25',
      cost: '~€22/person',
      tier: 2,
      urgency: 'Book this week',
      detail: 'ticket.louvre.fr · Popular morning slots (11:30 AM target) fill fast — essential timed entry',
      url: 'https://ticket.louvre.fr',
      booked: false,
      confirmed: false,
    },
    {
      id: 'act-3',
      name: 'Westminster Abbey',
      date: 'Fri May 22',
      cost: '£31/person',
      tier: 2,
      urgency: 'Book this week',
      detail: 'westminster-abbey.org · 2:45 PM slot · Last Friday admission is 3:30 PM — get the 2:45 slot',
      url: 'https://westminster-abbey.org',
      booked: false,
      confirmed: false,
    },
    {
      id: 'act-4',
      name: 'Tower of London',
      date: 'Thu May 21',
      cost: '~£35/person',
      tier: 2,
      urgency: 'Book this week',
      detail: 'hrp.org.uk · 10 AM entry — skip-the-queue tickets save 30+ min',
      url: 'https://www.hrp.org.uk',
      booked: false,
      confirmed: false,
    },
    {
      id: 'act-5',
      name: 'Sky Garden',
      date: 'Fri May 22',
      cost: 'Free',
      tier: 3,
      urgency: 'Window opens May 1',
      detail: 'skygarden.london · Free but 3-week advance booking only — book the moment the window opens',
      url: 'https://skygarden.london',
      booked: false,
      confirmed: false,
    },
    {
      id: 'act-6',
      name: 'British Museum',
      date: 'Sat May 23',
      cost: 'Free',
      tier: 4,
      urgency: 'Flexible · 1–2 wks out',
      detail: 'britishmuseum.org · Free timed entry — slots usually available a week or two before',
      url: 'https://www.britishmuseum.org',
      booked: false,
      confirmed: false,
    },
    {
      id: 'act-7',
      name: 'HOHO Bus — 48h Ticket',
      date: 'Fri May 22',
      cost: 'Buy online',
      tier: 4,
      urgency: 'Flexible · Anytime',
      detail: 'goldentours.com or similar · No advance booking needed — buy morning-of if you want',
      url: 'https://www.goldentours.com',
      booked: false,
      confirmed: false,
    },
    {
      id: 'act-8',
      name: 'Notre-Dame Cathedral',
      date: 'Mon May 25',
      cost: 'Free',
      tier: 5,
      urgency: 'Last-minute only',
      detail: 'notredame.fr · Reservations open only 2 days before — book Sat May 23',
      url: 'https://notredame.fr',
      booked: false,
      confirmed: false,
    },
    // Already confirmed
    {
      id: 'act-conf-1',
      name: 'Delta Flights — ORD → LHR → ORD',
      date: 'May 19 & May 26',
      cost: 'Booked',
      tier: 0,
      urgency: '',
      detail: 'Basic Economy · Carry-on only',
      booked: true,
      confirmed: true,
    },
    {
      id: 'act-conf-2',
      name: 'Eurostar — London St Pancras → Paris Gare du Nord',
      date: 'Sun May 24',
      cost: 'Booked',
      tier: 0,
      urgency: '',
      detail: 'Ref VXQ2X4 · Train 9018 · Coach 8 · Bryan 42 / Noah 41',
      booked: true,
      confirmed: true,
    },
    {
      id: 'act-conf-3',
      name: 'Premier Inn London City – Aldgate',
      date: 'May 20–24',
      cost: 'Booked',
      tier: 0,
      urgency: '',
      detail: '4 nights in London',
      booked: true,
      confirmed: true,
    },
    {
      id: 'act-conf-4',
      name: 'Airbnb — La Garenne-Colombes, Paris',
      date: 'May 24–26',
      cost: 'Booked',
      tier: 0,
      urgency: '',
      detail: '2 nights in Paris',
      booked: true,
      confirmed: true,
    },
  ],
};
