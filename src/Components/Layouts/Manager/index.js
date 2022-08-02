import React, { useEffect, useState } from 'react';
import Header from './header';
import SlideBar from './slider';
import { useSelector } from 'react-redux';
import Spinner from '../../loading/Spinner';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
export default function DefaultLayOut({ children }) {
    const cx = classNames.bind(styles);
    const hostReducer = useSelector((state) => state.hostReducer);
    const auth = useSelector((state) => state.auth.isLogged);
    const [slidebar, setSlideBar] = useState(false);
    const navigation = useNavigate();
    useEffect(() => {
        if (!auth) {
            navigation('/login');
        }
    }, [auth]);
    return auth ? (
        <div>
            <Header slidebar={slidebar} setSlideBar={setSlideBar}></Header>
            <div className={cx('container')}>
                {children}
                {hostReducer.loading && <Spinner></Spinner>}
            </div>
            <SlideBar SlideBar={slidebar} />
        </div>
    ) : (
        <div></div>
    );
}
