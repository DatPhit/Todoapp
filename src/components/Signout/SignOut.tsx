import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

function SignOut() {
    return (
        <Button
            variant="dark"
            className="mt-4 fs-5 w-100 d-flex justify-content-start align-items-center position-relative "
            style={{ backgroundColor: '#23234a', minHeight: 70 }}
        >
            <span>Đăng xuất</span>
            <span className="position-absolute end-15 ">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />{' '}
            </span>
        </Button>
    );
}

export default SignOut;
