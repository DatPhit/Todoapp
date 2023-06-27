import { useDispatch } from 'react-redux';
import { deadlineAsDeFilterChange, priorityFilterChange, typeFilterChange } from './FilterSlice';

interface QuickFiterProps {
    type: string;
    setType: (type: string) => void;

    deadlineAsDe: string;
    setDeadlineAsDe: (deadlineAsDe: string) => void;

    priority: string;
    setPriority: (priority: string) => void;
}

function QuickFilter({
    type,
    setType,
    deadlineAsDe,
    setDeadlineAsDe,
    priority,
    setPriority,
}: QuickFiterProps) {
    const dispatch = useDispatch();

    const handleClickButtonType = (e: React.MouseEvent<HTMLButtonElement>) => {
        setType(e.currentTarget.value);
        dispatch(typeFilterChange(e.currentTarget.value));
    };

    const handleClickButtonDate = (e: React.MouseEvent<HTMLButtonElement>) => {
        setDeadlineAsDe(e.currentTarget.value);
        dispatch(deadlineAsDeFilterChange(e.currentTarget.value));
    };

    const handleClickButtonPriority = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPriority(e.currentTarget.value);
        dispatch(priorityFilterChange(e.currentTarget.value));
    };

    return (
        <div className="overflow-y-scroll" style={{ height: '93vh' }}>
            <div
                className="mt-3 flex-grow-1 d-flex flex-column align-items-center border border-dark-subtle rounded-3"
                style={{ backgroundColor: 'var(--background-status-bar)' }}
            >
                {/*  lọc công việc theo type */}
                <div className="mt-2 mb-3 fw-medium ">Type</div>
                <button
                    className={`filter_type mb-4 ${type === 'ALL' && 'type_active'}`}
                    value="ALL"
                    onClick={(e) => handleClickButtonType(e)}
                >
                    ALL
                </button>
                <button
                    className={`filter_type mb-4 ${type === 'Việc cá nhân' && 'type_active'}`}
                    value="Việc cá nhân"
                    onClick={(e) => handleClickButtonType(e)}
                >
                    Me
                </button>
                <button
                    className={`filter_type mb-4 ${type === 'Việc nhóm' && 'type_active'}`}
                    value="Việc nhóm"
                    onClick={(e) => handleClickButtonType(e)}
                >
                    Group
                </button>
                <button
                    className={`filter_type mb-4 ${type === 'Việc được chia sẻ' && 'type_active'}`}
                    value="Việc được chia sẻ"
                    onClick={(e) => handleClickButtonType(e)}
                >
                    Shared
                </button>

                {/* Lọc công việc theo độ ưu tiên */}
                <div className="mt-2 mb-3 fw-medium ">Priority</div>
                <button
                    className={`filter_type mb-4 ${priority === 'not' && 'type_active'}`}
                    value="not"
                    onClick={(e) => handleClickButtonPriority(e)}
                >
                    ALL
                </button>

                <button
                    className={`filter_type mb-4 ${priority === 'Low' && 'type_active'}`}
                    value="Low"
                    onClick={(e) => handleClickButtonPriority(e)}
                >
                    Low
                </button>

                <button
                    className={`filter_type mb-4 ${priority === 'Normal' && 'type_active'}`}
                    value="Normal"
                    onClick={(e) => handleClickButtonPriority(e)}
                >
                    Normal
                </button>

                <button
                    className={`filter_type mb-4 ${priority === 'Medium' && 'type_active'}`}
                    value="Medium"
                    onClick={(e) => handleClickButtonPriority(e)}
                >
                    Medium
                </button>

                <button
                    className={`filter_type mb-4 ${priority === 'High' && 'type_active'}`}
                    value="High"
                    onClick={(e) => handleClickButtonPriority(e)}
                >
                    High
                </button>

                {/*  lọc công việc theo Date */}
                <div className="mt-2 mb-3 fw-medium ">Date</div>
                <button
                    className={`filter_type mb-4 ${deadlineAsDe === '' && 'type_active'}`}
                    value=""
                    onClick={(e) => handleClickButtonDate(e)}
                >
                    Default
                </button>
                <button
                    className={`filter_type mb-4 ${deadlineAsDe === 'asc' && 'type_active'}`}
                    value="asc"
                    onClick={(e) => handleClickButtonDate(e)}
                >
                    ASC
                </button>
                <button
                    className={`filter_type mb-4 ${deadlineAsDe === 'desc' && 'type_active'}`}
                    value="desc"
                    onClick={(e) => handleClickButtonDate(e)}
                >
                    DESC
                </button>
            </div>
        </div>
    );
}

export default QuickFilter;
