import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";

const Todolist = () => {
  const [listValue, setListValue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);

  const getTodoList = () => {
    fetch("https://playground.4geeks.com/todo/users/AdrianNQ", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setListValue(response.todos);
      });
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const addTask = () => {
    if (inputValue.trim() === "") return;
    fetch("https://playground.4geeks.com/todo/todos/AdrianNQ", {
      method: "POST",
      body: JSON.stringify({
        label: inputValue,
        is_done: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getTodoList();
      setInputValue("");
    });
  };

  const deleteTask = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      getTodoList();
    });
  };

  return (
    <>
      <ListGroup className="card m-2 mt-5 pt-1">
        <h1 className="text-center">ToDoList</h1>
        <input
          placeholder="    What needs to be done?"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask(inputValue);
            }
          }}
        />
        {listValue.map((element) => (
          <ListGroup.Item
            className="d-flex justify-content-between align-items-start"
            key={element.id}
            onMouseOver={() => setHoveredItem(element.id)}
            onMouseOut={() => setHoveredItem(null)}
          >
            <div className="ms-2 me-auto">{element.label}</div>
            {hoveredItem === element.id ? (
              <Button
                variant="danger"
                size="sm"
                pill
                onClick={() => deleteTask(element.id)}
              >
                X
              </Button>
            ) : (
              ""
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Todolist;
