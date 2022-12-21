import { useState, useEffect } from "react";

// const API_BASE = "http://localhost:4000";
const API_BASE = "https://todo-mern-iiqm.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
    //console.log(todos);
  }, []);

  const getTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log("Error: " + err));
  };

  // TOGGLER function
  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  // DELETE function
  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  // ADD-TODO popup
  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodo }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  };

  return (
    <div className="App">
      <h1>Welcome to your MERN Todo-app</h1>
      <h4>Your Tasks</h4>

      <div className="todos">
        {todos.map((todo) => {
          //console.log(todo.text);
          return (
            <div
              className={"todo " + (todo.complete ? "is-complete" : "")}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"></div>
              <div className="text"> {todo.text} </div>
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                X
              </div>
            </div>
          );
        })}

        {/* New Tasks */}
      </div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {/* Popup for new Tasks */}
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add New Task</h3>
            <input
              type="text"
              maxLength="20"
              placeholder="Max 20 charcters"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="buttons" onClick={addTodo}>
              CREATE TASK
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
