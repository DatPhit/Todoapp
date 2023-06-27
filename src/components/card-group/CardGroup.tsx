import { Figure, Modal, Tab, Tabs } from 'react-bootstrap';
import { listGroupProps } from '../../Model/listGroup';
import { useState } from 'react';

import './cardgroup.scss';
import JobSharePage from './JobSharePage';
import MemberPage from './MemberPage';
import ListJobPage from './ListJobPage';
import ReviewJobPage from './ReviewJobPage';

interface CardGroupProps {
    group: listGroupProps;
}

function CardGroup({ group }: CardGroupProps) {
    const [showModal, setShowModal] = useState(false);

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
                            className="mb-3 position-relative"
                            fill
                            variant="underline"
                        >
                            {/* Trang thành viên */}
                            <Tab eventKey="members" title="Thành viên">
                                <MemberPage group={group} />
                            </Tab>

                            {/* Trang công việc */}
                            <Tab eventKey="task" title="Công việc">
                                <ListJobPage group={group} />
                            </Tab>
                            {/* Trang công việc được chia sẻ */}
                            <Tab eventKey="task-share" title="Công việc được chia sẻ">
                                <JobSharePage group={group} />
                            </Tab>

                            {/* Trang đánh giấ */}
                            <Tab eventKey="rate" title="Đánh giá">
                                <ReviewJobPage group={group} />
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    );
}

export default CardGroup;
