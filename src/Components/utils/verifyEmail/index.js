import React, { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import * as authAPI from '../../../api/authApi';
import { Alert } from 'react-bootstrap';
import { message } from 'antd';
export default function Verify({ isUser, email }) {
    const cx = classNames.bind(styles);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    useEffect(() => {
        setShow(isUser);
    }, [isUser]);
    const [input, setInput] = useState('');
    const [token, setToken] = useState('');
    const [errorAlert, setErrorAlert] = useState(false);
    useEffect(() => {
        const foundUser = localStorage.getItem('user');
        if (foundUser) {
            const user = JSON.parse(foundUser);
            setToken(user.token);
        }
    }, []);
    const success = () => {
        message.success('This is a success message');
    };
    const handleSubmit = () => {
        authAPI
            .ActiveUser({ token, code: input })
            .then((result) => {
                handleClose();
                success();
            })
            .catch((err) => {
                setErrorAlert(true);
            });
        // try {
        //     if (data === 0) {
        //
        //     } else {

        //     }
        // } catch (error) {}
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Nhập mã OTP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorAlert && (
                        <Alert key="danger" variant="danger">
                            Your OTP is Wrong!
                        </Alert>
                    )}
                    Mã OTP vừa được gửi tới email : <strong>{email}</strong>
                    <div className={cx('modal-body-input')}>
                        <div style={{ padding: '5px' }}>
                            <input
                                className={cx('modal-input', 'ant-input')}
                                type="text"
                                maxLength={6}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={cx('Submit-footer')}>
                    <Button className={cx('Submit-btn')} variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
