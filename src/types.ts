export type TodoProps = {
    id: number;
    text: string;
    completed: boolean;
}

export type TodoFormProps = {
    addTodo: (text: string) => void;
    // Οι ref τιμές είναι RefObject που στη συγκεκριμένη περίπτωση δείχνει σε input element.
    inputRef: React.RefObject<HTMLInputElement | null>;
}

export type TodoListProps = {
    todos: TodoProps[];
    deleteTodo: (id: number) => void;
    editTodo: (id: number, newText: string) => void;
    toggleTodo: (id: number) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

export type TodoStatsProps = {
    total: number;
    active: number;
    completed: number;
}

export type ButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
    label: string;
    addClasses?: string;
}

export type IconButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
    icon: React.ReactNode; // Εδώ θα έχω lucide-react icon hence the type.
    addClasses?: string;
}

