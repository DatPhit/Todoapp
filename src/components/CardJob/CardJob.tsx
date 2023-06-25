/* eslint-disable @typescript-eslint/no-unused-vars */
import { faAnglesDown, faEllipsis, faTag, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Badge, Button, Modal, ProgressBar } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import './CardJob.scss';
import { ListJobProps } from '../../Model/ListJob';
import { deleteTodo } from '../../pages/Home/todoSlice';
import { deleteProcess } from '../../pages/Home/processSlice';
import { deleteDone } from '../../pages/Home/doneSlice';

interface CardJobProps {
    Job: ListJobProps;
    index?: number;
}
const CardJob: React.FC<CardJobProps> = ({ Job, index }) => {
    const [showDetails, setShowDetails] = useState(false);
    const { id, task, status, deadline, steps, description, workplace, type, priority, groupname } =
        Job;

    // Redux
    const dispatch = useDispatch();

    // handle show button options
    const [showOptions, setShowOptions] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseDown = () => {
        setShowOptions(!showOptions);
    };

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (buttonRef && !buttonRef.current?.contains(event.target as Node)) {
                setShowOptions(false);
            }
        };
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [showOptions]);

    // handle show modal when click delete job
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };
    const handleDeleteITem = () => {
        if (status === 'Todo') {
            dispatch(deleteTodo(id));
        }
        if (status === 'Processing') {
            dispatch(deleteProcess(id));
        }
        if (status === 'Done') {
            dispatch(deleteDone(id));
        }
    };
    return (
        <div className={`CardJob_wrapper position-relative shadow bg `}>
            <div className={`position-absolute end-3 ${showDetails ? 'top-2' : 'top-5'}`}>
                <button
                    ref={buttonRef}
                    className={`p-1  `}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                    }}
                    onClick={handleMouseDown}
                >
                    <FontAwesomeIcon icon={faEllipsis} size="xl" />
                </button>
                {showOptions && (
                    <div
                        className="z-1 border border-1 border-secondary rounded-3 overflow-hidden d-flex flex-column position-absolute top-10 end-100"
                        style={{ minWidth: '10rem' }}
                    >
                        <button className="cardjob_button_option ">Chỉnh sửa</button>

                        <button className="cardjob_button_option " onClick={handleShow}>
                            Xóa
                        </button>
                        {status === 'Done' && (
                            <button className="cardjob_button_option ">Đánh giá</button>
                        )}
                    </div>
                )}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faTrashCan} />
                        <div className="ms-2"> Xoá công việc</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="fs-5">
                    Bạn có chắc chắn muốn xoá công việc <b>{task}</b> ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy bỏ
                    </Button>

                    <Button variant="danger" onClick={handleDeleteITem}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Card head */}
            <div
                onClick={() => {
                    setShowDetails(!showDetails);
                }}
                className="mb-2 CardJob_head d-flex justify-content-start align-items-center fs-5"
                style={{ width: '85%' }}
            >
                <FontAwesomeIcon
                    className={`CardJob_IconAngles text-danger ${showDetails ? 'rotated' : ''}`}
                    icon={faAnglesDown}
                    size="lg"
                />
                <div className="ms-2 fw-medium">{task}</div>
            </div>

            {/* Card descriptions */}
            <div className="mb-4">
                <div>{description}</div>
            </div>

            {/* Card foot */}
            <div
                className={`position-absolute start-1 end-3 ${
                    showDetails ? 'bottom-3' : 'bottom-10'
                }`}
            >
                <div className="flex-grow-1 position-relative">
                    <div className="linear-color  position-absolute end-0 bottom-100">
                        {moment(deadline).format('HH:mm DD-MM-YY')}
                    </div>
                    <ProgressBar
                        now={
                            (steps.reduce(
                                (done, step) => (step.stt === 'Done' ? done + 1 : done),
                                0,
                            ) /
                                steps.length) *
                            100
                        }
                        className="ms-2 mt-2"
                    />
                </div>
            </div>

            {/* Phần mở rộng chứa các step */}
            {showDetails && (
                <div className="mt-4 mb-4">
                    {/* Steps */}
                    {steps.map((step, index) => (
                        <div key={index} className="position-relative">
                            <hr />

                            <button
                                className="p-1 position-absolute end-0 top-15"
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                }}
                            >
                                <Badge
                                    bg={`${
                                        step.stt === 'Todo'
                                            ? 'secondary'
                                            : step.stt === 'Processing'
                                            ? 'info'
                                            : 'success'
                                    }`}
                                >
                                    {step.stt}
                                </Badge>
                            </button>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon className="text-info" icon={faTag} />
                                <div className="ms-2 fw-medium">Bước {index + 1}</div>
                            </div>
                            <div className="">{step.name}</div>
                        </div>
                    ))}
                    <hr />
                    {/* Types, Group name, Workplace */}
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between">
                            <div className="d-inline-flex">
                                <div className="me-1 fw-medium">Nơi làm việc:</div>
                                {workplace}
                            </div>
                            <div className="me-1 fw-medium">{priority}</div>
                        </div>
                        <div className="d-inline-flex">
                            <div className="me-1 fw-medium">Phân loại:</div>
                            {type}
                        </div>
                        {type === 'Việc nhóm' && (
                            <div className="d-inline-flex">
                                <div className="me-1 fw-medium">Tên nhóm:</div>
                                {groupname}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardJob;
