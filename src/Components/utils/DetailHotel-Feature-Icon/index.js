import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
export default function Feature_Icon(props) {
    const cx = classNames.bind(styles);
    return (
        <div>
            <div className={cx('detailHotel_Feature_Icon')}>
                <img
                    importance="low"
                    loading="lazy"
                    src={props.url}
                    decoding="async"
                    width={32}
                    height={32}
                    style={{ objectFit: 'fill', objectPosition: '50% 50%' }}
                    alt={props.title}
                />
                {props.title}
            </div>
        </div>
    );
}
