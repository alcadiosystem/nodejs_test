import express from 'express'
import employesRoutes from './routes/employes.routes.js'
import indexRoute from './routes/index.routes.js'

//SCUCHA DEL SERVER
const app = express()

app.use(express.json())
app.use('/api',employesRoutes)
app.use(indexRoute)

app.use((req,res,next)=>{
    res.status(404).json({
        message: 'Not found'
    })
})

export default app