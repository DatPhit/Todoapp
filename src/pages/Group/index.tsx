import CardGroup from '../../components/card-group/CardGroup';
import { listGroup } from '../../Model/listGroup';

function Group() {
    return (
        <div className="d-flex flex-wrap">
            {listGroup.map((group, index) => (
                <CardGroup key={index} group={group} />
            ))}
        </div>
    );
}

export default Group;
