# Chrome Web Store 发布指南

发布扩展程序的流程分为两步：**准备安装包** 和 **提交审核**。

## 第一步：准备发布安装包 (ZIP)

Chrome Web Store 要求上传一个包含 `manifest.json` 的 `.zip` 压缩包。

1.  **运行构建**（您刚才已经运行过了）：确保 `dist/` 文件夹是最新的。
2.  **压缩 `dist` 文件夹**：
    *   在 Windows 中：
        1.  打开 `c:\sites\ximalaya\dist` 文件夹。
        2.  选中**所有文件和文件夹**（assets, icons, background.js, index.html, manifest.json）。
        3.  右键点击 -> **发送到** -> **压缩(zipped)文件夹**。
        4.  将其命名为 `ximalaya_downloader_v1.0.0.zip`。

## 第二步：在 Chrome 应用商店开发者中心提交

1.  **访问开发者中心**：登录 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)。
    *   *注：如果您是第一次发布，需要支付一次性的 $5 注册费。*
2.  **创建新项目**：
    *   点击右上角的 **+ New Item**。
    *   上传您刚才生成的 `zip` 文件。
3.  **完善商店信息** (使用 `store_listing_assets.md` 中的内容)：
    *   **Description**: 复制我为您准备好的中文说明。
    *   **Category**: 选择 "Productivity" 或 "Social & Communication"。
    *   **Icons**: 上传 `ext/icons/icon128.png`。
    *   **Screenshots**: 上传 1280x800 的截图（详见建议）。
4.  **隐私设置 (Privacy)**：
    *   **Single Purpose**: 说明该扩展仅用于下载购买的喜马拉雅音频。
    *   **Permission Justification**:
        *   `activeTab`: 用于在点击扩展图标时获得当前页面的临时访问权限（安全最佳实践）。
        *   Host Permissions (`ximalaya.com`, `xmcdn.com`): 用于访问喜马拉雅的 API 获取音轨信息，以及从音频服务器（CDN）下载音频文件。
5.  **提交审核**：
    *   点击右上角的 **Submit for Review**。
    *   审核通常需要 1-3 个工作日。

---

祝您的扩展程序发布顺利！如果有任何技术细节需要微调，请随时告诉我。
