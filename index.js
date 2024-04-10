// Import the 'express' module and assign it to the variable 'express'.
import express from "express";

// Import the 'dirname' function from the 'path' module.
import { dirname } from "path";

// Import the 'fileURLToPath' function from the 'url' module.
import { fileURLToPath } from "url";

// Retrieve the directory name of the current module file and assign it to '__dirname'.
const __dirname = dirname(fileURLToPath(import.meta.url));

// Import the 'body-parser' module and assign it to the variable 'bodyParser'.
import bodyParser from "body-parser";

// Create an instance of the Express application and assign it to the variable 'app'.
const app = express();

// Define the port number to listen on.
const port = 3000;

// Middleware to parse incoming request bodies.
app.use(bodyParser.urlencoded({extended: true}));

// Define a route for handling POST requests to "/check".
app.post("/check", (req, res) => {
  // Retrieve the password from the form
  const passwordName = req.body.password;
  // Check if the password is correct
  if (passwordName === "ILoveProgramming") {
    // Send the content of secret.html as the response
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    // Send an error message if the password is incorrect
    res.send("Incorrect password");
  }
});

// Define a route for handling GET requests to the root URL ("/").
app.get("/", (req, res) => {
  // Send the file located at the specified path as the response to the client.
  res.sendFile(__dirname + "/public/index.html");
});

// Start the Express server to listen on the specified port.
app.listen(port, () => {
  // Log a message indicating that the server is listening on the specified port.
  console.log(`Listening on port ${port}`);
});
