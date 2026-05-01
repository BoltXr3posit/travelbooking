import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const PaymentModal = ({ bookingData, token, closeModal, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsProcessing(true);
    showToast('Authorizing payment...', 'success');

    // 1. Ask Stripe to charge the card using the form data
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // This keeps the user on the page instead of redirecting
    });

    if (error) {
      // The card was declined, expired, or had insufficient funds
      showToast(error.message, 'error');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // 2. PAYMENT SUCCESSFUL! Now we save the booking to MongoDB.
      try {
        const response = await fetch('https://travelbooking-one.vercel.app/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            property: bookingData.propertyId,
            checkInDate: bookingData.checkInDate,
            checkOutDate: bookingData.checkOutDate,
            paymentId: paymentIntent.id // <-- We save the Stripe receipt!
          })
        });

        const data = await response.json();

        if (data.success) {
          showToast('Payment successful! VIP Reservation secured.', 'success');
          setTimeout(() => {
            navigate('/mybookings');
          }, 1500);
        } else {
          showToast('Payment succeeded, but booking failed to save.', 'error');
          setIsProcessing(false);
        }
      } catch (err) {
        console.error(err);
        showToast('Network error while saving reservation.', 'error');
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
        <button onClick={closeModal} className="absolute top-6 right-6 text-gray-400 hover:text-dark text-2xl leading-none">
          &times;
        </button>
        
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-light text-dark mb-2">Complete <span className="font-bold text-gold">Booking</span></h2>
          <p className="text-gray-500 uppercase tracking-widest text-xs">Total: <span className="font-bold text-dark text-sm">${totalPrice}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* This single component renders the entire secure credit card form! */}
          <PaymentElement className="mb-6" />
          
          <button 
            type="submit" 
            disabled={isProcessing || !stripe}
            className="w-full bg-dark text-white py-4 rounded-full font-bold uppercase tracking-[0.15em] text-sm hover:bg-gold transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : `Pay $${totalPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;