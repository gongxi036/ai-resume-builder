# AI Resume Builder

AI Resume Builder 是一个使用 React、Vite 和 Gemini1.5 AI 构建的简历生成器。该项目包括前端和后端，前端使用 React 和 Tailwind CSS，后端使用 Express 和 MongoDB。

## 项目结构

```bash
ai-resume-builder/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── routers/
│   ├── utils/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── app.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── components.json
│   ├── jsconfig.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .env
├── .gitignore
├── eslint.config.js
├── package.json
└── README.md
```



## 环境安装

### 后端

后端使用 Express 和 MongoDB。请确保您已经安装了 Node.js 。

1. 克隆项目到本地：
    ```sh
    git clone <repository-url>
    cd <repository-directory>/backend
    ```

2. 安装依赖：
    ```sh
    npm install
    ```

3. 创建 [`.env`](.env ) 文件并添加以下内容：
    ```env
    MONGO_URL=<your-mongodb-url>
    PORT=8000
    ```

4. 启动后端服务器：
    ```sh
    npm run dev
    ```

### 前端

前端使用 React 和 Vite。

1. 进入前端目录：
    ```sh
    cd <repository-directory>/frontend
    ```

2. 安装依赖：
    ```sh
    npm install
    ```

3. 创建 [`.env`](.env ) 文件并添加以下内容：
    ```env
    VITE_GOOGLE_AI_API_KEY=<your-google-ai-api-key>
    VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
    VITE_BASE_URL=http://localhost:5173
    ```

4. 启动前端开发服务器：
    ```sh
    npm run dev
    ```

## 功能

- 用户可以创建、编辑和删除简历。
- 使用 AI 自动生成简历内容。
- 支持多种主题颜色选择。
- 用户可以下载和分享简历。

## 技术栈

- 前端：React, Vite, Tailwind CSS, shadcn
- 后端：Express, MongoDB
- AI：Google Generative AI (Gemini1.5)
- 认证：Clerk



##  视频地址

[Build & Deploy AI Resume Builder App Using React, Vite, Tailwind css, Strapi, Clerk](https://www.youtube.com/watch?v=RiUh_8VTGYM)





