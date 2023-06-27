import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { listGroupProps } from '../../Model/listGroup';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

interface MemberPageProps {
    group: listGroupProps;
}

function MemberPage({ group }: MemberPageProps) {
    const adminName = 'Quang Đạt';
    const ownerOfGroup = group.members.find((mem) => mem.role === 'Owner')?.name;

    return (
        <div>
            <div className="mt-4 fs-5 fw-medium d-flex justify-content-around">
                <div className="">Tên thành viên</div>
                <div className=""></div>
                <div className="">Role</div>
            </div>
            <hr className="mb-0" />
            <div className="d-flex flex-column">
                {group.members.map((member, index) => (
                    <div key={index} className="position-relative">
                        <div className="cardgroup_member_item w-100 d-flex align-items-center">
                            <img
                                src={member.avatar}
                                alt="avatar"
                                style={{
                                    marginLeft: '6.5rem',
                                    width: '2.5rem',
                                    height: '2.5rem',
                                }}
                            />
                            <div className="ms-3 flex-grow-1">{member.name}</div>
                            <div className="fs-5" style={{ marginRight: '9rem' }}>
                                {member.role}
                            </div>
                            <div className="position-absolute end-2">
                                {ownerOfGroup === adminName && member.name !== adminName && (
                                    <FontAwesomeIcon icon={faXmark} size="xl" />
                                )}
                                {member.name === adminName && (
                                    <div className="fw-light fs-5">Bạn</div>
                                )}
                            </div>
                        </div>
                        <hr className="m-0" />
                    </div>
                ))}
                <Button
                    className="mt-3 fs-5 p-2 border"
                    style={{
                        marginLeft: '6rem',
                        width: '14rem',
                        minHeight: '3rem',
                        backgroundColor: '#DDA0DD',
                        color: 'black',
                    }}
                >
                    Thêm thành viên
                    <FontAwesomeIcon className="ms-2" icon={faPlus} />
                </Button>
            </div>
        </div>
    );
}

export default MemberPage;
