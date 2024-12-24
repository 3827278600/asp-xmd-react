function checkPackageManager() {
  const userAgent = process.env.npm_config_user_agent;
  const isUsingNpm = userAgent?.startsWith('npm/'); // 更严格的 npm 检查

  if (!isUsingNpm) {
    console.error('\x1b[31m%s\x1b[0m', '错误: 必须使用 npm 作为包管理工具!');
    console.error('\x1b[33m%s\x1b[0m', '当前使用的是:', userAgent || '未知工具');
    console.error('\x1b[33m%s\x1b[0m', '正确示例: npm install / npm run dev / npm run build');

    // 立即终止进程
    process.exit(1);
  }
}

checkPackageManager();
