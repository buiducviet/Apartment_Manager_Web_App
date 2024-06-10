
**Tên đề tài** : Phần mềm quản lý thu phí chung cư.

**Ngôn ngữ sử dụng** :
- [Golang](https://golang.org/)
- Javascript.


### 1. [Xác định yêu cầu phần mềm](https://github.com/buiducviet/CNPM/tree/login/X%C3%A1c%20%C4%91%E1%BB%8Bnh%20y%C3%AAu%20c%E1%BA%A7u%20ph%E1%BA%A7n%20m%E1%BB%81m)

## [Chương trình](https://github.com/buiducviet/CNPM/tree/login)

### [1. Backend](https://github.com/buiducviet/CNPM/tree/login/back_end)

### [2. Frontend](https://github.com/buiducviet/CNPM/tree/login/front)

## Triển khai hệ thống

### 1. Backend:
- Chương trình chính
  - Cách 1: Chạy file binary(Thích hợp với linux/64 bit)
  - Cách 2: Cài đặt Go compiler và chạy lệnh
    ```bash
    # Lưu ý: để biến môi trường GOMODULE111=on
    go build -v
    ``` 
    Sau đó chạy chương trình đã được biên dịch.

- Cài đặt các CSDL liên quan:
  - MySQL
  - Redis

- Hướng dẫn cài đặt Redis:
  - Windows: https://redis.io/docs/install/install-redis/install-redis-on-windows/
  - Linux: https://redis.io/docs/install/install-redis/install-redis-on-linux/
  - Mac OS : https://redis.io/docs/install/install-redis/install-redis-on-mac-os/

- Thay đổi các config trong folder config
  - Các tham số để khởi tạo CSDL và Server

### 2. Frontend:
- Sử dụng phần mềm VSCode và Extension Live Server
  - Tải và cài đặt phần mềm VSCode: https://code.visualstudio.com/
  - Tìm và cài đặt extension Live Server: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
  - Sau khi cài đặt extension, mở file HTML bạn muốn rồi ấn vào nút Go Live ở góc trái dưới màn hình

### 3. Server:
- Cài đặt Hamachi
    - Đăng ký tài khoản tại: https://www.vpn.net/
    - Tải và cài đặt Hamachi trên máy tính tại : https://www.vpn.net/
    - Đăng nhập tài khoản Hamachi.
    - Tạo 1 mạng riêng ảo(dạng: Mesh) - Gói free cho 5 máy tính 1 mạng.
    - Kết nối tới mạng đó và lấy Virtual IP của máy.
    - Chạy chương trình backend trên Virtual IP và cổng tự lựa chọn.
