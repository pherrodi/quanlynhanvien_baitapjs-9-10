function NhanVien () {
    this.taiKhoan = '';
    this.hoTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCoBan = 0;
    this.chucVu = '';
    this.gioLam = 0;
    this.loaiNhanVien = '';
    this.tongLuong = function () {
        var heSoLuong = 0;
        var tongLuong = 0;
        if (this.chucVu === "Sếp") {
            heSoLuong = 3;
          } else if (this.chucVu === "Trưởng phòng") {
            heSoLuong = 2;
          } else if (this.chucVu === "Nhân viên") {
            heSoLuong = 1;
          } else {
            heSoLuong = 0;
          }
           tongLuong = heSoLuong * this.luongCoBan;
          return tongLuong;
        }
    this.xepLoaiNhanVien = function () {
      var xepLoai = '';
      if (this.gioLam >= 192) {
        xepLoai = 'Xuất sắc';
      }
      else if (this.gioLam>=176) {
        xepLoai = 'Giỏi';
      }
      else if (this.gioLam>=160) {
        xepLoai = 'Khá';
      }
      else {
        xepLoai = 'Trung bình';
      }
      return xepLoai;
    }


}