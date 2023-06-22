import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Notification() {
    return (
        <div className="">
            <div className="d-flex align-items-center">
                <span className="text-warning">
                    <FontAwesomeIcon className="fs-2" icon={faTriangleExclamation} />
                </span>
                <div className="ms-2 d-flex flex-column justify-content-between">
                    <div className="small">Công việc sắp đến hạn</div>
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
}

export default Notification;
