import os
import socket

pc_name = socket.gethostname()
ip = socket.gethostbyname(pc_name)
is_windows = os.name == "nt"
print("computer: " + pc_name)
print("ipv4: " + ip + ":5000")
if is_windows:
    os.system("python -m flask run --host=0.0.0.0")
else:
    os.system("python3 -m flask run --host=0.0.0.0")