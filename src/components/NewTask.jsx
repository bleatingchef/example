import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';

const NewTask = ({ formSubmitHandler, formSubmitBtnText, taskStates, task }) => {
    const navigate = useNavigate();

    const emptyStatusMsg = { statusMsg: '', isError: false };
    const [{statusMsg, isError}, setStatusMsg] = useState(emptyStatusMsg);

    const emptyNewTask = { id: null, text: '', leadId: '', priority: '', category: '', dueDate: '', blocked: false, status: 'todo' };
    const [newTask, setNewTask] = useState(emptyNewTask);

    const [createdTaskId, setCreatedTaskId] = useState(null);

    useEffect(() => {
        if (task) {
            setNewTask(task);
        }
    }, []);

    const handleTaskChange = (event) => {
        const {
          target: { name, value }
        } = event;

        // Special sauce for blocked field
        if (name === 'blocked') {
            setNewTask({ ...newTask, blocked: !newTask.blocked });
            return;
        }
    
        setNewTask({ 
          ...newTask, 
          [name]: value,
        });
    }

    const cancelFormhandler = () => {
        if (task) { // Handle Cancel for Edit Task
            navigate(`/`);
        } else {
            setNewTask(emptyNewTask); // Reset Form
            setStatusMsg(emptyStatusMsg); // Reset Status Message
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!newTask.text || newTask.text.length == 0 || !newTask.dueDate || newTask.dueDate.length == 0) {
            setStatusMsg({statusMsg: `Please enter a Data and due date`, isError: true});
            return;
        }

        if (newTask.status === '') {
            setNewTask({ ...newTask, status: 'todo' });
        }

        // Save Task
        const newTaskId = formSubmitHandler({ _task: newTask });
        if (!newTaskId) {
            setCreatedTaskId(null);
            setStatusMsg({statusMsg: `Data not found.`, isError: true});

        } else if (newTask.id) { // Update Existing Task
            setStatusMsg({statusMsg: `Data #${newTask.id} updated successfully! Taking you home...`, isError: false});

            setTimeout(() => {
                navigate('/');
            }, 500);
            
        } else { // Creating New Task
            setCreatedTaskId(newTaskId);
            setStatusMsg({statusMsg: `Data #${newTaskId} added successfully!`, isError: false});
        }
    }

    const categoryColors = {
        Hot: 'red',
        Warm: 'orange',
        Cold: 'blue'
    };

    return (
        <div className="new-task">
            <form onSubmit={onSubmit}>
                {newTask.id && (
                <div>
                    <label htmlFor="id"><span className="form-label">Data # </span>
                        <input type="text" name="id" id="id" placeholder="Data ID" value={newTask.id} onChange={handleTaskChange} readOnly={true}/>
                    </label>
                </div>
                )}

                <div>
                    <label htmlFor="text"><span className="form-label">Name </span>
                        <input type="text" name="text" id="text" placeholder="My New Data" value={newTask.text} onChange={handleTaskChange}/>
                    </label>
                </div>

                <div>
                    <label htmlFor="leadId"><span className="form-label">Lead ID </span>
                        <input type="text" name="leadId" id="leadId" placeholder="Lead ID" value={newTask.leadId} onChange={handleTaskChange}/>
                    </label>
                </div>

                <div>
                    <label htmlFor="priority"><span className="form-label">Priority </span>
                        <select name="priority" id="priority" value={newTask.priority} onChange={handleTaskChange}>
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label htmlFor="category"><span className="form-label">Category </span>
                        <select name="category" id="category" value={newTask.category} onChange={handleTaskChange} style={{ color: categoryColors[newTask.category] || 'black' }}>
                            <option value="">Select Category</option>
                            <option value="Hot">Hot</option>
                            <option value="Warm">Warm</option>
                            <option value="Cold">Cold</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label htmlFor="dueDate"><span className="form-label">Due Date </span>
                        <input type="date" name="dueDate" id="dueDate" placeholder="Due Date" value={newTask.dueDate} onChange={handleTaskChange}/>
                    </label>
                </div>

                <div>
                    <label htmlFor="status"><span className="form-label">Status </span>
                        <select name="status" id="status" value={newTask.status} onChange={handleTaskChange}>
                            {taskStates.map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div>
                    <div className="form-actions">
                        <button type="button" className="cancel" onClick={cancelFormhandler}>Cancel</button>
                        <button type="submit" className="create">{formSubmitBtnText}</button>
                    </div>

                    {createdTaskId &&
                        <div className="task-link">
                            <Link to={`/tasks/${createdTaskId}`}>
                                <span className="icon"><FaExternalLinkAlt /></span> 
                                View Data
                            </Link>
                        </div>
                    }                    

                    {statusMsg &&
                        <div className={`status-msg ${isError ? 'error' : 'success'}`}>{statusMsg}</div>
                    }
                </div>
            </form>
        </div>
    );
}

export default NewTask;
