const path = require('path')
module.exports = {
  base: '/underscore-analysis/',
  // base: '/',
  title: '',
  description: '',
  head: [
    ['link', { rel: 'icon', href: '/images/underscore.png' }],
  ],
  markdown: {
    lineNumbers: true
  },
  evergreen: true,
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'wencaizhang/underscore-analysis',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: 'GitHub',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'wencaizhang/underscore-analysis',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！',
    nav: [
      {text: '主页', link: '/'},
      {text: 'Issues', link: 'https://github.com/wencaizhang/underscore-analysis/issues'},
    ],
    sidebar: [

    ]
  },
}
