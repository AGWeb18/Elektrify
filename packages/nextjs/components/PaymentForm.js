import { useState } from "react";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ amount, currency, stripeAccountId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        paymentMethodType: "card",
        stripeAccountId,
      }),
    });

    const data = await response.json();

    const { error } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      alert("Payment successful!");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={loading || !stripe || !elements} className="btn btn-primary">
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

const PaymentPage = ({ amount, currency, stripeAccountId }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={amount} currency={currency} stripeAccountId={stripeAccountId} />
    </Elements>
  );
};

export default PaymentPage;
