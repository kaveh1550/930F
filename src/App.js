import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // استفاده از Routes به جای Switch
import axios from "axios";
import Login from "./components/Login"; // اطمینان حاصل کنید که نام صحیح فایل وارد شده باشد
import AdvisorDashboard from "./components/Dashboard/AdvisorDashboard"; // وارد کردن AdvisorDashboard
import ClientDashboard from "./components/Dashboard/ClientDashboard"; // وارد کردن ClientDashboard

// ایجاد کامپوننت Dashboard برای نمایش داده‌ها
const Dashboard = ({ message }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{message}</pre>
    </div>
  );
};

function App() {
  const [message, setMessage] = useState("");

  // ارتباط با سرور و دریافت داده‌ها
  const getConsultationData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/consultations/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}` // از توکن برای احراز هویت استفاده می‌کنیم
        }
      });
      setMessage(JSON.stringify(response.data, null, 2));  // داده‌ها را در state ذخیره می‌کنیم
    } catch (error) {
      console.error("Error fetching consultation data:", error);
    }
  };

  // اجرای درخواست در ابتدا
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      getConsultationData();
    }
  }, []); // این useEffect تنها زمانی اجرا می‌شود که access_token وجود داشته باشد

  return (
    <Router>
      <Routes>
        {/* صفحه ورود */}
        <Route path="/login" element={<Login />} />
        
        {/* داشبورد مشاور */}
        <Route path="/advisor-dashboard" element={<AdvisorDashboard />} />
        
        {/* داشبورد مشتری */}
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        
        {/* داشبورد عمومی */}
        <Route path="/dashboard" element={<Dashboard message={message} />} />
        
        {/* سایر مسیرها */}
      </Routes>
    </Router>
  );
}

export default App;
