import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isPastDueDate, prettyDate } from '../utils';

const TaskCard = ({ task, toggleBlockedAction }) => {
    const navigate = useNavigate();

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('text/plain', taskId);
    };

    const showTaskDetail = (e, task) => {
        navigate(`/tasks/${task.id}`);
    };

    const onContextMenu = (e, task) => {
        e.preventDefault();
        toggleBlockedAction(task);
    };

    const categoryColors = {
        Hot: 'red',
        Warm: 'orange',
        Cold: 'blue'
    };

    return (
        <>
            <div 
                className={`
                    task-card 
                    prevent-select
                    ${task.blocked ? 'task-blocked' : ''} 
                    ${isPastDueDate(task) ? 'task-overdue' : ''}`
                } 
                onDragStart={(e) => handleDragStart(e, task.id)}
                onClick={(e) => showTaskDetail(e, task)}
                onContextMenu={(e) => onContextMenu(e, task)}
                draggable={true}
            >
                <div className='task-detail'>
                    <div className='task-id'>Name: {task.text}</div>
                    <div className="task-lead">Lead ID: {task.leadId}</div>
                    <div className="task-priority">Priority: {task.priority}</div>
                    <div className="task-category" style={{ color: categoryColors[task.category] }}>
                        Category: {task.category}
                    </div>
                    {task.blocked ? <div className="task-impedent">🚩</div> : null}
                </div>

                <br/>

                <div className="task-detail">
                    <p className="due-date">Due: {prettyDate(task.dueDate)}</p>
                </div>
            </div>
        </>
    );
};

export default TaskCard;