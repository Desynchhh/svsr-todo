import { useState, useEffect } from 'react'
import './App.css'
import { PbResponse, PostTodo, ToastStatus, Todo } from './types';
import Toast from './components/Toast';
import TodoList from './components/TodoList';
import { CreateForm } from './components/CreateTodo';
import { fetchData } from './components';

function App() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [toastMessage, setToastMessage] = useState<string>("");
    const [toastStatus, setToastStatus] = useState<ToastStatus>("daisy-alert-success");

    function openModal() {
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);

    }

    async function toggleTodoComplete(todoId: string) {
        try {
            const todo = todos.find(t => t.id === todoId);
            if (!todo) {
                setToastMessage(`could not find todo with id ${todoId}`);
                setToastStatus("daisy-alert-error");
                return;
            }
            const newCompleted = !todo.completed;

            await fetchData<Todo>(`http://127.0.0.1:8090/api/collections/todos/records/${todoId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    completed: newCompleted,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setTodos(prevState => prevState.map((t) => {
                if (t.id === todoId) {
                    t.completed = newCompleted;
                }
                return t;
            }));

            setToastMessage("Todo updated!");
            setToastStatus("daisy-alert-success");
        } catch (err) {
            console.error(err);
            setToastMessage("Something went wrong while updating the todo..");
            setToastStatus("daisy-alert-error");
        }
    }

    async function addTodo(todo: PostTodo) {
        try {
            const data = await fetchData<Todo>("http://127.0.0.1:8090/api/collections/todos/records", {
                method: "POST",
                body: JSON.stringify(todo),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!data) {
                setToastMessage("Something went wrong while adding the todo..");
                setToastStatus("daisy-alert-error");
                return;
            }
            setTodos((prevState) => [...prevState, data]);
            closeModal();
            setToastMessage("Todo added!");
            setToastStatus("daisy-alert-success");
        } catch (err) {
            console.log(err);
            setToastMessage("Something went wrong while adding the todo..");
            setToastStatus("daisy-alert-error");
        }

    }

    async function deleteTodo(todoId: string) {
        try {
            await fetchData<Todo>(`http://127.0.0.1:8090/api/collections/todos/records/${todoId}`, {
                method: "DELETE",
            });
            setTodos((prevState) => prevState.filter(t => t.id !== todoId));
            setToastMessage("Todo deleted!");
            setToastStatus("daisy-alert-success");
        } catch (err) {
            console.log(err);
            setToastMessage("Something went wrong while updating the todo..");
            setToastStatus("daisy-alert-error");
        }
    }

    useEffect(() => {
        fetchData<PbResponse<Todo>>("http://127.0.0.1:8090/api/collections/todos/records")
            .then((data) => {
                const todos = data?.items;
                if (todos) {
                    setTodos(todos);
                }
            });
    }, []);

    return (
        <main className="flex flex-col justify-center items-center mx-auto mt-10">
            <div>
                <button className="daisy-btn daisy-btn-lg daisy-btn-success" onClick={openModal}>Add todo +</button>
            </div>


            <TodoList todos={todos} onToggleTodo={toggleTodoComplete} onDeleteTodo={deleteTodo} />
            <CreateForm
                isOpen={isModalOpen}
                onCloseCreateTodoModal={closeModal}
                onAddTodo={addTodo}
            />

            {toastMessage && toastStatus &&
                <Toast message={toastMessage} status={toastStatus} />
            }
        </main>

    )
}

export default App
