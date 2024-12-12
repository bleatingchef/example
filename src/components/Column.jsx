import { useState } from 'react';
import TaskCard from './TaskCard'
import { ucFirst } from '../utils';

const Column = ({ status, tasks, toggleBlockedAction, changeTaskStatus }) => {

    const [dragTarget, setDragTarget] = useState(null);

    const handleDragOver = (e, status) => {
        e.preventDefault();
        setDragTarget(status);
    };

    const handleDragOff = (e) => {
        e.preventDefault();
        setDragTarget(null);
    }
    
    const handleDrop = (e, status) => {
        e.preventDefault();
        
        const taskId = e.dataTransfer.getData('text');
        changeTaskStatus(parseInt(taskId), status);

        setDragTarget(null);
    };

    return (
        <div 
            className={`board-column ${dragTarget === status ? 'drag-target' : ''}`}
            id={`board-column[${status}]`}
            onDragOver={(e) => handleDragOver(e, status)}
            onDrop={(e) => handleDrop(e, status)}
            onDragLeave={(e) => handleDragOff(e)}
        >
            <h3>{ucFirst(status)} ({tasks.length})</h3>
            {tasks.length === 0
                ? "No data in this column."
                : tasks.map((task) => (
                    <TaskCard 
                        key={task.id}
                        task={task}
                        toggleBlockedAction={toggleBlockedAction}
                    />
                )
            )}
        </div>
    );
}

export default Column;