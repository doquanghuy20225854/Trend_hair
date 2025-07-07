const mongoose = require('mongoose');
const Service = require('../app/models/Service');
const db = require('../config/db');

const services = [
  { name: "Cắt Nữ", price: 250000, description: "Cắt tóc nữ" },
  { name: "Cắt bé", price: 70000, description: "Cắt tóc cho bé" },
  { name: "Cắt mái", price: 50000, description: "Cắt mái" },
  { name: "Gội", price: 100000, description: "Gội đầu" },
  { name: "Gội dưỡng chất", price: 150000, description: "Gội đầu dưỡng chất" },
  { name: "Sấy tạo kiểu", price: 100000, description: "Sấy tạo kiểu tóc" },
  { name: "Cắt gội", price: 300000, description: "Cắt và gội đầu" },
  { name: "Men Hair - Cắt", price: 150000, description: "Cắt tóc nam" },
  { name: "Men Hair - Uốn, nhuộm", price: 700000, description: "Uốn hoặc nhuộm tóc nam" },
  { name: "Men Hair - Uốn, nhuộm + olaplex", price: 900000, description: "Uốn, nhuộm + olaplex" },
  { name: "Men Hair - Tẩy", price: 300000, description: "Tẩy tóc nam" },
  { name: "Uốn, Duỗi Combo - Cắt + uốn/duỗi", price: 700000, description: "Cắt + uốn hoặc duỗi" },
  { name: "Uốn, Duỗi Combo - Cắt + uốn/duỗi keratin", price: 1200000, description: "Cắt + uốn/duỗi keratin" },
  { name: "Uốn, Duỗi Combo - Cắt + uốn/duỗi vacxin", price: 1400000, description: "Cắt + uốn/duỗi vacxin" },
  { name: "Phục Hồi Chuyên Sâu - Keratin", price: 800000, description: "Phục hồi keratin" },
  { name: "Phục Hồi Chuyên Sâu - Olaplex", price: 1000000, description: "Phục hồi olaplex" },
  { name: "Phục Hồi Chuyên Sâu - Bọc keratin", price: 2000000, description: "Bọc keratin (giá từ 2tr - 3tr)" },
  { name: "Dịch Vụ Lẻ - Nâng nền + tẩy + bóc đen", price: 600000, description: "" },
  { name: "Dịch Vụ Lẻ - Làm phồng chân tóc", price: 500000, description: "" },
  { name: "Dịch Vụ Lẻ - Nhuộm chân tóc", price: 500000, description: "" },
  { name: "Dịch Vụ Lẻ - Duỗi chân tóc, xả bấm", price: 500000, description: "" },
  { name: "Dịch Vụ Lẻ - Duỗi lớp ngoài", price: 400000, description: "" },
  { name: "Dịch Vụ Lẻ - Uốn mái", price: 300000, description: "" },
  { name: "Dịch Vụ Lẻ - Nâng nền", price: 300000, description: "" },
  { name: "Dịch Vụ Lẻ - Hấp morocanil, collagen", price: 600000, description: "" },
  { name: "Nhuộm", price: 700000, description: "" },
  { name: "Nhuộm keratin", price: 1200000, description: "" },
  { name: "Nhuộm vacxin", price: 1400000, description: "" },
  { name: "Light 1/2", price: 700000, description: "" },
  { name: "Light full", price: 1200000, description: "" },
  { name: "Balayage, ombre", price: 3500000, description: "" },
  { name: "Balayage, ombre + phục hồi olaplex", price: 4500000, description: "" }
];

async function seed() {
  await db.connect();
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log('Đã seed dữ liệu bảng giá dịch vụ thành công!');
  process.exit();
}

seed(); 