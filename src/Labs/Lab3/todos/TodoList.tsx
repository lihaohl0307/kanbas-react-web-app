import TodoItem from './TodoItem';
import todos from './todos.json';

const TodoList = () => {
  return (
    <>
      <h3>Todo List</h3>
      <ul className="list-group">
      {/* For each element (each todo item) in the todos array, 
      the map function creates a TodoItem component. */}
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ul>
      <hr />
    </>
  );
}

export default TodoList;
