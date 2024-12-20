// src/components/ConsultationList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConsultationList = () => {
  // استفاده از useState برای ذخیره داده‌ها
  const [consultations, setConsultations] = useState([]);  // ذخیره مشاوره‌ها
  const [loading, setLoading] = useState(true);  // وضعیت بارگذاری
  const [error, setError] = useState(null);  // ذخیره ارور در صورت بروز مشکل
  
  // برای فرم ارسال مشاوره جدید
  const [newConsultation, setNewConsultation] = useState({
    title: '',
    description: ''
  });

  // ارسال درخواست POST برای ایجاد مشاوره جدید
  const handleSubmit = (e) => {
    e.preventDefault();  // جلوگیری از بارگذاری مجدد صفحه
    // ارسال درخواست POST به API
    axios.post('http://localhost:8000/api/consultations/', newConsultation)
      .then(response => {
        setConsultations([...consultations, response.data]);  // اضافه کردن مشاوره جدید به لیست
        setNewConsultation({ title: '', description: '' });  // پاک کردن فرم پس از ارسال
      })
      .catch(err => {
        setError('Error submitting consultation');  // نمایش پیام خطا
      });
  };

  // ارسال درخواست GET برای دریافت مشاوره‌ها
  useEffect(() => {
    axios.get('http://localhost:8000/api/consultations/')
      .then(response => {
        setConsultations(response.data);  // ذخیره مشاوره‌ها
        setLoading(false);  // تغییر وضعیت بارگذاری به false
      })
      .catch(err => {
        setError('Error fetching consultations');  // نمایش پیام خطا
        setLoading(false);  // توقف وضعیت بارگذاری
      });
  }, []);  // [] به این معناست که این اثر فقط یکبار هنگام بارگذاری کامپوننت اجرا می‌شود

  // در صورتی که در حال بارگذاری هستید
  if (loading) {
    return <div>Loading...</div>;
  }

  // در صورت بروز خطا
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Consultations</h2>
      <ul>
        {/* نمایش لیست مشاوره‌ها */}
        {consultations.map(consultation => (
          <li key={consultation.id}>{consultation.title}</li>  // نمایش عنوان مشاوره‌ها
        ))}
      </ul>

      <h3>Add a New Consultation</h3>
      {/* فرم ارسال مشاوره جدید */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={newConsultation.title} 
            onChange={(e) => setNewConsultation({...newConsultation, title: e.target.value})}
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            value={newConsultation.description}
            onChange={(e) => setNewConsultation({...newConsultation, description: e.target.value})}
            required
          />
        </div>
        <button type="submit">Submit Consultation</button>
      </form>
    </div>
  );
};

export default ConsultationList;
