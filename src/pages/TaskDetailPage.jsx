import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewTask from '../components/NewTask';

const TaskDetailPage = ({ updateTaskHandler, tasks, taskStates }) => {
    const { taskId } = useParams();

    const selectedTask = tasks.find(
        (task) => task.id === Number(taskId)
    );

    useEffect(() => {
        document.title = `Task Not Found`;
    }, []);

    useEffect(() => {
        if (selectedTask) {
            document.title = `Task #${selectedTask.id}`;
        }
    }, [selectedTask]);

    return (
        <>
            <h1>Data Detail {selectedTask && (<span>#{selectedTask.id}</span>)}</h1>
            {selectedTask 
                ? (
                    <>
                        {/* <TaskDetail task={selectedTask} /> */}
                        <NewTask 
                            formSubmitHandler={updateTaskHandler} 
                            formSubmitBtnText="Update Task"
                            taskStates={taskStates} 
                            task={selectedTask}
                        />
                    </>
                ) 
                : <p>Data not found.</p>
            }
            
        </>
    );
}

export default TaskDetailPage;