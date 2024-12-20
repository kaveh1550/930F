// src/api/apiRequest.js
import axios from 'axios';

// تابع برای ارسال درخواست login و دریافت توکن
const apiRequest = async (username, password) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
            username,
            password
        });
        // برگرداندن توکن برای استفاده در فایل‌های دیگر
        return response.data.access;
    } catch (error) {
        console.error('Login failed:', error);
        return null;
    }
};

// تابع برای ارسال درخواست‌های محافظت‌شده با استفاده از توکن
const fetchData = async () => {
    const token = localStorage.getItem('access_token');  // دریافت توکن از localStorage
    if (!token) {
        console.log('No access token found');
        return;
    }

    try {
        // ارسال درخواست به یک endpoint محافظت‌شده با هدر Authorization
        const response = await axios.get('http://127.0.0.1:8000/api/protected-endpoint/', {
            headers: {
                Authorization: `Bearer ${token}`  // ارسال توکن در هدر
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching protected data:', error);
    }
};

export { apiRequest, fetchData };
