import { useState } from "react";
import Layout from "./Layout";
import "./App.css";

//Button 컴포넌트
function CustomButton(props) {
  const { color, onClick, children } = props;

  if (color)
    return (
      <button style={{ borderColor: color, color: "black" }} onClick={onClick}>
        {children}
      </button>
    );
}

//Comment
//commit test1 Jeongmin
//List 초록창 컴포넌트
function List(props) {
  if (props.list.isActive === true) {
    return (
      <div className="component-style">
        <h3>{props.list.todo}</h3>
        <p>{props.list.memo}</p>
        <CustomButton
          color="red"
          onClick={() => props.handleDelete(props.list.id)}
        >
          Delete
        </CustomButton>
        <CustomButton
          color="green"
          onClick={() => props.handleActive(props.list.id)}
        >
          Complete
        </CustomButton>
      </div>
    );
  } else {
    return (
      <div className="component-style">
        <h3>{props.list.todo}</h3>
        <p>{props.list.memo}</p>
        <CustomButton
          color="red"
          onClick={() => props.handleDelete(props.list.id)}
        >
          Delete
        </CustomButton>
        <CustomButton
          color="green"
          onClick={() => props.handleActive(props.list.id)}
        >
          Active
        </CustomButton>
      </div>
    );
  }
}

const App = () => {
  const [lists, setLists] = useState([
    {
      id: 1,
      todo: "리액트 공부하기",
      memo: "리액트 기초 공부",
      isActive: true,
    },
    {
      id: 2,
      todo: "리액트 공부다했다",
      memo: "리액트 공부",
      isActive: false,
    },
  ]);

  const [todo, setTodo] = useState("");
  const [memo, setMemo] = useState("");
  const [isActive, setIsActive] = useState(true);

  //list array 추가하기
  const addTodoList = () => {
    const newTodo = {
      id: lists.length + 1,
      todo: todo,
      memo: memo,
      isActive: isActive,
    };

    setLists([...lists, newTodo]);
  };

  //isActive 컴포넌트
  const changeActive = (id) => {
    const newTodoList = lists.filter((list) => list.id !== id);
    console.log(newTodoList);

    const i = lists.findIndex((item) => item.id === id);
    const newActive = !lists[i].isActive;
    const newList = {
      id: i,
      todo: lists[i].todo,
      memo: lists[i].memo,
      isActive: newActive,
    };
    setLists([newTodoList, newList]);
  };

  //delete 컴포넌트
  const deleteTodoList = (id) => {
    const newTodoList = lists.filter((list) => list.id !== id);
    setLists(newTodoList);
  };

  return (
    <Layout>
      <div>
        <div className="app-style">
          TO-DO &nbsp;{" "}
          <input
            value={todo}
            onChange={(event) => {
              setTodo(event.target.value);
            }}
          />{" "}
          &nbsp; Memo &nbsp;{" "}
          <input
            value={memo}
            onChange={(event) => {
              setMemo(event.target.value);
            }}
          />
          <button
            className="app-button"
            onClick={() => {
              addTodoList();
              setTodo("");
              setMemo("");
            }}
          >
            ADD
          </button>
        </div>
        <div className="app-center">
          <h3>Working..</h3> <br />
          <div className="list-style">
            {lists.map((list) => {
              if (list.isActive === true) {
                return (
                  <List
                    list={list}
                    key={list.id}
                    handleDelete={deleteTodoList}
                    handleActive={changeActive}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          <h3>Done..!</h3> <br />
          <div className="list-style">
            {lists.map((list) => {
              if (list.isActive === false) {
                return (
                  <List
                    list={list}
                    key={list.id}
                    handleDelete={deleteTodoList}
                    handleActive={changeActive}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
