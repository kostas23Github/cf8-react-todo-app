import {useState} from "react";
import type {TodoFormProps} from "../../types.ts";
import Button from "../ui/Button.tsx";


const TodoForm = ({addTodo, inputRef}: TodoFormProps) => {
    const [text, setText] = useState("");

    // Update text state(currently for input element).
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    // FormEvent -> Βάζει το event της φόρμας.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (text.trim() !== "") {
            addTodo(text); // Update parent state(todos).
            setText("");
        }
    };

    return (
        <>
            <form className="flex gap-4 mb-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    ref={inputRef}
                    className="flex-1 border p-2 rounded"
                    placeholder="New task..."
                    value={text}
                    onChange={handleChange}/>
                <Button label="Add"/>
            </form>
        </>
    )
}

export default TodoForm;