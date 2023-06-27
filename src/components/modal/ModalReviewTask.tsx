import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { saveReview } from '../../pages/Home/doneSlice';
import { ListJobProps } from '../../Model/ListJob';
import { useState } from 'react';
import { addNotify } from '../Notification/notifycationSlice';

interface ModalReviewTaskProps {
    job: ListJobProps;
    show: boolean;
    hide: () => void;
}

function ModalReviewTask({ job, show, hide }: ModalReviewTaskProps) {
    const [review, setReview] = useState(job.review);
    const [isDisabled, setIsDisabled] = useState(!!job.review);
    const dispatch = useDispatch();

    const handleSaveReview = () => {
        dispatch(
            saveReview({
                id: job.id,
                data: review,
            }),
        );
        hide();
        if (review) setTimeout(() => setIsDisabled(true), 1000);
        dispatch(
            addNotify({
                type: 'success',
                text: `Đánh giá công việc *${job.task}* thành công`,
            }),
        );
    };
    return (
        <Modal size="lg" show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center">
                    <div>Đánh giá công việc</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="fs-5">
                <Form.Group className="mb-3" controlId="ControlTextarea1">
                    <Form.Control
                        as="textarea"
                        rows={8}
                        value={review}
                        disabled={isDisabled}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                {job.review ? (
                    <Button
                        variant="info"
                        onClick={() => {
                            setIsDisabled(false);
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                ) : (
                    <div></div>
                )}

                <div className="d-flex">
                    {isDisabled && <Button onClick={hide}>Xong</Button>}
                    {!isDisabled && (
                        <Button variant="success" onClick={handleSaveReview} className="ms-3">
                            Lưu thay đổi
                        </Button>
                    )}
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalReviewTask;
