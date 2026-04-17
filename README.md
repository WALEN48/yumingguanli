# 发行运营后台

## 项目简介
微小iOS支付、游戏协议域名储备后台管理系统，支持后台切换域名配置。

## 技术栈
- React 18
- TypeScript
- Ant Design 5
- React Router 6
- Vite

## 功能模块

### 1. 平台域名链接管理
包含两个子页签（Tab）：
- **微小iOS客服支付链接**：域名链接的增删改查、状态管理
- **协议链接**：协议域名链接管理

### 2. 微小iOS客服支付链接管理
- 游戏、渠道、主体多维度筛选
- 支付链接分配管理
- 主体联动加载可用链接

## 安装依赖
```bash
npm install
# 或
yarn
```

## 开发运行
```bash
npm run dev
# 或
yarn dev
```

访问 http://localhost:3000

## 构建
```bash
npm run build
# 或
yarn build
```

## 项目结构
```
src/
├── components/          # 组件
│   ├── Layout/         # 布局组件
│   ├── DomainLinkForm/ # 域名链接表单
│   └── PaymentManagementForm/ # 支付管理表单
├── pages/              # 页面
│   ├── DomainLink/     # 平台域名链接管理
│   └── PaymentManagement/ # 支付链接管理
├── services/           # API 服务
│   ├── api.ts         # API 接口
│   └── mockData.ts    # Mock 数据
├── types/              # 类型定义
│   └── index.ts
├── utils/              # 工具函数
│   └── validators.ts  # 表单校验
├── App.tsx            # 应用入口
└── main.tsx           # 主入口
```

## 开发记录
- 2026-04-17: React + Ant Design 版本完成
