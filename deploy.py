import sys, os, time
sys.path.insert(0, r'C:\Users\Administrator\AppData\Local\Temp\paramiko_lib')
import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('49.234.190.85', username='root', password='zenjiroqQ+', timeout=10)

# Upload tar
sftp = ssh.open_sftp()
sftp.put(os.path.join(os.environ['TEMP'], 'frontend-ui-deploy.tar'), '/root/frontend-ui-deploy.tar')
sftp.close()
print('Upload complete')

# Re-extract
ssh.exec_command('cd /root && rm -rf frontend-ui-src && mkdir -p frontend-ui-src')
time.sleep(1)
ssh.exec_command('cd /root/frontend-ui-src && tar xf /root/frontend-ui-deploy.tar')
time.sleep(2)

# Build Docker image
ssh.exec_command('cd /root/frontend-ui-src && docker build --no-cache -t frontend-ui-docs . > /tmp/build.log 2>&1')
print('Build started...')
time.sleep(15)

for i in range(240):
    stdin, stdout, stderr = ssh.exec_command('tail -3 /tmp/build.log')
    tail = stdout.read().decode('utf-8', errors='replace').strip()
    if 'Successfully built' in tail:
        print('BUILD SUCCESS')
        break
    if 'failed to build' in tail or 'failed to solve' in tail:
        print('BUILD FAILED')
        break
    time.sleep(10)

# Stop old container
ssh.exec_command('docker stop frontend-ui-docs 2>/dev/null')
time.sleep(1)
ssh.exec_command('docker rm frontend-ui-docs 2>/dev/null')
time.sleep(1)

# Start new container
stdin, stdout, stderr = ssh.exec_command('docker run -d --name frontend-ui-docs --restart unless-stopped -p 80:3000 frontend-ui-docs')
print(f'Container: {stdout.read().decode("utf-8", errors="replace").strip()}')

time.sleep(8)

# Check status
stdin, stdout, stderr = ssh.exec_command('docker ps --filter name=frontend-ui-docs --format "{{.Names}} {{.Status}}"')
print(f'\nStatus: {stdout.read().decode("utf-8", errors="replace").strip()}')

stdin, stdout, stderr = ssh.exec_command('curl -s -o /dev/null -w "%{http_code}" http://localhost:80')
print(f'HTTP: {stdout.read().decode().strip()}')

ssh.close()
