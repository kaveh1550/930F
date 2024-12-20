// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // استفاده از useNavigate به جای useHistory
import { apiRequest } from '../api/apiRequest';  // وارد کردن تابع apiRequest از apiRequest.js

const Login = () => {
  const navigate = useNavigate(); // استفاده از useNavigate
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // برای نمایش پیام خطا

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // فراخوانی تابع apiRequest برای دریافت توکن
      const token = await apiRequest(username, password);

      if (token) {
        // ذخیره توکن در localStorage
        localStorage.setItem('access_token', token);
        console.log('Access Token:', token);

        // هدایت به صفحه داشبورد پس از ورود
        navigate('/dashboard');
      } else {
        setError('ورود ناموفق: لطفاً نام کاربری و رمز عبور صحیح وارد کنید.');
      }
    } catch (error) {
      setError('خطا در برقراری ارتباط با سرور');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">ورود</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* نمایش پیام خطا */}
    </div>
  );
};

export default Login;
