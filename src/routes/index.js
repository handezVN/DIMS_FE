import Home from '../pages/home';
import Hotels from '../pages/hotels';
import Login from '../pages/login';
import Register from '../pages/register';
import HotelDetail from '../pages/hotelDetail';
import PaymentPage1 from '../pages/payment/Step1/index';
import PaymentPage2 from '../pages/payment/Step2/Payment_Step2';
import PaymentPage3 from '../pages/payment/Step3/Payment_Step3';
import Dashboard from '../pages/Manager/dashboard';
import Booking from '../pages/Manager/Booking';
import Rooms from '../pages/Manager/Rooms';
import dashboard from '../pages/dashboard';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/dashboard', component: dashboard },
    { path: '/hotels', component: Hotels },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/hotels/hoteldetail', component: HotelDetail },
];

const privateRoutes = [
    { path: '/payment/step1', component: PaymentPage1 },
    { path: '/payment/step2', component: PaymentPage2 },
    { path: '/payment/step3', component: PaymentPage3 },
];
const hostRoutes = [
    { path: '/manager/dashboard', component: Dashboard },
    { path: '/manager/booking', component: Booking },
    { path: '/manager/room', component: Rooms },
];
export { publicRoutes, privateRoutes, hostRoutes };
