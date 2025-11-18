# 快速启动指南

## 📋 前置要求

- Node.js 16+ 和 npm
- Supabase 账号和项目
- Netlify 账号（用于部署）

## 🚀 5分钟快速开始

### 步骤 1: 安装依赖

```bash
npm install
```

### 步骤 2: 配置 Supabase

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 进入你的项目（或创建新项目）
3. 点击 **Settings** → **API**
4. 复制以下信息：
   - **Project URL** (例如: `https://xxxxx.supabase.co`)
   - **anon public** key

### 步骤 3: 创建环境变量文件

在项目根目录创建 `.env` 文件：

```env
VITE_SUPABASE_URL=你的Project URL
VITE_SUPABASE_ANON_KEY=你的anon public key
```

**注意**: `.env` 文件不会被提交到 Git，但请确保在 Netlify 部署时添加这些环境变量。

### 步骤 4: 确认数据库表已创建

确保 Supabase 中已有以下表：

- ✅ `users` 表
- ✅ `posts` 表  
- ✅ `comments` 表

如果还没有创建，请参考 README.md 中的数据库结构说明。

### 步骤 5: 启动开发服务器

```bash
npm run dev
```

打开浏览器访问: http://localhost:3000

## 🎉 完成！

现在你可以：
- 在首页查看所有文章
- 点击"写文章"创建新文章
- 查看文章详情并添加评论
- 编辑或删除文章

## 📦 部署到 Netlify

### 方法 1: 通过 Netlify Dashboard

1. 将代码推送到 GitHub
2. 登录 [Netlify](https://app.netlify.com)
3. 点击 **New site from Git**
4. 选择你的仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. 点击 **Environment variables**，添加：
   - `VITE_SUPABASE_URL` = 你的 Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = 你的 Supabase Key
7. 点击 **Deploy site**

### 方法 2: 通过 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化并部署
netlify init
netlify deploy --prod
```

## ⚠️ 常见问题

### 问题: 无法连接到 Supabase

**解决方案**: 
- 检查 `.env` 文件中的 URL 和 Key 是否正确
- 确保 Supabase 项目处于活跃状态
- 检查网络连接

### 问题: 页面显示空白

**解决方案**:
- 打开浏览器控制台查看错误信息
- 确认 Supabase 配置正确
- 检查数据库表是否已创建

### 问题: 无法创建文章

**解决方案**:
- 确保 `users` 表中有至少一条记录
- 检查 Supabase 的 Row Level Security (RLS) 设置
- 如果启用了 RLS，需要配置相应的策略

## 🔒 Supabase RLS 设置（可选）

如果启用了 Row Level Security，需要添加以下策略：

### Posts 表策略
```sql
-- 允许所有人读取
CREATE POLICY "Allow public read" ON posts FOR SELECT USING (true);

-- 允许所有人插入
CREATE POLICY "Allow public insert" ON posts FOR INSERT WITH CHECK (true);

-- 允许所有人更新
CREATE POLICY "Allow public update" ON posts FOR UPDATE USING (true);

-- 允许所有人删除
CREATE POLICY "Allow public delete" ON posts FOR DELETE USING (true);
```

### Comments 表策略
```sql
-- 允许所有人读取
CREATE POLICY "Allow public read" ON comments FOR SELECT USING (true);

-- 允许所有人插入
CREATE POLICY "Allow public insert" ON comments FOR INSERT WITH CHECK (true);
```

### Users 表策略
```sql
-- 允许所有人读取
CREATE POLICY "Allow public read" ON users FOR SELECT USING (true);
```

## 📞 需要帮助？

如果遇到问题，请检查：
1. 浏览器控制台的错误信息
2. Supabase Dashboard 的日志
3. README.md 中的详细文档

