function App() {
  return (
    <div className="App">
      <h1>Welcome to your MERN Todo-app</h1>
      <h4>Your Tasks</h4>

      <div className="todos">
        <div className="todo">
          <div className="checkbox"></div>
          <div className="text">New task1</div>
          <div className="delete-todo">X</div>
        </div>
        <div className="todo is-complete">
          <div className="checkbox"></div>
          <div className="text">New task2</div>
          <div className="delete-todo">X</div>
        </div>
      </div>
    </div>
  );
}

export default App;
