import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function PageExpired() {
    const navigation = useNavigate();
    const backHome = () => {
        navigation('/');
    };
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, the page you visited expired ."
            extra={
                <Button type="primary" onClick={backHome}>
                    Back Home
                </Button>
            }
        />
    );
}
