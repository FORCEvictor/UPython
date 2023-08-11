<!--suppress HtmlDeprecatedAttribute -->
<p align="center">
   <br>
   <img width="100" src="./src/icon/logo/boxy.svg" alt="UPython-logo"/>
</p>

<h1 align="center">
   UPython
</h1>

<div align="center">

[![star](https://img.shields.io/github/stars/FORCEvictor/UPython.svg?style=social&label=Star&theme=dark)](https://github.com/FORCEvictor/UPython/stargazers)
[![fork](https://img.shields.io/github/forks/FORCEvictor/UPython.svg?style=social&label=Fork&theme=dark)](https://github.com/FORCEvictor/UPython/network/members)

</div>

#### 介绍

UPython 是 Google Blockly 的一个应用实例，
其能是您快速开发一个Python应用。
其基于 Boxy 程式。

#### 安装

1. **环境检查： 确保你的电脑已经安装了最新版本的 Node.js。**
   UPython 是纯客户端 Web 应用，
   仅使用 Node.js 进行自动化处理。

2. **克隆仓库：将本仓库克隆到本地。**

   ```
   git clone https://github.com/FORCEvictor/UPython.git
   ```

3. **环境配置：配置本地开发环境。**

   ```
   cd UPython
   ```

   ```
   npm install
   ```

4. **开发服务：启动 Vite 本地开发服务。**
   构建采用开发模式，支持热重载。

   ```
   npm start
   ```

#### 开发

- **构建：基于 Vite 构建。**

  - 开发模式：源映射及 DevServer 支持。

    ```
    npm start
    ```

  - 生产模式：文件压缩及 PWA 生成。

    ```
    npm run build
    ```

- **服务：启动 http-server 本地服务。**
  使用

  ```
  npm run preview
  ```

- **格式化：标准化项目文件。**
  请在 `commit` 前运行以保证符合代码规范。

  ```
  npm run lint
  ```

#### 贡献

想让 UPython 变得更好吗？
我们欢迎以拉取请求、错误报告、讨论等形式对 UPython 做出贡献！

#### 版本

UPython 即将发布稳定版本，将使用[语义化版本控制](https://semver.org/)。
稳定版本更新频率会极低，仅保留必要的 Bug 修改，以保证你稳定的后续开发。

#### 许可证

UPython 采用 [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html) 开源协议。

#### 致谢

- [Google Blockly](https://github.com/google/blockly)
- [Icon Park](https://iconpark.oceanengine.com/)
- [Arco Design](https://arco.design/)
- Boxy
