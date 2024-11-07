// Add a form where authenticated users can upload a file. 
// Save the file in your filesystem for now. 
// You’ll need to integrate the multer middleware. 
// We’ll upload these files once we have all other features working.


// have the users login, after they become authenticated 

// so if login info is valid, give users access to the form were they can upload a file 


// ** 

// I can create a user 

// but after I solve the views error

// I need to query my database to be 100% 

// then finish making the POST code 

// sanitation and password validation *** 

// users are created! 


// can we salt/hash passwords next /


// *** next steps in my post controller

// Sanitization: As you mentioned, ensure you sanitize the input to prevent issues like SQL injection or saving unwanted characters. You might want to use libraries like express-validator for this purpose. / 

// Password Hashing: If you're dealing with user passwords, make sure to hash them before saving to the database. Storing passwords in plain text is a security risk. / 

// Response Handling: After successfully creating the user, consider what the user experience should be. You might want to redirect them to a login page or display a success message.

// Error Handling: While you’re catching errors, think about how you want to handle them. Providing user-friendly error messages can improve the experience.

// Additional Validation: Besides checking if the email exists, you might want to validate the password's strength or other constraints based on your application’s requirements.

// *** 


// users are authorized, now I need to make a form for only authoirzed users 

// I also need an option to ensure users can log out 

// but first I need to conditionally render the form and log out option 

// pass the user object to the index page .

// *** ok I can make the form 

// now I need to create the entire form, and have that form saved someone

// *** try to save the file into the DB, 

// *** properly upload the file

// *** right now trying to ensure user can upload multiple 

// different file types. 

// first going to test with pdf file format 

// ok we can upload the files 

// but it seems like the format of the file does not get saved correctly 

// like I am uploading a PDF file but it never shows in the uploads folder 

// as a pdf 

// *** make a connection between the two models 

// *** connection is made, now need to figure out issue of the folder 

// folder not being created correctly, check post controller 

// *** I still need to ensure that the folders are being created correctly.

// *** folder being created effectively 

// *** next display all folders, update folders and delete them 

// Add folders. Users should be able to CRUD folders and upload files in them. Set up routes and necessary database interactions for this.

// *** can create folder, now need to read folders or display them, 

// **** can now read and display folders via rout e

// NOW WILL work on updating and deleting logic 

// need to make a way to click on the folder so I can access a view to update or delete, 

// *** DELETE FUNCTIONALITY 

// **** upload files into folders

// how can I upload files into folders ? 

// it will be a post request, no view required 

// upload files into folders 

// make sure the same page is rendered after uploading the file 

// with the success or error message 

// uploading files into folders 



// Rendering the Same View: 
// Re-fetching the folders and 
// rendering the same view after the upload ensures 
// that the page stays consistent and shows any feedback messages (success or errors).




// File Storage: Make sure that your file upload logic places the uploaded files into the 
// correct folders on your file system. 
// You need to handle where the file is stored and ensure it's linked to the folder it belongs to.

// Folder Selection: If you're allowing users to upload files into specific folders, make sure the form correctly identifies which folder the file should be uploaded to. This may require adding hidden fields or additional logic to associate the file with the correct folder.


// *** can upload files into folders 

// now I need to render a new view that can display file information 

// and also give the user the ability to download the file 

// will need to pass the folder id as well so user can get access to certain files



// *** 

// How can I view a particular files information? 

// when its link is clicked on? 

// once link is clicked it will have to show the specific file details 

// it will have to show all the files and details associated with that folder 

// 


// **** 

// users can see file details, now the next step is to have users download the file

// I can download files but I now need to ensure I handle errors or 

// when the file is not found


// *** 

