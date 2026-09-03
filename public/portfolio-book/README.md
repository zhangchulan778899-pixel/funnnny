# 建筑作品集翻页画册

独立入口为本目录的 index.html，运行时仅使用 HTML、CSS、原生 JavaScript 和随附的 PageFlip 库，不需要安装依赖。

在本目录运行：

```sh
python3 -m http.server 4173
```

打开 http://localhost:4173/。Windows 如无 python3 命令，可使用 python。

## 集成

将整个 portfolio-book 文件夹放进网站静态目录：

```html
<iframe src="/portfolio-book/index.html"
  title="建筑作品集翻页画册"
  style="width:100%;height:100%;border:0;background:transparent"></iframe>
```

父容器需要明确高度，例如 68dvh。当前个人网站已经将画册接入原磨砂玻璃作品集弹窗，移除了左侧目录；按 Escape 可退出弹窗。

## 页面与操作

- 指定 PDF 的 33 页按原始页序导出为 page-001.webp 至 page-033.webp。
- 按用户确认将完整页面顺时针旋转 90 度，横向阅读；未裁剪、重排或重新设计。
- 网页页图长边 1600 像素，以无损 WebP 保存。原 PDF 未修改。
- 首张为硬封面，追加同色空白硬封底，共 34 个书页。
- 拖动页角、点击页角或箭头、手机滑动翻页；左右方向键翻页，Home / End 跳至首尾。
- 小窗口单页、大窗口双页，按可用宽高缩放并完整显示图面。
- 翻页动画由随附引擎提供，翻动期间按钮与快捷键锁定。

source-manifest.json 记录来源文件哈希、页序及网页页图哈希。验证命令：node --test html-contract.test.mjs。
已进行静态契约与资源检查，不包含浏览器动画交互测试。
