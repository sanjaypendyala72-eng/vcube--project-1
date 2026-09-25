export const ticketsCategory = {
  id: "tickets",
  slug: "tickets",
  name: "Tickets & Experiences",
  shortTitle: "TICKETS & EVENTS",
  subtitle: "Your Next Experience Starts Here.",
  tagline: "Symphonic galas, stadium sports, private tasting salons, and global festivals.",
  accentColor: "#f43f5e",
  accentGlow: "rgba(244, 63, 94, 0.18)",
  heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
  subcategories: [
    "All", "Movies", "Concerts", "Sports", "Theatre", "Events", "Festivals", "Workshops", "Experiences"
  ],
  filterOptions: {
    cities: ["Mumbai", "Bengaluru", "Delhi NCR", "Goa", "Hyderabad", "London", "Tokyo"],
    dates: ["This Weekend", "Next 7 Days", "This Month", "Upcoming Seasons"],
    types: ["VIP Box Lounge", "Front Row Premium", "General Admission", "Backstage Pass Included"]
  },
  promotions: [
    {
      title: "Royal Albert Hall World Tour",
      heading: "London Philharmonic: Zimmer Live",
      desc: "Live 90-piece orchestra performing iconic scores from Interstellar, Dune, and Inception.",
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=900&q=80",
      cta: "Reserve Orchestra Seats"
    },
    {
      title: "Monaco Grand Prix VIP Hospitality",
      heading: "Yacht Harbor Club Weekend Pass",
      desc: "Exclusive trackside viewing from a 45m tri-deck yacht with gourmet champagne catering.",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80",
      cta: "Explore Monaco GP"
    }
  ],
  products: [
    {
      id: "tkt-01",
      name: "London Philharmonic Orchestra: Cinematic Masterworks",
      brand: "SYMPHONIA Live",
      category: "tickets",
      subcategory: "Concerts",
      price: 4999,
      originalPrice: 6499,
      rating: 5.0,
      reviews: 410,
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=900&q=85",
      tag: "Selling Fast",
      city: "Mumbai",
      date: "Oct 24, 2026 • 7:30 PM",
      venue: "Grand Opera Theatre, BKC",
      seatTiers: [
        { tier: "Royal Box (Includes Champagne)", price: 9999 },
        { tier: "Stalls Premium Orchestra", price: 4999 },
        { tier: "Balcony Grand Tier", price: 2499 }
      ],
      description: "Conducted under the acoustic masterpiece ceiling of the Grand Opera House. Experience towering cinema themes performed by world-class soloists."
    },
    {
      id: "tkt-02",
      name: "Formula 1 Grand Prix 3-Day Grandstand Pass",
      brand: "APEX Motorsport",
      category: "tickets",
      subcategory: "Sports",
      price: 28999,
      originalPrice: 34999,
      rating: 4.9,
      reviews: 185,
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=85",
      tag: "Major Event",
      city: "Delhi NCR",
      date: "Nov 12-14, 2026",
      venue: "International Circuit, Main Straight",
      seatTiers: [
        { tier: "Paddock Club Hospitality", price: 89999 },
        { tier: "Main Straight Covered Grandstand", price: 28999 },
        { tier: "Turn 1 Chicane General Pass", price: 14999 }
      ],
      description: "Witness 1000-horsepower hybrid engines scream past the start-finish line at 340 km/h with pit lane walk access and big-screen telemetry."
    },
    {
      id: "tkt-03",
      name: "Solstice Electronic Music & Arts Festival (Goa)",
      brand: "HORIZON Festivals",
      category: "tickets",
      subcategory: "Festivals",
      price: 6999,
      originalPrice: 8999,
      rating: 4.8,
      reviews: 520,
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=85",
      tag: "Festival Pass",
      city: "Goa",
      date: "Dec 29-31, 2026",
      venue: "Vagator Coastal Sands, Goa",
      seatTiers: [
        { tier: "VIP Sunset Deck Pass", price: 14999 },
        { tier: "3-Day Full Season Festival Pass", price: 6999 },
        { tier: "Single Day Pass", price: 3499 }
      ],
      description: "4 massive stages overlooking the Arabian Sea featuring 45 global techno and melodic house artists, ambient light installations, and beach camping."
    },
    {
      id: "tkt-04",
      name: "The Phantom of the Opera (Broadway Tour Gala)",
      brand: "BROADWAY International",
      category: "tickets",
      subcategory: "Theatre",
      price: 3499,
      originalPrice: 4499,
      rating: 5.0,
      reviews: 290,
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=900&q=85",
      tag: "Broadway Tour",
      city: "Bengaluru",
      date: "Nov 05, 2026 • 8:00 PM",
      venue: "Prestige Centre for Performing Arts",
      seatTiers: [
        { tier: "Front Row VIP Center", price: 6999 },
        { tier: "Dress Circle Prime", price: 3499 },
        { tier: "Upper Circle Standard", price: 1899 }
      ],
      description: "Andrew Lloyd Webber's iconic musical featuring the legendary falling chandelier, elaborate period costuming, and haunting operatic romance."
    },
    {
      id: "tkt-05",
      name: "IMAX 70mm Premiere: Oppenheimer Re-Release (Directors Cut)",
      brand: "CINEMA Luxe",
      category: "tickets",
      subcategory: "Movies",
      price: 999,
      originalPrice: 1299,
      rating: 4.9,
      reviews: 730,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85",
      tag: "IMAX 70mm",
      city: "Mumbai",
      date: "This Friday • 9:00 PM",
      venue: "IMAX Laser Screen BKC",
      seatTiers: [
        { tier: "Recliner Gold Class Lounge", price: 1499 },
        { tier: "Center Sweet Spot Prime", price: 999 }
      ],
      description: "Experience Christopher Nolan's Oscar-winning masterpiece on authentic towering 70mm film stock with 18,000 watts of visceral digital sound."
    },
    {
      id: "tkt-06",
      name: "Michelin Star 8-Course Omakase Dining Experience",
      brand: "ATELIER Gourmet",
      category: "tickets",
      subcategory: "Experiences",
      price: 12999,
      originalPrice: 15999,
      rating: 5.0,
      reviews: 64,
      image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=900&q=85",
      tag: "Rare Table",
      city: "Bengaluru",
      date: "Sat, Oct 17 • 8:00 PM",
      venue: "Shinzo Private Counter (Only 10 Seats)",
      seatTiers: [
        { tier: "Omakase + Rare Sake Pairing", price: 18999 },
        { tier: "8-Course Chef Counter Experience", price: 12999 }
      ],
      description: "Seafood flown in same-day from Toyosu Market, Tokyo. Chef Hiroshi carves otoro, uni, and A5 Wagyu directly in front of an intimate 10-guest counter."
    },
    {
      id: "tkt-07",
      name: "Premier League Derby: Arsenal vs Manchester City (VIP Box)",
      brand: "GLOBAL Sports",
      category: "tickets",
      subcategory: "Sports",
      price: 45000,
      originalPrice: 52000,
      rating: 5.0,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85",
      tag: "Premier League",
      city: "London",
      date: "Dec 18, 2026 • 4:30 PM GMT",
      venue: "Emirates Stadium, London UK",
      seatTiers: [
        { tier: "Executive Box + 3-Course Dining", price: 75000 },
        { tier: "Club Level Midfield Center", price: 45000 }
      ],
      description: "Title-deciding showdown between two football titans. Includes pre-match stadium tour, matchday program, and complimentary bar access."
    },
    {
      id: "tkt-08",
      name: "Tuscan Wine Masterclass & Cellar Sommelier Tasting",
      brand: "TERRA Vintners",
      category: "tickets",
      subcategory: "Workshops",
      price: 5499,
      originalPrice: 6999,
      rating: 4.8,
      reviews: 110,
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85",
      tag: "Sommelier Led",
      city: "Delhi NCR",
      date: "Sun, Nov 01 • 5:00 PM",
      venue: "Cellar Vault at The Imperial",
      seatTiers: [
        { tier: "Standard Tasting & Charcuterie", price: 5499 },
        { tier: "VIP Vintage Flight (Brunello 1998)", price: 8999 }
      ],
      description: "Master Sommelier guided flight through 6 vintage Super Tuscans, Chianti Classicos, and paired artisanal aged pecorino cheeses."
    },
    {
      id: "tkt-09",
      name: "TEDx Future of Neural Intelligence & Space Exploration",
      brand: "TEDx Global",
      category: "tickets",
      subcategory: "Events",
      price: 2999,
      originalPrice: 3899,
      rating: 4.9,
      reviews: 175,
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=85",
      tag: "Thought Leadership",
      city: "Hyderabad",
      date: "Nov 21, 2026 • 10:00 AM",
      venue: "HICC Convention Auditorium",
      seatTiers: [
        { tier: "VIP Delegate (Speaker Dinner Access)", price: 7999 },
        { tier: "Main Hall Pass", price: 2999 }
      ],
      description: "12 visionary speakers discussing autonomous agents, quantum computing, fusion reactors, and off-planet planetary human civilization."
    },
    {
      id: "tkt-10",
      name: "Cirque Électronique: Cyberpunk Aerial Acrobatics",
      brand: "CIRQUE Modern",
      category: "tickets",
      subcategory: "Theatre",
      price: 3899,
      originalPrice: 4999,
      rating: 4.9,
      reviews: 340,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=85",
      tag: "Spectacle",
      city: "Mumbai",
      date: "Every Weekend Oct-Dec",
      venue: "Dome Grand Arena, Worli",
      seatTiers: [
        { tier: "Ringside Action VIP", price: 6499 },
        { tier: "Tier 1 Central Elevation", price: 3899 }
      ],
      description: "Gravity-defying aerial silk acrobatics set inside a futuristic neon cyberpunk metropolis with live synthwave scoring and lasers."
    },
    {
      id: "tkt-11",
      name: "Specialty Coffee Roasting & Sensory Cupping Lab",
      brand: "BOTANICA Brews",
      category: "tickets",
      subcategory: "Workshops",
      price: 2199,
      originalPrice: 2899,
      rating: 4.8,
      reviews: 130,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",
      tag: "Coffee Aficionado",
      city: "Bengaluru",
      date: "Saturday • 11:00 AM",
      venue: "NEXORA Roastery Lab, Indiranagar",
      seatTiers: [
        { tier: "Workshop + Take-Home 250g Geisha Beans", price: 2199 }
      ],
      description: "Learn green bean origin sorting, drum roasting profiles, and professional cupping spoons protocol to identify acidity, body, and tasting notes."
    },
    {
      id: "tkt-12",
      name: "Himalayan Stargazing & Astrophotography Camp",
      brand: "EXPEDITION Pro",
      category: "tickets",
      subcategory: "Experiences",
      price: 14999,
      originalPrice: 18999,
      rating: 5.0,
      reviews: 88,
      image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=900&q=85",
      tag: "Dark Sky Reserve",
      city: "Hanle, Ladakh",
      date: "New Moon Weekend, Oct 2026",
      venue: "Hanle Dark Sky Reserve, 4500m",
      seatTiers: [
        { tier: "All-Inclusive Luxury Glamping & Telescopes", price: 14999 }
      ],
      description: "Bortle Class 1 night skies with zero light pollution. Professional tracking telescopes reveal Saturn’s rings, the Andromeda Galaxy, and the Milky Way arch."
    }
  ]
};

export default ticketsCategory;
