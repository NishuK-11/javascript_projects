import {createStore} from "redux";

const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";

const initialState = {
  task: [],
  isLoading:false,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };

    case DELETE_TASK:
      const updatedTask = state.task.filter((curTask, index) => index !== action.payload);
      return {
        ...state,
        task: updatedTask,
      };

    default:
      return state;
  }
};
const store = createStore(taskReducer);
console.log(store);
console.log("Initial State:",store.getState());

store.dispatch({type:ADD_TASK,payload:"buy me a coffee"});
console.log("updated State:",store.getState());

store.dispatch({type:ADD_TASK,payload:"buy me a dress"});
console.log("updated State:",store.getState());

store.dispatch({type:DELETE_TASK,payload:1})
console.log("delete state:",store.getState());
export default taskReducer;