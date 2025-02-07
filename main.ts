import express from "express"
import dotenv from "dotenv"
import { userRoutes } from "./src/infra/routes/user/user.routes"
import { errorHandler } from "./src/middlewares/exception"
import { authRoutes } from "./src/infra/routes/auth/auth.routes"
import { verifyAuthenticate } from "./src/middlewares/authenticate"

dotenv.config()

const app = express()

app.use(express.json())

app.use(userRoutes)
app.use(authRoutes)
app.get('/test-authenticate', verifyAuthenticate, (request, response) => {
    response.status(200).json('Autenticação funcionando')
})


app.use(errorHandler)

const port = Number(process.env.PORT) || 3000

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
})

