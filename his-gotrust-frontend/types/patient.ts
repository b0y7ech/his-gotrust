// Types based on EMR 365 specification

export interface ThongTinBenhNhan {
  // Thông tin hành chính
  mabenhnhan: string;
  hoten: string;
  ngaysinh: string;
  tuoi: string;
  gioitinh: string;
  cccd_so: string;
  hochieu_so: string;
  
  // Thông tin liên hệ
  sodienthoai: string;
  diachi: string;
  sonha: string;
  thonpho: string;
  xaphuong: string;
  quanhuyen: string;
  quanhuyen_ma: string;
  tinhthanh: string;
  tinhthanh_ma: string;
  
  // Nghề nghiệp & Dân tộc
  nghenghiep: string;
  nghenghiep_ma: string;
  dantoc: string;
  dantoc_ma: string;
  ngoaikieu: string;
  ngoaikieu_ma: string;
  
  // Thông tin BHYT
  mabhyt: string;
  tungaybhyt: string;
  denngaybhyt: string;
  noidangkykcbbd: string;
  doituongbn_loai: string;
  
  // Thông tin y tế
  nhommau: string;
  yeutorh: string;
  
  // Thông tin người thân
  hotennguoithan: string;
  diachinguoithan: string;
  sodienthoainguoithan: string;
  
  // Tiền sử bệnh
  tiensubenhtatcuabanthan: TienSuBenh[];
  tiensubenhtatcuagiadinh: string;
  
  // Tiền sử sản phụ khoa (nữ)
  tiensusanphukhoa?: TienSuSanPhuKhoa;
  tiensusankhoa?: TienSuSanKhoa;
}

export interface TienSuBenh {
  thongtin_ma: string;
  thongtin_noidung: string;
  thongtin_giatri: string;
  thongtin_ghichu: string;
}

export interface TienSuSanPhuKhoa {
  tuoibatdaukinh: string;
  tinhchatkinhnguyet: string;
  chukykinhnguyet: string;
  songaythaykinh: string;
  luongkinh: string;
  kinhlancuoingay: string;
  daubungkinh: string;
  laychongnam: string;
  hetkinhnam: string;
  benhphukhoadadieutri: string;
}

export interface TienSuSanKhoa {
  PARA: string;
}

export interface ThongTinVaoVien {
  sovaovien: string;
  sophieu: string;
  phongkham: string;
  maphongkham: string;
  bacsikhambenh: string;
  mabacsikhambenh: string;
  
  // Lý do & Chẩn đoán
  lydovaovien: string;
  quatrinhbenhly: string;
  chandoancuanoigioithieu: string;
  chandoansobo: string;
  chandoanvaovien: string;
  khambenh_chandoanvaovienmaicd: string;
  
  // Sinh hiệu
  mach: string;
  nhietdo: string;
  nhiptho: string;
  huyetap_tamthu: string;
  huyetap_tamtruong: string;
  cannang: string;
  chieucao: string;
  spo2?: string;
  
  // Khám bệnh
  khambenh_toanthan: string;
  denkhambenhluc: string;
  dieutritaikhoa: string;
  madieutritaikhoa: string;
}

export interface ThongTinTiepDon {
  // Thông tin phiếu
  loaiba: string;
  sovaovien: string;
  soba: string;
  soluutru: string;
  makhoa: string;
  tenkhoa: string;
  thoigianvaovien: string;
  buong: string;
  giuong: string;
  
  // Lý do tiếp nhận
  lydotiepnhan: string;
  noigioithieu_loai: string;
  
  // Mức độ ưu tiên (Triage)
  mucDoUuTien: 'Cấp cứu' | 'Ưu tiên' | 'Thường';
}

export interface PatientReceptionData {
  thongTinBenhNhan: ThongTinBenhNhan;
  thongTinVaoVien: ThongTinVaoVien;
  thongTinTiepDon: ThongTinTiepDon;
}

// Mock CCCD data for demo
export interface CCCDData {
  cccd_so: string;
  hoten: string;
  ngaysinh: string;
  gioitinh: string;
  diachi: string;
  tinhthanh: string;
  quanhuyen: string;
  xaphuong: string;
}
