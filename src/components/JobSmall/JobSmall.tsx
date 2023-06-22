import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProgressBar } from 'react-bootstrap';

import { ListJobProps } from '../../Model/ListJob';
import moment from 'moment';

interface jobSmallProps {
    job: ListJobProps;
}

const JobSmall: React.FC<jobSmallProps> = ({ job }) => {
    const doneStep = Math.floor(
        (job.steps.reduce((done, step) => (step.stt === 'Done' ? done + 1 : done), 0) /
            job.steps.length) *
            100,
    );
    return (
        <div className="mb-3">
            <div className="">{job.task}</div>
            <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faClockRotateLeft} size="xs" />
                <div className="ms-2 fw-medium" style={{ minWidth: '23%' }}>
                    {moment(job.deadline).format('HH:mm DD-MM')}
                </div>
                <div className="flex-grow-1 position-relative">
                    <div className="linear-color small position-absolute end-0 bottom-50">
                        {doneStep}%
                    </div>
                    <ProgressBar now={doneStep} className="ms-2 mt-2" />
                </div>
            </div>
        </div>
    );
};

export default JobSmall;
