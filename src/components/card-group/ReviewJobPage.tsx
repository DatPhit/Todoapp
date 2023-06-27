import { Table } from 'react-bootstrap';
import { listGroupProps } from '../../Model/listGroup';
import { ListJob } from '../../Model/ListJob';
interface ReviewJobPageProps {
    group: listGroupProps;
}
function ReviewJobPage({ group }: ReviewJobPageProps) {
    const listJobsOfGrounp = ListJob.filter((job) => job.groupname === group.name && job.review);
    return (
        <Table bordered className="fs-5">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tên công việc</th>
                    <th>Đánh giá</th>
                </tr>
            </thead>
            <tbody>
                {listJobsOfGrounp.map((job, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{job.task}</td>
                        <td>{job.review}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ReviewJobPage;
