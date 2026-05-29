# 🏠 HostelHub - Smart Hostel Management System

## 📌 Project Overview

HostelHub is a web-based Hostel Management System developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The system helps wardens efficiently manage hostel operations while providing students with a convenient platform for hostel-related services.

The system digitizes room allocation, visitor management, cleaning schedules, payments, feedback handling, QR-based attendance tracking, and student management.


## 🚀 Features

### 👨‍🎓 Student Features

* Student Registration & Login
* View Personal Profile
* Change Password
* QR-Based Check-In / Check-Out
* View Assigned Room Details
* Submit Visitor Requests
* View Cleaning Schedules
* Upload Hostel Payment Slips
* Submit Feedback & Complaints
* Submit Hostel Ratings
* View Complaint Status and Warden Responses

### 👨‍💼 Warden Features

* Manage Student Records
* Remove Students from Hostel
* Room Allocation Management
* Cleaning Schedule Management
* Visitor Request Approval/Rejection
* Payment Approval/Rejection
* QR Attendance Monitoring
* Check-In/Check-Out Records
* Feedback & Complaint Handling
* Student Ratings Monitoring
* Hostel Dashboard with Statistics


## 🔐 Security Features

* JWT Authentication
* Password Encryption using bcrypt
* Protected Routes
* Role-Based Access Control
* QR Code Expiration (50 Seconds)


## 📱 QR Attendance System

Students receive a dynamic QR code that automatically refreshes every 50 seconds.

When scanned by the warden:

* Automatic Check-In / Check-Out detection
* Attendance recording
* Late Check-In detection (after 10:00 PM)
* Parent notification trigger through SMS integration


## 💬 Notification System

* Late Check-In Alerts
* Payment Status Updates
* Visitor Request Updates
* Complaint Resolution Updates


## 🛠️ Technologies Used

### Frontend

* React.js
* React Router
* Tailwind CSS
* Lucide React Icons
* QRCode React

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Additional Services

* JWT Authentication
* bcrypt Password Hashing
* Multer File Uploads
* Twilio SMS Integration
* QR Code Attendance System


## 📂 System Modules

1. Authentication Management
2. Student Profile Management
3. Room Management
4. Room Allocation
5. Visitor Management
6. Cleaning Schedule Management
7. QR Check-In / Check-Out System
8. Payment Management
9. Feedback & Complaint Management
10. Ratings Management
11. Student Management
12. Dashboard & Reporting


## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/HostelHub.git
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Start Backend

```bash
npm run dev
```

### Start Frontend

```bash
npm run dev
```


## 🎯 Project Objectives

* Improve hostel administration efficiency
* Reduce manual paperwork
* Enhance student experience
* Provide secure attendance tracking
* Enable real-time hostel management


## 👩‍💻 Developed By

Amadi Hettiarachchi

Information Technology Undergraduate

Sri Lanka Institute of Information Technology (SLIIT)
