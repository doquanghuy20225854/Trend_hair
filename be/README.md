# Trend Hair Studio - Quản lý tiệm tóc

## Giới thiệu
Dự án Trend Hair Studio là hệ thống quản lý tiệm tóc với các chức năng đặt lịch, quản lý dịch vụ, sản phẩm, người dùng, và liên hệ giữa khách hàng và admin. Giao diện thân thiện, dễ sử dụng cho cả khách hàng và quản trị viên.

## Cấu trúc thư mục
```
be/
  ├── src/
  │   ├── app/
  │   │   ├── controllers/      # Controllers cho các chức năng
  │   │   ├── middlewares/      # Middleware xác thực, phân quyền
  │   │   ├── models/           # Mongoose models
  │   ├── config/db/            # Kết nối MongoDB
  │   ├── public/               # Tài nguyên tĩnh (ảnh, css)
  │   ├── resources/views/      # Giao diện Handlebars
  │   ├── routes/               # Định nghĩa các route
  │   ├── scripts/              # Script tạo admin, seed dữ liệu
  │   ├── util/                 # Tiện ích
  ├── package.json
  ├── README.md
```

## Chức năng chính
- Đăng ký/Đăng nhập (phân quyền customer & admin)
- Đặt lịch hẹn, quản lý lịch hẹn
- Quản lý dịch vụ, sản phẩm (CRUD cho admin)
- Quản lý người dùng (admin)
- Gửi liên hệ, admin trả lời trên web, customer xem phản hồi
- Trang chủ, bảng giá, giới thiệu, sản phẩm, liên hệ

## Công nghệ sử dụng
- Node.js, Express
- MongoDB (Mongoose)
- Handlebars (view engine)
- Bootstrap (giao diện)
- Nodemon (dev)

## Hướng dẫn cài đặt & chạy
1. **Clone dự án:**
   ```bash
   git clone <repo-url>
   cd be
   ```
2. **Cài đặt package:**
   ```bash
   npm install
   ```
3. **Cấu hình MongoDB:**
   - Sửa file `src/config/db/index.js` cho đúng URI MongoDB của bạn.
4. **Tạo tài khoản admin:**
   ```bash
   node src/scripts/createAdmin.js
   ```
   - Tài khoản mặc định: `admin` / `admin123`
5. **Chạy ứng dụng:**
   ```bash
   npm start
   ```
6. **Truy cập:**
   - Trang chủ: http://localhost:4000/
   - Đăng nhập admin: http://localhost:4000/auth/login
   - Quản trị: http://localhost:4000/admin

## Hướng dẫn sử dụng
- **Khách hàng:** Đăng ký, đăng nhập, đặt lịch, gửi liên hệ, xem sản phẩm, xem phản hồi admin.
- **Admin:** Đăng nhập, quản lý dịch vụ, sản phẩm, người dùng, lịch hẹn, trả lời liên hệ.

## Đóng góp
Mọi đóng góp, báo lỗi hoặc ý tưởng mới đều được hoan nghênh! Hãy tạo pull request hoặc issue trên repository này.

## Liên hệ
- Email: TrendHair@gmail.com
- Facebook: [Trend Hair Studio](https://web.facebook.com/tuantruyen99)

---
> © 2025 Trend Hair Studio. All rights reserved. 