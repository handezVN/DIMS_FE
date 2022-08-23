import { useElements, useStripe, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import Switch from 'antd/lib/switch';
import * as payment from '../../../../api/paymentApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { dispatchFailed, dispatchFecth, dispatchSuccess } from '../../../../redux/actions/authAction';
export default function PaymentForm() {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const cx = classNames.bind(styles);
    const [show, setShow] = useState(false);
    const [inputCoupon, setInputCoupon] = useState('');
    const [rate, setRate] = useState('23400');
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const handleSubmit = async (e) => {
        const auth = JSON.parse(localStorage.getItem('user'));
        const booking = JSON.parse(localStorage.getItem('booking'));
        const bookinginfo = JSON.parse(localStorage.getItem('booking-info'));
        e.preventDefault();
        dispatch(dispatchFecth());
        // console.log(auth.token);
        await stripe
            .createToken(elements.getElement(CardNumberElement))
            .then(async (token) => {
                if (token.error === undefined) {
                    await axios.get('https://api.exchangerate-api.com/v4/latest/USD').then((result) => {
                        payment
                            .finalPayment({
                                token: token.token.id,
                                hotelId: booking.hotelId,
                                fullName: bookinginfo.name,
                                email: bookinginfo.email,
                                phoneNumber: bookinginfo.number,
                                arrivalDate: booking.date,
                                totalNight: booking.night,
                                peopleQuanity: booking.quantity,
                                description: bookinginfo.specicalSuggest,
                                voucherId: '',
                                currencyRate: result.data.rates.VND,
                                roomsId: booking.roomId,
                                tokenid: auth.token,
                            })
                            .then((result) => {
                                dispatch(dispatchSuccess());
                                navigator('/payment/step3');
                                localStorage.removeItem('add_booking_cart');
                            })
                            .catch((err) => {
                                navigator('/expired');
                                localStorage.removeItem('add_booking_cart');
                                dispatch(dispatchFailed());
                            });
                    });
                } else {
                    alert(token.error.message);
                    dispatch(dispatchFailed());
                }
            })
            .catch((err) => {
                dispatch(dispatchSuccess());
                alert('Your Card is inCorrect !');
            });
    };

    return (
        <>
            {!success ? (
                <div>
                    <div className={cx('Credit-title')}>
                        <div>Thẻ thanh toán</div>
                        <div className={cx('Credit-title-img')}>
                            <img
                                src="https://ik.imagekit.io/tvlk/image/imageResource/2017/01/17/1484655630637-0dcca3761eb5910f1835f438f153bfae.png?tr=h-24,q-75"
                                alt="1"
                            ></img>
                            <img
                                src="https://ik.imagekit.io/tvlk/image/imageResource/2017/01/06/1483707776912-1abb188266f6d5b3f2e27f4733ca32e9.png?tr=h-24,q-75"
                                alt="2"
                            ></img>
                            <img
                                src="https://ik.imagekit.io/tvlk/image/imageResource/2017/01/06/1483707787206-abc175b224ab92a6967e24bc17c30f45.png?tr=h-24,q-75"
                                alt="3"
                            ></img>
                            <img
                                src="https://ik.imagekit.io/tvlk/image/imageResource/2017/07/10/1499673365437-1e1522e5cc323e7e8a7b57b90e81dbc9.png?tr=h-24,q-75"
                                alt="4"
                            ></img>
                        </div>
                    </div>

                    <fieldset className="FormGroup">
                        <div className={cx('FormInput')}>
                            Số thẻ tín dụng
                            <CardNumberElement
                                className={cx('Credit-number')}
                                options={{ placeholder: 'Số thẻ tín dụng' }}
                            ></CardNumberElement>
                            <div className={cx('Credit-content')}>
                                <div className={cx('Credit-exp')}>
                                    Expiration date
                                    <CardExpiryElement className={cx('Credit-number')}></CardExpiryElement>
                                </div>
                                <div className={cx('Credit-cvc')}>
                                    CVC
                                    <CardCvcElement className={cx('Credit-number')}></CardCvcElement>
                                </div>
                            </div>
                            Tên chủ thẻ
                            <div>
                                <input className={cx('Credit-name')} placeholder="Tên chủ thẻ"></input>
                            </div>
                            <div className={cx('banking-coupon')}>
                                <Switch checked={show} onChange={() => setShow(!show)} /> Thêm mã Coupon
                            </div>
                            <div className={cx('banking-usecoupon', show ? '' : 'hidden')}>
                                <input
                                    className={cx('banking-coupon-input')}
                                    placeholder="EXAMPLE : CHEAPTRAVEL"
                                    onChange={(e) => setInputCoupon(e.target.value)}
                                ></input>
                                <button
                                    className={cx(
                                        'banking-coupon-input-btn',
                                        inputCoupon.length > 0 ? 'active' : 'disable',
                                    )}
                                >
                                    Use Coupon
                                </button>
                            </div>
                        </div>
                    </fieldset>
                    <div className={cx('banking-payment')}>
                        <button onClick={handleSubmit}>Thanh Toán</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
                </div>
            )}
        </>
    );
}
