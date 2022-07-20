import React from 'react';
import Header from './header';
import SlideBar from './slider';

export default function DefaultLayOut({ children }) {
    return (
        <div>
            <Header></Header>
            {children}
            <SlideBar />
        </div>
    );
}
