<h1>About This Project</h1> 
This project was created using Node.js, Express.js, EJS, PostgreSQL, Primsa, Passport (password authentication), Multer (file upload library),  HTML, and CSS. The purpose of this project was to create a mini version of Google drive. Users can create an account and login. Once logged in, users are able to create, view, edit, and delete folders. Once folders are created files can be uploaded to them. Users can view their file details, download files they have previously uploaded, upload their files to their cloud for secure storage, and delete files when needed.

<br>
<br>
The file uploader project follows the MVC (Model-View-Controller) design pattern, which helps in organizing the codebase by separating the application logic into three interconnected components. My project also has full CRUD (Create, Read, Update, and Delete) capabilities. These operations are implemented using HTTP methods, including GET for retrieving data, POST for creating new entries, PATCH for updating existing records, and DELETE for removing data, ensuring a robust and flexible API.
<br> 

<h1>Project Completion Highlights</h1>
    <ul>
    <li>User authentication with Passport.js</li>
<li>MVC pattern for separating application logic</li>
<li>Express.js middleware to handle requests and asynchronous operations</li>
<li>Form validation and sanitization</li>
<li>Using Multer middleware for file uploads
<li>Cloud based file storage</li>
<li>PostgreSQL queries and Prisma ORM for creating, reading, updating and deleting data </li>
<li>EJS views to dynamically render content</li>

 

 <h1>Build With</h1>

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
 ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
 ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
 ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) 
<img src="https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black">

<h1>Getting Started</h1>

To get project cloned locally: git clone git@github.com:alecnissen/File-Uploader-2.git

then ``` npm install ``` which will install all dependency's and packages.

<h1>Demo Video</h1>

<img src="assets/File-Upload-Breakdown-Thumbnail.png" />

[Watch the demo video on YouTube](https://www.youtube.com/watch?v=gwKTYj_1Dlg&t=1s)


<h1>Features</h1>

- Welcome page where users can log in or choose to create a user

<img src='assets/FU-Homepage-rm.png' style="width:400px">

<img src='assets/FU-Create-user-rm.png' style="width:400px">

- User authentication and validation to ensure only users with valid credentials can log in

<img src="assets/FU-login-error-rm.png" style="width:400px">


<img src="assets/FU-login-success-rm.png" style="width:400px">

- More authentication, ensuring no duplicate users 

<img src="assets/FU-taken-username-rm.png" style="width:400px">

- Validation checks to ensure there is no duplicate folder names for the user

<img src="assets/FU-taken-folder-name-rm.png" style="width:400px">


- Users can create folders and upload files into them. A success or error message will display to alert the user if file upload was successful

<img src="assets/FU-create-folder-rm.png" style="width:400px">

<img src="assets/FU-file-upload-success-rm.png" style="width:400px">

- Users can edit the folder name

<img src="assets/FU-edit-folder-rm.png" style="width:400px">

<img src="assets/FU-edit-folder-page-rm.png" style="width:400px">

- Files can be uploaded to the cloud for storage. A success or error message will be displayed to alert the user if file upload was successful

<img src="assets/FU-upload-file-cloud-rm.png" style="width:400px">

- Users can download the files and also delete files. The user can also delete the folder entirely erasing all the files within that folder

<img src="assets/FU-delete-1-rm.png" style="width:400px">
<img src="assets/FU-delete-2-rm.png" style="width:400px">


- Folders are unique to each user. Another user cannot view other users folders

<img src="assets/FU-login-success-rm.png" style="width:400px">
<img src="assets/FU-user1-folders-rm.png" style="width:400px">


<img src="assets/FU-user2-login-success-rm.png" style="width:400px">
<img src="assets/FU-user2-folders-rm.png" style="width:400px">


<h1>Acknowledgments</h1> Thank you to everyone within The Odin Project Curriculum from the bottom of my heart! Thank you to anyone who helped me in the discord channels. I promise to help others throughout this journey. 

<h1>Contact</h1>

Creator: Alec J Nissen 
<br>
E-Mail: alec.j.nissen@gmail.com
<br>
GitHub: https://github.com/alecnissen/File-Uploader-2