const workout = require("../databases/workout");
const { v4: uuid } = require("uuid");

const getAllWorkouts = (filterParams) => {
  try {
    const allWorkouts = workout.getAllWorkouts(filterParams);
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const oneWorkout = workout.getOneWorkout(workoutId);
    return oneWorkout;
  } catch (error) {
    throw error;
  }
};

const getAllSchedules = (filterParams) => {
  try {
    const allSchedules = workout.getAllSchedules(filterParams);
    return allSchedules;
  } catch (error) {
    throw error;
  }
};

const addNewSchedule = (createdSchedule) => {
  const scheduleToInsert = {
    ...createdSchedule,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    enrolledMemberIds: [],
  };

  try {
    const createdSchedule = workout.createSchedule(scheduleToInsert);
    return createdSchedule;
  } catch (error) {
    throw error;
  }
};

const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout, // Crea una copia del objeto
    id: uuid(),
    createdAt: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleTimeString("en-US", { timeZone: "UTC" }),
  };

  try {
    const createdWorkout = workout.createNewWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateWorkout = (workoutID, changes) => {
  try {
    const updatedWorkout = workout.updateOneWorkout(workoutID, changes);
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

const deleteOneWorkout = (workoutId) => {
  try {
    workout.deleteOneWorkout(workoutId);
  } catch (error) {
    throw error;
  }
};

const deleteOneSchedule = (scheduleId) => {
  try {
    workout.deleteOneSchedule(scheduleId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateWorkout,
  deleteOneWorkout,
  getAllSchedules,
  addNewSchedule,
  deleteOneSchedule,
};
