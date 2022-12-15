import express from "express";
import labels from "./routes/labels.js"
import meals from "./routes/meals.js"
import cors from 'cors'

const app = express()

//cors
app.use(cors())

//Middlewares
app.use('/api/labels',labels)
app.use('/api/meals',meals)

//starting express app
app.listen(8100,() => {
    console.log('Backend server started!')
})