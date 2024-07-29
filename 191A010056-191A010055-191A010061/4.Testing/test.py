Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Khởi tạo trình duyệt
driver = webdriver.Chrome()  # Đảm bảo rằng bạn đã tải xuống và cài đặt ChromeDriver

def test_registration_success():
    driver.get('file:///path/to/your/index.html')  # Đổi đường dẫn tới tệp HTML của bạn

    # Tìm và điền vào các trường biểu mẫu
    name_input = driver.find_element(By.ID, 'name')
    student_id_input = driver.find_element(By.ID, 'student-id')
    course_select = driver.find_element(By.ID, 'course')
    
    name_input.send_keys('Huynh Nam Thuan')
    student_id_input.send_keys('123456')
    course_select.send_keys('Toán')
    
    # Gửi biểu mẫu
    submit_button = driver.find_element(By.XPATH, '//button[text()="Đăng Ký"]')
    submit_button.click()

    # Đợi thông báo hiển thị
    time.sleep(1)  # Thay đổi thời gian chờ nếu cần

    # Kiểm tra thông báo thành công
    message = driver.find_element(By.ID, 'message').text
    assert message == 'Đăng ký thành công! Huynh Nam Thuan đã đăng ký môn Toán.'

def test_registration_failure():
    driver.get('file:///path/to/your/index.html')  # Đổi đường dẫn tới tệp HTML của bạn

    # Tìm và điền vào các trường biểu mẫu
    name_input = driver.find_element(By.ID, 'name')
    student_id_input = driver.find_element(By.ID, 'student-id')
    course_select = driver.find_element(By.ID, 'course')
    
    name_input.send_keys('')
    student_id_input.send_keys('')
    course_select.send_keys('')
    
    # Gửi biểu mẫu
    submit_button = driver.find_element(By.XPATH, '//button[text()="Đăng Ký"]')
    submit_button.click()

    # Đợi thông báo hiển thị
    time.sleep(1)  # Thay đổi thời gian chờ nếu cần

    # Kiểm tra thông báo lỗi
    message = driver.find_element(By.ID, 'message').text
    assert message == 'Vui lòng điền đầy đủ thông tin.'

# Chạy các bài kiểm tra
if __name__ == '__main__':
    try:
        test_registration_success()
        test_registration_failure()
    finally:
        driver.quit()  # Đóng trình duyệt


chạy 
python test_registration.py
