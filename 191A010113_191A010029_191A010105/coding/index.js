function showCourseCode() {
    var courseName = document.getElementById("course-name").value;
    var courseCodeField = document.getElementById("course-code");

    
    var courseCodes = {
        "math": "MATH101",
        "science": "SCI202",
        "history": "HIST303"
        
    };

   
    if (courseCodes.hasOwnProperty(courseName)) {
        courseCodeField.value = courseCodes[courseName];
    } else {
        courseCodeField.value = "";
    }
}

function generateInvoice() {
    var form = document.getElementById("course-registration-form");

   
    var courseName = form.elements["course-name"].value;
    var courseCode = form.elements["course-code"].value;
    var teacher = form.elements["teacher"].value;
    var startDate = form.elements["start-date"].value;
    var endDate = form.elements["end-date"].value;
    var totalPrice = calculateTotalPrice();
    
   
    var invoicePreview = document.getElementById("invoice-preview");
    invoicePreview.innerHTML = `
        <h2>Hóa đơn</h2>
        <p><strong>Mã hóa đơn:</strong> ${generateInvoiceCode()}</p>
        <p><strong>Môn học:</strong> ${courseName}</p>
        <p><strong>Mã môn học:</strong> ${courseCode}</p>
        <p><strong>Tổng giá tiền:</strong> ${totalPrice.toLocaleString("vi-VN")} VNĐ</p>
        <p><strong>Ngày bắt đầu:</strong> ${startDate}</p>
        <p><strong>Ngày kết thúc:</strong> ${endDate}</p>
        <p><strong>Giáo viên:</strong> ${teacher}</p>
    `;
}

function calculateTotalPrice() {
    var feePerDay = parseInt(document.getElementById("fee-per-day").value);
    var numDaysPerWeek = parseInt(document.getElementById("num-days-per-week").value);
    var numWeeks = calculateNumWeeks();
    return feePerDay * numDaysPerWeek * numWeeks;
}

function calculateNumWeeks() {
    var startDate = new Date(document.getElementById("start-date").value);
    var endDate = new Date(document.getElementById("end-date").value);
    var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    var numWeeks = Math.ceil(diffDays / 7);
    return numWeeks;
}

function generateInvoiceCode() {
    
    var timestamp = Date.now().toString();
    var randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return 'INV-' + timestamp + '-' + randomDigits;
}