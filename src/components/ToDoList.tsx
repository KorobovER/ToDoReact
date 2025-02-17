import React, { useEffect } from 'react';
import useTodoStore from '../store';

const TodoList: React.FC = () => {
    const { tasks, loading, error, fetchTasks, deleteTask, updateTaskStatus } = useTodoStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                {tasks.map((task) => (
                    <div key={task.id}>
                        <h3>{task.attributes.title}</h3>
                        <p>Status: {task.attributes.status}</p>
                        <select
                            value={task.attributes.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        >
                            <option value="Не выполнена">Не выполнена</option>
                            <option value="В процессе">В процессе</option>
                            <option value="Выполнено">Выполнено</option>
                        </select>
                        <button onClick={() => deleteTask(task.id)}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;