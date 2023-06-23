import { faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NotificationProps {
    type: 'warning' | 'success' | 'danger';
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
                <div className="ms-2 d-flex flex-column justify-content-between">
                    <div className="small">{text}</div>
                    <div className="" style={{ fontSize: '0.65rem' }}>
                        17/06/2023 8:30
                    </div>
                </div>
            </div>
            <i className="w-100">
                <hr className="my-2" />
            </i>
        </div>
    );
};

export default Notification;
