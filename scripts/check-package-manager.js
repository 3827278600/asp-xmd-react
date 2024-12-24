import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function checkPackageManager() {
  // 读取配置文件
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const configPath = path.resolve(__dirname, '../project.config.json');

  let packageManager;
  try {
    const configFile = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configFile);
    packageManager = config?.packageManager?.type;

    if (!packageManager) {
      throw new Error('未配置包管理器类型');
    }
  } catch {
    // eslint-disable-next-line no-console
    console.error('\x1b[31m%s\x1b[0m', '错误: 请在 project.config.json 中配置包管理器类型');
    process.exit(1);
  }

  const userAgent = process.env.npm_config_user_agent;
  const currentManager = userAgent?.split('/')[0];

  if (currentManager !== packageManager) {
    // eslint-disable-next-line no-console
    console.error('\x1b[31m%s\x1b[0m', `错误: 该项目强制要求使用 ${packageManager}!`);
    // eslint-disable-next-line no-console
    console.error('\x1b[33m%s\x1b[0m', '当前使用的是:', userAgent || '未知工具');
    // eslint-disable-next-line no-console
    console.error(
      '\x1b[33m%s\x1b[0m',
      `正确示例: ${packageManager} install / ${packageManager} run dev`,
    );

    process.exit(1);
  }
}

checkPackageManager();
