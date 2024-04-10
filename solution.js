// Import the 'express' module to create a web server.
import express from "express";

// Import the 'body-parser' module to parse incoming request bodies.
import bodyParser from "body-parser";

// Import the 'dirname' function from the 'path' module to retrieve the current directory path.
import { dirname } from "path";

// Import the 'fileURLToPath' function from the 'url' module to convert file URLs to file paths.
import { fileURLToPath } from "url";

// Retrieve the directory name of the current module file and assign it to '__dirname'.
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create an instance of the Express application.
const app = express();

// Define the port number the server will listen on.
const port = 3000;

// Variable to keep track of whether the user is authorized (default is false).
var userIsAuthorised = false;

// Middleware to parse incoming request bodies as URL-encoded data.
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware function to check the password submitted in the form.
function passwordCheck(req, res, next) {
  // Retrieve the password from the form submission.
  const password = req.body["password"];
  // Check if the password matches the expected password.
  if (password === "ILoveProgramming") {
    // If the password is correct, set userIsAuthorised to true.
    userIsAuthorised = true;
  }
  // Move to the next middleware or route handler.
  next();
}
// Add the passwordCheck middleware to the Express app.
app.use(passwordCheck);

// Define a route to handle GET requests to the root URL ("/").
app.get("/", (req, res) => {
  // Send the index.html file located in the 'public' directory as the response.
  res.sendFile(__dirname + "/public/index.html");
});

// Define a route to handle POST requests to "/check".
app.post("/check", (req, res) => {
  // Check if the user is authorized (based on the password entered).
  if (userIsAuthorised) {
    // If authorized, send the content of secret.html as the response.
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    // If not authorized, send the index.html file as the response.
    res.sendFile(__dirname + "/public/index.html");
    // Alternatively, you could redirect the user to the root URL ("/").
    // res.redirect("/");
  }
});

// Start the Express server to listen on the specified port.
app.listen(port, () => {
  // Log a message indicating that the server is listening on the specified port.
  console.log(`Listening on port ${port}`);
});

