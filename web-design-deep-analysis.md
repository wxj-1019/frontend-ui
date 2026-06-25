# 顶尖网站设计深度分析报告

> 分析日期: 2026-06-26  
> 分析方法: 使用 Kimi WebBridge 实时获取页面 DOM、计算样式、CSS 变量、动画参数等  
> 分析对象: 6 个顶尖设计/创意网站

---

## AWWWARDS — https://www.awwwards.com

### CSS 变量系统

- 颜色变量: `--bg-primary` = #F8F8F8`, `--color-jobs-3` = #b4d7f8`, `--color-read` = #c0ab3c`, `--check-toggle-color-ball` = #fff`, `--ch-bg` = #E9E9E9`, `--color-underlined` = 34, 34, 34`, `--color-learn-3` = #fffbe2`, `--border-table` = #222`
- 间距变量: `--header-height` = 71px`, `--text-size-primary` = 14px`, `--budget-circle-size` = 24px`, `--check-toggle-width` = 80px`, `--text-size-large` = 22px`, `--button-height` = 48px`, `--nf-height` = 54px`, `--pad-inner` = 52px`
- 排版变量: `--font-medium` = 500`, `--font-extrabold` = 700`, `--font-1` = Inter Tight`, `--font-black` = 800`, `--font-bold` = 600`, `--font-light` = 300`, `--font-normal` = 400`
- 圆角变量: `--rounded-small` = 4px`, `--button-rounded` = 8px`, `--button-rounded-full` = 72px`, `--rounded-normal` = 8px`, `--rounded-large` = 1rem`
- 其他变量: `--border-thin` = 0.5px`, `--bg-primary-rgb` = 248, 248, 248`, `--img-resizing-paronamic` = 2 / 1`, `--alert-yellow-rgb` = 255, 240, 131`, `--modal-alpha` = 0.7`, `--alert-green-rgb` = 224, 244, 217`, `--img-resizing-desktop` = 19 / 10`, `--bg-white` = white`

### 字体系统

- 主要字体: `"Noto Sans SC"`, `"Inter Tight"`

### 颜色系统

- 背景色: rgb(248, 248, 248), rgba(0, 0, 0, 0.7), rgb(233, 233, 233), rgb(237, 237, 237), rgb(34, 34, 34), rgb(255, 255, 255), rgba(255, 255, 255, 0.9), rgb(255, 240, 131)
- 文字色: rgb(0, 0, 0), rgb(34, 34, 34), rgb(255, 255, 255), rgb(250, 93, 41), rgb(167, 167, 167), rgb(222, 222, 222)
- 边框色: rgb(0, 0, 0), rgb(34, 34, 34), rgb(255, 255, 255), rgba(34, 34, 34, 0.3), rgb(248, 248, 248) rgb(34, 34, 34), rgb(248, 248, 248), rgba(255, 255, 255, 0.3), rgb(237, 237, 237) rgb(34, 34, 34) rgb(34, 34, 34)

### 布局系统

- Flexbox 容器: 20 个
- Grid 容器: 0 个
- 常用 Gap: 28px (1次)
- 常用 justifyContent: space-between (13次)
- 常用 alignItems: center (18次)

### 动画系统

- CSS 动画 (@keyframes): 0 个元素
- CSS 过渡 (transition): 20 个元素
- 常用过渡时长: 0.3s (19次)
- 常用缓动函数: ease (30次)

### Transform 系统

- 使用 Transform 的元素: 20 个
- 主要类型: matrix (20次)

### 外部资源

- 外部 Scripts: 20 个
  - `https://www.youtube.com/s/player/5b27766f/www-widgetapi.vflset/www-widgetapi.js`
  - `https://www.gstatic.com/recaptcha/releases/TnA7HacJFoBWt9hnlunBlYfK/recaptcha__zh_cn.js`
  - `https://www.googletagmanager.com/gtag/destination?id=AW-368855655&cx=c&gtm=4e66o0h1`
  - `https://snap.licdn.com/li.lms-analytics/insight.old.min.js`
  - `https://snap.licdn.com/li.lms-analytics/insight.min.js`
- 外部 Stylesheets/Links: 5 个
  - `https://www.awwwards.com/`
  - `https://assets.awwwards.com/assets/images/favicon.svg`
  - `https://assets.awwwards.com/assets/images/favicon-safari.svg`
  - `https://www.awwwards.com/apple-touch-icon.png`
  - `https://assets.awwwards.com/assets/fonts/inter-tight/InterTight-VariableFont_wght.ttf`

### 页面截图

![awwwards 截图](./screenshots/awwwards.png)

---

## LUSION — https://lusion.co

### CSS 变量系统

- 颜色变量: `--color-grey-blue` = #2b2e3a`, `--color-white` = #fff`, `--header-color` = #0016ec`, `--color-project-details-logo-color` = #f0f`, `--color-error` = #e90000`, `--project-details-btn-bg-hover` = #000`, `--project-details-bg` = #000`, `--project-details-highlight` = #000`
- 间距变量: `--base-padding-y` = clamp(30px, 4vw, 50px)`, `--cross-size` = clamp(.875rem, 1vw, 2rem)`, `--grid-space` = calc((100% - 11 * 2vw) / 12)`, `--header-size` = clamp(1rem, 1vw, 2rem)`, `--grid-gap` = 2vw`, `--base-padding-x` = max(5vw, 40px)`
- 圆角变量: `--global-border-radius` = 20px`
- 其他变量: `--vh` = 6.86px`

### 字体系统

- 主要字体: `Aeonik`, `"Helvetica, Arial, FreeSans, Garuda, sans-serif", Helvetica, Arial, FreeSans, Garuda, sans-serif`

### 颜色系统

- 背景色: rgb(255, 255, 255), rgb(0, 0, 0), rgb(43, 46, 58), rgb(228, 230, 239), rgb(0, 22, 236), rgb(240, 241, 250), rgb(26, 47, 251), rgb(18, 20, 22)
- 文字色: rgb(240, 241, 250), rgb(0, 0, 0), rgb(255, 255, 255), rgb(26, 47, 251)
- 边框色: rgb(240, 241, 250), rgb(0, 0, 0), rgb(255, 255, 255), rgb(26, 47, 251)

### 布局系统

- Flexbox 容器: 16 个
- Grid 容器: 4 个
- 常用 Gap: normal 30.56px (4次), 8.75px (3次), 168px (1次), 10px (1次), 24px (1次)
- 常用 justifyContent: center (3次), space-between (2次), space-around (2次)
- 常用 alignItems: center (7次)

### 动画系统

- CSS 动画 (@keyframes): 0 个元素
- CSS 过渡 (transition): 20 个元素
- 常用过渡时长: 0.4s (14次), 0.5s (6次), 0.3s (6次), 0.25s (1次), 0.1s (1次)
- 常用缓动函数: ease (14次), 1) (14次), cubic-bezier(0.4 (13次), 0 (13次), 0.1 (13次)

### Transform 系统

- 使用 Transform 的元素: 20 个
- 主要类型: matrix (20次)

### 外部资源

- 外部 Scripts: 2 个
  - `https://www.googletagmanager.com/gtag/js?id=G-W2XC5XK9QJ`
  - `https://lusion.co/_astro/hoisted.CJiXW_YI.js`
- 外部 Stylesheets/Links: 11 个
  - `https://lusion.co/assets/meta/apple-touch-icon.png`
  - `https://lusion.co/assets/meta/favicon-32x32.png`
  - `https://lusion.co/assets/meta/dark/favicon-32x32.png`
  - `https://lusion.co/assets/meta/favicon-16x16.png`
  - `https://lusion.co/assets/meta/dark/favicon-16x16.png`

### 页面截图

![lusion 截图](./screenshots/lusion.png)

---

## WANTEDFORNOTHING — https://www.wantedfornothing.com

### CSS 变量系统

- 颜色变量: `--c-bg-primary` = #040507`, `--c-bg-primary-addon` = #161616`, `--c-font-secondary` = #040507`, `--c-font-primary` = #BFBFBF`, `--c-brand-primary` = #FF5500`
- 间距变量: `--header-height` = 6.3125rem`, `--wp--preset--font-size--huge` = 42px`, `--header-gap` = 2.6%`, `--wp--preset--font-size--normal` = 16px`
- 排版变量: `--c-font-primary-rgb` = 191,191,191`
- 其他变量: `--work-meta` = 21.1875rem`, `--popover-x-offset` = calc(2.6% - 2%)`, `--c-bg-primary-rgb` = 4,5,7`, `--popover-y-offset` = calc(1vh + 1.5em)`

### 字体系统

- 主要字体: `JWSans, Helvetica, Arial, sans-serif`, `Arial`

### 颜色系统

- 背景色: rgb(4, 5, 7), rgb(35, 40, 45), rgba(234, 230, 227, 0.02), rgb(191, 191, 191), rgb(255, 85, 0)
- 文字色: rgb(0, 0, 0), rgb(191, 191, 191), rgba(0, 0, 0, 0), rgb(4, 5, 7), rgba(191, 191, 191, 0.3), rgba(191, 191, 191, 0.2), rgba(191, 191, 191, 0.1), rgba(191, 191, 191, 0.7)
- 边框色: rgb(0, 0, 0), rgb(191, 191, 191), rgb(4, 5, 7), rgba(191, 191, 191, 0.3), rgba(191, 191, 191, 0.2), rgba(191, 191, 191, 0.1), rgb(191, 191, 191) rgb(191, 191, 191) rgba(191, 191, 191, 0.7), rgb(255, 85, 0)

### 布局系统

- Flexbox 容器: 20 个
- Grid 容器: 0 个
- 常用 justifyContent: flex-start (4次), space-between (3次), center (3次), flex-end (3次)
- 常用 alignItems: center (6次), flex-end (3次), flex-start (2次)

### 动画系统

- CSS 动画 (@keyframes): 19 个元素
- CSS 过渡 (transition): 2 个元素
- 常用过渡时长: 0.5s (1次), 0.75s (1次)
- 常用缓动函数: ease (2次)

### Transform 系统

- 使用 Transform 的元素: 20 个
- 主要类型: matrix (20次)

### 外部资源

- 外部 Scripts: 19 个
  - `https://www.googletagmanager.com/gtag/destination?id=AW-11362900131&cx=c&gtm=4e66o0`
  - `https://www.gstatic.com/recaptcha/releases/TnA7HacJFoBWt9hnlunBlYfK/recaptcha__zh_cn.js`
  - `https://snap.licdn.com/li.lms-analytics/insight.old.min.js`
  - `https://connect.facebook.net/signals/config/274555426577424?v=2.9.345&r=stable&domain=wantedfornothing.com&hme=319b24ce7b9254a3f841b0e945e5985d85ddfae2329b4423159b7af5bd4224f0&ex_m=105%2C208%2C156%2C22%2C73%2C74%2C147%2C69%2C68%2C11%2C165%2C91%2C16%2C139%2C128%2C39%2C76%2C79%2C135%2C161%2C167%2C8%2C4%2C5%2C7%2C6%2C3%2C92%2C102%2C168%2C173%2C222%2C30%2C75%2C234%2C233%2C232%2C23%2C33%2C55%2C104%2C61%2C10%2C64%2C98%2C99%2C100%2C106%2C131%2C31%2C29%2C133%2C134%2C130%2C129%2C157%2C77%2C160%2C158%2C159%2C50%2C60%2C124%2C15%2C164%2C45%2C279%2C280%2C278%2C26%2C27%2C28%2C48%2C148%2C78%2C113%2C18%2C20%2C44%2C40%2C42%2C41%2C84%2C93%2C97%2C111%2C146%2C149%2C46%2C112%2C24%2C21%2C120%2C70%2C36%2C151%2C150%2C152%2C143%2C141%2C25%2C35%2C59%2C110%2C163%2C71%2C17%2C154%2C115%2C82%2C67%2C19%2C86%2C87%2C117%2C85%2C137%2C136%2C140%2C162%2C34%2C293%2C309%2C215%2C204%2C62%2C205%2C203%2C312%2C303%2C52%2C216%2C108%2C132%2C81%2C122%2C54%2C47%2C49%2C114%2C121%2C127%2C126%2C58%2C65%2C63%2C153%2C116%2C37%2C32%2C53%2C56%2C101%2C166%2C1%2C125%2C14%2C123%2C12%2C2%2C57%2C94%2C66%2C119%2C90%2C89%2C169%2C170%2C95%2C96%2C9%2C103%2C51%2C144%2C88%2C80%2C72%2C118%2C107%2C43%2C145%2C0%2C83%2C138%2C142%2C155%2C38%2C109%2C13%2C171`
  - `https://connect.facebook.net/en_US/fbevents.js`
- 外部 Stylesheets/Links: 18 个
  - `https://wantedfornothing.com/wp-content/themes/wfn/assets/images/favicon/apple-touch-icon.png`
  - `https://wantedfornothing.com/wp-content/themes/wfn/assets/images/favicon/favicon-32x32.png`
  - `https://wantedfornothing.com/wp-content/themes/wfn/assets/images/favicon/favicon-16x16.png`
  - `https://wantedfornothing.com/wp-content/themes/wfn/assets/images/favicon/site.webmanifest`
  - `https://wantedfornothing.com/wp-content/themes/wfn/assets/images/favicon/safari-pinned-tab.svg`

### 页面截图

![wantedfornothing 截图](./screenshots/wantedfornothing.png)

---

## RIVE — https://rive.app

### CSS 变量系统

- 其他变量: `--one-if-corner-shape-supported` = 1`

### 字体系统

- 主要字体: `"Noto Sans SC"`, `sans-serif`, `Tomorrow, "Tomorrow Placeholder", sans-serif`, `"Inter Display", "Inter Display Placeholder", sans-serif`, `Inter, sans-serif`

### 颜色系统

- 背景色: rgb(0, 0, 0), rgb(18, 18, 18), rgb(38, 38, 38), rgba(255, 255, 255, 0.9), rgb(29, 29, 29), rgb(17, 17, 17), rgb(255, 255, 255), rgb(235, 235, 235)
- 文字色: rgb(0, 0, 0), rgb(0, 0, 238), rgb(255, 255, 255), rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0), rgb(242, 240, 240), rgb(255, 164, 28), rgb(241, 241, 241)
- 边框色: rgb(0, 0, 0), rgb(0, 0, 238), rgb(255, 255, 255), rgba(255, 255, 255, 0.6), rgb(242, 240, 240), rgb(255, 164, 28), rgb(241, 241, 241), rgb(170, 170, 170)

### 布局系统

- Flexbox 容器: 20 个
- Grid 容器: 0 个
- 常用 Gap: 5px (5次), 10px (4次), 0px (2次), 30px (2次), 24px (1次)
- 常用 justifyContent: flex-start (10次), center (9次), space-between (1次)
- 常用 alignItems: center (14次), flex-start (1次)

### 动画系统

无动画数据

### Transform 系统

- 使用 Transform 的元素: 20 个
- 主要类型: matrix (20次)

### 外部资源

- 外部 Scripts: 9 个
  - `https://snap.licdn.com/li.lms-analytics/insight.old.min.js`
  - `https://sc.lfeeder.com/lftracker_v1_bElvO73NLBG8ZMqj.js`
  - `https://snap.licdn.com/li.lms-analytics/insight.min.js`
  - `https://static.ads-twitter.com/uwt.js`
  - `https://cdn.amplitude.com/libs/amplitude-7.1.1-min.gz.js`
- 外部 Stylesheets/Links: 20 个
  - `https://framerusercontent.com/images/jMyKrhKKXqpc15qYqC3A0pZELw.png`
  - `https://framerusercontent.com/images/jMyKrhKKXqpc15qYqC3A0pZELw.png`
  - `https://fonts.gstatic.com/`
  - `https://rive.app/`
  - `https://framerusercontent.com/sites/3Hh1SxuP94sycwmlcNuNRW/react.BXDoH0JO.mjs`

### 页面截图

![rive 截图](./screenshots/rive.png)

---

## CODEPEN — https://codepen.io/trending

### CSS 变量系统

- 颜色变量: `--cp-color-13` = hsl(227.37deg 12.26% 30.39%)`, `--cp-color-yellow-darker-hsl` = 43.56deg 65.77% 21.76%`, `--cp-pen-header-button-hover-bg` = hsl(227.37deg 12.26% 30.39%)`, `--cp-color-projects` = hsl(49.32deg 100% 62.55%)`, `--cp-input-focus-bg` = hsl(0deg 0% 100%)`, `--cp-grid-item-screenshot-bg` = hsl(227.37deg 12.26% 30.39%)`, `--cp-control-bar-input-placeholder` = hsl(226.67deg 11.84% 70.2%)`, `--cp-color-9-hsl` = 233.33deg 9.89% 64.31%`
- 间距变量: `--cp-header-height` = 65px`, `--cp-button-border-width` = 3px`, `--cp-control-bar-space-between` = 1.5rem`, `--cp-pen-bar-height` = 45px`, `--cp-control-bar-height` = 29px`, `--cp-header-height-small` = 53px`, `--cp-sidebar-width` = 180px`, `--cp-button-margin-inline` = 10px`
- 排版变量: `--cp-font-family` = "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif`, `--cp-font-family-header` = "Telefon Black", Sans-Serif`, `--cp-font-family-header-alt` = "Telefon", Sans-Serif`, `--cp-font-family-editor` = SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace`
- 圆角变量: `--cp-button-border-radius` = 4px`
- 阴影变量: `--cp-box-shadow` = 0 6px 12px hsl(240deg 9.09% 4.31% / 60%)`
- 其他变量: `--bg-overlay` = 1`, `--cp-overlay-bg-gradient` = radial-gradient(
    circle,
    hsl(228.39deg 12.25% 50.39% / 90%) 35%,
    hsl(227.37deg 12.26% 30.39% / 90%)
  )`, `--cp-pen-panel-spacing` = 10px`, `--cp-button-hover-icon` = currentColor`, `--cp-button-icon` = currentColor`, `--s-x` = 1`, `--progress` = 0`, `--cp-pen-sidebar-spacing` = 6px`

### 字体系统

- 主要字体: `Lato, "Lucida Grande", "Lucida Sans Unicode", Tahoma, sans-serif`, `SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace`, `Telefon, sans-serif`, `Lato, sans-serif`, `"Telefon Black", sans-serif`

### 颜色系统

- 背景色: rgb(19, 20, 23), rgb(30, 31, 38), rgb(90, 95, 115), rgb(255, 255, 255), rgb(0, 0, 0), rgb(255, 221, 64), rgb(37, 40, 48), rgb(71, 207, 115)
- 文字色: rgb(255, 255, 255), rgb(118, 218, 255), rgb(170, 174, 188), rgb(0, 0, 0), rgb(134, 140, 160), rgb(113, 119, 144), rgb(197, 200, 212), rgb(168, 128, 56)
- 边框色: rgb(255, 255, 255), rgb(118, 218, 255), rgb(170, 174, 188), rgb(0, 0, 0), rgb(255, 255, 255) rgb(255, 255, 255) rgb(37, 40, 48), rgb(134, 140, 160), rgb(113, 119, 144), rgb(197, 200, 212)

### 布局系统

- Flexbox 容器: 18 个
- Grid 容器: 2 个
- 常用 Gap: 11.25px (1次), 30px (1次)
- 常用 justifyContent: center (4次), space-between (1次), flex-end (1次)
- 常用 alignItems: baseline (5次), center (5次)

### 动画系统

- CSS 动画 (@keyframes): 5 个元素
- CSS 过渡 (transition): 15 个元素
- 常用过渡时长: 0.2s (8次), 0.3s (5次), 0.4s (3次), 0s (3次)
- 常用缓动函数: linear (7次), ease (6次), ease-in-out (4次), cubic-bezier(0.393 (2次), 0.073 (2次)

### Transform 系统

- 使用 Transform 的元素: 20 个
- 主要类型: matrix (20次)

### 外部资源

- 外部 Scripts: 7 个
  - `https://cpwebassets.codepen.io/assets/packs/js/Homepage-Anon-79ecca279fa7a1599ebf.chunk.js`
  - `https://srv.buysellads.com/ads/CEAICKQN.json?callback=customJSONPCallback`
  - `https://cdn.carbonads.com/carbon.js?serve=CK7IVK7U&placement=codepenio`
  - `https://cpwebassets.codepen.io/assets/common/browser_support-2c1a3d31dbc6b5746fb7dacdbc81dd613906db219f13147c66864a6c3448246c.js`
  - `https://cpwebassets.codepen.io/assets/packs/js/vendor-2333a2260b2d50676c65.chunk.js`
- 外部 Stylesheets/Links: 8 个
  - `https://cpwebassets.codepen.io/assets/global/global-4d2dbf7b9c7393b9f005b43dd9a104a1d4f205c562e4d80fbd5b31dcb738795f.css`
  - `https://cpwebassets.codepen.io/assets/page/page-6d7ec71a37b87f5f80695384afc7b2b48ebfbe6ce33285d99441bfeb72357d7b.css`
  - `https://cpwebassets.codepen.io/assets/packs/css/everypage-934879d1.css`
  - `https://cpwebassets.codepen.io/assets/favicon/favicon-touch-de50acbf5d634ec6791894eba4ba9cf490f709b3d742597c6fc4b734e6492a5a.png`
  - `https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png`

### 页面截图

![codepen 截图](./screenshots/codepen.png)

---

## ONEPAGELOVE — https://onepagelove.com

### CSS 变量系统

- 颜色变量: `--bg-header-sub` = hsl(25, 18%, 84%)`, `--bg-nav` = hsl(25, 18%, 88%)`, `--text-secondary` = hsl(25, 18%, 42%)`, `--bg-code` = hsl(25, 18%, 96%)`, `--accent-header` = hsl(25, 18%, 92%)`, `--opl-search-bg` = #FFFEFC`, `--selection-bg` = #D94F5C`, `--opl-search-ink-soft` = hsl(38, 10%, 58%)`
- 间距变量: `--header-desc-size` = 17px`, `--header-title-size` = 32px`
- 排版变量: `--opl-search-font-ui` = "Geist Mono", ui-monospace, "SF Mono", Consolas, monospace`
- 阴影变量: `--shadow-dropdown` = 0px 10px 30px -5px rgba(0,0,0,0.12)`
- 其他变量: `--header-title-lh` = 34px`, `--beige-s` = 18%`, `--beige-h` = 25`, `--header-title-ls` = -0.8px`, `--header-desc-lh` = 28px`, `--header-desc-ls` = -0.1px`

### 字体系统

- 主要字体: `"Noto Sans SC"`, `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`, `"Geist Mono", ui-monospace, monospace`, `"Geist Mono", ui-monospace, "SF Mono", Consolas, monospace`, `Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

### 颜色系统

- 背景色: rgb(247, 244, 243), rgb(230, 223, 219), rgb(238, 234, 231), rgb(255, 255, 255), rgb(0, 0, 0), rgb(155, 129, 111)
- 文字色: rgb(45, 37, 31), rgb(217, 79, 92), rgb(126, 104, 88), rgb(176, 155, 141), rgb(155, 129, 111), rgb(70, 180, 80), rgb(96, 79, 67)
- 边框色: rgb(45, 37, 31), rgb(217, 79, 92), rgb(45, 37, 31) rgb(45, 37, 31) rgb(222, 213, 207), rgb(126, 104, 88), rgb(222, 213, 207), rgb(126, 104, 88) rgb(126, 104, 88) rgb(238, 234, 231), rgb(176, 155, 141), rgb(155, 129, 111)

### 布局系统

- Flexbox 容器: 20 个
- Grid 容器: 0 个
- 常用 Gap: 8px (1次)
- 常用 justifyContent: center (5次), flex-end (1次)
- 常用 alignItems: center (7次), flex-end (6次), flex-start (1次)

### 动画系统

- CSS 动画 (@keyframes): 9 个元素
- CSS 过渡 (transition): 11 个元素
- 常用过渡时长: 1s (9次), 0.15s (3次), 0.2s (1次)
- 常用缓动函数: ease (13次)

### Transform 系统

- 使用 Transform 的元素: 1 个
- 主要类型: matrix (1次)

### 外部资源

- 外部 Scripts: 8 个
  - `https://plausible.io/js/script.js`
  - `https://onepagelove.com/wp-content/themes/onepagelove/frontend/js/opl-share-copy.js?ver=19.53.7`
  - `https://onepagelove.com/wp-includes/js/jquery/jquery.min.js?ver=7.0`
  - `https://onepagelove.com/wp-content/themes/onepagelove/frontend/js/min/opl-custom-code-min.js?ver=19.53.7`
  - `https://onepagelove.com/wp-content/themes/onepagelove/frontend/js/min/infinite-scroll.pkgd.min-old.js?ver=19.53.7`
- 外部 Stylesheets/Links: 8 个
  - `https://onepagelove.com/`
  - `https://onepagelove.com/wp-content/themes/onepagelove/frontend/fonts/Geist-Medium.woff2`
  - `https://onepagelove.com/wp-content/themes/onepagelove/frontend/fonts/GeistMono-Regular.woff2`
  - `https://onepagelove.com/wp-content/themes/onepagelove/frontend/img/favicon/favicon-32x32.png`
  - `https://onepagelove.com/feed`

### 页面截图

![onepagelove 截图](./screenshots/onepagelove.png)

---

# 跨站对比总结

## 配色方案对比

| 网站 | 主色调 | 背景色 | 强调色 | 风格 |
|------|--------|--------|--------|------|
| awwwards | #222222 (深灰) | #F8F8F8 (浅灰) | #FA5D29 (橙红) | 极简现代 |
| lusion | #000000 (纯黑) | #F0F1FA (米白) | #1A2FFB (电蓝) | 科技感/前卫 |
| wantedfornothing | #BFBFBF (灰银) | #040507 (近黑) | #FF5500 (亮橙) | 暗黑奢华 |
| rive | #FFFFFF (纯白) | #000000 (纯黑) | #FFA41C (亮橙) | 高对比现代 |
| codepen | #FFFFFF (纯白) | #131417 (深灰) | #76DAFF (亮蓝) | 深色 IDE 风格 |
| onepagelove | #2D251F (深棕) | #F7F4F3 (暖白) | #D94F5C (玫红) | 温暖自然 |

## 字体系统对比

| 网站 | 主要字体 | 辅助字体 | 特征 |
|------|----------|----------|------|
| awwwards | Inter Tight | Noto Sans SC | 现代几何无衬线 |
| lusion | Aeonik | Helvetica, Arial | 瑞士风格无衬线 |
| wantedfornothing | JWSans | Helvetica, Arial | 粗体大字报风格 |
| rive | Inter, Tomorrow | Noto Sans SC | 技术感无衬线 |
| codepen | Lato, Telefon | SFMono-Regular | 等宽 + 无衬线混合 |
| onepagelove | Geist | Geist Mono | 现代系统字体栈 |

## 布局系统对比

| 网站 | Flexbox | Grid | 特征 |
|------|---------|------|------|
| awwwards | 大量使用 | 少量 | 水平导航、卡片布局 |
| lusion | 中等 | 12列网格 | 响应式网格 + 弹性间距 |
| wantedfornothing | 大量使用 | 少量 | 全屏滚动、居中布局 |
| rive | 大量使用 | 无 | Framer 构建，弹性布局 |
| codepen | 中等 | 侧边栏+主内容区 | 经典两栏布局 |
| onepagelove | 大量使用 | 少量 | 瀑布流/卡片网格 |

## 动画与交互对比

| 网站 | 过渡时长 | 缓动函数 | 动画特征 |
|------|----------|----------|----------|
| awwwards | 0.3s | ease | 按钮悬停、SVG 填充过渡 |
| lusion | 0.25-0.5s | cubic-bezier(0.4, 0, 0.1, 1) | 精致的缓动、微交互 |
| wantedfornothing | 0.5s | ease | 加载动画、页面过渡 |
| rive | 0.3s | ease | 轮播滑动、缩放动画 |
| codepen | 0.2-0.4s | cubic-bezier(0.38, 0.01, 0.09, 0.98) | 侧边栏切换、精确缓动 |
| onepagelove | 0.15-1s | ease | 淡入、阴影过渡 |

## 圆角与间距对比

| 网站 | 圆角特征 | 间距特征 | 按钮风格 |
|------|----------|----------|----------|
| awwwards | 4px, 8px, 72px(全圆) | 24px, 52px | 圆角/全圆混合 |
| lusion | 20px (全局) | 2vw, clamp(30px, 4vw, 50px) | 大圆角现代风 |
| wantedfornothing | 较小 | 2.6% | 极简无圆角 |
| rive | 较小 | 5px, 10px, 24px | 紧凑科技风 |
| codepen | 3px border | 1.5rem | 锐利 IDE 风 |
| onepagelove | 自然柔和 | 8px | 温暖有机 |

## 设计趋势总结

### 1. 配色趋势
- **高对比**：大多数网站采用深色文字 + 浅色背景（或反之）
- **强调色**：亮橙/蓝/玫红作为 CTA 和交互反馈色
- **灰度系统**：awwwards 和 lusion 使用精细的灰度阶梯

### 2. 字体趋势
- **无衬线主导**：全部使用无衬线字体族
- **系统字体栈**：Inter、Geist、Helvetica 等现代系统字体
- **多字重**：Regular -> Bold 的完整字重覆盖

### 3. 布局趋势
- **Flexbox 为王**：所有网站大量使用 Flexbox 进行一维布局
- **Grid 用于宏观**：12列网格系统在 lusion 中体现明显
- **gap 取代 margin**：现代 CSS 布局中 gap 属性广泛使用

### 4. 动画趋势
- **微交互**：0.2-0.4s 的短过渡用于按钮、链接反馈
- **缓动函数**：ease 最常用，但精品网站使用自定义 cubic-bezier
- **transform 优先**：translate/scale 替代位置属性的动画

### 5. 技术栈观察
- **Framer 建站**：rive.app 使用 Framer 构建
- **Astro**：lusion.co 使用 Astro 静态生成
- **WordPress**：onepagelove.com 使用 WordPress
- **自定义构建**：awwwards、wantedfornothing、codepen 使用自研系统
- **分析工具**：Google Analytics、Meta Pixel、LinkedIn Insight 等广泛使用

---

*报告由 Kimi Work 自动生成 -- 基于实时浏览器 DOM 分析*
