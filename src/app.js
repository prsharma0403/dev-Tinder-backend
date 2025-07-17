console.log("starting the project")

const express = require('express')
const app = express()
const port = 8955
/*
app.get('/', (req, res) => {
  res.send('Hello  From server !')
})
*/
app.use("/test",(req,res)=>{
    res.send('Hello  From server !')
})
app.use("/dashboard",(req,res)=>{
    res.send('Hello  From dashboard !')
})

app.use("/hello",(req,res)=>{
    res.send('Hello  Hello  hello!')
})
app.use((req,res)=>{
    res.send('Namaste ')
})
app.listen(port, () => {
  console.log(`Server is Successfully  listening on port ${port}`)
})
