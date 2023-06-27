import { Table } from 'react-bootstrap';
import moment from 'moment';
import { listGroupProps } from '../../Model/listGroup';
import { ListJob } from '../../Model/ListJob';
interface ListJobPageProps {
    group: listGroupProps;
}
function ListJobPage({ group }: ListJobPageProps) {
    const listJobsOfGrounp = ListJob.filter((job) => job.groupname === group.name);
    listJobsOfGrounp.sort((a, b) => {
        const order = ['Todo', 'Processing', 'Done'];
        return order.indexOf(a.status) - order.indexOf(b.status);
    });
    return (
        <Table bordered hover className="fs-5">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tên công việc</th>
                    <th>Trạng thái</th>
                    <th>Mức độ ưu tiên</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                </tr>
            </thead>
            <tbody>
                {listJobsOfGrounp.map((job, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{job.task}</td>
                        <td>{job.status}</td>
                        <td>{job.priority}</td>
                        <td>{moment(job.start_date).format('HH:mm DD-MM-YYYY')}</td>
                        <td>{moment(job.deadline).format('HH:mm DD-MM-YYYY')}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ListJobPage;
