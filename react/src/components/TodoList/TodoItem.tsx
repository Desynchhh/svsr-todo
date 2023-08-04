import { Todo } from "../../types"

type Props = {
    todo: Todo;
    onToggleTodo: (todoId: string) => void;
    onDeleteTodo: (todoId: string) => void;
}

export default function TodoItem({ todo, onDeleteTodo, onToggleTodo }: Props) {
    function toggleComplete(todoId: string) {
        onToggleTodo(todoId);
    }

    function deleteTodo(todoId: string) {
        onDeleteTodo(todoId);
    }

    return (
        <div className="daisy-card w-96 bg-base-100 shadow-xl">
            <div className="daisy-card-body">
                <div className="title flex flex-row justify-between">
                    <h2 className="daisy-card-title flex flex-row justify-between">
                        {todo.title}
                    </h2>
                    <div className={`daisy-badge ${todo.completed ? "daisy-badge-success" : "daisy-badge-warning"} font-bold`}>
                        {todo.completed ? "COMPLETED!" : "INCOMPLETE"}
                    </div>
                </div>
                <p>{todo.body}</p>
                <div className="daisy-card-actions justify-end">
                    <button className="daisy-btn daisy-btn-sm daisy-btn-primary" onClick={() => toggleComplete(todo.id)}>Toggle complete</button>
                    <button className="daisy-btn daisy-btn-sm daisy-btn-error text-1xl" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}