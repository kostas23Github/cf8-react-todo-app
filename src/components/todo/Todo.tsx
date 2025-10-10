import {useEffect, useRef, useState} from "react";
import TodoForm from "./TodoForm.tsx";
import type {TodoProps} from "../../types.ts";
import TodoList from "./TodoList.tsx";
import TodoStats from "./TodoStats.tsx";
import Button from "../ui/Button.tsx";

const getInitialTodos = ():TodoProps[] => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
}

// Main(container) component of Home page.
const Todo = () => {
    const [todos, setTodos] = useState<TodoProps[]>(getInitialTodos());

    // Upon page load input element is focused.
    const inputRef = useRef<HTMLInputElement>(null);

    /*
    Why does the compiler say this function returns :void?
    I could also add "return" setTodos, and yet :void would persist.
    setTodos won't return the new state, it simply indicates that at the next render
    the state should be changed as dictated, hence returns void.
     */
    const addTodo = (text: string) => {
        setTodos(prev => [...prev, {id: Date.now(), text: text, completed: false}]);
    }

    const deleteTodo = (id: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }

    const editTodo = (id: number, newText: string) => {
        // setTodos(prev => prev.map((todo: TodoProps): TodoProps => {
        //     if (todo.id === id) { // if inside {} not ()
        //         return {...todo, text: newText};
        //     }
        //     return todo;
        // }));
        return setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? {...todo, text: newText} : todo
            )
        );
    }

    const toggleTodo = (id: number) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        )
    }

    const clearAll = () => {
        setTodos([]);
    }

    const totalTasks = todos.length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    const activeTasks = totalTasks - completedTasks;

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));   // Αλλάζει όλο το "todos" στο localStorage με το νέο state, που είναι(ουσιαστικά) το παλιό +- το νέο todo.
        inputRef.current?.focus();
    }, [todos])

    return (
        <>
            <div className="max-w-sm mx-auto">
                <h1 className="text-center text-2xl py-8">To-Do List</h1>

                <TodoForm
                    addTodo={addTodo}
                    inputRef={inputRef}
                />
                <TodoList
                    todos={todos}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    toggleTodo={toggleTodo}
                    inputRef={inputRef}
                />
                {totalTasks > 0 &&
                    <>
                        <TodoStats
                            total={totalTasks}
                            active={activeTasks}
                            completed={completedTasks}
                        />

                        <div className="text-end mt-4">
                        <Button
                            addClasses="bg-cf-dark-red"
                            label="Clear All"
                            onClick={clearAll}
                        />
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default Todo;