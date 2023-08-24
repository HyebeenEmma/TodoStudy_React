import { useState } from "react";
import Layout from "./Layout";
import Modal from "react-modal";
import moment from "moment";
import { CiSquareCheck, CiTrash, CiDumbbell } from "react-icons/ci";
import "./App.css";

//날짜
const date = new Date();
const formattedDate = moment(date).format("MMMM Do YYYY");

//Button 컴포넌트
function CustomButton(props) {
  const { color, onClick, children } = props;

  if (color)
    return (
      <button
        style={{
          float: "right",
          borderRadius: "3px",
          backgroundColor: "ButtonHighlight",
          scale: "1.1",
          marginRight: "5px",
        }}
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
          <CiTrash />
        </CustomButton>
        <CustomButton
          color="green"
          onClick={() => props.handleActive(props.list.id)}
        >
          {props.list.isActive ? <CiSquareCheck /> : <CiDumbbell />}
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
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      className="modal-open"
    >
      This is Modal content
    </Modal>;
  }

  return (
    <div className="whole-web">
      <Layout>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="modal-open"
        >
          <div className="app-style">
            <h5>TO-DO</h5>
            <input
              value={todo}
              onChange={(event) => {
                setTodo(event.target.value);
              }}
              style={{ height: "50px", width: "500px" }}
            />{" "}
            <h5 style={{ marginTop: "10px" }}>Memo</h5>
            <input
              value={memo}
              onChange={(event) => {
                setMemo(event.target.value);
              }}
              style={{ height: "200px", width: "500px" }}
            />
            <div>
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
          </div>
        </Modal>
        <div>
          <div className="app-style">
            <h4>{formattedDate}</h4>
            <button
              className="app-button"
              onClick={() => {
                setModalIsOpen(true);
              }}
              style={{ float: "right" }}
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
    </div>
  );
};

export default App;
