module.exports = {
    git: {
        // 具体参考源码 https://github.com/release-it/release-it/blob/master/lib/plugin/git/Git.js
        addUntrackedFiles: true,
        commitMessage: 'chore: release v${version}',
    },
    // 默认需要 GITHUB_TOKEN 环境变量，可以通过 tokenRef 定制
    github: {
        release: true,
        // 由于我们之前已经配置过 GH_TOKEN，就继续用 GH_TOKEN 吧
        tokenRef: 'GH_TOKEN',
    },
    plugins: {
        '@release-it/conventional-changelog': {
            preset: 'angular',
            infile: 'CHANGELOG.md',
        },
    },
    npm: {
        // 不做 npm publish 操作，交给 ci/cd 执行
        publish: false,
    },
    hooks: {
        // 更新子包版本号
        "before:init": "yarn determine-packages-version",
        'after:release': 'echo Successfully released ${name} v${version} to ${repo.repository}.',
    },
}
