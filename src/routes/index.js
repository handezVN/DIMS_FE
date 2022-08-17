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
import dashboard from '../pages/dashboard';
import DetailHotels from '../pages/Manager/Hotels/HotelDetail';
import HotelSelection from '../pages/Manager/Setting/SelectHotel';
import PageNotExits from '../pages/PageNotExits';
import DataLog from '../pages/Manager/DataLog';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '*', component: PageNotExits },
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
    { path: '/manager/setting/hotelselection', component: HotelSelection },
    { path: '/manager/booking', component: Booking },
    { path: '/manager/datalog', component: DataLog },
    { path: '/mananger/hotels/detailHotels', component: DetailHotels },
];
export { publicRoutes, privateRoutes, hostRoutes };
