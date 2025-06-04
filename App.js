
import React, { useState, useEffect } from 'react';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/tasks')
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    const addTask = () => {
        fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTask })
        }).then(() => {
            setNewTask('');
            fetch('http://localhost:5000/api/tasks')
                .then(res => res.json())
                .then(data => setTasks(data));
        });
    };

    const deleteTask = (id) => {
        fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setTasks(tasks.filter(task => task.id !== id));
        });
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>To-Do List</h1>
            <input value={newTask} onChange={e => setNewTask(e.target.value)} />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
