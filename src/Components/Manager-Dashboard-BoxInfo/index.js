import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import Icon from '@mdi/react';
import { Progress } from 'antd';
export default function BoxInfo({ icon, title, strong, background, subContent }) {
    const cx = classNames.bind(styles);
    const date = new Date();
    const currentDate = date.getDate();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }
    // 👇️ Current Month
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

    return (
        <div className={cx(['info-box', 'col-xl-3', 'col-md-6', 'col-12'])}>
            <div className={cx('box-container')} style={{ background: background }}>
                <div className={cx('box-icon')}>
                    <div className={cx('circle')}>
                        <Icon path={icon} size={'35px'} color={'white'}></Icon>
                    </div>
                </div>
                <div className={cx('box-title')}>
                    <div>{title}</div>
                    <div className={cx('strong')}>{strong}</div>
                    {subContent ? (
                        <Progress percent={(currentDate / daysInCurrentMonth) * 100} showInfo={false} />
                    ) : (
                        <></>
                    )}
                    <div className={cx('subContent')}>{subContent}</div>
                </div>
            </div>
        </div>
    );
}
