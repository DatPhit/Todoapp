/* eslint-disable @typescript-eslint/no-unused-vars */
import { faAnglesDown, faEllipsis, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Badge, ProgressBar } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './CardJob.scss';
import { ListJobProps } from '../../Model/ListJob';
import { addProcess, changeStatusToProcessing, deleteProcess } from '../../pages/Home/processSlice';
import { deleteTodo } from '../../pages/Home/todoSlice';
import { addDone, changeStatusToDone } from '../../pages/Home/doneSlice';

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

    return (
        <div
            className={`CardJob_wrapper position-relative shadow bg ${
                priority && status !== 'Done' ? 'priority' : ''
            }`}
        >
            {/* Badge status */}
            {/* <button
                onClick={handleChangeStatus}
                className={`p-1 position-absolute end-3 ${showDetails ? 'top-2' : 'top-5'}`}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                }}
            >
                <Badge
                    bg={`${
                        status === 'Todo'
                            ? 'secondary'
                            : status === 'Processing'
                            ? 'info'
                            : 'success'
                    }`}
                >
                    {status}
                </Badge>
            </button> */}

            <button
                className={`p-1 position-absolute end-3 ${showDetails ? 'top-2' : 'top-5'}`}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                }}
            >
                <FontAwesomeIcon icon={faEllipsis} size="xl" />
            </button>

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
                        <div className="d-inline-flex">
                            <div className="me-1 fw-medium">Nơi làm việc:</div>
                            {workplace}
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
