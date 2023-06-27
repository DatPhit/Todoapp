import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../components/Layout/DefaultLayout/Taskbar/authenSlice';
import img from '../../images/logo.png';
import './signin.scss';

function SignIn() {
    const dispatch = useDispatch();
    const handleSignIn = () => {
        dispatch(login());
    };
    return (
        <div className="bg rounded-4" style={{ height: '100vh' }}>
            <div className="d-flex justify-content-center flex-column align-items-center">
                <div className="mt-5 center">
                    <img src={img} alt="logo" className="w-100" />
                </div>
                <Form className="" style={{ width: '30%', marginTop: '10vh' }}>
                    <h1 className="text-center mb-3">Đăng nhập</h1>
                    <Form.Group className="fs-5 mb-3" controlId="ControlInput2">
                        <Form.Label>Nhập địa chỉ email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" size="lg" />
                    </Form.Group>
                    <Form.Group className="fs-5 mb-3" controlId="ControlInput3">
                        <Form.Label>Nhập mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" size="lg" />
                    </Form.Group>

                    <div className="mt-5 text-center w-100" onClick={handleSignIn}>
                        <Link to="/" className=" py-3 fs-4 signin_button">
                            Đăng nhập
                        </Link>
                    </div>
                    <div
                        className="mt-4 d-flex justify-content-center"
                        style={{ fontSize: '1.2rem' }}
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
