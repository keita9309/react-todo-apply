import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [isStarted, setIsStarted] = useState(1);
  const todoNameRef = useRef();

  const handleAddTodo = () => {
    //タスクを追加する
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
    if (todos.length === 0) {
      setIsStarted(2);
    }
  };

  const toggleTodo = (id) => {
    //直接状態をいじるのは良くないため、現在の状態をコピー
    const newTodos = [...todos];
    //選択されたTodoとコピーしたTodoリスの中のidが一致しているオブジェクトを、変数todoに格納
    const todo = newTodos.find((todo) => todo.id === id);
    //現在の状態と反対の真偽値で上書き
    todo.completed = !todo.completed;
    //最新のオブジェクトの状態をセット
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    if (todos.filter((todo) => !todo.completed).length === 0) {
      setIsStarted(3);
    }
  };

  return (
    <div className="body">
      <div className="outer">
        <div className="container">
          <div className="main_title">
            <h1>TODOリスト 〜 by React 〜</h1>
          </div>
          <div className="mt-4">
            <div className="mb-4">
              <input
                type="text"
                ref={todoNameRef}
                className="form-control"
                placeholder="例）Reactの勉強"
              />
            </div>
            <div className="mb-4 button_event">
              <button onClick={handleAddTodo} className="me-3 add_task radius">
                タスクを追加
              </button>
              <button onClick={handleClear} className="me-3 end_task radius">
                完了したタスクの削除
              </button>
            </div>
            <div className="remaining_task">
              {
              isStarted === 1 && "タスクを追加してください！"
              }
              {isStarted === 2 &&
                `本日のタスク（ 残り : ${
                  todos.filter((todo) => !todo.completed).length
                } 個 ）`}
              {
              isStarted === 3 && "本日のタスクは完了しました！"
              }
            </div>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
