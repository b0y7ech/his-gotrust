# **TÀI LIỆU YÊU CẦU NGHIỆP VỤ (BRD) \- DỰ ÁN HỆ THỐNG QUẢN LÝ PHÒNG KHÁM VICTORIA HEALTHCARE (HIS)**

## **1\. Tóm tắt Quản trị (Executive Summary)**

Dự án nhằm xây dựng một hệ thống HIS hiện đại, tích hợp EMR (Bệnh án điện tử) để thay thế các quy trình thủ công và hệ thống rời rạc hiện tại cho Phòng khám Victoria Healthcare. Giải pháp không chỉ dừng lại ở việc số hóa hồ sơ mà còn đóng vai trò là "hệ điều hành" của phòng khám, tối ưu hóa nguồn lực, giảm thiểu sai sót y khoa và nâng cao trải nghiệm bệnh nhân. **Lợi thế chiến lược:** Đưa phòng khám đạt tiêu chuẩn chuyển đổi số y tế (Thông tư 46/2018/TT-BYT), tạo nền tảng cho y tế thông minh và phân tích dữ liệu lớn (Big Data).

## **2\. Giới thiệu & Bối cảnh dự án**

* **Thực trạng:** Tại Việt Nam, các phòng khám đa khoa đang đối mặt với tình trạng quá tải và quy trình vận hành chồng chéo. Xu hướng hiện nay là chuyển dịch từ "quản lý hành chính" sang "hỗ trợ ra quyết định lâm sàng".  
* **Bối cảnh dự án:** Dự án này được thiết kế cho Phòng khám Victoria Healthcare để kết nối toàn diện các khoa phòng từ Tiếp đón, Khám bệnh, Xét nghiệm, Chẩn đoán hình ảnh đến Nội trú và Thanh toán viện phí.

## **3\. Mục tiêu Kinh doanh**

* **Tối ưu hóa quy trình vận hành:**  
  * Giảm 40% thời gian chờ đợi tại khâu tiếp đón và thanh toán.  
  * Rút ngắn thời gian luân chuyển bệnh án giữa các khoa phòng xuống gần như bằng 0\.  
* **Nâng cao chất lượng chuyên môn:**  
  * Giảm thiểu 99% lỗi sai sót trong kê đơn và chỉ định cận lâm sàng nhờ hệ thống cảnh báo thông minh.  
  * Số hóa 100% bệnh án (EMR), tiến tới phòng khám không giấy tờ.  
* **Tăng hiệu quả tài chính:**  
  * Kiểm soát chặt chẽ việc thất thoát dược phẩm và vật tư y tế.  
  * Tự động hóa báo cáo quyết toán BHYT, giảm tỉ lệ xuất toán do sai sót thủ tục.

## **4\. Phạm vi dự án (Scope of Work)**

### **4.1. In-scope (Trong phạm vi)**

* Phân hệ Quản lý Ngoại trú & Nội trú.  
* Phân hệ Cận lâm sàng (LIS \- Phòng xét nghiệm, RIS/PACS \- Chẩn đoán hình ảnh).  
* Phân hệ Quản lý Dược & Vật tư y tế.  
* Phân hệ Viện phí & Cổng thanh toán (tích hợp BHYT).  
* Hệ thống báo cáo quản trị (Dashboard cho Ban Giám đốc).

### **4.2. Out-of-scope (Ngoài phạm vi)**

* Phần mềm quản lý nhân sự & tiền lương (HRM).  
* Hệ thống ERP kế toán tài chính chuyên sâu (chỉ xuất dữ liệu đầu ra cho kế toán).  
* Ứng dụng di động dành cho bệnh nhân (sẽ phát triển ở giai đoạn 2).

### **4.3. Làm rõ phạm vi (Clarifications)**

* Việc kết nối máy xét nghiệm (LIS) chỉ áp dụng cho các máy có hỗ trợ giao thức kết nối chuẩn (ASTM/HL7).  
* Hệ thống EMR tuân thủ theo định dạng của Bộ Y tế Việt Nam nhưng chưa bao gồm việc triển khai chữ ký số cho 100% nhân viên trong giai đoạn MVP.

## **5\. Các bên liên quan (Stakeholders)**

| Vai trò | Kỳ vọng chính |
| :---- | :---- |
| **Ban Giám đốc** | Báo cáo realtime về doanh thu, công suất giường bệnh và chất lượng điều trị. |
| **Bác sĩ** | Giao diện nhập liệu nhanh, tra cứu tiền sử bệnh nhân dễ dàng, hỗ trợ ra quyết định lâm sàng. |
| **Điều dưỡng** | Theo dõi y lệnh chính xác, quản lý vật tư tiêu hao tự động theo ca trực. |
| **Bộ phận Tiếp đón** | Tìm kiếm bệnh nhân nhanh, giảm thiểu thủ tục giấy tờ đầu vào. |
| **Bệnh nhân** | Quy trình khám nhanh chóng, minh bạch về chi phí và hồ sơ bệnh án tại Victoria Healthcare. |

## **6\. Yêu cầu Nghiệp vụ (Business Requirements)**

### **6.1. Module Tiếp đón & Phân loại (Triage)**

* Hệ thống phải hỗ trợ quét mã QR trên thẻ CCCD gắn chip để tự động đổ dữ liệu hành chính.  
* **Kịch bản:** Bệnh nhân đến khám lần đầu \-\> Quét CCCD \-\> Hệ thống tự sinh mã PID (Patient ID) duy nhất \-\> Gợi ý phòng khám dựa trên triệu chứng sơ bộ.

### **6.2. Module Khám bệnh & Kê đơn điện tử (EMR)**

* Hỗ trợ tạo đơn thuốc từ bộ mẫu (Template) theo từng nhóm bệnh lý.  
* **Cảnh báo thông minh:** Hệ thống phải tự động kiểm tra tương tác thuốc (Drug-Drug Interaction) và dị ứng dựa trên hồ sơ bệnh nhân.  
* **Liên thông dữ liệu:** Bác sĩ có thể xem kết quả xét nghiệm/X-quang trực tiếp tại màn hình khám bệnh mà không cần chuyển tab.

### **6.3. Module Quản lý Nội trú**

* Quản lý sơ đồ giường bệnh theo thời gian thực (Trống/Đang sử dụng/Đang chờ vệ sinh).  
* Theo dõi y lệnh hàng ngày: Hệ thống tự động tách y lệnh thành danh sách thuốc/vật tư cần lĩnh tại kho dược.

### **6.4. Module Quản lý Dược & Kho**

* Quản lý dược theo lô/hạn dùng và cảnh báo khi thuốc sắp hết hạn hoặc dưới định mức tồn kho an toàn.  
* `[Gợi ý bổ sung]` **Tự động hóa kho:** Tích hợp quy trình duyệt phiếu dự trù đa tầng (Trưởng khoa \-\> Kho dược \-\> Ban giám đốc) ngay trên hệ thống.

## **7\. Mô hình quy trình nghiệp vụ (To-be)**

1. **Tiếp đón:** Bệnh nhân đăng ký (Online/Offline) \-\> Hệ thống cấp số thứ tự thông minh.  
2. **Lâm sàng:** Bác sĩ khám \-\> Chỉ định cận lâm sàng (dữ liệu đẩy trực tiếp xuống phòng máy) \-\> Kê đơn (chữ ký số).  
3. **Cận lâm sàng:** Thực hiện xét nghiệm/siêu âm \-\> Kết quả tự động đổ về bệnh án điện tử của bác sĩ lâm sàng.  
4. **Thanh toán:** Hệ thống tự tổng hợp bảng kê chi phí (BHYT \+ Tự trả) \-\> Xuất hóa đơn điện tử \-\> Bệnh nhân nhận thuốc/Ra viện.  
* **Lợi ích:** Dữ liệu chảy xuyên suốt, không có hiện tượng bệnh nhân phải cầm tờ kết quả giấy chạy đi chạy lại.

## **8\. Ràng buộc và Giả định**

* **Ràng buộc:** Hệ thống phải đảm bảo an toàn thông tin theo cấp độ 3 và tuân thủ tiêu chuẩn HL7, DICOM trong y tế.  
* **Ràng buộc:** Thời gian phản hồi của hệ thống (Response time) không quá 2 giây cho các thao tác tra cứu thông thường.  
* **Giả định:** Phòng khám Victoria Healthcare đã có hạ tầng mạng nội bộ (LAN) ổn định và máy chủ đáp ứng được tải lượng người dùng đồng thời cao.  
* `[Gợi ý bổ sung]` **Tính sẵn sàng:** Hệ thống cần có cơ chế dự phòng (Failover) để hoạt động ngoại tuyến (Offline) trong trường hợp mất kết nối internet/máy chủ trung tâm để không làm gián đoạn việc cấp cứu.

## **9\. Tiêu chí thành công của dự án**

* **KPI Định lượng:**  
  * 100% hồ sơ bệnh nhân được quản lý bằng mã PID duy nhất.  
  * Giảm 50% thời gian tổng hợp báo cáo quyết toán BHYT hàng tháng.  
  * Tỉ lệ đơn thuốc điện tử hợp lệ đạt 100%.  
* **KPI Định tính:**  
  * Đạt mức 4/5 trong khảo sát mức độ hài lòng của nhân viên y tế về công cụ làm việc.  
  * Sẵn sàng về mặt kỹ thuật để bệnh viện thực hiện thẩm định Bệnh án điện tử thay thế bệnh án giấy.
