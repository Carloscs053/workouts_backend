const { log } = require("console");
const DB = require("./db.json");
const fs = require("fs");

const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts;

    if (filterParams.mode) {
      workouts = workouts.filter((workout) => {
        return workout.mode
          .toLowerCase()
          .includes(filterParams.mode.toLowerCase());
      });
      console.log(workouts);
    }

    if (filterParams.limit) {
      workouts = workouts.slice(0, filterParams.limit);
      console.log(workouts);
    }

    if (filterParams.sort) {
      if (filterParams.sort === "asc".toLowerCase()) {
        workouts.sort(
          (a, b) =>
            new Date(a.createdAt).getTime > new Date(b.createdAt).getTime()
        );
      }

      if (filterParams.sort === "desc".toLowerCase()) {
        workouts.sort(
          (a, b) =>
            new Date(a.createdAt).getTime < new Date(b.createdAt).getTime()
        );
      }
    }

    return workouts;
    // if (filterParams.mode) {
    //     siTiene = true;
    // }
    // if (filterParams.filter) {
    //     siTiene = true
    // }
    // if (siTiene) {
    //     if (entrenamiento.mode === filterParams.mode) {

    //     }
    // }

    //return resultado;

    // let workouts = DB.workouts // Guardamos los entrenamientos en el array (BD)
    // if (filterParams.mode) { // Si hay un filtro que se llame "mode" filtraremos
    //     DB.workouts.filter((workout) => {
    //         // lo comparamos todo en minúsculas y comprobamos si el entrenamiento incluye
    //         // la palabra que se está pasando
    //         workout.mode.toLowerCase().includes(filterParams.mode)
    //     })
    // }
    // if (filterParams.limit) {
    //     DB.workouts.splice(0, workouts.length - filterParams.limit)
    // }
    // return workouts
  } catch (error) {
    console.log("Excepción");
    throw { status: 500, message: error };
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id ${workout}`,
      };
    }
    return workout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.status || error };
  }
};

const getAllSchedules = (filterParams) => {
  try {
    let schedules = DB.schedule;

    if (filterParams.limit) {
      schedules = schedules.slice(0, filterParams.limit);
      console.log(schedules);
    }

    return schedules;
  } catch (error) {
    console.log("Excepción");
    throw { status: 500, message: error };
  }
};

const createSchedule = (scheduleToInsert) => {
  const schedule =
    DB.schedule.findIndex((schedule) => schedule.id === scheduleToInsert.id) >
    -1;

  if (schedule) {
    throw {
      status: 400,
      message: `Schedule already exists`,
    };
  } else {
    try {
      console.log("Clase añadida correctamente");
      DB.schedule.push(scheduleToInsert);
      saveToDatabase(DB);

      return scheduleToInsert;
    } catch (error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};

const createNewWorkout = (workoutToInsert) => {
  const workout =
    DB.workouts.findIndex((workout) => workout.id === workoutToInsert.id) > -1;
  if (workout) {
    throw {
      status: 400,
      message: `Workout with the name ${workoutToInsert.name} already exist`,
    };
  } else {
    try {
      console.log("El objeto se debe haber insertado en la BD");
      DB.workouts.push(workoutToInsert);
      saveToDatabase(DB);

      return workoutToInsert;
    } catch (error) {
      throw { status: 500, message: error?.message || error };
    }
  }
};

const deleteOneWorkout = (workoutId) => {
  try {
    const indexForDeletion = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id ${workoutId}`,
      };
    }
    DB.workouts.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneSchedule = (scheduleId) => {
  try {
    const indexForDeletion = DB.schedule.findIndex(
      (schedule) => schedule.id === scheduleId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find schedule`,
      };
    }
    DB.schedule.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const saveToDatabase = (DB) => {
  fs.writeFileSync("./src/databases/db.json", JSON.stringify(DB, null, 2), {
    encoding: "utf8",
  });
};

const updateOneWorkout = (workoutId, changes) => {
  try {
    const isAlreadyAdded =
      DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate =
      DB.workouts.findIndex((workout) => workout.id === workoutId) > -1;
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find workout whit the id '${workoutId}'`,
      };
    }
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  deleteOneWorkout,
  updateOneWorkout,
  getAllSchedules,
  createSchedule,
  deleteOneSchedule,
};
