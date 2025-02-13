import { create } from 'zustand';

// Типы для задач
interface TaskAttributes {
    status: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface Task {
    id: number;
    attributes: TaskAttributes;
}

// Состояние хранилища
interface TodoStore {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (title: string, description: string) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

// Создаем хранилище
const useTodoStore = create<TodoStore>((set) => ({
    tasks: [],
    loading: false,
    error: null,

    // Получение задач с API
    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('https://cms.laurence.host/api/tasks');
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const data = await response.json();
            set({ tasks: data.data, loading: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch tasks', loading: false });
        }
    },

    // Добавление новой задачи
    addTask: async (title: string) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('https://cms.laurence.host/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        title,
                        status: 'not completed', // Статус по умолчанию
                    },
                }),
            });
            if (!response.ok) throw new Error('Failed to add task');
            const newTask = await response.json();
            set((state) => ({ tasks: [...state.tasks, newTask.data], loading: false }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to add task', loading: false });
        }
    },
    //Удаление задачи
    deleteTask: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`https://cms.laurence.host/api/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete task');

            set((state) => ({
                tasks: state.tasks.filter(task => task.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to delete task',
                loading: false
            });
        }
    },
}));

export default useTodoStore;