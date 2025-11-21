import React, { useState } from 'react';

interface PaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
  onFailure: (error: string) => void;
}

const PaymentGateway: React.FC<PaymentProps> = ({ amount, onSuccess, onFailure }) => {
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handlePayment = async () => {
    setPaymentProcessing(true);
    try {
      // Simulate payment processing (replace with real API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      const transactionId = Math.random().toString(36).substring(7);
      onSuccess(transactionId);
    } catch (error: any) {
      onFailure(error.message || 'Payment failed');
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <div>
      <p>Amount: ${amount}</p>
      <button onClick={handlePayment} disabled={paymentProcessing}>
        {paymentProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default PaymentGateway;