import { useState } from "react";
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

//List 컴포넌트
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
          onClick={() => {
            props.setDetailIsOpen(true);
          }}
        >
          Detail
        </CustomButton>
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
  const [detailIsOpen, setDetailIsOpen] = useState(false);
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
  const isActive = true;

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
    const index = lists.findIndex((item) => item.id === id);
    lists[index].isActive = !lists[index].isActive;

    setLists([...lists]);
  };

  //delete 컴포넌트
  const deleteTodoList = (id) => {
    const newTodoList = lists.filter((list) => list.id !== id);
    setLists(newTodoList);
  };

  //detail modal
  const detailModalOpen = (id) => {
    const index = lists.findIndex((item) => item.id === id);
    setDetailIsOpen(true);
  };

  // //Modal
  // if (modalIsOpen === true) {
  //   <Modal
  //     isOpen={modalIsOpen}
  //     onRequestClose={() => setModalIsOpen(false)}
  //     className="modal-open"
  //   >
  //     modal content
  //   </Modal>;
  // }

  //Return
  return (
    <div className="whole-web">
      {/* create page Modal*/}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal-open"
      >
        <div className="app-style-noborder">
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
      {/* detail page modal*/}
      <Modal
        isOpen={detailIsOpen}
        onRequestClose={() => setDetailIsOpen(false)}
        className="modal-open"
      >
        <div className="app-style-noborder">
          {lists.map((list) => {
            return <List list={list} key={list.id} />;
          })}
        </div>
      </Modal>
      {/* 여기부터 메인 페이지 */}
      <div>
        <div className="app-style-noborder">
          <h4>{formattedDate}</h4>
        </div>
        <div className="app-style">
          <button
            className="app-button"
            onClick={() => {
              setModalIsOpen(true);
            }}
            style={{ float: "right" }}
          >
            New TODO
          </button>
          <h1>My TODO List</h1>
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
                    setDetailIsOpen={detailModalOpen}
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
                    setDetailIsOpen={detailModalOpen}
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
    </div>
  );
};

export default App;
