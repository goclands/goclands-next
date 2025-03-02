'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PropertyCard from './components/PropertyCard';
import BookingModal from './components/BookingModal';
import { Property } from '@/lib/property';


export default function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Property>();

  const openModal = (property: Property): void => {
    setCurrentRoom(property);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const properties: Property[] = [
    {
      id: 1,
      title: 'La coloc',
      location: 'Puteaux',
      price: 42,
      image: '/img/kitchen-puteaux1.png',
      features: ['Chambre privée', 'Disponible maintenant'],
      priceId: 'price_1Qxu3lQSRUzpm4LWs5L9YCMv'
    },
    {
      id: 2,
      title: "L'appart",
      location: 'Puteaux',
      price: 120,
      image: '/img/bedroom-puteaux1.jpg',
      features: ['Appartement entier', 'Disponible maintenant'],
      priceId: 'todo'
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Trouvez le pied à terre idéal</h1>
          <p className="text-xl mb-8">Rejoignez notre communauté de voyageurs nomades</p>
        </div>
      </section>

      {/* Featured Spaces */}
      <section id="chambres" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Bienvenue à Goclands !</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                title={property.title}
                location={property.location}
                price={property.price}
                image={property.image}
                features={property.features}
                onBookNow={() => openModal(property)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="communaute" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Rejoignez notre communauté</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/api/placeholder/600/400"
                alt="Communauté"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Vivez la vie moderne</h3>
              <p className="text-gray-600 mb-6">
                Rejoignez notre communauté dynamique de professionnels, de créateurs et d&apos;entrepreneurs.
                Profitez d&apos;équipements modernes, d&apos;événements communautaires.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Connexion Fibre Très Haut Débit
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Événements communautaires hebdomadaires
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Chambres meublées
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Support disponible 24/7
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contactez-nous par email</h2>
          <div className="max-w-2xl mx-auto">
            <iframe
              title="Contact Form"
              src="https://plugins.crisp.chat/urn:crisp.im:contact-form:0/contact/a93eeb19-cb40-488f-a382-5dd894a68ca7"
              referrerPolicy="origin"
              sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
              width="100%"
              height="600px"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={modalOpen}
        closeModal={closeModal}
        room={currentRoom}
      />
    </>
  );
}