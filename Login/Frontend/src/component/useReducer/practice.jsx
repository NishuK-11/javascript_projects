
import React from "react";
import { useReducer } from "react";

const Practice = () => {

    const reducer=(state,action)=>{
        switch(action.type){
            case "increment":
                // return state+1;
                 return {count:state.count+1};
            case "decrement":
                return {count:state.count-1};
            case "Reset":
                return {count:0};
            default:
                return state;
        }
    }

    const [state,dispatch] = useReducer(reducer,{count:0});
  return (
    <>
     <h1>{state.count}</h1>
     <button onClick={()=>dispatch({type:"increment"})}>Increment</button>
     <div onClick={()=>dispatch({type:"decrement"})}>Decrement</div> 
     <div onClick={()=>dispatch({type:"Reset"})}>Reset</div> 
    </>
  )
}

export default Practice
