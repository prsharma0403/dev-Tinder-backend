console.log("starting the project")

const express = require('express')
const app = express()
const port = 8955

/*app.get('/user/:userId/:username/:password', (req, res) => {
    console.log(req.params)
  res.send({firstname:"prashant",lastname:"Praveen"})
})
app.post('/user', (req, res) => {
    console.log("Save data to the DataBase")
    res.send("Data Saved Successfully")
  })

  app.delete('/user', (req, res) => {
    console.log("Delete data to the DataBase")
    res.send("Data delete Successfully")
  })
*/
/*app.use("/test/test1",(req,res)=>{
    res.send('Hello  From server !')
})
app.use("/test",(req,res)=>{
    res.send('Hello  From server test!')
})
app.use("/dashboard",(req,res)=>{
    res.send('Hello  From dashboard !')
})

app.use("/hello",(req,res)=>{
    res.send('Hello  Hello  hello!')
})*/
app.use("/user",(req,res,next)=>{
   
    next();
    res.send('Namaste 🙏 User')
    console.log("user1")
},(req,res)=>{
    res.send("Namaste 🙏 User 2")
    console.log("user2")
})
app.listen(port, () => {
  console.log(`Server is Successfully  listening on port ${port}`)
})
