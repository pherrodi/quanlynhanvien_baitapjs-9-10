// biến array lưu trữ dữ liệu nhân viên

var arrNhanVien = [];

document.querySelector('#btnThemNV').onclick = function (event) {
    event.preventDefault();
    // chặn sự kiện reload


    var nv = new NhanVien();
    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.hoTen = document.querySelector('#hoTen').value;
    nv.email = document.querySelector('#email').value;
    nv.ngayLam = document.querySelector('#datepicker').value;
    nv.matKhau = document.querySelector('#password').value;
    var chonChucVu = document.querySelector('#chucvu');
    nv.chucVu = chonChucVu.value;
    nv.luongCoBan = parseInt(document.querySelector('#luongCB').value);
    nv.gioLam = parseInt(document.querySelector('#gioLam').value);


    var valid = true;
    var messError = '';
    // kiểm tra rỗng 
    valid = kiemTraRong(nv.taiKhoan, 'taiKhoan') & kiemTraRong(nv.hoTen, 'hoTen') & kiemTraRong(nv.email, 'email') & kiemTraRong(nv.matKhau, 'password') & kiemTraRongSo(nv.luongCoBan, 'luongCB') & kiemTraRongSo(nv.gioLam, 'gioLam') &kiemTraChucVu('chucvu', 'error-select-chucvu', 'Chức vụ') & kiemTraEmail(nv.email, 'email') & kiemTraGiaTri(nv.luongCoBan, 'luongCB', 1000000, 20000000) & kiemTraGiaTri(nv.gioLam, 'gioLam', 80, 200) &  kiemTraNgayLam(nv.ngayLam, 'ngayLam') ;
   
    
    
    // kiểm tra độ dài tài khoản
    valid = kiemTraDoDai(nv.taiKhoan, 'taiKhoan', 4, 6);
    // kiểm tra tên nv phải là chữ
    valid = kiemTraKyTu(nv.hoTen, 'hoTen');
    // kiểm tra password 
    // valid = kiemTraMatKhau(nv.matKhau,'password',4,10,1,1,1);
    // kiểm tra ngày làm đúng định dạng mm/dd/yyyy

   
    
    // kiểm tra số giờ làm từ 80-200 giờ 
    valid = kiemTraGiaTri(nv.gioLam, 'gioLam', 80, 200);
    if (!valid) {

        return;
    }
    arrNhanVien.push(nv);
    renderNhanVien(arrNhanVien);
    saveStorage();
    console.log('arrNhanVien', arrNhanVien);
}

/**
 * Hàm nhận vào 1 mảng arrNhanVien
 * @param {*} arrNV 
 * @returns 
 * 1 chuỗi và dom ra giao diện
 */

function renderNhanVien(arrNV) {
    var htmlContent = '';
    for (var i = 0; i < arrNV.length; i++) {
        var nvNew = new NhanVien();
        var nv = arrNV[i];
         nv.xepLoaiNhanVien = function () {
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
           nv.tongLuong = function () {
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
        htmlContent += `
        <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong()}</td>
        <td>${nv.xepLoaiNhanVien()}</td>
        <td><button class="btn btn-danger" onclick="xoaNhanVienTheoMa('${nv.taiKhoan}')">Xóa</button></td>
        <td><button class="btn btn-success" onclick="chinhSuaNhanVien('${nv.taiKhoan}')">Chỉnh Sửa</button></td>

        </tr>
        `
    }
    
    document.querySelector('#tableDanhSach').innerHTML = htmlContent;
    return htmlContent;
}


// Xóa Nhân viên 

function xoaNhanVienTheoMa(taiKhoanNVClick) {
    var indexDel = -1;
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nhanVien = arrNhanVien[i];
        if (nhanVien.taiKhoan === taiKhoanNVClick) {
            indexDel = i;
            break;
        }
    }
    if (indexDel !== -1) {
        arrNhanVien.splice(indexDel, 1);
        renderNhanVien(arrNhanVien);
    }

}

// Chỉnh sửa nhân viên

function chinhSuaNhanVien(taiKhoanNVClick) {
    var indexEdit = -1;
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nhanVien = arrNhanVien[i];
        if (nhanVien.taiKhoan === taiKhoanNVClick) {
            indexEdit = i;
            break;
        }
    }
    if (indexEdit !== -1) {
        document.querySelector('#tknv').value = arrNhanVien[indexEdit].taiKhoan;
        document.querySelector('#hoTen').value = arrNhanVien[indexEdit].hoTen;
        document.querySelector('#email').value = arrNhanVien[indexEdit].email;
        document.querySelector('#datepicker').value = arrNhanVien[indexEdit].ngayLam;
        document.querySelector('#password').value = arrNhanVien[indexEdit].matKhau;
        var chonChucVu = document.querySelector('#chucvu');
        chonChucVu.value =  arrNhanVien[indexEdit].chucVu;
       document.querySelector('#luongCB').value = arrNhanVien[indexEdit].luongCoBan;
        document.querySelector('#gioLam').value = arrNhanVien[indexEdit].gioLam;
        document.querySelector('#btnThemNV').disabled = true;
        document.querySelector('#tknv').disabled = true;
    }
  
    $('#myModal').modal('show');
}
// cập nhật nhân viên

document.querySelector('#btnCapNhat').onclick = function () {
    var nhanVienEdit = new NhanVien();
    nhanVienEdit.taiKhoan = document.querySelector('#tknv').value;
    nhanVienEdit.hoTen = document.querySelector('#hoTen').value;
    nhanVienEdit.email = document.querySelector('#email').value;
    nhanVienEdit.ngayLam = document.querySelector('#datepicker').value;
    nhanVienEdit.matKhau = document.querySelector('#password').value;
    var chonChucVu = document.querySelector('#chucvu');
    nhanVienEdit.chucVu = chonChucVu.value;
    nhanVienEdit.luongCoBan = parseInt(document.querySelector('#luongCB').value);
    nhanVienEdit.gioLam = parseInt(document.querySelector('#gioLam').value);

    for(var i=0;i<arrNhanVien.length;i++) {
        if(arrNhanVien[i].taiKhoan === nhanVienEdit.taiKhoan) {
            var nvMang = arrNhanVien[i];
            nvMang.hoTen =  nhanVienEdit.hoTen;
            nvMang.email = nhanVienEdit.email;
            nvMang.ngayLam = nhanVienEdit.ngayLam;
            nvMang.matKhau = nhanVienEdit.matKhau;
            nvMang.chucVu = nhanVienEdit.chucVu;
            nvMang.luongCoBan = nhanVienEdit.luongCoBan;
            nvMang.gioLam = nhanVienEdit.gioLam;
            break;
        }
    }
    var valid = true;
    var messError = '';
    // kiểm tra rỗng 
    valid = kiemTraRong(nvMang.taiKhoan, 'taiKhoan') & kiemTraRong(nvMang.hoTen, 'hoTen') & kiemTraRong(nvMang.email, 'email') & kiemTraRong(nvMang.matKhau, 'password') & kiemTraRongSo(nvMang.luongCoBan, 'luongCB') & kiemTraRongSo(nvMang.gioLam, 'gioLam') &kiemTraChucVu('chucvu', 'error-select-chucvu', 'Chức vụ') & kiemTraEmail(nvMang.email, 'email') & kiemTraGiaTri(nvMang.luongCoBan, 'luongCB', 1000000, 20000000) & kiemTraGiaTri(nvMang.gioLam, 'gioLam', 80, 200) &  kiemTraNgayLam(nvMang.ngayLam, 'ngayLam') ;
   
    
    
    // kiểm tra độ dài tài khoản
    valid = kiemTraDoDai(nvMang.taiKhoan, 'taiKhoan', 4, 6);
    // kiểm tra tên nvMang phải là chữ
    valid = kiemTraKyTu(nvMang.hoTen, 'hoTen');
    // kiểm tra password 
    // valid = kiemTraMatKhau(nv.matKhau,'password',4,10,1,1,1);
    // kiểm tra ngày làm đúng định dạng mm/dd/yyyy

   
    
    // kiểm tra số giờ làm từ 80-200 giờ 
    valid = kiemTraGiaTri(nv.gioLam, 'gioLam', 80, 200);
    if (!valid) {

        return;
    }
    $('#myModal').modal('hide');
    renderNhanVien(arrNhanVien);
    saveStorage();

}

// tìm nhân viên theo loại

document.querySelector('#btnTimNV').onclick = function() {
  var tuKhoa = document.querySelector('#searchName').value.trim();
  tuKhoa = stringToSlug(tuKhoa); //Nguyễn Văn A => nguyen-van-a
  console.log('Từ khoá',tuKhoa);
  var arrNhanVienTK = [];
  for (var index = 0; index < arrNhanVien.length; index++) {
      //Mỗi lần duyệt lấy ra 1 sinh viên
      var sv = arrNhanVien[index];

      if(stringToSlug(sv.xepLoaiNhanVien().trim()).search(tuKhoa) !== -1){
          //Tìm ra tenSinhVien nào chứa từ khoá thì đưa object sinh vien đó vào mảng tìm kiếm
          arrNhanVienTK.push(sv);
      }
  }
  renderNhanVien(arrNhanVienTK);
}



// lưu vào storage

function saveStorage() {
    //B1: Xác định được dữ liệu cần lưu là arr,object hay string,bool,number
    var sArrNhanVien = JSON.stringify(arrNhanVien); //Biến đổi arrNhanVien => chuỗi
    console.log(sArrNhanVien);
    //B2: Đem string arrNhanVien vào localstorage lưu trữ
    localStorage.setItem('arrNhanVien', sArrNhanVien);
    //Lưu dữ liệu vào cookie
    setCookie('arrNhanVien', sArrNhanVien, 30);
}

function getStorage() {
    if (localStorage.getItem('arrNhanVien')) {
        var stringArrNhanVien = localStorage.getItem('arrNhanVien');
        arrNhanVien = JSON.parse(stringArrNhanVien);
        console.log('arrNhanVien', arrNhanVien);

    }
}

getStorage();



renderNhanVien(arrNhanVien);
