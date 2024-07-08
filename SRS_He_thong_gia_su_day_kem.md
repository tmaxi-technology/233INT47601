1.  **Giới thiệu ( Nguyễn Văn Toàn )**

Trong thời đại công nghệ số phát triển, hầu hết mọi người kinh doanh hay
doanh nghiệp khi phát triển mô hình kinh doanh đều rất cần sử dụng công
nghệ thông tin cụ thể là phần mềm hệ thống của doanh nghiệp đó. Đó là lý
do tại sao nhóm em, muốn tìm hiểu và phát triển hệ thống gia sư dạy học
này. Việc giảng dạy các khóa học đã tồn tại từ lâu ở các quốc gia phát
triển như Mỹ và các nước châu EU. Nhưng mà họ đều đã phát triển phần mềm
của mình thành website và sử dụng được ở đa quốc gia. Em muốn tham khảo
các tính năng quản lý khóa học trên edx.org hoặc coursera để phát triển
tốt phần phân loại khóa học và chi tiết khóa học. Thêm và đó là phần
quản lý hệ thống gồm nội dung bài giảng là video nếu cần, nếu chưa có
video thì chỉ là dịch vụ giúp giảng viên tìm học sinh và phụ huynh học
sinh tìm giảng viên.

2.  **Tổng quan hệ thống ( Nguyễn Văn Toàn )**

Đây là một hệ thống giúp quản lý và hỗ trợ đặc lực cho khách hàng là
những người có nhu cầu về tìm kiếm gia sư dạy học. Người gia sư có thể
sư dụng dịch vụ của hệ thống để tiếp cận với những khách hàng của mình
dễ dàng hơn nhờ sự hỗ trợ đăng nhu cầu giảng dạy của mình lên hệ thống.
Người quản lý của hệ thống có thể phát triển các dịch vụ về đánh giá
khóa học, trình độ giảng dạy và phân chia các nhu cầu của khách hàng
theo cấp độ và các tính năng, chức năng hữu ích cho việc học tập, như
khả năng lưu trữ những thảo luận trong khóa học, có thể truy cập lại,
hay những tính năng cơ bản cần có trong một hệ thống quản lý học tập.

3.  **Yêu cầu chức năng ( Lê Thoại )**

> **Đăng ký và quản lý tài khoản:**

- Hỗ trợ đăng ký và đăng nhập cho cả học sinh và giáo viên.

- Quản lý thông tin cá nhân và hồ sơ của người dùng.

**Tìm kiếm và chọn giáo viên:**

- Học sinh có thể tìm kiếm giáo viên theo các tiêu chí như môn học, cấp
  độ, địa điểm, đánh giá từ học sinh khác, ngôn ngữ giảng dạy, và phương
  pháp giảng dạy.

- Cung cấp thông tin chi tiết về giáo viên, bao gồm trình độ, kinh
  nghiệm, giá cả, lịch trống, và các kỹ năng đặc biệt.

**Đặt lịch học và quản lý lịch học:**

- Học sinh đăng lịch học: Học sinh có thể đăng lịch học của mình, chỉ ra
  các khung giờ họ có thể học.

- Giáo viên chọn lịch học: Giáo viên có thể xem lịch học đã đăng của học
  sinh và chọn khung giờ phù hợp để dạy.

- Gửi thông báo nhắc nhở cho cả học sinh và giáo viên về các buổi học
  sắp tới.

- Quản lý lịch sử học tập của học sinh và giáo viên.

**Đặt lịch học và quản lý lịch học:**

- Học sinh đăng lịch học: Học sinh có thể đăng lịch học của mình, chỉ ra
  các khung giờ họ có thể học.

- Giáo viên chọn lịch học: Giáo viên có thể xem lịch học đã đăng của học
  sinh và chọn khung giờ phù hợp để dạy.

- Gửi thông báo nhắc nhở cho cả học sinh và giáo viên về các buổi học
  sắp tới.

- Quản lý lịch sử học tập của học sinh và giáo viên.

**Đặt lịch học và quản lý lịch học:**

- Học sinh đăng lịch học: Học sinh có thể đăng lịch học của mình, chỉ ra
  các khung giờ họ có thể học.

- Giáo viên chọn lịch học: Giáo viên có thể xem lịch học đã đăng của học
  sinh và chọn khung giờ phù hợp để dạy.

- Gửi thông báo nhắc nhở cho cả học sinh và giáo viên về các buổi học
  sắp tới.

- Quản lý lịch sử học tập của học sinh và giáo viên.

**Thanh toán và quản lý tài chính:**

- Hỗ trợ thanh toán trực tuyến cho các buổi học.

- Quản lý hóa đơn và lịch sử thanh toán của học sinh.

**Bảo mật và bảo vệ dữ liệu:**

- Đảm bảo bảo mật thông tin cá nhân và dữ liệu học tập của người dùng.

- Hệ thống sao lưu dữ liệu tự động để tránh mất mát dữ liệu.

4.  **Yêu cầu phi chức năng ( Lê Thoại )**

> **Hiệu Suất**

- Thời gian phản hồi: Hệ thống phải có thời gian phản hồi nhanh chóng,
  tối đa 2 giây cho các thao tác cơ bản.

- Khả năng mở rộng: Hệ thống phải có khả năng xử lý đồng thời nhiều
  người dùng mà không giảm hiệu suất.

**Khả Dụng**

- Độ tin cậy: Hệ thống phải có độ tin cậy cao, đảm bảo hoạt động liên
  tục với thời gian hoạt động (uptime) tối thiểu 99.9%.

- Khả năng bảo trì: Hệ thống phải dễ dàng bảo trì và cập nhật.

**Tính Dễ Sử Dụng**

- Giao diện người dùng thân thiện: Giao diện phải dễ sử dụng và thân
  thiện với người dùng.

- Hỗ trợ đa ngôn ngữ: Phần mềm phải hỗ trợ đa ngôn ngữ để phù hợp với
  người dùng từ nhiều quốc gia.

**Bảo Mật**

- Mã hóa dữ liệu: Tất cả dữ liệu nhạy cảm phải được mã hóa trong quá
  trình truyền và lưu trữ.

- Xác thực và phân quyền: Hệ thống phải có cơ chế xác thực và phân quyền
  người dùng nghiêm ngặt.

5.  **Các yêu cầu ràng buộc và giới hạn ( Nguyễn Hoàng Minh Đức )**

- Tuân thủ pháp luật: Hệ thống phải tuân thủ các quy định pháp luật về
  bảo mật dữ liệu và quyền riêng tư của người dùng.

- Hạ tầng công nghệ: Hệ thống phải tương thích với các công nghệ hiện
  tại và có khả năng tích hợp với các dịch vụ bên thứ ba.

- Khả năng mở rộng: Hệ thống cần có kiến trúc mở rộng để dễ dàng nâng
  cấp và thêm chức năng mới mà không làm gián đoạn hoạt động hiện tại.

6.  **Theo dõi và đánh giá ( Nguyễn Hoàng Minh Đức )**

- Đánh giá hiệu suất: Hệ thống phải có cơ chế đánh giá hiệu suất để đo
  lường thời gian phản hồi, độ tin cậy và khả năng mở rộng.

- Phản hồi người dùng: Cung cấp cơ chế để người dùng gửi phản hồi và
  đánh giá chất lượng dịch vụ, giúp cải thiện và nâng cao trải nghiệm
  người dùng.

- Báo cáo và phân tích: Hệ thống phải cung cấp các báo cáo chi tiết về
  hoạt động, như số lượng buổi học, số lượng người dùng đăng ký, doanh
  thu từ thanh toán, và các sự cố xảy ra.

- Giám sát bảo mật: Thường xuyên giám sát và kiểm tra hệ thống để phát
  hiện và ngăn chặn các mối đe dọa bảo mật.

- Cập nhật và bảo trì: Đảm bảo hệ thống được cập nhật thường xuyên để vá
  các lỗi bảo mật và nâng cấp tính năng mới. Cần có kế hoạch bảo trì
  định kỳ để kiểm tra và duy trì hoạt động ổn định của hệ thống.

- Theo dõi hiệu quả giảng dạy: Thu thập và phân tích dữ liệu về hiệu quả
  giảng dạy, như tiến bộ của học sinh, phản hồi từ học sinh và giáo
  viên, để đánh giá và cải thiện chất lượng giảng dạy.

7.  **Tài liệu tham khảo**

8.  **Phụ lục**
