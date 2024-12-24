module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'feat', // 新功能
          'fix', // 修复bug
          'docs', // 文档更新
          'style', // 代码格式（不影响代码运行的变动）
          'refactor', // 重构（既不是新增功能，也不是修复bug）
          'perf', // 性能优化
          'test', // 增加测试
          'chore', // 构建过程或辅助工具的变动
          'revert', // 回退
          'build', // 打包
        ],
      ],
    },
  };
  