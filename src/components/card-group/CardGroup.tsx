import { Figure, Modal, Tab, Table, Tabs } from 'react-bootstrap';
import { listGroupProps } from '../../Model/listGroup';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import './cardgroup.scss';
import { ListJob } from '../../Model/ListJob';
import moment from 'moment';
import JobSharePage from './JobSharePage';

interface CardGroupProps {
    group: listGroupProps;
}

function CardGroup({ group }: CardGroupProps) {
    const adminName = 'Quang Đạt';
    const [showModal, setShowModal] = useState(false);
    const ownerOfGroup = group.members.find((mem) => mem.role === 'Owner')?.name;
    const listJobsOfGrounp = ListJob.filter((job) => job.groupname === group.name);
    listJobsOfGrounp.sort((a, b) => {
        const order = ['Todo', 'Processing', 'Done'];
        return order.indexOf(a.status) - order.indexOf(b.status);
    });

    return (
        <div>
            <div
                className="ms-3 me-4 mb-5 border border-black shadow-sm center flex-column"
                style={{ width: 300, height: 300, background: 'var(--background-color)' }}
                onClick={() => setShowModal(true)}
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
                show={showModal}
                dialogClassName="modal-90w"
                onHide={() => setShowModal(false)}
                centered
                size="xl"
                backdrop="static"
            >
                <div className="">
                    <Modal.Header closeButton>
                        <Modal.Title className="fs-2">{group.name}</Modal.Title>
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
                                                    {ownerOfGroup === adminName &&
                                                        member.name !== adminName && (
                                                            <FontAwesomeIcon
                                                                icon={faXmark}
                                                                size="xl"
                                                            />
                                                        )}
                                                    {member.name === adminName && (
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
                                <Table bordered hover className="fs-5">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên công việc</th>
                                            <th>Trạng thái</th>
                                            <th>Mức độ ưu tiên</th>
                                            <th>Deadline</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listJobsOfGrounp.map((job, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{job.task}</td>
                                                <td>{job.status}</td>
                                                <td>{job.priority}</td>
                                                <td>
                                                    {moment(job.deadline).format(
                                                        'HH:mm DD-MM-YYYY',
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Tab>
                            <Tab eventKey="task-share" title="Công việc được chia sẻ">
                                <JobSharePage group={group} />
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
