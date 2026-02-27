const estimatesData = [
  {
    id: '1',
    title: 'Full Bathroom Tiling',
    category: 'Masonry',
    laborCost: 45000,
    materialCost: 80000,
    duration: '4 Days',
    description:
      'Complete removal of old tiles and installation of new ceramic tiles for a standard bathroom.',
    image:
      'https://images.unsplash.com/photo-1722650270197-3f0369d77206?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    title: 'Kitchen Cabinet Installation',
    category: 'Interior',
    laborCost: 60000,
    materialCost: 150000,
    duration: '3 Days',
    description:
      'Installation of pre-fabricated kitchen cabinets and drawers.',
    image:
      'https://plus.unsplash.com/premium_photo-1661292184470-5ae807de40f5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    title: 'House Rewiring (3-Bedroom)',
    category: 'Electrical',
    laborCost: 120000,
    materialCost: 200000,
    duration: '7 Days',
    description:
      'Complete replacement of old wiring with modern fire-resistant cables.',
    image:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    title: 'Exterior Painting',
    category: 'Painting',
    laborCost: 35000,
    materialCost: 55000,
    duration: '5 Days',
    description:
      'Scraping, priming, and 2-coat painting of exterior bungalow walls.',
    image:
      'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5',
    title: 'Septic Tank Construction',
    category: 'Plumbing',
    laborCost: 150000,
    materialCost: 250000,
    duration: '10 Days',
    description:
      'Digging and structural building of a standard residential septic system.',
    image:
      'https://i.ytimg.com/vi/6b-n7BKnCV0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDOpbSKcy3SSfAxugegiQLis-eLdQ',
  },
  {
    id: '6',
    title: 'Deep House Cleaning',
    category: 'Cleaning',
    laborCost: 25000,
    materialCost: 15000,
    duration: '1 Day',
    description:
      'Comprehensive sanitization of all rooms, including windows and hard-to-reach areas.',
    image:
      'https://images.unsplash.com/photo-1581578949510-fa7315c4c350?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '7',
    title: 'Full Property Fumigation',
    category: 'Pest Control',
    laborCost: 20000,
    materialCost: 30000,
    duration: '1 Day',
    description:
      'Professional chemical treatment to eliminate crawling and flying insects.',
    image:
      'https://images.unsplash.com/photo-1687267842395-4728cff5fcd5?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '8',
    title: 'Lawn Re-Sodding',
    category: 'Landscaping',
    laborCost: 40000,
    materialCost: 60000,
    duration: '3 Days',
    description:
      'Removal of dead grass and installation of fresh carpet grass for a 50sqm area.',
    image:
       'https://images.unsplash.com/photo-1650316305075-cff140a81af5?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  
  },
  {
    id: '9',
    title: 'AC Gas Refilling & Service',
    category: 'Mechanical',
    laborCost: 10000,
    materialCost: 15000,
    duration: '3 Hours',
    description:
      'Full unit servicing and R22/R410 gas top-up for optimal cooling.',
    image:
      'https://media.istockphoto.com/id/1424616151/photo/pink-tank-for-refilling-freon-next-to-the-air-conditioning-system.jpg?s=612x612&w=0&k=20&c=t295A0vHPHYlnB8Za9vhcOQ90i12Z1uNas794F-sEEE=',
  },
  {
    id: '10',
    title: 'Solar Inverter Setup (3.5kVA)',
    category: 'Power',
    laborCost: 80000,
    materialCost: 650000,
    duration: '2 Days',
    description:
      'Installation of hybrid inverter, 4 batteries, and solar panel mounting.',
    image:
      'https://media.istockphoto.com/id/1262563297/photo/alternative-energy-ecological-concept.jpg?s=612x612&w=0&k=20&c=GIBv8x-DVZBg-f-hyyvbtxTbzVl5LF9bI21bLWZ6DWA=',
  },
  {
    id: '11',
    title: 'POP Ceiling Design',
    category: 'Interior',
    laborCost: 90000,
    materialCost: 110000,
    duration: '5 Days',
    description:
      'Crafting and installation of decorative POP ceilings with hidden light slots.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '12',
    title: 'CCTV Camera Installation',
    category: 'Security',
    laborCost: 35000,
    materialCost: 140000,
    duration: '1 Day',
    description:
      'Configuration of 4-channel IP cameras with remote mobile viewing.',
    image:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '13',
    title: 'Swimming Pool Treatment',
    category: 'Maintenance',
    laborCost: 15000,
    materialCost: 25000,
    duration: '5 Hours',
    description:
      'Chemical shock treatment and vacuuming to restore water clarity.',
    image:
      'https://images.unsplash.com/photo-1558905619-17153ad2739b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '14',
    title: 'Roof Leak Repair',
    category: 'Roofing',
    laborCost: 50000,
    materialCost: 30000,
    duration: '2 Days',
    description:
      'Identification of leaks and sealing with high-grade bituminous membrane.',
    image:
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '15',
    title: 'Post-Construction Cleaning',
    category: 'Cleaning',
    laborCost: 70000,
    materialCost: 20000,
    duration: '2 Days',
    description:
      'Intensive cleaning to remove cement stains and dust from a new building.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '16',
    title: 'Interlocking Stones (Driveway)',
    category: 'Masonry',
    laborCost: 100000,
    materialCost: 350000,
    duration: '6 Days',
    description:
      'Leveling and laying of 30sqm interlocking stones with sand filling.',
    image:
      'https://plus.unsplash.com/premium_photo-1661286705410-edb4c9bde72a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '17',
    title: 'Wall Wallpaper Installation',
    category: 'Interior',
    laborCost: 15000,
    materialCost: 45000,
    duration: '1 Day',
    description:
      'Professional pasting of 3D wallpapers for a standard master bedroom.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '18',
    title: 'Borehole Pump Replacement',
    category: 'Plumbing',
    laborCost: 20000,
    materialCost: 110000,
    duration: '4 Hours',
    description:
      'Extraction of faulty submersible pump and installation of a new 1.5HP unit.',
    image:
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '19',
    title: 'Anti-Termite Soil Treatment',
    category: 'Pest Control',
    laborCost: 45000,
    materialCost: 55000,
    duration: '2 Days',
    description:
      'Pre-construction chemical soil poisoning to prevent future infestations.',
    image:
      'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '20',
    title: 'Automatic Gate Installation',
    category: 'Security',
    laborCost: 60000,
    materialCost: 280000,
    duration: '3 Days',
    description:
      'Motorizing an existing swing or sliding gate with remote access.',
    image:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
  },
];

export default estimatesData;
