import { createStore } from "redux";

const ADD_TASK_TYPE = "task/add";
const DELETE_TASK_TYPE = "task/delete";

const initialState = {
  task: [],
  isLoading: false,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_TYPE:
      return {
        ...state,
        task: [...state.task, action.payload],
      };
    case DELETE_TASK_TYPE:
      const updatedTask = state.task.filter((_, index) => index !== action.payload);
      return {
        ...state,
        task: updatedTask,
      };
    default:
      return state;
  }
};

const addTask = (data) => ({
  type: ADD_TASK_TYPE,
  payload: data,
});

const deleteTask = (id) => ({
  type: DELETE_TASK_TYPE,
  payload: id,
});

// Create store
const store = createStore(taskReducer);
console.log("Initial State:", store.getState());

// Dispatch actions
store.dispatch(addTask("Buy me a jutti"));
store.dispatch(addTask("Buy me a chanchad"));
console.log("After adding:", store.getState());

store.dispatch(deleteTask(1));
console.log("After delete:", store.getState());
