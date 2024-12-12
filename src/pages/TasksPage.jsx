import { useEffect } from 'react';
import TaskList from "../components/TaskList";

const TasksPage = ({ tasks, taskStates }) => {
    useEffect(() => {
        document.title = 'All Tasks';
    }, []);

    return (    
        <>
            <h1>All Data</h1>
            <div>
                <TaskList tasks={tasks} />
            </div>
        </>
    );
};

export default TasksPage;