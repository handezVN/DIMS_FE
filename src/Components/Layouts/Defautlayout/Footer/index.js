import React from 'react';
import './index.css';
export default function Footer() {
    return (
        <div>
            {/* Remove the container if you want to extend the Footer to full width. */}
            <div className="container my-5">
                {/* Footer */}
                <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#fff' }}>
                    {/* Grid container */}
                    <div className="container p-4 pb-0">
                        {/* Section: Links */}
                        <section>
                            {/*Grid row*/}
                            <div className="row">
                                {/* Grid column */}
                                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">DIMS Project</h6>
                                    <p>
                                        Design and implement a management system for a chain of hotels and motels using
                                        IoT technology
                                    </p>
                                </div>
                                {/* Grid column */}
                                <hr className="w-100 clearfix d-md-none" />
                                {/* Grid column */}
                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                                    <p>
                                        <a className="text" href="https://www.facebook.com/TA.Handez/">
                                            Ant Design
                                        </a>
                                    </p>
                                    <p>
                                        <a className="text" href="https://www.facebook.com/TA.Handez/">
                                            React
                                        </a>
                                    </p>
                                    <p>
                                        <a className="text" href="https://www.facebook.com/TA.Handez/">
                                            Redux
                                        </a>
                                    </p>
                                    <p>
                                        <a className="text" href="https://www.facebook.com/TA.Handez/">
                                            Bootstrap
                                        </a>
                                    </p>
                                </div>
                                {/* Grid column */}
                                <hr className="w-100 clearfix d-md-none" />
                                {/* Grid column */}
                                <hr className="w-100 clearfix d-md-none" />
                                {/* Grid column */}
                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                                    <p>
                                        <i className="fas fa-home mr-3" /> FPT University , HCM City
                                    </p>
                                    <p>
                                        <i className="fas fa-envelope mr-3" /> dimsmainsystem@gmail.com
                                    </p>
                                    <p>
                                        <i className="fas fa-phone mr-3" /> + 84 79 799 1707
                                    </p>
                                    <p>
                                        <i className="fas fa-print mr-3" /> + 84 79 799 1707
                                    </p>
                                </div>
                                {/* Grid column */}
                                {/* Grid column */}
                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

                                    {/* Github */}
                                    <a
                                        className="btn btn-primary btn-floating m-1"
                                        style={{ backgroundColor: '#333333' }}
                                        href="https://github.com/handezVN/DIMS_FE"
                                        role="button"
                                    >
                                        <i className="fab fa-github" />
                                    </a>
                                </div>
                            </div>
                            {/*Grid row*/}
                        </section>
                        {/* Section: Links */}
                    </div>
                    {/* Grid container */}
                    {/* Copyright */}
                    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        © 2020 Copyright:
                        <a className="text-white" href="https://mdbootstrap.com/">
                            MDBootstrap.com
                        </a>
                    </div>
                    {/* Copyright */}
                </footer>
                {/* Footer */}
            </div>
            {/* End of .container */}
        </div>
    );
}
