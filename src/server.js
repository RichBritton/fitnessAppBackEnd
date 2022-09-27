//Main Backend
express = require("express");
const cors = require("cors");
require("./db/connection");
const userRouter = require("./users/userRoutes");
const { tokenCheck } = require("./middleware");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.get("/", tokenCheck, (req, res) => {
  res.status(200).send({ message: "You should only see if this if you are logged in" });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});