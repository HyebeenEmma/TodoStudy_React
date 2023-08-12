import { useState } from "react";
import Layout from "./Layout";
import Modal from "react-modal";
import "./App.css";

//Button 컴포넌트
function CustomButton(props) {
  const { color, onClick, children } = props;

  if (color)
    return (
      <button
        style={{ borderColor: color, color: "black", float: "right" }}
        onClick={onClick}
      >
        {children}
      </button>
    );
}

//List 초록창 컴포넌트
function List(props) {
  const buttonStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  return (
    <div className="component-style">
      <div>{props.list.todo}</div>
      <div style={buttonStyle}>
        <CustomButton
          color="red"
          onClick={() => props.handleDelete(props.list.id)}
        >
          D
        </CustomButton>
        <CustomButton
          color="green"
          onClick={() => props.handleActive(props.list.id)}
        >
          {props.list.isActive ? "C" : "A"}
        </CustomButton>
      </div>
    </div>
  );
}

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  if (modalIsOpen === true) {
    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      This is Modal content
    </Modal>;
  }

  return (
    <Layout>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
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
              setModalIsOpen(false);
              addTodoList();
              setTodo("");
              setMemo("");
            }}
          >
            Create
          </button>
        </div>
      </Modal>
      <div>
        <div className="app-style">
          Date
          <button
            className="app-button"
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            New TODO
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
