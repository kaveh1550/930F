import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [paymentToken, setPaymentToken] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null); // برای ذخیره‌سازی وضعیت پرداخت
  const [error, setError] = useState(null); // برای ذخیره‌سازی خطاها

  // فرض کنید توکن JWT از جایی مثل لاگین یا ذخیره‌سازی محلی گرفته می‌شود
  const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwI...';  // این باید با توکن واقعی جایگزین شود

  const handlePayment = (e) => {
    e.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

    const paymentData = {
      amount,
      payment_token: paymentToken,
    };

    // ارسال درخواست به سرور
    axios.post('http://localhost:8000/api/process_payment/', paymentData, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,  // ارسال توکن JWT در هدر
        'Content-Type': 'application/json',  // مشخص کردن نوع محتوا
      },
    })
    .then(response => {
      // موفقیت‌آمیز بودن پرداخت
      setPaymentStatus(response.data);  // ذخیره پاسخ سرور در وضعیت
      setError(null);  // پاک کردن هر خطای قبلی
      console.log('Payment successful:', response.data);
    })
    .catch(err => {
      // خطا در ارسال یا پردازش پرداخت
      setPaymentStatus(null);  // پاک کردن هر وضعیت قبلی
      setError('Error processing payment');  // نمایش پیام خطا
      console.error('Error processing payment:', err);
    });
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Payment Token:</label>
          <input
            type="text"
            placeholder="Enter payment token"
            value={paymentToken}
            onChange={(e) => setPaymentToken(e.target.value)}
            required
          />
        </div>
        <button type="submit">Process Payment</button>
      </form>

      {paymentStatus && <div>Payment Successful: {JSON.stringify(paymentStatus)}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Payment;
