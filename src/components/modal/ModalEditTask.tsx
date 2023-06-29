import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ListJobProps } from '../../Model/ListJob';
import { useState } from 'react';
import { listGroupNameJobs, listWorkplaceJobs } from '../../Services/ProjectsService';
import { useDispatch } from 'react-redux';
import { editTodo } from '../../pages/Home/todoSlice';
import { editProcess } from '../../pages/Home/processSlice';
import { editDone } from '../../pages/Home/doneSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { addNotify } from '../Notification/notifycationSlice';

interface ModalEditTaskProps {
    job: ListJobProps;
    show: boolean;
    hide: () => void;
}

function ModalEditTask({ job, show, hide }: ModalEditTaskProps) {
    const dispatch = useDispatch();

    const [task, setTask] = useState(job.task);
    const [startDate, setStartDate] = useState(job.start_date.toString());
    const [deadline, setDeadline] = useState(job.deadline.toString());
    const [description, setDescription] = useState(job.description);
    const [workplace, setWorkplace] = useState(job.workplace);
    const [type, setType] = useState(job.type);
    const [priority, setPriority] = useState(job.priority);
    const [stepValues, setStepValues] = useState(job.steps);
    const [groupname, setGroupname] = useState(job.groupname);

    // Steps
    const handleStepChange = (index: number, value: string) => {
        setStepValues((prevValues) => {
            const newValues = [...prevValues];
            const updatedStep = Object.assign({}, newValues[index], { name: value });
            newValues[index] = updatedStep;
            return newValues;
        });
    };

    const handleSubmitEditTask = () => {
        if (job.status === 'Todo') {
            dispatch(
                editTodo({
                    id: job.id,
                    data: {
                        id: job.id,
                        task,
                        status: 'Todo',
                        start_date: startDate,
                        deadline,
                        steps: stepValues,
                        description,
                        workplace,
                        type,
                        priority,
                        groupname,
                    },
                }),
            );
        }

        if (job.status === 'Processing') {
            dispatch(
                editProcess({
                    id: job.id,
                    data: {
                        id: job.id,
                        task,
                        status: 'Processing',
                        start_date: startDate,
                        deadline,
                        steps: stepValues,
                        description,
                        workplace,
                        type,
                        priority,
                        groupname,
                    },
                }),
            );
        }

        if (job.status === 'Done') {
            dispatch(
                editDone({
                    id: job.id,
                    data: {
                        id: job.id,
                        task,
                        status: 'Done',
                        start_date: startDate,
                        deadline,
                        steps: stepValues,
                        description,
                        workplace,
                        type,
                        priority,
                        groupname,
                    },
                }),
            );
        }
        hide();
        dispatch(
            addNotify({
                type: 'success',
                text: `Chỉnh sửa công việc *${job.task}* thành công`,
            }),
        );
    };

    return (
        <Modal
            show={show}
            dialogClassName="modal-90w"
            onHide={hide}
            centered
            size="xl"
            backdrop="static"
        >
            <div className="">
                <Modal.Header closeButton>
                    <Modal.Title className="fs-2">Chỉnh sửa công việc</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ minHeight: '40rem' }} className="position-relative">
                    <Form className="">
                        <Row>
                            <Col className="">
                                {/* Type */}
                                <div className="mb-3 d-flex">
                                    <div className="w-25">Type</div>
                                    <Form.Select className="w-50" disabled defaultValue={type}>
                                        <option value="Việc cá nhân">Việc cá nhân</option>
                                        <option value="Việc nhóm">Việc nhóm</option>
                                    </Form.Select>
                                </div>

                                {/* Status */}
                                <div className="mb-3 d-flex">
                                    <div className="w-25">Status</div>
                                    <div>{job.status}</div>
                                </div>

                                {/* Task */}
                                <Form.Group className="mb-3" controlId="ControlInput1">
                                    <Form.Label>Name task</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={task}
                                        onChange={(e) => setTask(e.target.value)}
                                    />
                                </Form.Group>
                                {/* Description */}
                                <Form.Group className="mb-3" controlId="ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                {/* Step */}
                                {stepValues.map((step, index) => (
                                    <div key={index}>
                                        <Form.Group className="mb-3">
                                            <div className="d-flex justify-content-between">
                                                <Form.Label>Step {index + 1}</Form.Label>
                                                <div>{step.stt}</div>
                                            </div>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                value={step.name}
                                                onChange={(e) =>
                                                    handleStepChange(index, e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                    </div>
                                ))}
                            </Col>
                            <Col className="position-relative">
                                {/* workplace */}
                                <div className="mb-3 d-flex position-relative">
                                    <div className="w-25">Workplace</div>
                                    <Form.Control
                                        list="optionsworkplace"
                                        value={workplace}
                                        onChange={(e) => setWorkplace(e.target.value)}
                                    />
                                    {workplace && (
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            onClick={() => {
                                                setWorkplace('');
                                            }}
                                            className="p-2 position-absolute end-1 bottom-4"
                                        />
                                    )}
                                </div>
                                <datalist id="optionsworkplace">
                                    {listWorkplaceJobs.map((workplace, index) => (
                                        <option value={workplace} key={index} />
                                    ))}
                                </datalist>

                                {/* Groupname */}
                                {type === 'Việc nhóm' && (
                                    <>
                                        <div className="mb-3 d-flex">
                                            <div className="w-25">Group name</div>
                                            <Form.Control
                                                disabled
                                                readOnly
                                                list="optionsGroupname"
                                                value={groupname}
                                                // onChange={(e) => setGroupname(e.target.value)}
                                            />
                                        </div>
                                        <datalist id="optionsGroupname">
                                            {listGroupNameJobs.map((group, index) => (
                                                <option value={group} key={index} />
                                            ))}
                                        </datalist>
                                    </>
                                )}
                                {/* Priority */}
                                <div className="mb-3 d-flex">
                                    <div className="w-25">Priority</div>
                                    <Form.Select
                                        aria-label="priority"
                                        value={priority}
                                        onChange={(e) => {
                                            setPriority(e.target.value);
                                        }}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Normal">Normal</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </Form.Select>
                                </div>

                                {/* Start Date */}
                                <div className="mb-3 d-flex align-items-center">
                                    <div className="w-25">Start date</div>
                                    <input
                                        type="datetime-local"
                                        className="w-100"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        min="2023-06-21T00:00"
                                    />
                                </div>

                                {/* Dealine */}
                                <div className="mb-3 d-flex align-items-center">
                                    <div className="w-25">Deadline</div>
                                    <input
                                        type="datetime-local"
                                        className="w-100"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                        min="2023-06-21T00:00"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <div className="position-absolute end-3 bottom-5">
                        <Button variant="secondary" className="me-3" onClick={hide}>
                            Hủy bỏ
                        </Button>
                        <Button onClick={handleSubmitEditTask}>Lưu thay đổi</Button>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default ModalEditTask;
