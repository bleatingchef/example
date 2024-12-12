const Footer = () => {
    return (
        <footer>
            <div className="tips">
                <b>Tips</b>
                <ul>
                    <li>Left-Click a task to view its details. </li>
                    <li>Right-Click a task to toggle the blocked status. </li>
                    <li>Drag and drop tasks between columns to change their status.</li>
                </ul>
            </div>
            <div className="tips">
                <b>Colours</b>
                <table>
                    <tbody>
                        <tr>
                            <td><div className="colour-box green">Green Fill</div></td>
                            <td>On Track</td>
                        </tr>
                        <tr>
                            <td><div className="colour-box red">Red Fill</div></td>
                            <td>Blocked</td>
                        </tr>
                        <tr>
                            <td><div className="colour-box orange-border">Orange Border</div></td>
                            <td>Late/Overdue</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </footer>
    )
};

export default Footer;