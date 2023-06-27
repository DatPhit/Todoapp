import { Form, Button } from 'react-bootstrap';
import './signup.scss';
import { Link } from 'react-router-dom';
import img from '../../images/logo.png';

function SignUp() {
    return (
        <div className="bg rounded-4" style={{ height: '100vh' }}>
            <div className="d-flex justify-content-center flex-column align-items-center">
                <div className="mt-5 center">
                    <img src={img} alt="logo" className="w-100" />
                </div>
                <Form className="" style={{ width: '30%', marginTop: '9vh' }}>
                    <h2 className="text-center mb-3">Đăng ký tài khoản</h2>
                    <Form.Group className="fs-5 mb-3" controlId="ControlInput1">
                        <Form.Label>Họ và Tên</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" size="lg" />
                    </Form.Group>
                    <Form.Group className="fs-5 mb-3" controlId="ControlInput2">
                        <Form.Label>Nhập địa chỉ email</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" size="lg" />
                    </Form.Group>
                    <Form.Group className="fs-5 mb-3" controlId="ControlInput3">
                        <Form.Label>Nhập mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" size="lg" />
                    </Form.Group>
                    <Form.Group className="fs-5 mb-4" controlId="ControlInput4">
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" size="lg" />
                    </Form.Group>
                    <div className="mt-4 text-center w-100">
                        <Button type="submit" className="fs-4 signup_button">
                            Đăng ký
                        </Button>
                    </div>
                    <div
                        className="mt-3 d-flex justify-content-center"
                        style={{ fontSize: '1.2rem' }}
                    >
                        <div>
                            <span>Bạn đã có tài khoản?</span>
                            <Link to="/sign-in" className="signup_link ms-1">
                                Đăng nhập ngay
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;
