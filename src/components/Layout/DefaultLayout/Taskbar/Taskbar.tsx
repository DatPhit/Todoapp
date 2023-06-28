/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faCircleUser,
    faHouse,
    faPeopleGroup,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';

import NavItem from '../../../NavbarItem/NavItem';
import SignOut from '../../../Signout/SignOut';
import './Taskbar.scss';
import { useSelector } from 'react-redux';
import { authenSelector, notifySelector } from '../../../../redux/selectors';
import Notification from '../../../Notification/Notification';

function Taskbar() {
    const isLogin = useSelector(authenSelector);
    const [showNoti, setShowNoti] = useState(false);
    const notifyList = useSelector(notifySelector);
    const notifyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (notifyRef && !notifyRef.current?.contains(event.target as Node)) {
                setShowNoti(false);
            }
        };
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [showNoti]);

    return (
        <div className="d-flex flex-column position-relative">
            {/* Khung head chứa thông tin đăng nhập hay chưa */}
            <div className="p-2 mt-2 w-100 d-flex align-items-center fs-6 ">
                {/* Nếu chưa đăng nhập thì hiện comp đky đăng nhập */}
                {!isLogin && (
                    <>
                        <FontAwesomeIcon icon={faCircleUser} style={{ height: '3.2rem' }} />
                        <Link to="/sign-up" className="taskbar_link ms-2 me-1">
                            Đăng ký
                        </Link>
                        /
                        <Link to="/sign-in" className="taskbar_link ms-1">
                            Đăng nhập
                        </Link>
                    </>
                )}
                {/* Nếu đã đăng nhập thì hiện tên, ảnh */}
                {isLogin && (
                    <>
                        <img
                            src="https://cdn4.iconfinder.com/data/icons/avatars-circle-2/72/133-512.png"
                            alt="hinhanh"
                            className="taskbar-img"
                        />
                        <div className="ms-2 d-flex flex-column">
                            <div className="fw-medium">Quang Đạt</div>
                            <div className="small">Sinh viên</div>
                        </div>
                    </>
                )}
            </div>

            {/* Các thanh điều hướng */}
            {isLogin && (
                <div className="mb-1">
                    <NavItem
                        text="Trang chủ"
                        classN={`${isLogin ? 'nav_active' : ''}`}
                        icon={faHouse}
                        href="/"
                    />
                    <NavItem text="Xem nhóm" icon={faPeopleGroup} href="/group" />
                    <NavItem text="Thêm công việc mới" icon={faPlus} href="/add-task" />
                </div>
            )}

            {isLogin && (
                <div className="mt-5 mb-5">
                    <SignOut />
                </div>
            )}
            {isLogin && (
                <div className="position-absolute end-7 top-5">
                    <div
                        className="position-relative"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowNoti(!showNoti)}
                        ref={notifyRef}
                    >
                        <FontAwesomeIcon icon={faBell} size="lg" />
                        <span className="position-absolute top-20 right-20 translate-middle p-1 bg-danger rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    </div>
                    {showNoti && (
                        <div
                            className="p-3 bg shadow position-absolute start-200 top-0 border rounded-2 overflow-y-scroll"
                            style={{ height: '80vh', width: '23rem', zIndex: 10 }}
                        >
                            <div className="fw-medium fs-4">Thông báo</div>
                            <hr className="mb-2" />

                            {/* Notification */}
                            {notifyList.map((notify, index) => (
                                <Notification key={index} type={notify.type} text={notify.text} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Taskbar;
