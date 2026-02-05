# HIS GoTrust - Phòng khám Victoria Healthcare

Hệ thống quản lý phòng khám thông minh (Hospital Information System) cho Phòng khám Victoria Healthcare.

## Giới thiệu

HIS GoTrust là một hệ thống quản lý phòng khám toàn diện, được thiết kế để tối ưu hóa quy trình vận hành và nâng cao chất lượng dịch vụ y tế tại Phòng khám Victoria Healthcare. Hệ thống bao gồm:

- **Quản lý tiếp đón**: Đăng ký bệnh nhân, phân loại khẩn cấp (triage)
- **Khám bệnh**: EMR điện tử, kê đơn thuốc, chỉ định xét nghiệm
- **Quản lý bệnh nhân**: Theo dõi hồ sơ, lịch sử khám chữa bệnh
- **Xét nghiệm & chẩn đoán**: Tích hợp LIS, PACS
- **Quản lý dược**: Kho thuốc, vật tư y tế
- **Thanh toán viện phí**: BHYT, tự trả

## Công nghệ

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: .NET 8.0, ASP.NET Core
- **UI Framework**: Tailwind CSS
- **Icons**: Heroicons

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tính năng chính

### 1. Tiếp đón bệnh nhân
- Quét CCCD gắn chip tự động
- Tra cứu thẻ BHYT
- Phân loại khẩn cấp (Triage)
- Đánh giá dấu hiệu sinh tồn

### 2. Khám bệnh
- Bệnh án điện tử (EMR)
- Kê đơn thuốc thông minh
- Chỉ định xét nghiệm, chẩn đoán hình ảnh
- Cảnh báo tương tác thuốc

### 3. Quản lý bệnh nhân
- Hồ sơ bệnh nhân tập trung
- Lịch sử khám chữa bệnh
- Theo dõi diễn biến lâm sàng
- In tờ khám bệnh, đơn thuốc

## Liên hệ

**Phòng khám Victoria Healthcare**
- Địa chỉ: Tầng 3, Tòa nhà Vincom Center, Đường Lê Thánh Tôn, TP.HCM
- Điện thoại: 028.3822.3456
- Email: info@victoriahealthcare.vn

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
