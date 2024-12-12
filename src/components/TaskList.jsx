import { Link } from "react-router-dom";
import { ucFirst, prettyDate, isPastDueDate } from "../utils";
import { FaFlag } from 'react-icons/fa';

const TaskList = ({ tasks }) => {
    return (
        <table className="tasks">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Blocked</th>
                    <th>Due Date</th>
                    <th>Title</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                    <tr key={task.id}>
                        <td className="col-task-id">{task.id}</td>
                        <td className="col-task-status">{ucFirst(task.status)}</td>
                        <td className="col-task-blocked">{task.blocked && <span className="icon"><FaFlag /></span>}</td>
                        <td className={`col-task-date ${isPastDueDate(task) ? "task-overdue" : ""}`}>{prettyDate(task.dueDate)}</td>
                        <td className="col-task-title">{task.text}</td>
                        <td className="col-task-actions">
                            <Link to={`/tasks/${task.id}`}>View</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TaskList;