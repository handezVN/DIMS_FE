import React from 'react';
import HeaderTop from './HeaderTop';
import HeaderNavBar from './HeaderNavBar';
import Footer from './Footer';
export default function DefaultLayout({ children }) {
    return (
        <div>
            <HeaderTop />
            <HeaderNavBar />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}
