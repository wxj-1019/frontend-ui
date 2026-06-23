# Frontend UI 自动化部署指南

本指南配置 **GitHub Actions**，实现 `push` 到 `master` 分支后**自动构建 Docker 镜像并部署到服务器**。

---

## 1. 在服务器上生成 SSH 密钥

SSH 登录到你的服务器，执行：

```bash
ssh root@49.234.190.85

# 生成密钥对（按回车使用默认路径，不设置密码）
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions

# 查看公钥
cat ~/.ssh/github_actions.pub
```

**输出示例**：
```
ssh-ed25519 AAAAC3NzaC... github-actions-deploy
```

---

## 2. 将公钥添加到服务器 authorized_keys

```bash
# 在服务器上执行
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## 3. 在 GitHub 仓库设置 Secrets

1. 打开仓库：`https://github.com/wxj-1019/frontend-ui`
2. 点击 **Settings → Secrets and variables → Actions**
3. 点击 **New repository secret**，依次添加以下 3 个 Secret：

| Secret Name | 值 | 说明 |
|-------------|----|------|
| `SSH_PRIVATE_KEY` | 服务器上 `~/.ssh/github_actions` 的**完整内容** | 私钥（包含 `BEGIN OPENSSH PRIVATE KEY` 到 `END OPENSSH PRIVATE KEY`） |
| `SERVER_HOST` | `49.234.190.85` | 服务器 IP |
| `SERVER_USER` | `root` | 服务器用户名 |

**获取私钥内容**：
```bash
# 在服务器上执行
cat ~/.ssh/github_actions
# 复制全部内容（包含开头和结尾标记）
```

---

## 4. 验证配置

### 4.1 本地测试 SSH 免密登录

```bash
# 在本地将私钥保存到临时文件
echo "YOUR_PRIVATE_KEY_CONTENT" > /tmp/github_actions
chmod 600 /tmp/github_actions

# 测试连接
ssh -i /tmp/github_actions -o StrictHostKeyChecking=no root@49.234.190.85 "echo OK"
```

如果显示 `OK`，说明 SSH 配置成功。

### 4.2 触发 GitHub Actions 部署

**方式一**：推送代码到 master
```bash
git checkout master
git pull origin master
git merge your-branch
git push origin master
```

**方式二**：手动触发
- 进入仓库 → **Actions** 标签 → 选择 **Build & Deploy** → 点击 **Run workflow**

---

## 5. 查看部署状态

1. 打开仓库 → **Actions** 标签
2. 查看最新的 workflow run
3. 绿色 ✅ 表示成功，红色 ❌ 表示失败
4. 点击失败的 job 可以查看详细日志

---

## 6. 部署流程说明

```
Push to master
    ↓
GitHub Actions 触发
    ↓
Checkout 代码
    ↓
Docker Buildx 构建镜像 (linux/amd64)
    ↓
导出镜像为 tar.gz
    ↓
SSH 上传到服务器
    ↓
服务器执行：
  - docker load 加载镜像
  - docker rm -f 停止旧容器
  - docker run 启动新容器
  - 清理旧文件
    ↓
Health Check (HTTP 200)
```

---

## 7. 常见问题

### Q: 部署失败，SSH 连接超时？
- 检查服务器防火墙是否允许 22 端口
- 检查 `SERVER_HOST` 和 `SERVER_USER` Secret 是否正确
- 检查私钥格式是否正确（必须是 OpenSSH 格式）

### Q: Docker 构建失败？
- 检查 `Dockerfile` 是否存在语法错误
- 检查 `pnpm-lock.yaml` 是否与 `package.json` 同步
- 在本地运行 `docker build .` 测试

### Q: 部署后网站无法访问？
- 检查服务器防火墙是否允许 80 端口
- 检查 Docker 容器状态：`docker ps`
- 检查容器日志：`docker logs frontend-ui-docs`

---

## 8. 回滚操作

如果新版本有问题，可以手动回滚到上一个镜像：

```bash
ssh root@49.234.190.85

# 查看历史镜像
docker images frontend-ui-docs

# 使用上一个镜像 ID 重新运行
docker rm -f frontend-ui-docs
docker run -d --name frontend-ui-docs --restart unless-stopped -p 80:3000 <PREVIOUS_IMAGE_ID>
```

---

**配置完成后，只需 `git push origin master`，代码就会自动部署到服务器！**