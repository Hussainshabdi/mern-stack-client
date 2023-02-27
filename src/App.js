import React from "react";
import { useState, useEffect } from "react";
function App() {
  // const API_BASE = "http://localhost:3005/";
  const [todos, setTodos] = useState([]);
  const [popUp, setPopup] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
    console.log(todos);
  }, []);
  const GetTodos = () => {
    fetch("http://localhost:3005/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  };
  // const deleteTodo =()=>{
  //   fetch("http://localhost:3005/todo/delete/")
  // }
  const complete = async (id) => {
    const data = await fetch("http://localhost:3005/todo/complete/" + id).then(
      (res) => res.json());
    // console.log(id);
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    const del = fetch("http://localhost:3005/todo/delete/" + id).then((res) =>
      res.json()
    );
    setTodos(
      todos.filter((todo) => {
        return todo._id !== id;
      })
    );
  };
  const addTodo = async ()=>{
    const data = await fetch("http://localhost:3005/todo/new",{
      method:"post",
      header:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        text : newTodo
      })
    }).then(res=>res.json());
    console.log(data);
    // setNewTodo([...todos,newTodo])
    setTodos([...todos,data]);
    setPopup(false)
    setNewTodo("");
  }

  return (
    <div className="App">
      <h1>Welcome,Hussain</h1>
      <h4>Your Task</h4>
      <div className="todos">
        {todos.length > 0 ? todos.map((todo, key) => {
             return(
            <div
              className={`todo ${todo.complete ? "is-complete" : ""}`}
              key={todo._id}
              onClick={() => complete(todo._id)}
            >
              <div className="checkbox "></div>
              <div className="text">{todo.text}</div>
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                X
              </div>
            </div>
          
          // console.log(key);
        )}):(<p>you currently have no task</p>)}

        {/* <div className="todo is-complete">
          <div className="checkbox "></div>
          <div className='text'>lectues on omm</div>
          <div className="delete-todo">X</div>
        </div> */}
      </div>
      <div className="addPopUp" onClick={() => setPopup(true)}>
        +
      </div>
      {popUp ? (
        <div className="popUp">
          <div className="closePopUp" onClick={() => setPopup(false)}>
            x
          </div>
          <div className="content">
            <h3>Add Tasks</h3>
            <input type="text" onChange={(e) => setNewTodo(e.target.value)} />
            <button className="btn" onClick={addTodo}>Create</button>
          </div>
        </div>
      ) : ("")}
    </div>
  );
}

export default App;
