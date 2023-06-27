import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardGroup from '../../components/card-group/CardGroup';
import { listGroup } from '../../Model/listGroup';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Group() {
    return (
        <div className="d-flex flex-wrap">
            {listGroup.map((group, index) => (
                <CardGroup key={index} group={group} />
            ))}
            <div
                className="ms-3 me-4 mb-5 border border-black shadow-sm center flex-column"
                style={{ width: 300, height: 300, background: 'var(--background-color)' }}
            >
                <FontAwesomeIcon icon={faPlus} style={{ width: 170, height: 170 }} />
                <div className="fw-medium fs-4">Thêm nhóm</div>
            </div>
        </div>
    );
}

export default Group;
