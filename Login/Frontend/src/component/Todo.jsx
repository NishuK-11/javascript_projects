import React from 'react'

const Todo = () => {
  return (
    <div className="container">
        <div className="todo-app">
            <h1>
                #
            </h1>
            <div className="row">
                <form >
                    <input type="text" id='input-box' placeholder='add a new item' />
                    <button>Add Task</button>
                </form>
                <div>
                    <ul id="list-container"></ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Todo
