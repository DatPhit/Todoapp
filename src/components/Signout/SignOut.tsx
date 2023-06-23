import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../Layout/DefaultLayout/Taskbar/authenSlice';
import { Link } from 'react-router-dom';

function SignOut() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSignOut = () => {
        dispatch(logout());
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn đăng xuất không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy bỏ
                    </Button>
                    <Link to="/sign-in">
                        <Button variant="primary" onClick={handleSignOut}>
                            Đăng xuất
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
            <Button
                variant="dark"
                onClick={handleShow}
                className="mt-4 fs-5 w-100 d-flex justify-content-start align-items-center position-relative "
                style={{ backgroundColor: '#23234a', minHeight: 70 }}
            >
                <span>Đăng xuất</span>
                <span className="position-absolute end-15 ">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />{' '}
                </span>
            </Button>
        </>
    );
}

export default SignOut;
