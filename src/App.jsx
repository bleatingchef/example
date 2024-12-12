import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KanbanPage from './pages/KanbanPage';
import TaskDetailPage from './pages/TaskDetailPage';
import NewTaskPage from './pages/NewTaskPage';
import TasksPage from './pages/TasksPage';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CustomizeStatusModal from './components/CustomizeStatusModal';
import './App.css';

function App() {
  const [taskStates, setTaskStates] = useState(['Enquiry', 'Won', 'Lost']);
  const [showModal, setShowModal] = useState(false);

  const initialTasks = [
    { id: 1, text: 'Ram', leadId: 'LD001', priority: 'High', category: 'Hot', dueDate: '2024-06-18', blocked: false, status: 'Enquiry' },
    { id: 2, text: 'Shyam', leadId: 'LD002', priority: 'Medium', category: 'Warm', dueDate: '2024-06-20', blocked: false, status: 'Won' },
    { id: 3, text: 'Ghanshayam', leadId: 'LD003', priority: 'Low', category: 'Cold', dueDate: '2024-07-03', blocked: false, status: 'Won' },
    { id: 4, text: 'Sita', leadId: 'LD004', priority: 'High', category: 'Hot', dueDate: '2024-07-04', blocked: true, status: 'Lost' },
    { id: 5, text: 'Geeta', leadId: 'LD005', priority: 'Medium', category: 'Warm', dueDate: '2024-07-03', blocked: false, status: 'Lost' },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const addTask = ({ _task }) => {
    const newTaskId = tasks.length + 1;

    setTasks([
      ...tasks,
      {
        ..._task,
        id: newTaskId,
      }
    ]);

    return newTaskId;
  };

  const updateTask = ({ _task }) => {
    if (!tasks.find((task) => task.id === _task.id)) {
      return false;
    }

    setTasks(tasks.map((task) => (task.id === _task.id ? _task : task)));

    return _task.id;
  };

  const toggleBlockedAction = (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, blocked: !t.blocked };
      }

      return t;
    });

    setTasks(updatedTasks);
  };

  const changeTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const handleStatusChange = (status, enabled) => {
    if (enabled) {
      setTaskStates((prev) => [...prev, status]);
    } else {
      setTaskStates((prev) => prev.filter((s) => s !== status));
      setTasks((prev) =>
        prev.map((task) =>
          task.status === status ? { ...task, status: 'blocked', previousStatus: status } : task
        )
      );
    }
  };

  return (
    <>
      <Router>
        <Nav />
        <button
          style={{
            position: 'absolute',
            top: '20px',
            right: '50px',
            width: '160px',
            height: '50px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setShowModal(true)}
          className="customize"
        >
          Customize Status
        </button>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <KanbanPage
                  taskStates={taskStates}
                  tasks={tasks}
                  toggleBlockedAction={toggleBlockedAction}
                  changeTaskStatus={changeTaskStatus}
                />
              }
            />
            <Route
              path="/tasks/:taskId"
              element={
                <TaskDetailPage
                  updateTaskHandler={updateTask}
                  tasks={tasks}
                  taskStates={taskStates}
                />
              }
            />
            <Route
              path="/tasks"
              element={<TasksPage taskStates={taskStates} tasks={tasks} />}
            />
            <Route
              path="/tasks/new"
              element={<NewTaskPage addTaskHandler={addTask} taskStates={taskStates} />}
            />
          </Routes>
          <Footer />
        </main>
      </Router>
      {showModal && (
        <CustomizeStatusModal
          taskStates={taskStates}
          onClose={() => setShowModal(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </>
  );
}

export default App;
