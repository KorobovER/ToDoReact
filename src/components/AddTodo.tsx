import React, { useState } from 'react';
import useTodoStore from '../store';

const AddTodo: React.FC = () => {
    const [title, setTitle] = useState('');
    const { addTask } = useTodoStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addTask(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTodo;