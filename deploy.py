import sys, os, time
sys.path.insert(0, r'C:\Users\Administrator\AppData\Local\Temp\paramiko_lib')
import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('49.234.190.85', username='root', password='zenjiroqQ+', timeout=10)

# Check current status
cmds = [
    'docker ps --filter name=frontend-ui-docs --format "{{.Names}} {{.Status}}"',
    'curl -s -o /dev/null -w "%{http_code}" http://localhost:80',
]

for cmd in cmds:
    stdin, stdout, stderr = ssh.exec_command(cmd)
    out = stdout.read().decode('utf-8', errors='replace').strip()
    print(f'$ {cmd}')
    if out: print(out)

# Upload tar
sftp = ssh.open_sftp()
sftp.put(os.path.join(os.environ['TEMP'], 'frontend-ui-deploy.tar'), '/root/frontend-ui-deploy.tar')
sftp.close()
print('\nUpload complete')

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

# Check final status
stdin, stdout, stderr = ssh.exec_command('tail -5 /tmp/build.log')
print(stdout.read().decode('utf-8', errors='replace'))

# Deploy container
ssh.exec_command('docker rm -f frontend-ui-docs 2>/dev/null')
time.sleep(1)
ssh.exec_command('docker run -d --name frontend-ui-docs --restart unless-stopped -p 80:3000 frontend-ui-docs')
time.sleep(5)

stdin, stdout, stderr = ssh.exec_command('docker ps --filter name=frontend-ui-docs --format "{{.Names}} {{.Status}} {{.Ports}}"')
print('\nContainer status:')
print(stdout.read().decode('utf-8', errors='replace').strip())

stdin, stdout, stderr = ssh.exec_command('curl -s -o /dev/null -w "%{http_code}" http://localhost:80')
print(f'\nHTTP status: {stdout.read().decode().strip()}')

ssh.close()
