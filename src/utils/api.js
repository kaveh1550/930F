// src/utils/api.js
import axios from 'axios';

// ایجاد نمونه axios با تنظیمات پیش‌فرض
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // آدرس پایه API
  headers: {
    'Content-Type': 'application/json', // تنظیم نوع داده پیش‌فرض
  },
});

// افزودن توکن JWT به هر درخواست با استفاده از Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // دریافت توکن از LocalStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // افزودن توکن به هدر
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // مدیریت خطاهای مربوط به درخواست
  }
);

// مدیریت خطاهای پاسخ از سرور
api.interceptors.response.use(
  (response) => {
    return response; // اگر پاسخ موفقیت‌آمیز باشد
  },
  (error) => {
    console.error('API Error:', error.response || error.message);
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // کاربر احراز هویت نشده است
        alert('لطفاً وارد حساب کاربری خود شوید.');
        // ممکن است نیاز باشد کاربر را به صفحه ورود هدایت کنید
        window.location.href = '/login';
      } else if (status === 403) {
        // کاربر دسترسی لازم ندارد
        alert('شما اجازه دسترسی به این بخش را ندارید.');
      } else if (status === 500) {
        // خطای سرور
        alert('خطای سرور! لطفاً بعداً دوباره تلاش کنید.');
      }
    }
    return Promise.reject(error); // بازگرداندن خطا برای مدیریت در درخواست‌های خاص
  }
);

// تابع برای انجام پرداخت
export const processPayment = async (amount, currency) => {
  try {
    const response = await api.post('process_payment/', {
      amount: amount, // مبلغ پرداخت
      currency: currency, // واحد پول
    });
    return response.data; // برگرداندن داده‌های پاسخ سرور
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error; // پرتاب خطا برای مدیریت در کامپوننت‌ها
  }
};

// سایر توابع API (نمونه‌هایی از توابع مختلف)
export const getUserProfile = async () => {
  try {
    const response = await api.get('user/profile/');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('user/profile/', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const fetchAdvisors = async () => {
  try {
    const response = await api.get('advisors/');
    return response.data;
  } catch (error) {
    console.error('Error fetching advisors:', error);
    throw error;
  }
};

export default api;
