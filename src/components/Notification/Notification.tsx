import {
    faCircleCheck,
    faCircleExclamation,
    faShareNodes,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface NotificationProps {
    type: 'warning' | 'success' | 'danger' | 'share' | 'normal' | string;
    text: string;
}

const Notification: React.FC<NotificationProps> = ({ type, text }) => {
    return (
        <div className="">
            <div className="d-flex align-items-center">
                {type === 'warning' && (
                    <span className="text-warning">
                        <FontAwesomeIcon className="fs-2" icon={faTriangleExclamation} />
                    </span>
                )}
                {type === 'success' && (
                    <span className="text-success">
                        <FontAwesomeIcon className="fs-2" icon={faCircleCheck} />
                    </span>
                )}
                {type === 'danger' && (
                    <span className="text-danger">
                        <FontAwesomeIcon className="fs-2" icon={faTriangleExclamation} />
                    </span>
                )}
                {type === 'info' && (
                    <span className="text-info">
                        <FontAwesomeIcon className="fs-2" icon={faCircleExclamation} />
                    </span>
                )}
                {type === 'normal' && (
                    <span className="text-secondary">
                        <FontAwesomeIcon className="fs-2" icon={faCircleExclamation} />
                    </span>
                )}
                {type === 'share' && (
                    <span className="text-info">
                        <FontAwesomeIcon className="fs-2" icon={faShareNodes} />
                    </span>
                )}
                <div className="ms-3 d-flex flex-column justify-content-between">
                    <div className="">{text}</div>
                    {/* <div className="small">{currentTime}</div> */}
                </div>
            </div>
            <i className="w-100">
                <hr className="my-2" />
            </i>
        </div>
    );
};

export default Notification;
