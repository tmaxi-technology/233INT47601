create database QuanLyHocVien
go

Create table [USER]
(
	[user_id] Varchar(11) NOT NULL,
	[user_name] Nvarchar(50) NULL,
	[password] Varchar(20) NULL,
	[email] Nvarchar(50) NULL,
	[phone] Varchar(10) NULL,
	[role] Nvarchar(10) NULL,
Primary Key ([user_id])
) 
go

Create table [STUDENT]
(
	[student_id] Varchar(10) NOT NULL,
	[major] Nvarchar(20) NULL,
	[year_of_study] Datetime NULL,
	[user_id] Varchar(11) NOT NULL,
Primary Key ([student_id]),
foreign key([user_id]) references [USER] ([user_id])
) 
go

Create table [TEACHER]
(
	[teacher_id] Varchar(10) NOT NULL,
	[department] Nvarchar(20) NULL,
	[user_id] Varchar(11) NOT NULL,
Primary Key ([teacher_id]),
foreign key([user_id]) references [USER] ([user_id])
) 
go


CREATE TABLE [SCHEDULES] (
    [schedule_id] VARCHAR(10) NOT NULL,
    [schedule_date] DATETIME NULL,
    [start_time] DATETIME NULL,
    [end_time] DATETIME NULL,
    [location] NVARCHAR(50) NULL,
    [course_id] VARCHAR(10) NOT NULL,
    PRIMARY KEY ([schedule_id]),
    FOREIGN KEY ([course_id]) REFERENCES [COURSES] ([course_id])
)
GO


Create table [GRADES]
(
	[grade_id] Varchar(10) NOT NULL,
	[grade] Nvarchar(20) NULL,
	[student_id] Varchar(10) NOT NULL,
	[user_id] Varchar(11) NOT NULL,
	[course_id] Varchar(10) NOT NULL,
Primary Key ([grade_id]),
foreign key([student_id]) references [STUDENT] ([student_id]),

) 
go

Create table [FEEDBACK]
(
	[feedback_id] Varchar(10) NOT NULL,
	[feedback_text] Nvarchar(100) NULL,
	[rating] Varchar(2) NULL,
	[feedback_date] Datetime NULL,
	[user_id] Varchar(11) NOT NULL,
Primary Key ([feedback_id]),
foreign key([user_id]) references [USER] ([user_id])
) 
go

Create table [NOTIFICATIONS]
(
	[notification_id] Varchar(10) NOT NULL,
	[titlt] Nvarchar(20) NULL,
	[message] Nvarchar(50) NULL,
	[motification_date] Datetime NULL,
	[user_id] Varchar(11) NOT NULL,
Primary Key ([notification_id]),
foreign key([user_id]) references [USER] ([user_id])
) 
go

Create table [CONNECTIONS]
(
	[connection_id] Varchar(10) NOT NULL,
	[status] Nvarchar(20) NOT NULL,
	[connection_date] Datetime NULL,
	[user_id] Varchar(11) NOT NULL,
Primary Key ([connection_id]),
foreign key([user_id]) references [USER] ([user_id])
) 
go

Create table [COURSES]
(
	[course_id] Varchar(10) NOT NULL,
	[course_name] Varchar(20) NULL,
	[credits] Char(1) NULL,
	[teacher_id] Varchar(10) NOT NULL,
	[user_id] Varchar(11) NOT NULL,
Primary Key ([course_id]),
foreign key([teacher_id]) references [TEACHER] ([teacher_id])
) 
go



Create table [LOGINSESSIONS]
(
	[session_id] Varchar(10) NOT NULL,
	[login_time] Datetime NULL,
	[logout_time] Datetime NULL,
	[user_id] Varchar(11) NOT NULL,
Primary Key ([session_id]),
foreign key([user_id]) references [USER] ([user_id])
) 
go

Create table [ENROLLMENT]
(
	[student_id] Varchar(10) NOT NULL,
	[user_id] Varchar(11) NOT NULL,
	[course_id] Varchar(10) NOT NULL,
	[enrollment_id] Varchar(10) NOT NULL,
	[enrollment_date] Datetime NULL,
Primary Key ([enrollment_id]),
Foreign key([student_id]) references [STUDENT] ([student_id]),
Foreign key([course_id]) references [COURSES] ([course_id])
) 
go

/*Users có thể là sinh viên hoặc giáo viên.
Students và Teachers là bảng mở rộng từ bảng Users.
Courses được dạy bởi một Teacher.
Students đăng kí các Courses qua bảng Enrollments.
Schedules lưu lịch học của từng Course.
Grades lưu điểm và nhận xét của từng sinh viên trong từng môn học.
Feedback cho phép sinh viên hoặc giáo viên phản hồi về môn học.
Notifications gửi thông báo tới Users.
Connections quản lý các kết nối giữa Users.
LoginSessions lưu lại thông tin đăng nhập và đăng xuất của Users.*/