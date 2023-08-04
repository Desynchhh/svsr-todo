import { PostTodo } from "../../types";

type Props = {
    isOpen: boolean;
    onCloseCreateTodoModal: () => void;
    onAddTodo: (newTodo: PostTodo) => void;
}

export default function CreateForm({ isOpen = false, onCloseCreateTodoModal, onAddTodo }: Props) {
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget);

        const title = formData.get("title_input")?.toString();
        const body = formData.get("body_input")?.toString();
        const completed = formData.has("completed_input");

        if (!title) {
            console.error("Title is required");
            return;
        }

        const newTodo: PostTodo = {
            title,
            body,
            completed,
        }

        onAddTodo(newTodo);
    }

    function onClose() {
        onCloseCreateTodoModal();
    }

    return (
        <>
            <input type="checkbox" id="createTodoFormModal" className="daisy-modal-toggle" checked={isOpen} onChange={() => { }} />
            <div className="daisy-modal">
                <div className="daisy-modal-box">
                    <h3 className="font-bold text-lg">Create Todo</h3>
                    <div>
                        <form className="flex flex-col" onSubmit={onSubmit}>
                            <legend>Create Todo</legend>
                            <div className="daisy-form-control">
                                <label htmlFor="title_input" className="daisy-label">Title *</label>
                                <input id="title_input" name="title_input" className="daisy-input daisy-input-bordered daisy-input-primary" type="text" placeholder="Title..." required />
                            </div>
                            <div className="daisy-form-control">
                                <label htmlFor="body_input" className="daisy-label">Details</label>
                                <input id="body_input" name="body_input" className="daisy-input daisy-input-bordered daisy-input-primary" type="text" placeholder="Details..." />
                            </div>
                            <div className="daisy-form-control flex-row items-center gap-2">
                                <label htmlFor="completed_input" className="daisy-label">Completed?</label>
                                <input id="completed_input" name="completed_input" className="daisy-checkbox daisy-checkbox-primary" type="checkbox" />
                            </div>
                            <button type="submit" className="daisy-btn daisy-btn-block daisy-btn-primary">Create</button>
                        </form>
                    </div>
                    <div className="daisy-modal-action">
                        <button onClick={onClose} className="daisy-btn daisy-btn-secondary">Close</button>
                    </div>
                </div>
            </div >
        </>

    );
}