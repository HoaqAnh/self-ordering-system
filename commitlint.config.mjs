export default {
   extends: ['@commitlint/config-conventional'],
   rules: {
      'type-enum': [
         2,
         'always',
         [
            'feat', // Tính năng mới
            'fix', // Sửa lỗi
            'docs', // Thêm/sửa tài liệu
            'style', // Format code, thiếu chấm phẩy... (không ảnh hưởng logic)
            'refactor', // Sửa code nhưng không thêm tính năng hay sửa lỗi
            'perf', // Tối ưu hiệu năng
            'test', // Thêm test case
            'chore', // Cập nhật cấu hình build, package...
            'revert', // Khôi phục commit cũ
         ],
      ],
   },
};
