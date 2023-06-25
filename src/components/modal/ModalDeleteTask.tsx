import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../pages/Home/todoSlice';
import { deleteProcess } from '../../pages/Home/processSlice';
import { deleteDone } from '../../pages/Home/doneSlice';
import { ListJobProps } from '../../Model/ListJob';

interface ModalDeleteTaskProps {
    job: ListJobProps;
    show: boolean;
    hide: () => void;
}

function ModalDeleteTask({ job, show, hide }: ModalDeleteTaskProps) {
    const dispatch = useDispatch();
    const handleDeleteITem = () => {
        const jobStatus = job.status;
        if (jobStatus === 'Todo') {
            dispatch(deleteTodo(job.id));
        }
        if (jobStatus === 'Processing') {
            dispatch(deleteProcess(job.id));
        }
        if (jobStatus === 'Done') {
            dispatch(deleteDone(job.id));
        }
    };
    return (
        <Modal show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faTrashCan} />
                    <div className="ms-2"> Xoá công việc</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="fs-5">
                Bạn có chắc chắn muốn xoá công việc <b>{job.task}</b> ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>
                    Hủy bỏ
                </Button>

                <Button variant="danger" onClick={handleDeleteITem}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteTask;
