import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './Components/Layouts';
import { publicRoutes, privateRoutes, hostRoutes } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchGetUser, dispatchReLoad } from './redux/actions/authAction';
import Spinner from './Components/loading/Spinner';
import DefaultLayOut from './Components/Layouts/Manager/index.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as authAPI from '../src/api/authApi';
import Verify from './Components/utils/verifyEmail';
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(dispatchReLoad());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const loading = useSelector((state) => state.loadingReducer.loading);
    const user = useSelector((state) => state.auth.user);
    const auth = useSelector((state) => state.auth);

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (auth.isLogged) {
            const token = user.token;
            authAPI
                .GetUser(token)
                .then((data) => {
                    if (data.role === 'HOST') {
                        dispatch(dispatchGetUser({ isHost: true }));
                    } else if (data.role === 'USER') {
                        dispatch(dispatchGetUser({ isUser: true }));
                    } else {
                        setShow(true);
                        setEmail(data.email);
                    }
                })
                .catch((err) => {});
        }
    }, [user, auth.isLogged, dispatch]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {hostRoutes.map((route, index) => {
                        const Layout = DefaultLayOut;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout || DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                        {show && <Verify isUser={show} email={email}></Verify>}
                                        {loading && <Spinner />}
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />}></Route>;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
