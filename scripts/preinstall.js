if (process.env.npm_execpath.indexOf('npm') === -1) {
  console.error('\x1b[31m%s\x1b[0m', '请使用 npm 作为包管理工具!');
  process.exit(1);
}

const requiredVersion = '18.0.0';
const currentVersion = process.version;

if (compareVersions(currentVersion, requiredVersion) < 0) {
  console.error(
    '\x1b[31m%s\x1b[0m',
    `Node.js 版本必须 >= ${requiredVersion}，当前版本: ${currentVersion}`,
  );
  process.exit(1);
}

function compareVersions(a, b) {
  const pa = a.slice(1).split('.');
  const pb = b.split('.');
  for (let i = 0; i < 3; i++) {
    const na = Number(pa[i]);
    const nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }
  return 0;
}
