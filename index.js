const express = require("express");
const app = express();
app.use(express.json());
//require("dotenv").config();
const port = process.env.API_PORT || 3000;
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const studentTeacherRoutes = require("./routes/studentTeacher");
const facultyRoutes = require("./routes/faculty");
//const facultyMetaRoutes = require("./routes/facultyMeta");
const courseRoutes = require("./routes/course");
// const courseMetaRoutes = require("./routes/courseMeta");
const autoController = require("./controllers/auth");

console.log(__dirname);
//SWAGGER DOCS
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "University Portal System",
      version: "1.0.0",
      description: "University portal system Docs",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//ROUTES
app.get("/", (req, res) => {
  res.send("Hello World! This is root route");
});
//login/logout routes
app.post("/login", autoController.login);
app.post("/logout", autoController.logout);

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/studentTeacher", studentTeacherRoutes);
app.use("/api/faculty", facultyRoutes);
//app.use("/api/facultyMeta", facultyMetaRoutes);
app.use("/api/course", courseRoutes);
// app.use("/api/courseMeta", courseMetaRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
