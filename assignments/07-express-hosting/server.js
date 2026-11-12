import express from "express";
const app = express();
// serve static files
app.use(express.static("public"));
// handles GET requests
app.get("/about", (req, res) => {
    res.type("text").send("Hosted with Express for Assignment 07.");
});
// set the port
const port = process.env.PORT || 3000;
// create an about route
app.get("/about", (req, res) => {
    res.send("This is my 07 assignment.");
});
// start the server
app.listen(port, () => {
    console.log("Server running on port " + port);
});
