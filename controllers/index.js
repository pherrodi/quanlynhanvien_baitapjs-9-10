// biến array lưu trữ dữ liệu nhân viên

var arrNhanVien = [];

document.querySelector('#btnThemNV').onclick = function (event) {
    event.preventDefaul();
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
    valid = kiemTraRong(nv.taiKhoan, 'taiKhoan') & kiemTraRong(nv.hoTen, 'hoTen') & kiemTraRong(nv.email, 'email') & kiemTraRong(nv.matKhau, 'password') & kiemTraRongSo(nv.luongCoBan, 'luongCB') & kiemTraRongSo(nv.gioLam, 'gioLam');
    // kiểm tra chức vụ
    valid = kiemTraChucVu('chucvu', 'error-select-chucvu', 'Chức vụ');
    // kiểm tra email
    valid = kiemTraEmail(nv.email, 'email');
    // kiểm tra độ dài tài khoản
    valid = kiemTraDoDai(nv.taiKhoan, 'taiKhoan', 4, 6);
    // kiểm tra tên nv phải là chữ
    valid = kiemTraKyTu(nv.hoTen, 'hoTen');
    // kiểm tra password 
    // valid = kiemTraMatKhau(nv.matKhau,'password',4,10,1,1,1);
    // kiểm tra ngày làm đúng định dạng mm/dd/yyyy
    valid = kiemTraNgayLam(nv.ngayLam, 'ngayLam');
    // kiểm tra lương cơ bản từ 1tr-20tr
    valid = kiemTraGiaTri(nv.luongCoBan, 'luongCB', 1000000, 20000000)
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
        Object.assign(nvNew, nv);
        htmlContent += `
        <tr>
        <td>${nvNew.taiKhoan}</td>
        <td>${nvNew.hoTen}</td>
        <td>${nvNew.email}</td>
        <td>${nvNew.ngayLam}</td>
        <td>${nvNew.chucVu}</td>
        <td>${nvNew.tongLuong()}</td>
        <td>${nvNew.xepLoaiNhanVien()}</td>
        <td><button class="btn btn-danger" onclick="xoaNhanVienTheoMa('${nvNew.taiKhoan}')">Xóa</button></td>
        <td><button class="btn btn-success" onclick="chinhSuaNhanVien('${nvNew.taiKhoan}')">Chỉnh Sửa</button></td>

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
    }
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
