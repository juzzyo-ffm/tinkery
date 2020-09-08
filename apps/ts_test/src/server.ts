import express = require("express");

// Our Express APP config
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {
  res.status(200).sendFile(__dirname + "/index.html");
});

const server = app.listen(app.get("port"), () => {
  console.log(
    "App is running on http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});

export default server;
