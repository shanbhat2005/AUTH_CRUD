import app from './app/app.js'
import connectDb from './config/db.js';

await connectDb()

app.listen(process.env.PORT || 3000,()=>{
  console.log("server running");
  
})