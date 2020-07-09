module.exports = {
  title: 'underscore源码分析',
  description: '📦 🎨 underscore源码分析',
  theme: 'api',
  base: '/underscore-analysis/',
  themeConfig: {
    // locales: {
    //   '/': {
    //     selectText: 'Languages',
    //     label: 'English',
    //   },
    //   '/zh/': {
    //     selectText: '选择语言',
    //     label: '简体中文',
    //   },
    // },

    // Assumes GitHub. Can also be a full GitLab url.
    // repo: 'sqrthree/vuepress-theme-api',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'wencaizhang/underscore-analysis',
    // if your docs are not at the root of the repo:
    docsDir: '/',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    // editLinkText: 'Help us improve this page',
    // lastUpdated: 'Last Updated', // string | boolean
    lastUpdated: true, // string | boolean

    // sidebarGroupOrder: [
    //   'getting-started',
    //   'configurations',
    // ],
  },
}