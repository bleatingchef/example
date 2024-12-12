import { useEffect } from 'react';
import NewTask from '../components/NewTask';

const NewTaskPage = ({ addTaskHandler, taskStates }) => {
    useEffect(() => {
        document.title = 'New Task';
        document.getElementById('text').focus();
    }, []);

    return (    
        <>
            <h1>Create New Data</h1>
            <NewTask 
                formSubmitHandler={addTaskHandler} 
                formSubmitBtnText="Add Task"
                taskStates={taskStates} 
            />
        </>
    );
};

export default NewTaskPage;