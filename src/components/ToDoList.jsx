import { useState } from "react";
import { Badge, ListGroup } from "react-bootstrap";

const list = [
  {
    task: "Pasear al perro",
    id: crypto.randomUUID(),
  },
  {
    task: "Hacer la compra",
    id: crypto.randomUUID(),
  },
];

const Todolist = () => {
  const [listValue, setListValue] = useState(list);
  const [inputValue, setInputValue] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);

  const createLi = (listTask) => {
    if (listTask.trim()) {
      setListValue([...listValue, { task: listTask, id: crypto.randomUUID() }]);
      setInputValue("");
    }
  };
  const removeLi = (id) => {
    setListValue(
      listValue.filter((element) => {
        return element.id !== id;
      }),
    );
  };

  return (
    <>
      <ListGroup className="card m-2 mt-5">
        <h1 className="text-center">ToDoList</h1>
        <input
          placeholder="    What needs to be done?"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createLi(inputValue);
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
            <div className="ms-2 me-auto">{element.task}</div>
            {hoveredItem === element.id ? (
              <Badge bg="danger" pill onClick={() => removeLi(element.id)}>
                X
              </Badge>
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
