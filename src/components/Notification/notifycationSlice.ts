import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: [
        { type: 'success', text: 'Bạn đã đăng nhập thành công' },
        {
            type: 'success',
            text: 'Công việc *Chuẩn bị buổi họp dự án* đã chuyển sang trạng thái Done',
        },
        { type: 'warning', text: 'Công việc *Kiểm tra hệ thống bảo mật* sắp dến hạn' },
        {
            type: 'success',
            text: 'Bạn đã chia sẻ công việc *Thực hiện kiểm thử phần mềm* vào Nhóm Nhật ngành',
        },
        { type: 'share', text: 'Văn Bảo vừa chia sẻ công việc. Giúp Bảo nào' },
        { type: 'warning', text: 'Công việc *Tạo giao diện người dùng* sắp dến hạn' },
        {
            type: 'success',
            text: 'Bạn đã chia sẻ công việc *Thực hiện kiểm thử phần mềm* vào Nhóm ITSS',
        },
        { type: 'danger', text: 'Công việc Kiểm tra hệ thống bảo mật đã quá hạn' },
        {
            type: 'info',
            text: 'Công việc *Đặt vé xem phim* đã chuyển sang trạng thái Processing',
        },
        {
            type: 'success',
            text: 'Bạn đã chia sẻ công việc *Thực hiện kiểm thử phần mềm* vào Nhóm Hero',
        },
        { type: 'success', text: 'Công việc *Hoàn Thành bài tập lớn* đã hoàn thành' },
        { type: 'success', text: 'Bạn đã thêm công việc mới thành công' },
        {
            type: 'share',
            text: 'Bạn đã giúp Trần Bình hoàn thành công việc Xây dựng kế hoạch marketing',
        },
    ],
    reducers: {
        addNotify: (state, action) => {
            state.unshift(action.payload);
        },
    },
});

export const { addNotify } = notificationSlice.actions;

export default notificationSlice.reducer;
