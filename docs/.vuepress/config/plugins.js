// 插件配置
module.exports = [
  // 自定义插件，即本地插件
  // https://vercel.com/guoshunfa/twikoo
  // mongodb://pandaComment:pandaComment@8.141.66.12:27017/comment
  [
    {
      name: 'custom-plugins',
      globalUIComponents: ["BlockToggle", "GlobalTip", "Aplayer", "Twikoo"] // 2.x 版本 globalUIComponents 改名为 clientAppRootComponentFiles
    }
  ],
  [
    'one-click-copy',
    {
      // 代码块复制按钮
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
      copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false, // whether to display on the mobile side, default: false.
    },
  ],
  [
    '@vuepress/last-updated', // "上次更新"时间格式
    {
      transformer: (timestamp, lang) => {
        const dayjs = require('dayjs') // https://day.js.org/
        return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss');
      },
    },
  ],
  // https://github.com/leo-buneev/vuepress-plugin-fulltext-search
  // 全文搜索
  'fulltext-search',
  [
    'vuepress-plugin-zooming', // 放大图片
    {
      selector: '.theme-vdoing-content img:not(.no-zoom)', // 排除 class 是 no-zoom 的图片
      options: {
        bgColor: 'rgba(0,0,0,0.6)',
      },
    },
  ],
]
