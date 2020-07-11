/* eslint-disable */
//import Stripe from 'stripe';
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51H3MswJeGfrmT98VqSB2O1mbsHScRIiG3dHGDx7azX8R196DKHcEHFeWgBQApXRu1OuhEHI7WqW364a8Z0BospFM00a2LOUxxP'
);

export const bookTour = async (tourId) => {
  try {
    //1) Get checout Session from API
    const session = await axios(`http://192.168.1.249:3000/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    //2) Create  checkout from + chanre credit card
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
