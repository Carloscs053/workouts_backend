const express = require("express"); // Importamos la librería express
const router = express.Router(); // Creamos el enrutador
const workoutController = require("../../controllers/workout_controller"); // Importamos el controlador del servidor
const apicache = require("apicache");
const cache = apicache.middleware;

// Estas son las rutas que vamos a tener y el método del controlador que van a llamar
// Endpoints de las clases
//router.get("/", workoutController.getAllWorkouts);
router.get("/schedule", workoutController.getAllSchedules);
router.post("/schedule", workoutController.addNewSchedule);
router.delete("/schedule/:scheduleId", workoutController.deleteOneSchedule);

// Endpoints de los entrenamientos
router.get("/", cache("1 minutes"), workoutController.getAllWorkouts);
router.post("/", workoutController.createNewWorkout);
router.get("/:workoutId", workoutController.getOneWorkout);
router.patch("/update/:workoutId", workoutController.updateOneWorkout);
router.delete("/delete/:workoutId", workoutController.deleteOneWorkout);

module.exports = router; // Exportamos el enrutador para que lo pueda usar el index
