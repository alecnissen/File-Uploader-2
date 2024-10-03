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

