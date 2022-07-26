import axios from 'axios';
// const url = 'http://mydims.hopto.org/';
export const LoginUser = async ({ email, password }) => {
    const res = await axios.post(`/api/Auth/login-user`, { email, password });
    return res.data;
};
export const RegisterUser = async ({ email, password, cfPassword }) => {
    const res = await axios.post(`/api/Auth/register`, { email, password, confirmPassword: cfPassword });
    return res.data;
};
export const GetUser = async (token) => {
    const res = await axios.get('api/UserManage/self-info', { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
};
export const ActiveUser = async ({ token, code }) => {
    const res = await axios.get(`api/UserManage/Active-Account`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
            AcitveCode: code,
        },
    });
    return res.data;
};

export const GetDashBoard = async (token) => {
    const res = await axios.get('api/UserBookingManage/user-Booking-list', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
