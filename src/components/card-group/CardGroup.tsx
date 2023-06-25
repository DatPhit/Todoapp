import { Figure, Modal, Tab, Table, Tabs } from 'react-bootstrap';
import { listGroupProps } from '../../Model/listGroup';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import './cardgroup.scss';

interface CardGroupProps {
    group: listGroupProps;
}

function CardGroup({ group }: CardGroupProps) {
    const [show, setShow] = useState(false);
    const owner = group.members.find((mem) => mem.role === 'Owner')?.name;

    return (
        <div>
            <div
                className="ms-3 me-4 mb-5 border border-black shadow-sm center flex-column"
                style={{ width: 300, height: 300, background: 'var(--background-color)' }}
                onClick={() => setShow(true)}
            >
                <Figure className="mb-4">
                    <Figure.Image
                        width={200}
                        height={200}
                        alt="Ảnh nhóm"
                        src={group.image}
                        style={{ objectFit: 'cover' }}
                    />
                </Figure>
                <div className="fw-medium fs-4">{group.name}</div>
            </div>

            <Modal
                show={show}
                dialogClassName="modal-90w"
                onHide={() => setShow(false)}
                centered
                size="xl"
                backdrop="static"
            >
                <div className="">
                    <Modal.Header closeButton>
                        <Modal.Title>{group.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ minHeight: '40rem' }}>
                        <Tabs
                            defaultActiveKey="members"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                            variant="underline"
                        >
                            {/* Trang thành viên */}
                            <Tab eventKey="members" title="Thành viên">
                                <div className="mt-4 fs-5 fw-medium d-flex justify-content-around">
                                    <div className="">Tên thành viên</div>
                                    <div className=""></div>
                                    <div className="">Role</div>
                                </div>
                                <hr className=" mb-0" />
                                <div className="d-flex flex-column ">
                                    {group.members.map((member, index) => (
                                        <div key={index} className="position-relative">
                                            <div className="cardgroup_member_item w-100 d-flex align-items-center">
                                                <img
                                                    src={member.avatar}
                                                    alt="avatar"
                                                    style={{
                                                        marginLeft: '6.5rem',
                                                        width: '2.5rem',
                                                        height: '2.5rem',
                                                    }}
                                                />
                                                <div className="ms-3 flex-grow-1">
                                                    {member.name}
                                                </div>
                                                <div
                                                    className="fs-5"
                                                    style={{ marginRight: '9rem' }}
                                                >
                                                    {member.role}
                                                </div>
                                                <div className="position-absolute end-2">
                                                    {owner === 'Quang Đạt' &&
                                                        member.name !== 'Quang Đạt' && (
                                                            <FontAwesomeIcon
                                                                icon={faXmark}
                                                                size="xl"
                                                            />
                                                        )}
                                                    {member.name === 'Quang Đạt' && (
                                                        <div className="fw-light fs-5">Bạn</div>
                                                    )}
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                        </div>
                                    ))}
                                </div>
                            </Tab>

                            {/* Trang công việc */}
                            <Tab eventKey="task" title="Công việc">
                                Tab content for Profile
                            </Tab>
                            <Tab eventKey="task-share" title="Công việc được chia sẻ">
                                Tab content for Profile
                            </Tab>
                            <Tab eventKey="rate" title="Đánh giá">
                                Tab content for Contact
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    );
}

export default CardGroup;
