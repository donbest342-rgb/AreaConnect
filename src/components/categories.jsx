import React from 'react'
import { motion } from 'framer-motion';

const categories = () => {

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};
  
const categories = [
    {
        id: 1,
        name: 'Plumbing',
        description: 'Find skilled plumbers for all your plumbing needs, from repairs to installations.',
        // image: 'https://images.unsplash.com/photo-1581093588401-9c8b1a7e5c8e?auto=format&fit=crop&w=800&q=60'
        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        name: 'Electrical',
        description: 'Connect with licensed electricians for safe and reliable electrical work.',
        // image: 'https://images.unsplash.com/photo-1581093588401-9c8b1a7e5c8e?auto=format&fit=crop&w=800&q=60'
        image: "https://plus.unsplash.com/premium_photo-1661911021547-b0188f22d548?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        name: 'Cleaning',  
        description: 'Hire professional cleaners for your home or office cleaning needs.',
        // image: 'https://images.unsplash.com/photo-1581093588401-9c8b1a7e5c8e?auto=format&fit=crop&w=800&q=60'
        image: "https://plus.unsplash.com/premium_photo-1663011218145-c1d0c3ba3542?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 4,
        name: 'Landscaping',
        description: 'Find experienced landscapers to maintain and beautify your outdoor spaces.',
        image: "https://images.unsplash.com/photo-1734079692079-aae7e24a7035?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 5,
        name: 'Appliance Repair',
        description: 'Get your appliances fixed by trusted repair professionals.',
        image: "https://images.unsplash.com/photo-1562941995-17dc31eaaf6d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 6,
        name: 'Carpentry',
        description: 'Hire skilled carpenters for custom furniture, repairs, and woodworking projects.',
        image: 'https://plus.unsplash.com/premium_photo-1664300494539-313eac2a6095?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 7,
        name: 'Painting',
        description: 'Find professional painters for interior and exterior painting jobs.',
        image: 'https://plus.unsplash.com/premium_photo-1661963369563-1e00af9d8b35?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 8,
        name: 'HVAC',
        description: 'Connect with HVAC technicians for heating, ventilation, and air conditioning services.',
        image: 'https://plus.unsplash.com/premium_photo-1683134512538-7b390d0adc9e?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
]




  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '40px 0' }}>Explore Service Categories</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
        {categories.map((cat) => (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div key={cat.name} style={{ width: '250px', textAlign: 'center' }}>
            <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
            <h3>{cat.name}</h3>
            <p>{cat.description}</p>
          </div>
          </motion.div>
        ))}
    </div>
    </div>
  )
}

export default categories
