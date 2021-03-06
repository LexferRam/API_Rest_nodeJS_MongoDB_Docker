const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://mongo/mydatabase`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected to " + db.connection.host))
  .catch((err) => console.error(err));

//settings
app.set("port", process.env.PORT || 6000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/users", require("./routes/users"));

//start server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
