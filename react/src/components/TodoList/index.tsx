import { Todo } from "../../types"
import TodoItem from "./TodoItem";

type Props = {
    todos: Todo[];
    onToggleTodo: (todoId: string) => void;
    onDeleteTodo: (todoId: string) => void;
};

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }: Props) {
    return (
        todos &&
        <div className="todos flex flex-row flex-wrap justify-center mt-4 gap-4">
            {todos.map(todo => {
                return <TodoItem key={todo.id} todo={todo} onToggleTodo={onToggleTodo} onDeleteTodo={onDeleteTodo} />
            })}
        </div>
    );
}