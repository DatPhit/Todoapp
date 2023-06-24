import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { listGroupNameJobs, listWorkplaceJobs } from '../../Services/ProjectsService';

import { addTodo } from '../Home/todoSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const { v4: uuidv4 } = require('uuid');

function AddTask() {
    const [task, setTask] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');
    const [workplace, setWorkplace] = useState('');
    const [type, setType] = useState('Việc cá nhân');
    const [priority, setPriority] = useState<boolean>(false);
    const [stepValues, setStepValues] = useState(['', '']);
    const [groupname, setGroupname] = useState('');

    const linkRef = useRef<HTMLAnchorElement>(null);

    // Steps
    const handleStepChange = (index: number, value: string) => {
        setStepValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };
    const [numSteps, setNumSteps] = useState(2);
    const additionalSteps = [];
    for (let i = 0; i < numSteps; i++) {
        additionalSteps.push(
            <div key={i}>
                <Form.Group className="mb-3">
                    <Form.Label>Step {i + 1}</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        value={stepValues[i]}
                        onChange={(e) => handleStepChange(i, e.target.value)}
                    />
                </Form.Group>
            </div>,
        );
    }
    const handleAddStep = () => {
        setNumSteps((prev) => prev + 1);
    };

    // Redux
    const dispatch = useDispatch();

    const handleAddTask = () => {
        const steps = stepValues.map((step) => ({
            name: step,
            stt: 'Todo',
        }));
        dispatch(
            addTodo({
                id: uuidv4(),
                task,
                status: 'Todo',
                deadline,
                steps,
                description,
                workplace,
                type,
                priority,
                groupname,
            }),
        );
        linkRef.current?.click();
    };

    return (
        <div
            className="h-100 rounded-4 position-relative"
            style={{ backgroundColor: '#f0f8ff', marginLeft: '-1rem' }}
        >
            <h2 className="ms-5 pt-3" style={{ color: '#8B008B' }}>
                Thêm công việc mới{' '}
            </h2>
            <hr className="ms-5" />
            <Form className="mt-3 mx-5">
                <Row>
                    <Col className="addtask_colleft">
                        {/* Type */}
                        <div className="mb-3 d-flex">
                            <div className="w-25">Type</div>
                            <Form.Select
                                className="w-50"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="Việc cá nhân">Việc cá nhân</option>
                                <option value="Việc nhóm">Việc nhóm</option>
                            </Form.Select>
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
                        {additionalSteps.map((step) => step)}

                        {/* Button add step */}
                        <Button className="mt-2" onClick={handleAddStep}>
                            Add step
                            <FontAwesomeIcon className="ms-2" icon={faPlus} />
                        </Button>
                    </Col>
                    <Col className="position-relative">
                        {/* workplace */}
                        <div className="mb-3 d-flex">
                            <div className="w-25">Workplace</div>
                            <Form.Control
                                list="optionsworkplace"
                                value={workplace}
                                onChange={(e) => setWorkplace(e.target.value)}
                            />
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
                                        list="optionsGroupname"
                                        value={groupname}
                                        onChange={(e) => setGroupname(e.target.value)}
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
                            <Form.Check
                                className="w-100 fs-5"
                                aria-label="Priority"
                                checked={priority}
                                onChange={(e) => setPriority(e.target.checked)}
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
                        <div className="position-absolute end-3 bottom-0">
                            <Button variant="secondary" className="me-3">
                                Cancel
                            </Button>
                            <Button onClick={handleAddTask}>Add Task</Button>
                            <Link to="/" ref={linkRef}></Link>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default AddTask;
