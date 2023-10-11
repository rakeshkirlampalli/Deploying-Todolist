import React, { useState } from 'react';

const Todolist = () => {
    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');
    const HandleAdd = () => {
        // Add to local state
        setTask([...task, newTask]);
    
        // Send data to backend
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: newTask }),  // Send newTask as JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
        // Clear the input field
        setNewTask('');
    };
    
    const HandleDelete = (index) => {
        const updatedTask = [...task];
        updatedTask.splice(index, 1);
        setTask(updatedTask);
    };

    const HandleEdit = (index) => {
        setEditIndex(index);
        setEditText(task[index]);
    };

    const HandleSave = () => {
        const toEditedtask = [...task];
        toEditedtask[editIndex] = editText;
        setTask(toEditedtask);
        setEditIndex(null);
        setEditText('');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1>Todolist</h1>
                <div>
                    <input type='text' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                    <button onClick={HandleAdd}>Add</button>
                </div>
            </div>
            <ul>
                {
                    task.map((x, index) => (
                        <li key={index}>
                            {
                                editIndex === index ?
                                <>
                                    <input type='text' value={editText} onChange={(e) => setEditText(e.target.value)} />
                                    <button onClick={HandleSave}>Save</button>
                                </>
                                :
                                <>
                                    {x}
                                    <button onClick={() => HandleEdit(index)}>Edit</button>
                                    <button onClick={() => HandleDelete(index)}>Remove</button>
                                </>
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Todolist;