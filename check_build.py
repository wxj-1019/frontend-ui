import sys
sys.path.insert(0, r'C:\Users\Administrator\AppData\Local\Temp\paramiko_lib')
import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('49.234.190.85', username='root', password='zenjiroqQ+', timeout=10)

stdin, stdout, stderr = ssh.exec_command('docker ps --filter name=frontend-ui-docs --format "{{.Names}} {{.Status}} {{.Ports}}"')
print(f'Container: {stdout.read().decode("utf-8", errors="replace").strip()}')

stdin, stdout, stderr = ssh.exec_command('curl -s -o /dev/null -w "%{http_code}" http://localhost:80')
print(f'Local: {stdout.read().decode().strip()}')

stdin, stdout, stderr = ssh.exec_command('curl -s -o /dev/null -w "%{http_code}" http://49.234.190.85:80')
print(f'External: {stdout.read().decode().strip()}')

ssh.close()
