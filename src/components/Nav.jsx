import { Link } from 'react-router-dom';
import { FaChartBar, FaPlus, FaTasks, FaInfo } from 'react-icons/fa';

const Nav = () => {
    return (
        <nav>
            <Link to="/">
                <h2><span className="icon"></span> Kanban Board</h2>
            </Link>
            <ul>
                <Link to="/">
                    <li>
                        <span className="icon"><FaChartBar /></span> Home
                    </li>
                </Link>
                <Link to="/tasks/new">
                    <li>
                        <span className="icon"><FaPlus /></span> New Data
                    </li>
                </Link>
                <Link to="/tasks">
                    <li>
                        <span className="icon"><FaTasks /></span> All data
                    </li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;