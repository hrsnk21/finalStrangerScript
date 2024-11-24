const express = require('express')
const dotenv = require('dotenv')
const authRoutes =  require('./routes/auth.routes'); 
const messageRoutes = require('./routes/message.routes')
const connectToDb = require('./lib/db')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const{server,app} = require('./lib/socket')

const path = require('path')

dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      methods:['GET','POST','PUT','UPDATE','DELETE']
    })
  );

app.use('/api/auth',authRoutes)
app.use("/api/messages", messageRoutes);


const PORT = process.env.PORT
const __dirname = path.resolve()

if(process.env.NODE_ENV = 'production'){
  app.use(express.static(path.join(__dirname,"../client/dist")))
  app.get("*",(req,res)=>{
      res.sendFile(path.join(__dirname,"../client","dist","index.html"))
  })
}


server.listen(PORT,()=>{
    console.log(`server is live at port ${PORT}`)
    connectToDb();
})