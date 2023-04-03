//Chứa các hàm sử dụng chung cho hệ thống

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function stringToSlug(title) {
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}


// ------------------- validation ----------------
function kiemTraRong(value, name) {
    if (value.trim() === '') {
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} không được bỏ trống !`
        return false;
    }
}


function kiemTraRongSo(value, name) {
    if (value === '' || isNaN(value)) {
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} không được bỏ trống !`
        return false;
    }

    document.querySelector(`#error-required-${name}`).innerHTML = '';
    return true;
}

// kiểm tra tính đúng đắn của select . option
function kiemTraChucVu(idSelect, idError, name) {
    const select = document.querySelector(`#${idSelect}`);
    const error = document.querySelector(`#${idError}`);
    const selectedOption = select.options[select.selectedIndex].value;

    if (selectedOption === 'Chọn chức vụ' || !['Sếp', 'Trưởng phòng', 'Nhân viên'].includes(selectedOption)) {
        error.innerHTML = `${name} không được bỏ trống và phải chọn đúng giá trị!`;
        return false;
    }

    error.innerHTML = '';
    return true;
}


function kiemTraEmail(value, name) {
    var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regexEmail.test(value)) {
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ !`;
    return false;

}

function kiemTraSo(value, name) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ !`;
    return false;
}

function kiemTraKyTu(value, name) {
    var regexLetter = /^[a-zA-Zàáạảãăắằẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ\s]+$/;
    if (regexLetter.test(value)) {
        document.querySelector(`#error-regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regex-${name}`).innerHTML = `${name} không hợp lệ !`;
    return false;
}
// kiểm tra mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống .

function kiemTraMatKhau(value, name, minLength, maxLength, minSpecialChars, minUppercaseChars, minDigits) {
    var regexPassword = new RegExp(`^(?=.*[A-Z]{${minUppercaseChars},}})(?=.*\\d{${minDigits},}})(?=.*[@$!%*#?&]{${minSpecialChars},}})[A-Za-z\\d@$!%*#?&]{${minLength},${maxLength}}$`);
    if (regexPassword.test(value)) {
        document.querySelector(`#error-regexPass-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error-regexPass-${name}`).innerHTML = `${name} từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt) `;
    return false;
}



function kiemTraDoDai(value, name, minLength, maxLength) {
    if (value.trim().length < minLength || value.trim().length > maxLength) {
        document.querySelector(`#error-length-${name}`).innerHTML = `${name} từ ${minLength} - ${maxLength} ký tự !`;
        return false;
    }
    document.querySelector(`#error-length-${name}`).innerHTML = ``;
    return true;
}

function kiemTraGiaTri(value, name, minValue, maxValue) {

    if (Number.isNaN(value) || value < minValue || value > maxValue) {
        document.querySelector(`#error-value-${name}`).innerHTML = `${name} giá trị từ ${minValue} - ${maxValue}`;
        return false;
    }

    document.querySelector(`#error-value-${name}`).innerHTML = ``;
    return true;

}

// kiểm tra ngày làm ( hỏi chatgpt chứ không phải em viết)
function kiemTraNgayLam(value, name) {
    if (!value) {
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} không được bỏ trống !`
        return false; // Ngày làm không được để trống
    }

    const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexDate.test(value)) {
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} định dạng không đúng mm/dd/yyyy !`;
        return false; // Định dạng ngày không đúng
    }

    const parts = value.split('/');
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} định dạng không đúng mm/dd/yyyy !`;
        return false; // Ngày làm không hợp lệ
        
    }

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        document.querySelector(`#error-required-${name}`).innerHTML = `${name} định dạng không đúng mm/dd/yyyy !`;
        return false; // Ngày làm không hợp lệ
    }   
    document.querySelector(`#error-required-${name}`).innerHTML ='';
    return true;
}







// var regexCyber = /[abc]/im

// var text = 'zzzzzzza';

// console.log(regexCyber.test(text))