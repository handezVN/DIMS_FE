import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY =
    'pk_test_51L3ChpLzh0AVZuaod54NuEaXvjgKuZ7p0O0ZxNBeHGj9k3StzJxRLzSp49oA4i9sF4SzFrua9KbGyi8swnW1vad7005jOoIKwi';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function CreditCard() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    );
}
