import React from 'react';
import Header from './header';
import SlideBar from './slider';
import { useSelector } from 'react-redux';
import Spinner from '../../loading/Spinner';
export default function DefaultLayOut({ children }) {
    const hostReducer = useSelector((state) => state.hostReducer);
    return (
        <div>
            <Header></Header>
            <div
                style={{
                    paddingTop: 60,
                    paddingLeft: 235,
                }}
            >
                {children}
                {hostReducer.loading && <Spinner></Spinner>}
            </div>
            <SlideBar />
        </div>
    );
}
