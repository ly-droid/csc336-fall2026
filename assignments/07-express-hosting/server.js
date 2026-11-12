import express from "express";
const app = express();
app.use(express.static("public"));

app.get("/about", (req, res) => {
    res.type("text").send("Campus Shop is the CSC336 Assignment 04 storefront, hosted with Express for Assignment 07.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running on port " + port);
});
