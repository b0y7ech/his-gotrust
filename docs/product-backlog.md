# **CHI TIẾT PRODUCT BACKLOG \- HỆ THỐNG HIS (EMR-READY)**

## **1\. Module Tiếp đón & Quản lý Bệnh nhân (PPM)**

*Mục tiêu: Tối ưu tốc độ tiếp nhận và tính chính xác của dữ liệu đầu vào.*

| ID | Tính năng | Mô tả chi tiết | Ưu tiên |
| :---- | :---- | :---- | :---- |
| PPM-01 | Quét mã QR/CCCD | Tự động trích xuất họ tên, ngày sinh, địa chỉ từ CCCD gắn chip hoặc thẻ BHYT. | Cao |
| PPM-02 | Quản lý mã PID | Cấp mã định danh duy nhất cho bệnh nhân toàn hệ thống để theo dõi bệnh sử trọn đời. | Cao |
| PPM-03 | Phân loại bệnh (Triage) | Công cụ nhập chỉ số sinh tồn nhanh (Mạch, Nhiệt độ, BP) để ưu tiên ca cấp cứu. | Trung bình |
| PPM-04 | Đặt lịch hẹn Online | Tích hợp dữ liệu từ Website/App để bác sĩ biết trước danh sách chờ. | Thấp |

## **2\. Module Khám bệnh Ngoại trú (OPD)**

*Mục tiêu: Giảm tải thao tác cho bác sĩ, tập trung vào chuyên môn.*

| ID | Tính năng | Mô tả chi tiết | Ưu tiên |
| :---- | :---- | :---- | :---- |
| OPD-01 | Bệnh án điện tử (EMR) | Giao diện nhập liệu theo SOAP (Chủ quan, Khách quan, Đánh giá, Kế hoạch). | Cao |
| OPD-02 | Kê đơn thuốc thông minh | Gợi ý đơn thuốc mẫu; Tự động tính liều lượng dựa trên cân nặng/tuổi. | Cao |
| OPD-03 | Chỉ định CLS nhanh | Click chọn các gói xét nghiệm/CĐHA theo bộ mã giá viện phí/BHYT. | Cao |
| OPD-04 | Lịch sử khám bệnh | Hiển thị biểu đồ diễn tiến các chỉ số xét nghiệm từ các lần khám trước. | Trung bình |
| OPD-05 | Chữ ký số điện tử | Tích hợp ký số vào đơn thuốc và kết quả khám để thay thế bản giấy. | Cao |

## **3\. Module Quản lý Nội trú (IPD)**

*Mục tiêu: Quản lý chặt chẽ diễn biến điều trị và công suất giường bệnh.*

| ID | Tính năng | Mô tả chi tiết | Ưu tiên |
| :---- | :---- | :---- | :---- |
| IPD-01 | Sơ đồ khoa phòng | Hiển thị Dashboard trực quan về tình trạng giường (Trống/Bẩn/Đang điều trị). | Cao |
| IPD-02 | Quản lý Y lệnh (Physician Orders) | Hệ thống quản lý y lệnh thuốc, dịch truyền, chăm sóc theo mốc thời gian. | Cao |
| IPD-03 | Tổng kết bệnh án | Tự động tổng hợp dữ liệu từ lúc vào viện đến lúc ra viện để làm thủ tục ra viện nhanh. | Trung bình |
| IPD-04 | Hội chẩn trực tuyến | Chia sẻ hồ sơ bệnh án giữa các khoa để hội chẩn nội bộ. | Thấp |

## **4\. Module Cận lâm sàng (LIS & RIS/PACS)**

*Mục tiêu: Kết nối máy móc, giảm thiểu sai sót do nhập liệu thủ công.*

| ID | Tính năng | Mô tả chi tiết | Ưu tiên |
| :---- | :---- | :---- | :---- |
| LIS-01 | Kết nối máy xét nghiệm | Tự động nhận kết quả từ máy xét nghiệm (2 chiều) qua giao thức HL7/ASTM. | Cao |
| RIS-01 | Quản lý chẩn đoán hình ảnh | Quản lý danh sách chờ chụp X-quang, CT, MRI và trả kết quả bằng text. | Cao |
| PACS-01 | Tích hợp xem ảnh DICOM | Cho phép bác sĩ xem ảnh X-quang/CT chất lượng cao trực tiếp trên HIS. | Trung bình |
| CLS-02 | Barcode mẫu xét nghiệm | In và quét mã vạch trên ống nghiệm để tránh nhầm lẫn mẫu bệnh phẩm. | Cao |

## **5\. Module Dược & Vật tư y tế (Inventory)**

*Mục tiêu: Chống thất thoát và đảm bảo chuỗi cung ứng.*

| ID | Tính năng | Mô tả chi tiết | Ưu tiên |
| :---- | :---- | :---- | :---- |
| INV-01 | Quản lý kho đa tầng | Kho tổng \-\> Kho lẻ (kho khoa phòng) \-\> Tủ trực điều dưỡng. | Cao |
| INV-02 | Cảnh báo hạn dùng/Tồn kho | Tự động gửi thông báo khi thuốc sắp hết hạn hoặc dưới định mức an toàn. | Trung bình |
| INV-03 | Duyệt phiếu dự trù | Quy trình phê duyệt online giữa khoa lâm sàng và khoa dược. | Trung bình |
| INV-04 | Kiểm kê mã vạch | Sử dụng thiết bị cầm tay quét mã thuốc để kiểm kho định kỳ. | Thấp |

## **6\. Module Viện phí & Thanh toán BHYT**

*Mục tiêu: Minh bạch tài chính và tối ưu quy trình hoàn ứng.*

| ID | Tính năng | Mô tả chi tiết | Ưu tiên |
| :---- | :---- | :---- | :---- |
| FIN-01 | Tạm ứng & Hoàn ứng | Quản lý tiền tạm ứng của bệnh nhân nội trú và cảnh báo khi sắp hết tiền. | Cao |
| FIN-02 | Giám định BHYT tự động | Tự động kiểm tra các quy tắc xuất toán BHYT (sai mã, sai giá, trái tuyến) trước khi đẩy dữ liệu. | Cao |
| FIN-03 | Xuất hóa đơn điện tử | Tích hợp với các nhà cung cấp hóa đơn (VNPT, Viettel, Misa). | Cao |
| FIN-04 | Thanh toán không tiền mặt | Tích hợp QR Code, POS ngân hàng để bệnh nhân thanh toán tại quầy. | Trung bình |

## **7\. Báo cáo Quản trị (BI & Reporting)**

*Mục tiêu: Hỗ trợ lãnh đạo ra quyết định dựa trên dữ liệu.*

| ID | Tính năng | Mô tả chi tiết | Ưu tiên |
| :---- | :---- | :---- | :---- |
| REP-01 | Báo cáo doanh thu | Doanh thu theo khoa, theo bác sĩ, theo loại hình dịch vụ (real-time). | Cao |
| REP-02 | Báo cáo công suất | Tỉ lệ sử dụng giường bệnh, thời gian điều trị trung bình (ALOS). | Trung bình |
| REP-03 | Báo cáo 15 mẫu BHYT | Tự động kết xuất các mẫu báo cáo theo quy định của cơ quan BHXH. | Cao |

## **8\. Tính năng nâng cao**

| ADV-01 | Nâng cao | Trợ lý AI Lâm sàng (CDSS) | Trung bình | \[Vượt mong đợi\] Hỗ trợ bác sĩ ra quyết định chính xác hơn. |
| :---- | :---- | :---- | :---- | :---- |
| **ADV-02** | **Nâng cao** | **AI Copy-paste & Tối ưu nhập liệu** | **Trung bình** | **\[Vượt mong đợi\]** Tăng tốc độ làm việc của bác sĩ lên gấp đôi. |
