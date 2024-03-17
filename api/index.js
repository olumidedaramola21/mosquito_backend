const express = require("express"); 
const app = express();
port = 5000
const dotenv = require("dotenv"); 
const mongoose = require("mongoose") 
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")

dotenv.config();

app.use(express.json()) 
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err)); 

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute) 
app.use("/api/posts", postRoute) 
app.use("/api/categories", categoryRoute) 

app.listen(port, () => {
  console.log("Backend is running");
}); 
