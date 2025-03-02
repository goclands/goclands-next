'use client';

interface PropertyCardProps {
    title: string;
    location: string;
    price: number;
    image: string;
    features: string[];
    onBookNow: () => void;
}

export default function PropertyCard({
    title,
    location,
    price,
    image,
    features,
    onBookNow
}: PropertyCardProps) {
    return (
        <div className="booking-card bg-white rounded-xl overflow-hidden custom-shadow">
            <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{location}</p>
                <div className="flex items-center mb-4">
                    <span className="text-green-600 font-bold text-xl">{price}€</span>
                    <span className="text-gray-500 ml-2">/nuit</span>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    {features.map((feature, index) => (
                        <span
                            key={index}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                        >
                            {feature}
                        </span>
                    ))}
                </div>
                <button
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    onClick={onBookNow}
                >
                    Réserver tout de suite
                </button>
            </div>
        </div>
    );
}