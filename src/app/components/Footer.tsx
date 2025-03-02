import React from 'react';

export default function Footer(){
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-green-500 mb-4">Goclands</h3>
            <p className="text-gray-400">Trouvez le pied à terre idéal</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Accès rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Accueil</a>
              </li>
              <li>
                <a href="#chambres" className="text-gray-400 hover:text-white">Chambres</a>
              </li>
              <li>
                <a href="#communaute" className="text-gray-400 hover:text-white">Communauté</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Localités</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Aix en Provence</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Paris La Défense</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Paris Montparnasse</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}