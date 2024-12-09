import Todolist from "./components/ToDoList";
import "./App.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Container>
        <Todolist />
      </Container>
    </>
  );
}

export default App;
