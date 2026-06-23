import sys, time
sys.path.insert(0, r'C:\Users\Administrator\AppData\Local\Temp\paramiko_lib')
import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('49.234.190.85', username='root', password='zenjiroqQ+', timeout=10)

# Kill old process
ssh.exec_command('kill 775500 2>/dev/null')
time.sleep(2)

# Remove failed container
ssh.exec_command('docker rm -f frontend-ui-docs 2>/dev/null')
time.sleep(1)

# Start new container
stdin, stdout, stderr = ssh.exec_command('docker run -d --name frontend-ui-docs --restart unless-stopped -p 80:3000 frontend-ui-docs')
print(stdout.read().decode('utf-8', errors='replace').strip())
print(stderr.read().decode('utf-8', errors='replace').strip())

time.sleep(5)

# Check status
cmds = [
    'docker ps --filter name=frontend-ui-docs --format "{{.Names}} {{.Status}} {{.Ports}}"',
    'curl -s -o /dev/null -w "%{http_code}" http://localhost:80',
    'curl -s -o /dev/null -w "%{http_code}" http://49.234.190.85:80',
]

for cmd in cmds:
    stdin, stdout, stderr = ssh.exec_command(cmd)
    out = stdout.read().decode('utf-8', errors='replace').strip()
    print(f'$ {cmd}')
    if out: print(out)

ssh.close()
