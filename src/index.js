const express = require("express") // Importar la librería express
const v1WorkoutRouter = require("./v1/router/workout_router") // Importar el archivo que contiene las rutas
const cors = require('cors')

const app = express() // Crear una instancia de la librería express
app.use(express.json()) // Inicializa la librería express
app.use(cors())

const PORT = process.env.PORT || 3001 // Indica el puerto que va a escuchar nuestro servidor

// Prueba para ver si funciona nuestro servidor
// app.get("/", (request, response) => {
//     response.send("<h1>Servidor básico funcionando a tope!</h1>")
// })

app.use("/api/v1/workouts", v1WorkoutRouter) // Le indicamos la baseUrl que vamos a utilizar

// Le decimos el puerto que tiene que escuchar y mostramos un mensaje a modo de feedback por consola
app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
})

