'use client';

export default function Navbar() {


  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-600">Goclands</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-green-600">Accueil</a>
            <a href="#chambres" className="text-gray-600 hover:text-green-600">Chambres</a>
            <a href="#communaute" className="text-gray-600 hover:text-green-600">Communauté</a>
            <a href="#contact" className="text-gray-600 hover:text-green-600">Contact</a>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
            >
              Discuter par chat
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}