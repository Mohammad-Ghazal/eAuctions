const express = require("express");
const app = express();
const PORT = 5000;
app.use(express.json());
require("./db/db");
const roleRouter = require("./routers/routes/roles");
const paymentRouter = require("./routers/routes/payment");
const userRouter = require("./routers/routes/users");
const loginRouter = require("./routers/routes/login");
//Routers
app.use("/role", roleRouter);
app.use("/payment", paymentRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);
//Routers
app.listen(PORT, () => {
  console.log(`app listen at ${PORT} `);
});
