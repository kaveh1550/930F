import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [cryptoWallet, setCryptoWallet] = useState("");
  const [email, setEmail] = useState("");

  const handlePayment = async () => {
    try {
      // پرداخت با USDT (Tether)
      const { data: cryptoData } = await axios.post(
        "http://localhost:8000/api/payment_usdt/",
        { amount, wallet_address: cryptoWallet }
      );

      if (cryptoData.payment_url) {
        window.location.href = cryptoData.payment_url;
      }

      // پرداخت ایرانی با Zarinpal
      const { data: iranianPayment } = await axios.post(
        "http://localhost:8000/api/process_payment/",
        {
          amount,
          email,
        }
      );

      if (iranianPayment.payment_url) {
        window.location.href = iranianPayment.payment_url;
      }
    } catch (err) {
      console.log("Payment Error: ", err.message);
    }
  };

  return (
    <div>
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Crypto Wallet Address"
        value={cryptoWallet}
        onChange={(e) => setCryptoWallet(e.target.value)}
      />
      <input
        placeholder="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handlePayment}>Proceed with Payment</button>
    </div>
  );
};

export default Payment;
