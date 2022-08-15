import axios from 'axios';
// const url = 'http://mydims.hopto.org/';
export const LoginUser = async ({ email, password }) => {
    const res = await axios.post(`/api/Auth/login-user`, { email, password });
    return res.data;
};
export const LoginHost = async ({ email, password }) => {
    const res = await axios.post(`/api/Auth/login-Host`, { email, password });
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

export const Forgot_Password = async (email) => {
    const res = await axios.post(`api/Auth/forgot-code-mail`, {
        email: email,
    });
    return res.data;
};

export const ChangeForGot_Password = async (email, password, confirmPassword, unlockKey) => {
    const res = await axios.post(`api/Auth/forgot-pass-change`, {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        unlockKey: unlockKey,
    });
    return res.data;
};

export const ReNewQrCode = async (token, bookingId, bookingDetailId) => {
    const res = await axios.put(
        `https://dims-system.herokuapp.com/api/UserQr/User-get-new-Qr-room?bookingID=${bookingId}&bookingdetailID=${bookingDetailId}`,
        '',
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};
