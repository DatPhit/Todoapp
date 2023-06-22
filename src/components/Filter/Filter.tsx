import { faArrowRight, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    deadlineAsDeFilterChange,
    deadlineDateFilterChange,
    groupnameFilterChange,
    priorityFilterChange,
    projectFilterChange,
    searchFilterChange,
    typeFilterChange,
} from './FilterSlice';
import './Filter.scss';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { listGroupNameJobs, listProjectJobs } from '../../Services/ProjectsService';

function Filter() {
    const [showFilter, setShowFilter] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [type, setType] = useState('ALL');
    const [deadlineDate, setDeadlineDate] = useState('2030-06-15');
    const [deadlineAsDe, setDeadlineAsDe] = useState('');
    const [project, setProject] = useState('');
    const [priority, setPriority] = useState('not');
    const [groupname, setGroupname] = useState('');

    const dispatch = useDispatch();
    const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        const buttons = document.querySelectorAll('.filter_type');
        buttons.forEach((button) => {
            button.classList.remove('type_active');
        });
        e.currentTarget.classList.add('type_active');
        dispatch(typeFilterChange(e.currentTarget.value));
    };

    const handleCancelFilter = () => {
        setSearchValue('');
        setType('ALL');
        setDeadlineDate('2030-06-15');
        setDeadlineAsDe('');
        setProject('');
        setPriority('not');
        setGroupname('');
        dispatch(deadlineAsDeFilterChange(''));
        dispatch(deadlineDateFilterChange('2030-06-15'));
        dispatch(groupnameFilterChange(''));
        dispatch(priorityFilterChange('not'));
        dispatch(projectFilterChange(''));
        dispatch(searchFilterChange(''));
        dispatch(typeFilterChange('ALL'));
        setShowFilter(false);
    };
    return (
        <>
            {/* Button filter */}
            <div className="position-relative">
                <button
                    className="p-2 center filter_button w-100 fs-6 rounded-2 position-relative"
                    onClick={() => {
                        setShowFilter(!showFilter);
                    }}
                >
                    <FontAwesomeIcon icon={faFilter} />
                    <span className=" ms-2">Filter</span>
                    {/* Options Filter */}
                </button>
                {showFilter && (
                    <div className="filter_dropdown bg-white text-dark position-absolute ">
                        <Form>
                            {/* Name task */}
                            <div className="mt-3 mb-4 d-flex align-items-center position-relative">
                                <label htmlFor="taskname" className="" style={{ width: '10.5%' }}>
                                    Name
                                </label>
                                <Form.Control
                                    id="taskname"
                                    value={searchValue}
                                    placeholder="Enter task name"
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                        dispatch(searchFilterChange(e.target.value));
                                    }}
                                />
                                {searchValue && (
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        onClick={() => {
                                            setSearchValue('');
                                            dispatch(searchFilterChange(''));
                                        }}
                                        className="p-2 position-absolute end-1"
                                    />
                                )}
                            </div>

                            <Row className="mb-2">
                                {/* Project */}
                                <Col>
                                    <div className="mb-3 d-flex align-items-center position-relative">
                                        <label htmlFor="project" className="w-25">
                                            Project
                                        </label>
                                        <Form.Control
                                            id="project"
                                            list="optionsProject"
                                            placeholder="Enter project name"
                                            value={project}
                                            onChange={(e) => {
                                                setProject(e.target.value);
                                                dispatch(projectFilterChange(e.target.value));
                                            }}
                                        />
                                        {project && (
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                onClick={() => {
                                                    setProject('');
                                                    dispatch(projectFilterChange(''));
                                                }}
                                                className="p-2 position-absolute end-1"
                                            />
                                        )}
                                    </div>
                                    <datalist id="optionsProject">
                                        {listProjectJobs.map((project, index) => (
                                            <option value={project} key={index} />
                                        ))}
                                    </datalist>
                                </Col>

                                {/* Groupname */}
                                <Col>
                                    <div className="ms-4 mb-3 d-flex align-items-center position-relative">
                                        <label
                                            htmlFor="groupname"
                                            className=""
                                            style={{ width: '40%' }}
                                        >
                                            Group name
                                        </label>
                                        <Form.Control
                                            id="groupname"
                                            list="optionsGroupname"
                                            placeholder="Enter group name"
                                            value={groupname}
                                            onChange={(e) => {
                                                setGroupname(e.target.value);
                                                dispatch(groupnameFilterChange(e.target.value));
                                            }}
                                        />
                                        {groupname && (
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                onClick={() => {
                                                    setGroupname('');
                                                    dispatch(groupnameFilterChange(''));
                                                }}
                                                className="p-2 position-absolute end-1"
                                            />
                                        )}
                                    </div>
                                    <datalist id="optionsGroupname">
                                        {listGroupNameJobs.map((group, index) => (
                                            <option value={group} key={index} />
                                        ))}
                                    </datalist>
                                </Col>
                            </Row>

                            <Row>
                                {/* Type */}
                                <Col className="mb-3 d-flex">
                                    <div className="w-25">Type</div>
                                    <div className="ms-3 d-flex flex-column">
                                        <div className="d-flex flex-row-reverse justify-content-end align-items-center">
                                            <label htmlFor="typeAll" className="ms-1 p-1">
                                                ALL
                                            </label>
                                            <Form.Check
                                                checked={type === 'ALL'}
                                                id="typeAll"
                                                name="type"
                                                type="radio"
                                                value="ALL"
                                                onChange={(e) => {
                                                    setType(e.target.value);
                                                    dispatch(typeFilterChange(e.target.value));
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex flex-row-reverse justify-content-end align-items-center">
                                            <label htmlFor="typeInvidial" className="ms-1 p-1">
                                                Cá nhân
                                            </label>
                                            <Form.Check
                                                id="typeInvidial"
                                                checked={type === 'Việc cá nhân'}
                                                name="type"
                                                type="radio"
                                                value="Việc cá nhân"
                                                onChange={(e) => {
                                                    setType(e.target.value);
                                                    dispatch(typeFilterChange(e.target.value));
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex flex-row-reverse justify-content-end align-items-center">
                                            <label htmlFor="typeGroup" className="ms-1 p-1">
                                                Nhóm
                                            </label>
                                            <Form.Check
                                                checked={type === 'Việc nhóm'}
                                                id="typeGroup"
                                                name="type"
                                                type="radio"
                                                value="Việc nhóm"
                                                onChange={(e) => {
                                                    setType(e.target.value);
                                                    dispatch(typeFilterChange(e.target.value));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Col>

                                {/* Priority */}
                                <Col className="mb-3 d-flex">
                                    <div className="w-25">Priority</div>
                                    <div className="ms-3 d-flex flex-column">
                                        <div className="d-flex flex-row-reverse justify-content-end align-items-center">
                                            <label htmlFor="priorityAll" className="ms-1 p-1">
                                                ALL
                                            </label>
                                            <Form.Check
                                                checked={priority === 'not'}
                                                id="priorityAll"
                                                name="priority"
                                                type="radio"
                                                value="not"
                                                onChange={(e) => {
                                                    setPriority(e.target.value);
                                                    dispatch(priorityFilterChange(e.target.value));
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex flex-row-reverse justify-content-end align-items-center">
                                            <label htmlFor="priorityInvidial" className="ms-1 p-1">
                                                Yes
                                            </label>
                                            <Form.Check
                                                checked={priority === 'true'}
                                                id="priorityInvidial"
                                                name="priority"
                                                type="radio"
                                                value="true"
                                                onChange={(e) => {
                                                    setPriority(e.target.value);
                                                    dispatch(priorityFilterChange(e.target.value));
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex flex-row-reverse justify-content-end align-items-center">
                                            <label htmlFor="priorityGroup" className="ms-1 p-1">
                                                No
                                            </label>
                                            <Form.Check
                                                checked={priority === 'false'}
                                                id="priorityGroup"
                                                name="priority"
                                                type="radio"
                                                value="false"
                                                onChange={(e) => {
                                                    setPriority(e.target.value);
                                                    dispatch(priorityFilterChange(e.target.value));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Col>

                                {/* Deadline */}
                                <Col>
                                    <div className="mb-3 d-flex">
                                        <div className="me-3 w-25">Deadline</div>
                                        <div className="flex-grow- d-flex flex-column">
                                            <input
                                                type="datetime-local"
                                                className="w-100"
                                                //     value={deadline}
                                                value={deadlineDate}
                                                min="2023-06-01T00:00"
                                                onChange={(e) => {
                                                    setDeadlineDate(e.target.value);
                                                    dispatch(
                                                        deadlineDateFilterChange(e.target.value),
                                                    );
                                                }}
                                            />
                                            <div className="d-flex flex-row-reverse justify-content-end align-items-center">
                                                <label htmlFor="deadlinedf" className="ms-1 p-1">
                                                    Mặc định
                                                </label>
                                                <Form.Check
                                                    checked={deadlineAsDe === ''}
                                                    id="deadlinedf"
                                                    name="deadline"
                                                    type="radio"
                                                    value=""
                                                    onChange={(e) => {
                                                        setDeadlineAsDe(e.target.value);
                                                        dispatch(
                                                            deadlineAsDeFilterChange(
                                                                e.target.value,
                                                            ),
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="d-flex flex-row-reverse justify-content-end align-items-center">
                                                <label htmlFor="deadlineasc" className="ms-1 p-1">
                                                    Gần nhất{' '}
                                                    <FontAwesomeIcon
                                                        className="mx-1"
                                                        icon={faArrowRight}
                                                    />{' '}
                                                    Xa Nhất
                                                </label>
                                                <Form.Check
                                                    checked={deadlineAsDe === 'asc'}
                                                    id="deadlineasc"
                                                    name="deadline"
                                                    type="radio"
                                                    value="asc"
                                                    onChange={(e) => {
                                                        setDeadlineAsDe(e.target.value);
                                                        dispatch(
                                                            deadlineAsDeFilterChange(
                                                                e.target.value,
                                                            ),
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="d-flex flex-row-reverse justify-content-end align-items-center">
                                                <label htmlFor="deadlinedesc" className="ms-1 p-1">
                                                    Xa nhất{' '}
                                                    <FontAwesomeIcon
                                                        className="mx-1"
                                                        icon={faArrowRight}
                                                    />{' '}
                                                    Gần Nhất
                                                </label>
                                                <Form.Check
                                                    checked={deadlineAsDe === 'desc'}
                                                    id="deadlinedesc"
                                                    name="deadline"
                                                    type="radio"
                                                    value="desc"
                                                    onChange={(e) => {
                                                        setDeadlineAsDe(e.target.value);
                                                        dispatch(
                                                            deadlineAsDeFilterChange(
                                                                e.target.value,
                                                            ),
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Form.Check label="Remember me" />
                            </Col>
                        </Form.Group> */}
                        </Form>
                        <div className="position-absolute end-1 bottom-3">
                            <Button variant="danger" className="me-3" onClick={handleCancelFilter}>
                                Xóa bộ lọc
                            </Button>
                            <Button onClick={() => setShowFilter(false)}>Xong</Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Nav lọc công việc theo type */}
            <div className="bg mt-3 flex-grow-1 d-flex flex-column align-items-center rounded-3">
                <div className="mt-2 mb-3 fw-medium ">Type</div>
                <button
                    className="filter_type type_active mb-4"
                    value="ALL"
                    onClick={handleClickButton}
                >
                    ALL
                </button>
                <button className="filter_type mb-4" value="Việc nhóm" onClick={handleClickButton}>
                    Group
                </button>
                <button
                    className="filter_type mb-4"
                    value="Việc cá nhân"
                    onClick={handleClickButton}
                >
                    Me
                </button>
            </div>
        </>
    );
}

export default Filter;
