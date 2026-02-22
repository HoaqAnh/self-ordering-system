import prettier from 'eslint-config-prettier';

export const sharedRules = {
   // Cảnh báo khi dùng console.log (nên dùng console.error hoặc logger riêng)
   'no-console': ['warn', { allow: ['warn', 'error'] }],
};

export const sharedConfig = [
   {
      rules: sharedRules,
   },
   prettier,
];
