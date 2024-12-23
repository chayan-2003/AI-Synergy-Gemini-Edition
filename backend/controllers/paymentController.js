import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QYQkcAQysK3G8ZyR494nyGheMDpnpDmiQweR2ZIxRq6pAX5wWzbEIspO4QO9w0xL1J8C7eCsFDzOh1hdhYjYzPU00WCYgWmAm'); // Use your secret key

export const createPaymentIntent = async (req, res) => {
  // Extract 'amount' and 'plan' from the request body
  const { amount, plan } = req.body;

  try {
    // Validate request parameters
    if (!amount || !plan) {
      return res.status(400).json({ error: 'Missing required parameters: amount or plan.' });
    }

    // Create the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });

    // Update user credits based on plan
    if (plan === 'basic') {
      req.user.credits = 20;
    } else if (plan === 'pro') {
      req.user.credits = 100;
    } else {
      req.user.credits = 200;
    }

    await req.user.save();

    // Return the client secret
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default createPaymentIntent;