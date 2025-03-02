'use client';

import { Property } from '@/lib/property';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BookingModalProps {
    isOpen: boolean;
    closeModal: () => void;
    room: Property;
}

export function calculateNights(checkInDate: string, checkOutDate: string): number {
    // Return 0 if either date is empty
    if (!checkInDate || !checkOutDate) {
        return 0;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Validate dates
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
        return 0;
    }

    // Return 0 if check-out is before or equal to check-in
    if (checkOut <= checkIn) {
        return 0;
    }

    // Calculate the difference in days
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nightsCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return nightsCount;
}

export default function BookingModal({
    isOpen,
    closeModal,
    room
}: BookingModalProps) {
    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
    const [guestCount, setGuestCount] = useState<number>(1);
    const [customerEmail, setCustomerEmail] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [buttonText, setButtonText] = useState<string>('Sélectionnez des dates');

    useEffect(() => {
        if (isOpen) {
            setupDateInputs();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        updatePrice();
    }, [checkIn, checkOut]);

    const setupDateInputs = (): void => {
        // This function doesn't need to do anything in the React version
        // as the min/max is handled directly in the input elements
    };

    const updatePrice = (): void => {
        if (checkIn && checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);

            if (checkOutDate > checkInDate) {
                const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
                const total = nights * room.price;

                setTotalPrice(total);
                setButtonText(`Payer maintenant • ${total}€`);
            } else {
                setButtonText('Sélectionnez des dates');
            }
        } else {
            setButtonText('Sélectionnez des dates');
        }
    };

    const resetForm = (): void => {
        setCheckIn('');
        setCheckOut('');
        setGuestCount(1);
        setCustomerEmail('');
        setTotalPrice(0);
        setErrorMessage('');
        setButtonText('Sélectionnez des dates');
        setIsLoading(false);
    };

    const handleClose = (): void => {
        resetForm();
        closeModal();
    };

    const handleBooking = async (): Promise<void> => {
        if (!customerEmail) {
            setErrorMessage('Veuillez entrer votre adresse email.');
            return;
        }

        try {
            setIsLoading(true);
            setButtonText('Redirection vers Stripe...');
            setErrorMessage('');

            // Simulate redirect to Stripe Checkout
            setTimeout(async () => {
                // Create a link to a simulated Stripe Checkout page
                const apiUrl = `/api/checkout_sessions?priceId=${room.priceId}&qty=${calculateNights(checkIn, checkOut)}`;

                redirect(apiUrl);

                handleClose();
            }, 1500);

        } catch (error) {
            setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
            setIsLoading(false);
            setButtonText('Réserver maintenant');
            console.error(error)
        }
    };

    if (!isOpen) return null;

    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    const isButtonDisabled = !checkIn || !checkOut || new Date(checkOut) <= new Date(checkIn) || isLoading;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg max-w-md w-full mx-4 relative">
                {/* Modal Header */}
                <div className="p-4 border-b">
                    <h3 className="text-xl font-bold">Réserver - {room.title}</h3>
                    <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-4">
                    {/* Date Selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Dates de séjour
                        </label>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <input
                                    type="date"
                                    value={checkIn}
                                    min={today}
                                    max={maxDateStr}
                                    className="w-full p-2 border rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                    onChange={(e) => setCheckIn(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="date"
                                    value={checkOut}
                                    min={today}
                                    max={maxDateStr}
                                    className="w-full p-2 border rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                    onChange={(e) => setCheckOut(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Number of Guests */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre de voyageurs
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="4"
                            value={guestCount}
                            className="w-full p-2 border rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            onChange={(e) => setGuestCount(parseInt(e.target.value))}
                        />
                    </div>

                    {/* Customer Information */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Adresse e-mail
                        </label>
                        <input
                            type="email"
                            value={customerEmail}
                            placeholder="votrenom@example.com"
                            className="w-full p-2 border rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            onChange={(e) => setCustomerEmail(e.target.value)}
                        />
                    </div>

                    {/* Price Summary */}
                    {totalPrice > 0 && (
                        <div className="mb-4 p-4 bg-green-50 rounded-lg">
                            <h4 className="font-bold mb-2">Résumé du prix</h4>
                            <div className="flex justify-between items-center">
                                <span>Total</span>
                                <span className="text-xl font-bold">{totalPrice}€</span>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {errorMessage}
                        </div>
                    )}

                    {/* Book Button */}
                    <button
                        onClick={handleBooking}
                        disabled={isButtonDisabled}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}