import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import './Home.scss';
import JobSmall from '../../components/JobSmall/JobSmall';
import Notification from '../../components/Notification/Notification';
import CardJob from '../../components/CardJob/CardJob';
import {
    doneListSelector,
    filterListSelector,
    processListSelector,
    todoListSelector,
} from '../../redux/selectors';
import { ListJobProps } from '../../Model/ListJob';
import Filter from '../../components/Filter/Filter';
import { useEffect } from 'react';

function Home() {
    // Redux
    const todoList = useSelector(todoListSelector);
    const processList = useSelector(processListSelector);
    // const doneList = useSelector(doneListSelector);
    const list = useSelector(filterListSelector);
    const todoListFilter: ListJobProps[] = [];
    const processListFilter: ListJobProps[] = [];
    const doneListFilter: ListJobProps[] = [];

    list.map((job) => {
        if (job.status === 'Todo') todoListFilter.push(job);
        if (job.status === 'Processing') processListFilter.push(job);
        if (job.status === 'Done') doneListFilter.push(job);
    });

    const notDoneList = todoList
        .concat(processList)
        .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

    // Việc cá nhân chưa hoàn thành
    const individualJobs = notDoneList.filter(
        (Job: ListJobProps) => Job.type === 'Việc cá nhân' && Job.status !== 'Done',
    );

    // Việc nhóm chưa hoàn thành
    const groupJobs = notDoneList.filter(
        (Job: ListJobProps) => Job.type === 'Việc nhóm' && Job.status !== 'Done',
    );

    return (
        <div className="ms-2 me-3">
            {/* Phần đầu của content */}
            <Row className="gap-2" style={{ height: '29vh' }}>
                <Col xs={9} className="bg rounded-4">
                    <Row>
                        {/* Mục tiêu cá nhân */}
                        <Col className="home_col_head">
                            <div className="home_head_content">Công việc cá nhân</div>
                            <div className="overflow-y-scroll" style={{ height: '80%' }}>
                                <div className="mt-3 mx-4 ">
                                    {individualJobs.map((job, index) => (
                                        <JobSmall job={job} key={index} />
                                    ))}
                                </div>
                            </div>
                        </Col>

                        {/* Mục tiêu nhóm */}
                        <Col className="home_col_head ms-2">
                            <div className="home_head_content">Công việc nhóm</div>
                            <div className="overflow-y-scroll" style={{ height: '80%' }}>
                                <div className="mt-3 mx-4">
                                    {groupJobs.map((job, index) => (
                                        <JobSmall job={job} key={index} />
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>

                {/* Notification */}
                <Col className="bg home_col_head ms-2" style={{ backgroundColor: '#343446' }}>
                    <div className="home_head_content home_notifyication">
                        Thông báo
                        <div className="position-relative">
                            <FontAwesomeIcon icon={faBell} />
                            <span className="position-absolute top-20 right-20 translate-middle p-1 bg-danger rounded-circle">
                                <span className="visually-hidden">New alerts</span>
                            </span>
                        </div>
                    </div>
                    <div className="overflow-y-scroll" style={{ height: '80%' }}>
                        <div className="mt-2 mx-3">
                            <Notification type="success" text="Bạn đã đăng nhập thành công" />
                            <Notification type="warning" text="Công việc sắp dến hạn" />
                            <Notification
                                type="success"
                                text="Bạn đã thêm công việc mới thành công"
                            />
                            <Notification type="danger" text="Công việc  đã quá hạn" />
                            <Notification type="warning" text="Công việc sắp dến hạn" />
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Phần Content chính */}
            <div className="mt-3" style={{ height: '69.3vh' }}>
                <Row className="h-100">
                    {/* Cột bên trái chứa filter */}
                    <Col xs={1} className="p-0 d-flex flex-column   " style={{ width: '6%' }}>
                        <Filter />
                    </Col>

                    {/* Cột bên phải chứa content chính */}
                    <Col className="ms-3 p-0">
                        {/* Head */}
                        <div className="home_content_header d-flex justify-content-around align-items-center rounded-3">
                            <div className="d-flex align-items-center">
                                <div>To do task</div>
                                <span
                                    className="ms-1 center small fw-medium text-bg-secondary rounded-circle"
                                    style={{ width: '1.6rem', height: '1.6rem' }}
                                >
                                    {todoListFilter.length}
                                </span>
                            </div>
                            <div className="d-flex align-items-center">
                                <div>In process</div>
                                <span
                                    className="ms-1 center small fw-medium text-info rounded-circle"
                                    style={{
                                        width: '1.6rem',
                                        height: '1.6rem',
                                        backgroundColor: '#4e677b',
                                    }}
                                >
                                    {processListFilter.length}
                                </span>
                            </div>
                            <div className="d-flex align-items-center">
                                <div>Done</div>
                                <span
                                    className="ms-1 center small fw-medium rounded-circle"
                                    style={{
                                        width: '1.6rem',
                                        height: '1.6rem',
                                        backgroundColor: '#51715d',
                                        color: '#5eff5a',
                                    }}
                                >
                                    {doneListFilter.length}
                                </span>
                            </div>
                        </div>

                        {/* Todolist */}
                        <div className="mt-3 w-100 h-100 d-flex justify-content-between">
                            {/* Cột to-do */}

                            <div
                                className="overflow-y-scroll"
                                style={{ width: '32.5%', height: '63.8vh' }}
                            >
                                {/* Card */}
                                {todoListFilter.map((TodoJob, index) => (
                                    <CardJob Job={TodoJob} key={index} index={index} />
                                ))}
                            </div>

                            {/* Cột Processing */}
                            <div
                                className="overflow-y-scroll"
                                style={{ width: '32.5%', height: '63.8vh' }}
                            >
                                {/* Card */}
                                {processListFilter.map((ProcessingJob, index) => (
                                    <CardJob Job={ProcessingJob} key={index} index={index} />
                                ))}
                            </div>

                            {/* Cột Done */}
                            <div
                                className="overflow-y-scroll"
                                style={{ width: '32.5%', height: '63.8vh' }}
                            >
                                {/* Card */}
                                {doneListFilter.map((DoneJob, index) => (
                                    <CardJob Job={DoneJob} key={index} />
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Home;
