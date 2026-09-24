import socket
import threading
import sys

TARGET_HOST = '127.0.0.1'
TARGET_PORT = 4173

def handle_client(client_sock):
    try:
        remote_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        remote_sock.connect((TARGET_HOST, TARGET_PORT))
    except Exception:
        client_sock.close()
        return

    def forward(src, dst):
        try:
            while True:
                data = src.recv(8192)
                if not data:
                    break
                dst.sendall(data)
        except Exception:
            pass
        finally:
            try:
                src.close()
            except Exception:
                pass
            try:
                dst.close()
            except Exception:
                pass

    t1 = threading.Thread(target=forward, args=(client_sock, remote_sock), daemon=True)
    t2 = threading.Thread(target=forward, args=(remote_sock, client_sock), daemon=True)
    t1.start()
    t2.start()

def listen_on_port(port):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        server.bind(('0.0.0.0', port))
        server.listen(128)
        print(f"Proxy listening on 0.0.0.0:{port} -> {TARGET_HOST}:{TARGET_PORT}", flush=True)
        while True:
            client, addr = server.accept()
            threading.Thread(target=handle_client, args=(client,), daemon=True).start()
    except Exception as e:
        print(f"Could not bind to port {port}: {e}", flush=True)

def main():
    ports = [5173, 3000, 8080]
    threads = []
    for p in ports:
        t = threading.Thread(target=listen_on_port, args=(p,), daemon=True)
        t.start()
        threads.append(t)
    for t in threads:
        t.join()

if __name__ == '__main__':
    main()
