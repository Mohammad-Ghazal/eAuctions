require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
app.use(express.json());//built-in middleware
app.use(cors());//third-party middleware
require("./db/db");
const rolesRouter = require("./routers/routes/rolesRouter");
const paymentsRouter = require("./routers/routes/paymentRouter");
const usersRouter = require("./routers/routes/usersRouter");
const loginRouter = require("./routers/routes/loginRouter");
const itemsRouter = require("./routers/routes/itemsRouter");

//Routers
app.use("/roles", rolesRouter);
app.use("/payments", paymentsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/items",itemsRouter)
//Routers
app.listen(PORT, () => {
  console.log(`app listen at ${PORT} `);
});




