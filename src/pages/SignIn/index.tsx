import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authenSelector } from '../../redux/selectors';
import { login } from '../../components/Layout/DefaultLayout/Taskbar/authenSlice';
import img from '../../images/logo.png';

function SignIn() {
    const dispatch = useDispatch();
    const handleSignIn = () => {
        dispatch(login());
    };
    return (
        <div className="bg h-100 rounded-4">
            <div className="d-flex justify-content-center flex-column align-items-center">
                <div className="mt-5 center">
                    <img src={img} alt="logo" className="w-100" />
                </div>
                <Form className="" style={{ width: '35%', marginTop: '10vh' }}>
                    <h2 className="text-center mb-3">Vui lòng đăng nhập</h2>
                    <Form.Group className="mb-3" controlId="ControlInput2">
                        <Form.Label>Nhập địa chỉ email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlInput3">
                        <Form.Label>Nhập mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
                    </Form.Group>

                    <div className="mt-4 text-center w-100" onClick={handleSignIn}>
                        <Button href="/" className="fs-5 signup_button">
                            Đăng nhập
                        </Button>
                    </div>
                    <div
                        className="mt-3 d-flex justify-content-center"
                        style={{ fontSize: '0.9rem' }}
                    >
                        <div>
                            <span>Bạn chưa có tài khoản?</span>
                            <Link to="/sign-up" className="signup_link ms-1">
                                Đăng ký ngay
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default SignIn;
