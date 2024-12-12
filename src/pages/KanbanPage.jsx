import { useEffect } from 'react';
import Column from '../components/Column';

const KanbanPage = ({ taskStates, tasks, toggleBlockedAction, changeTaskStatus }) => {
    useEffect(() => {
        document.title = 'Kanban Board';
    }, []);

    return (    
        <>
            <h1>Kanban Board</h1>
            <div className="board">
                {taskStates.map((state) => (
                    <Column 
                        key={state} 
                        status={state} 
                        tasks={tasks.filter(task => task.status === state)}
                        toggleBlockedAction={toggleBlockedAction}
                        changeTaskStatus={changeTaskStatus}
                    />
                ))}
            </div>
        </>
    );
};

export default KanbanPage;