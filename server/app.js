const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoutes");
const StudentRoute = require("./Routes/StudentRoutes");
const SubjectRoute =require('./Routes/SubjectRoutes');
const StudentElectiveSubjectRoute =require('./Routes/StudentElectiveSubjectRoutes');
const { authMiddleware } = require("./Middleware/AuthMiddleware");

require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//   const corsOrigin ={
//     origin:'http://127.0.0.1:5173', //or whatever port your frontend is using
//     credentials:true,
//     optionSuccessStatus:200
// }
// app.use(cors(corsOrigin));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/main",StudentElectiveSubjectRoute);
app.use("/student" ,authMiddleware, StudentRoute);
app.use("/subject",SubjectRoute);
app.get("/yaae", authMiddleware, (req, res) => {
  // console.log(req.user);
  res.json({ status: true, user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
