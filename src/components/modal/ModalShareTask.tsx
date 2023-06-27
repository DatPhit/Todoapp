import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteTodo, shareJobTodo } from '../../pages/Home/todoSlice';
import { deleteProcess, shareJobProcess } from '../../pages/Home/processSlice';
import { deleteDone, shareJobDone } from '../../pages/Home/doneSlice';
import { ListJobProps } from '../../Model/ListJob';
import { listGroup, listGroupProps } from '../../Model/listGroup';

interface ModalShareTaskProps {
    job: ListJobProps;
    show: boolean;
    hide: () => void;
}

function ModalShareTask({ job, show, hide }: ModalShareTaskProps) {
    const dispatch = useDispatch();
    const handleShareSubmit = (group: listGroupProps) => {
        const jobStatus = job.status;
        if (jobStatus === 'Todo') {
            dispatch(
                shareJobTodo({
                    id: job.id,
                    groupShare: group.name,
                }),
            );
        }
        if (jobStatus === 'Processing') {
            dispatch(
                shareJobProcess({
                    id: job.id,
                    groupShare: group.name,
                }),
            );
        }
        if (jobStatus === 'Done') {
            dispatch(
                shareJobDone({
                    id: job.id,
                    groupShare: group.name,
                }),
            );
        }
    };
    return (
        <Modal show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faShareFromSquare} />
                    <div className="ms-2"> Chia sẻ công việc</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="fs-5">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên nhóm</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listGroup.map((group, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{group.name}</td>
                                <td className="d-flex justify-content-end">
                                    <Button
                                        disabled={job.group_shared?.includes(group.name)}
                                        onClick={() => handleShareSubmit(group)}
                                    >
                                        Chia sẻ
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>
                    Xong
                </Button>

                {/* <Button variant="danger" onClick={handleShareSubmit}>
                    Xóa
                </Button> */}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalShareTask;
