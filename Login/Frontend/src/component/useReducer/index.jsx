
// import React from "react";
// import { useState } from "react";
// export const ReducerComp = ()=>{
//     const [count,setCount] = useState(0);
//     function handleIncrement(){
//         return setCount(count+1);
//     }
//         function handleDecrement(){
//         return setCount(count-1);
//     }
//     return  (
//     <>
//      <div className="p-4 h-lvh flex flex-col justify-center items-center">
//         <h1>{count}</h1>
//         <button onClick={handleIncrement}>Increment</button>
//         <button onClick={handleDecrement}>Decrement</button>
//      </div>   
//     </>
//     )
// }



import React, { useReducer } from "react";

export const ReducerComp = ()=>{

    const reducer = (state,action)=>{
        console.log(state,action);
        if(action.type === "INCREMENT"){
            return state+1;
        }
        if(action.type === "DECREMENT"){
            return state-1;
        }
    }
    //const [count,setCount] = useState(0);
    const [count,dispatch] = useReducer(reducer,0)
   //count ka value 0 ho gya
   console.log(useReducer(reducer,0));
   console.log(useReducer(0,reducer));
    return  (
    <>
     <div className="p-4 h-lvh flex flex-col justify-center items-center">
        <h1>{count}</h1>
        <button onClick={()=>dispatch({type:"INCREMENT"})}>Increment</button>
        <button onClick={()=>dispatch({type:"DECREMENT"})}>Decrement</button>
     </div>   
    </>
    )
}