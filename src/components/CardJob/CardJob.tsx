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
import {
    changeStepStatusToDone,
    changeStepStatusToProcessing,
    changeStepStatusToTodo,
    deleteProcess,
} from '../../pages/Home/processSlice';
import { addDone, changeStatusToDone } from '../../pages/Home/doneSlice';
import ModalEditTask from '../modal/ModalEditTask';
import ModalDeleteTask from '../modal/ModalDeleteTask';
import ModalShareTask from '../modal/ModalShareTask';
import ModalReviewTask from '../modal/ModalReviewTask';
import { addNotify } from '../Notification/notifycationSlice';

interface CardJobProps {
    Job: ListJobProps;
}
const CardJob: React.FC<CardJobProps> = ({ Job }) => {
    const [showDetails, setShowDetails] = useState(false);
    const {
        id,
        task,
        status,
        start_date,
        deadline,
        steps,
        description,
        workplace,
        type,
        priority,
        groupname,
        group_shared,
        owner,
        helpers,
        review,
    } = Job;

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
    const [showModalDeleteTask, setShowModalDeleteTask] = useState(false);

    // handle show modal when click edit job
    const [showModalEditTask, setShowModalEditTask] = useState(false);

    // handle show modal when click share job
    const [showModalShareTask, setShowModalShareTask] = useState(false);

    // handle show modal when click review job
    const [showModalReviewTask, setShowModalReviewTask] = useState(false);

    // Xử lý click badge ở cột Processing
    const handleClickBadge = (index: number) => {
        if (status === 'Processing') {
            if (steps[index].stt === 'Todo') {
                dispatch(
                    changeStepStatusToProcessing({
                        indexJob: id,
                        indexStep: index,
                    }),
                );
            }
            if (steps[index].stt === 'Processing') {
                dispatch(
                    changeStepStatusToDone({
                        indexJob: id,
                        indexStep: index,
                    }),
                );
            }
            if (steps[index].stt === 'Done') {
                dispatch(
                    changeStepStatusToTodo({
                        indexJob: id,
                        indexStep: index,
                    }),
                );
            }
        }
    };
    useEffect(() => {
        if (steps.every((step) => step.stt === 'Done') && status === 'Processing') {
            dispatch(addDone(Job));
            dispatch(deleteProcess(id));
            dispatch(changeStatusToDone(0));
            if (type === 'Việc được chia sẻ' && owner !== 'Quang Đạt') {
                dispatch(
                    addNotify({
                        type: 'success',
                        text: `Bạn đã cứu ${owner} thành công. Công việc *${task}* đã chuyển sang trạng thái Done`,
                    }),
                );
            } else {
                dispatch(
                    addNotify({
                        type: 'success',
                        text: `Công việc *${task}* đã chuyển sang trạng thái Done`,
                    }),
                );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [steps]);

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
                {/*  Button hiển thị các option của card */}
                {showOptions && (
                    <div
                        className="z-1 border border-1 border-secondary rounded-3 overflow-hidden d-flex flex-column position-absolute top-10 end-100"
                        style={{ minWidth: '10rem' }}
                    >
                        {/* Chỉnh sửa */}
                        <button
                            className="cardjob_button_option"
                            onClick={() => setShowModalEditTask(true)}
                        >
                            Chỉnh sửa
                        </button>

                        {/* Chia sẻ */}
                        {(type === 'Việc cá nhân' ||
                            (type === 'Việc được chia sẻ' && owner === 'Quang Đạt')) && (
                            <button
                                className="cardjob_button_option"
                                onClick={() => setShowModalShareTask(true)}
                            >
                                Chia sẻ
                            </button>
                        )}

                        {/* Đánh giá */}
                        {status === 'Done' && (
                            <button
                                className="cardjob_button_option "
                                onClick={() => setShowModalReviewTask(true)}
                            >
                                {review ? 'Xem đánh giá' : 'Đánh giá'}
                            </button>
                        )}

                        {/* Xóa */}
                        <button
                            className="cardjob_button_option "
                            onClick={() => setShowModalDeleteTask(true)}
                        >
                            Xóa
                        </button>
                    </div>
                )}
            </div>
            {/* Modal xoá công việc */}
            <ModalDeleteTask
                show={showModalDeleteTask}
                hide={() => setShowModalDeleteTask(false)}
                job={Job}
            />

            {/* Modal edit task */}
            <ModalEditTask
                job={Job}
                show={showModalEditTask}
                hide={() => setShowModalEditTask(false)}
            />

            <ModalShareTask
                job={Job}
                show={showModalShareTask}
                hide={() => setShowModalShareTask(false)}
            />

            <ModalReviewTask
                job={Job}
                show={showModalReviewTask}
                hide={() => setShowModalReviewTask(false)}
            />

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
                {/* Ngày bắt dầu -> Deadline */}
                <div className="flex-grow-1 position-relative">
                    <div className="linear-color  position-absolute start-2 bottom-100">
                        {moment(start_date).format('HH:mm DD-MM-YY')}
                    </div>

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
                                onClick={() => handleClickBadge(index)}
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
                    <div className="mb-5">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-column">
                                {workplace && (
                                    <div className="d-inline-flex">
                                        <div className="me-1 fw-medium">Nơi làm việc:</div>
                                        {workplace}
                                    </div>
                                )}
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
                                {type === 'Việc được chia sẻ' && (
                                    <div className="d-inline-flex">
                                        <div className="me-1 fw-medium">Người chia sẻ:</div>
                                        {owner}
                                    </div>
                                )}
                                {type === 'Việc được chia sẻ' && helpers && (
                                    <div className="d-flex">
                                        <div className="d-flex flex-wrap">
                                            <div className="me-1 fw-medium">Người giúp:</div>
                                            {helpers.map((helper, index) => (
                                                <div key={index} className="me-1">
                                                    {helper}
                                                    {helpers.length > 1
                                                        ? index !== helpers.length - 1
                                                            ? ','
                                                            : '.'
                                                        : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {type === 'Việc được chia sẻ' &&
                                    group_shared &&
                                    owner === 'Quang Đạt' && (
                                        <div className="d-flex">
                                            <div className="d-flex flex-wrap">
                                                <div className="me-1 fw-medium">
                                                    Nhóm đã chia sẻ:
                                                </div>
                                                {group_shared.map((helper, index) => (
                                                    <i key={index} className="me-1">
                                                        {helper}
                                                        {group_shared.length > 1
                                                            ? index !== group_shared.length - 1
                                                                ? ','
                                                                : '.'
                                                            : ''}
                                                    </i>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                            </div>
                            <div className="me-1 fw-medium">{priority}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardJob;
