# CNPM
**Học phần** : Nhập môn Công nghệ phần mềm - IT3180.

**Tên đề tài** : Phần mềm quản lý thu phí chung cư.

**Thành viên** : 
- Bùi Đức Việt - 20215513
- Đinh Ngọc Toàn - 20215486
- Nguyễn Mạnh Hiếu
- Nguyễn Minh Nhật

**Ngôn ngữ sử dụng** :
- [Golang](https://golang.org/)
- Javascript.


### 1. [Xác định yêu cầu phần mềm](https://github.com/ThanhPP/HUST_20192_QuanLyKyTucXa/tree/master/TaiLieu/XacDinhYeuCauPhanMem)

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
## Cài đặt Hamachi
- Đăng ký tài khoản tại: https://www.vpn.net/
- Tải và cài đặt Hamachi trên máy tính tại : https://www.vpn.net/
- Đăng nhập tài khoản Hamachi.
- Tạo 1 mạng riêng ảo(dạng: Mesh) - Gói free cho 5 máy tính 1 mạng.
- Kết nối tới mạng đó và lấy Virtual IP của máy.
- Chạy chương trình backend trên Virtual IP và cổng tự lựa chọn.
