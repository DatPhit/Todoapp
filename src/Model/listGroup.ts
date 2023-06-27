// | 'Nhóm UI_UX'
// | 'Nhóm Hero'
// | 'Nhóm ITSS'
// | 'Nhóm Nhật ngành'
// | 'Nhóm thực tập';

import { groupsProps } from './ListJob';

export interface memberProps {
    name: string;
    role: 'Owner' | 'Member';
    avatar: string;
}

export interface listGroupProps {
    name: groupsProps;
    image: string;
    members: memberProps[];
}

export const listGroup: listGroupProps[] = [
    {
        name: 'Nhóm UI_UX',
        image: 'https://png.pngtree.com/png-vector/20220527/ourlarge/pngtree-ui-png-image_4749500.png',
        members: [
            {
                name: 'Quang Đạt',
                role: 'Owner',
                avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-circle-2/72/133-512.png',
            },
            {
                name: 'Cao Kỳ',
                role: 'Member',
                avatar: 'https://cdn2.iconfinder.com/data/icons/people-around-the-world/512/10-512.png',
            },
            {
                name: 'Minh Dũng',
                role: 'Member',
                avatar: 'https://cdn0.iconfinder.com/data/icons/kids-avatars/512/50_Kids_Icons-11-512.png',
            },
            {
                name: 'Tiến Đạt',
                role: 'Member',
                avatar: 'https://i.pinimg.com/originals/2c/8d/68/2c8d68b94893461a6ef19b1e39a54bc0.png',
            },
        ],
    },

    {
        name: 'Nhóm Hero',
        image: 'https://i.imgur.com/8vFx8GJ.png',
        members: [
            {
                name: 'Quang Đạt',
                role: 'Owner',
                avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-circle-2/72/133-512.png',
            },
            {
                name: 'Trần Bình',
                role: 'Member',
                avatar: 'https://cdn3.iconfinder.com/data/icons/diversity-avatars/64/burglar-man-white-1024.png',
            },
            {
                name: 'Lê Cường',
                role: 'Member',
                avatar: 'https://cdn3.iconfinder.com/data/icons/diversity-avatars-vol-2/64/green-hair-rave-woman-avatar-512.png',
            },
        ],
    },

    {
        name: 'Nhóm ITSS',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/11/19/hinh-nen-nhom-cute_053605976.jpg',
        members: [
            {
                name: 'Phạm Duy',
                role: 'Owner',
                avatar: 'https://cdn0.iconfinder.com/data/icons/diversity-v2-0-volume-08/64/sweater-man-white-512.png',
            },
            {
                name: 'Hoàng Gia',
                role: 'Member',
                avatar: 'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/40-School_boy-512.png',
            },
            {
                name: 'Quang Đạt',
                role: 'Member',
                avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-circle-2/72/133-512.png',
            },
            {
                name: 'Nguyễn Thu Hà',
                role: 'Member',
                avatar: 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/girl-2-1024.png',
            },
        ],
    },

    {
        name: 'Nhóm Nhật ngành',
        image: 'https://i.imgur.com/y6kU9Of.jpg',
        members: [
            {
                name: 'Minh Dũng',
                role: 'Owner',
                avatar: 'https://cdn0.iconfinder.com/data/icons/kids-avatars/512/50_Kids_Icons-11-512.png',
            },
            {
                name: 'Cao Kỳ',
                role: 'Member',
                avatar: 'https://cdn2.iconfinder.com/data/icons/people-around-the-world/512/10-512.png',
            },
            {
                name: 'Quang Đạt',
                role: 'Member',
                avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-circle-2/72/133-512.png',
            },
            {
                name: 'Văn Bảo',
                role: 'Member',
                avatar: 'https://cdn4.iconfinder.com/data/icons/people-avatar-filled-outline/64/man_adult_mustache_people_woman_father_avatar-512.png',
            },
        ],
    },

    {
        name: 'Nhóm Thực tập',
        image: 'https://pro2-bar-s3-cdn-cf.myportfolio.com/13c4b309-b05b-4c99-a9d9-1fa878cc6980/10dd1305-07ad-40f6-89b2-57d059bef8cf_carw_4x3x640.png?h=cb03b6046f7f208eed9009160702e6d5',
        members: [
            {
                name: 'Phạm Minh Đức',
                role: 'Owner',
                avatar: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png',
            },
            {
                name: 'Hoàng Văn Thái',
                role: 'Member',
                avatar: 'https://cdn3.iconfinder.com/data/icons/diversity-avatars-vol-2/64/charlie-chaplan-actor-entertainer-512.png',
            },
            {
                name: 'Đỗ Thị Hà',
                role: 'Member',
                avatar: 'https://cdn4.iconfinder.com/data/icons/people-avatar-filled-outline/64/girl_Islam_beautiful_people_woman_hijab_avatar-512.png',
            },
            {
                name: 'Nguyễn Văn Kiên',
                role: 'Member',
                avatar: 'https://cdn4.iconfinder.com/data/icons/occupation-and-people-avatar-vol-2-1/128/man_avatar_assistant_career_people_male_co-founder-512.png',
            },
            {
                name: 'Quang Đạt',
                role: 'Member',
                avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-circle-2/72/133-512.png',
            },
        ],
    },
];

// const listName = [''];
// listGroup.forEach((group) => {
//     group.members.forEach((member) => {
//         if (!listName.includes(member.name)) {
//             listName.push(member.name);
//         }
//     });
// });

// export { listName };
