import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import './Home.scss';
import CardJob from '../../components/CardJob/CardJob';
import { filterListSelector } from '../../redux/selectors';
import { ListJobProps } from '../../Model/ListJob';
import Filter from '../../components/Filter/Filter';

import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import { changeOrderTodo, changeStatusToTodo, deleteTodo, moveToTodo } from './todoSlice';
import {
    changeOrderProcess,
    changeStatusToProcessing,
    deleteProcess,
    moveToProcessing,
} from './processSlice';
import { changeOrderDone, changeStatusToDone, deleteDone, moveToDone } from './doneSlice';
import { addNotify } from '../../components/Notification/notifycationSlice';

function Home() {
    // Redux
    const dispatch = useDispatch();

    const list = useSelector(filterListSelector);
    const todoListFilter: ListJobProps[] = [];
    const processListFilter: ListJobProps[] = [];
    const doneListFilter: ListJobProps[] = [];

    // Lọc ra những job là việc chia sẻ nhưng không liên quan đến user
    const newlist = list.filter((job) => {
        if (job.type === 'Việc được chia sẻ') {
            return job.owner === 'Quang Đạt' || job.helpers?.includes('Quang Đạt');
        } else return job;
    });

    // Phân chia job vào các cột
    newlist.map((job) => {
        if (job.status === 'Todo') todoListFilter.push(job);
        if (job.status === 'Processing') processListFilter.push(job);
        if (job.status === 'Done') doneListFilter.push(job);
    });

    // console.log('todoListFilter: ', todoListFilter);
    // console.log('processListFilter: ', processListFilter);
    // console.log('doneListFilter: ', doneListFilter);

    // Drag and drop
    const handleDragEnd = (result: DropResult) => {
        // console.log(result);
        if (!result.destination) return;

        // Thông báo
        const data = newlist.find((job) => job.id.toString() === result.draggableId);
        if (
            result.source.droppableId !== 'Processing' &&
            result.destination.droppableId === 'Processing'
        ) {
            dispatch(
                addNotify({
                    type: 'info',
                    text: `Công việc *${data?.task}* đã chuyển sang trạng thái Processing`,
                }),
            );
        }

        if (result.source.droppableId !== 'Done' && result.destination.droppableId === 'Done') {
            dispatch(
                addNotify({
                    type: 'success',
                    text: `Công việc *${data?.task}* đã chuyển sang trạng thái Done`,
                }),
            );
        }

        if (result.source.droppableId !== 'Todo' && result.destination.droppableId === 'Todo') {
            dispatch(
                addNotify({
                    type: 'normal',
                    text: `Công việc *${data?.task}* đã chuyển sang trạng thái Todo`,
                }),
            );
        }

        // Drag từ cột todo
        if (result.source.droppableId === 'Todo') {
            const data = todoListFilter.find((job) => job.id.toString() === result.draggableId);
            if (result.destination.droppableId === 'Processing') {
                dispatch(
                    moveToProcessing({
                        data,
                        index: result.destination.index,
                    }),
                );
                dispatch(deleteTodo(data?.id));
                dispatch(changeStatusToProcessing(result.destination.index));
            }

            if (result.destination.droppableId === 'Done') {
                dispatch(
                    moveToDone({
                        data,
                        index: result.destination.index,
                    }),
                );
                dispatch(deleteTodo(data?.id));
                dispatch(changeStatusToDone(result.destination.index));
            }

            if (result.destination.droppableId === 'Todo') {
                dispatch(
                    changeOrderTodo({
                        from: result.source.index,
                        to: result.destination.index,
                    }),
                );
            }
        }

        // Drag từ cột Process
        if (result.source.droppableId === 'Processing') {
            const data = processListFilter.find((job) => job.id.toString() === result.draggableId);
            if (result.destination.droppableId === 'Todo') {
                dispatch(
                    moveToTodo({
                        data,
                        index: result.destination.index,
                    }),
                );
                dispatch(deleteProcess(data?.id));
                dispatch(changeStatusToTodo(result.destination.index));
            }

            if (result.destination.droppableId === 'Done') {
                dispatch(
                    moveToDone({
                        data,
                        index: result.destination.index,
                    }),
                );
                dispatch(deleteProcess(data?.id));
                dispatch(changeStatusToDone(result.destination.index));
            }

            if (result.destination.droppableId === 'Processing') {
                dispatch(
                    changeOrderProcess({
                        from: result.source.index,
                        to: result.destination.index,
                    }),
                );
            }
        }

        // Drag từ cột Done
        if (result.source.droppableId === 'Done') {
            const data = doneListFilter.find((job) => job.id.toString() === result.draggableId);
            if (result.destination.droppableId === 'Processing') {
                dispatch(
                    moveToProcessing({
                        data,
                        index: result.destination.index,
                    }),
                );
                dispatch(deleteDone(data?.id));
                dispatch(changeStatusToProcessing(result.destination.index));
            }

            if (result.destination.droppableId === 'Todo') {
                dispatch(
                    moveToTodo({
                        data,
                        index: result.destination.index,
                    }),
                );
                dispatch(deleteDone(data?.id));
                dispatch(changeStatusToTodo(result.destination.index));
            }

            if (result.destination.droppableId === 'Done') {
                dispatch(
                    changeOrderDone({
                        from: result.source.index,
                        to: result.destination.index,
                    }),
                );
            }
        }
    };

    return (
        <div className="ms-2 me-3">
            {/* Phần Content chính */}
            <div style={{ height: '100vh' }}>
                <Row className="h-100">
                    {/* Cột bên trái chứa filter */}
                    <Col xs={1} className="p-0 d-flex flex-column" style={{ width: '6%' }}>
                        <Filter />
                    </Col>

                    {/* Cột bên phải chứa content chính */}
                    <Col className="ms-3 p-0">
                        {/* Head */}
                        <div className="home_content_header d-flex justify-content-around align-items-center shadow-sm border border-dark-subtle rounded-3">
                            <div className="d-flex align-items-center fw-medium">
                                <div className="fs-5">To do </div>
                                <span
                                    className="ms-1 center fw-medium text-white rounded-circle"
                                    style={{
                                        width: '1.8rem',
                                        height: '1.8rem',
                                        backgroundColor: 'rgb(79 97 112 / 50%)',
                                    }}
                                >
                                    {todoListFilter.length}
                                </span>
                            </div>
                            <div className="d-flex align-items-center fw-medium">
                                <div className="fs-5">Processing</div>
                                <span
                                    className="ms-1 center fw-medium text-primary rounded-circle"
                                    style={{
                                        width: '1.8rem',
                                        height: '1.8rem',
                                        backgroundColor: 'rgb(103 187 255 / 50%)',
                                    }}
                                >
                                    {processListFilter.length}
                                </span>
                            </div>
                            <div className="d-flex align-items-center fw-medium">
                                <div className="fs-5">Done</div>
                                <span
                                    className="ms-1 center fw-medium rounded-circle"
                                    style={{
                                        width: '1.8rem',
                                        height: '1.8rem',
                                        backgroundColor: 'rgb(50 205 107 / 50%)',
                                        color: 'rgb(4 64 3)',
                                    }}
                                >
                                    {doneListFilter.length}
                                </span>
                            </div>
                        </div>

                        {/* Todolist */}
                        <div className="mt-3 w-100 h-100 d-flex justify-content-between">
                            {/* Todo */}
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="Todo">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            className="overflow-y-scroll"
                                            style={{
                                                width: '32.5%',
                                                height: '93vh',
                                                backgroundColor: snapshot.isDraggingOver
                                                    ? '#D3D3D3'
                                                    : 'transparent',
                                            }}
                                            {...provided.droppableProps}
                                        >
                                            <div>
                                                {todoListFilter.map((TodoJob, index) => (
                                                    <Draggable
                                                        // adding a key is important!
                                                        key={TodoJob.id}
                                                        draggableId={TodoJob.id.toString()}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <CardJob Job={TodoJob} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                                {/* Processing */}
                                <Droppable droppableId="Processing">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            className="overflow-y-scroll"
                                            style={{
                                                width: '32.5%',
                                                height: '93vh',
                                                backgroundColor: snapshot.isDraggingOver
                                                    ? '#87CEFA'
                                                    : 'transparent',
                                            }}
                                            {...provided.droppableProps}
                                        >
                                            <div>
                                                {processListFilter.map((ProcessingJob, index) => (
                                                    <Draggable
                                                        // adding a key is important!
                                                        key={ProcessingJob.id}
                                                        draggableId={ProcessingJob.id.toString()}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <CardJob Job={ProcessingJob} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                                {/* Done */}
                                <Droppable droppableId="Done">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            className="overflow-y-scroll"
                                            style={{
                                                width: '32.5%',
                                                height: '93vh',
                                                backgroundColor: snapshot.isDraggingOver
                                                    ? '#90EE90'
                                                    : 'transparent',
                                            }}
                                            {...provided.droppableProps}
                                        >
                                            <div>
                                                {doneListFilter.map((doneJob, index) => (
                                                    <Draggable
                                                        // adding a key is important!
                                                        key={doneJob.id}
                                                        draggableId={doneJob.id.toString()}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <CardJob Job={doneJob} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>

                            {/* <div
                                    className="overflow-y-scroll"
                                    style={{ width: '32.5%', height: '93vh' }}
                                >
                                    {/* Card *
                                    {todoListFilter.map((TodoJob, index) => (
                                        <CardJob Job={TodoJob} key={index} index={index} />
                                    ))}
                                </div> */}

                            {/* Cột Processing */}
                            {/* <div
                                className="overflow-y-scroll"
                                style={{ width: '32.5%', height: '93vh' }}
                            >
                                {processListFilter.map((ProcessingJob, index) => (
                                    <CardJob Job={ProcessingJob} key={index} index={index} />
                                ))}
                            </div> */}

                            {/* Cột Done */}
                            {/* <div
                                className="overflow-y-scroll"
                                style={{ width: '32.5%', height: '93vh' }}
                            >
                                {doneListFilter.map((DoneJob, index) => (
                                    <CardJob Job={DoneJob} key={index} />
                                ))}
                            </div> */}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Home;
