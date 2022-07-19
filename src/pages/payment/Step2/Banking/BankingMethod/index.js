import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
export default function BankingMethod(props) {
    const cx = classNames.bind(styles);
    return (
        <div>
            <div className={cx('banking-selection-item')}>
                <div>
                    <div className="d-flex">
                        <div className={cx('banking-selection-button')}>
                            <div className={cx(props.selection === true ? 'banking-selection-button-dot' : '')}></div>
                        </div>
                        <div className={cx('banking-selection-title')}>{props.name}</div>
                    </div>
                </div>
                <div className={cx('banking-selection-item-right')}>
                    <img src={props.logo} alt="vietcombank"></img>
                </div>
            </div>
        </div>
    );
}
