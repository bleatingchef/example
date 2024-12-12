import React from 'react';

const CustomizeStatusModal = ({ taskStates, onClose, onStatusChange }) => {
  // Define all statuses
  const allStatuses = [
    'Enquiry',
    'Won',
    'Lost',
    'Site Visit',
    'Hot Followups',
    'Cold(Future Leads)',
    'Delayed(Postponed)',
    'Testing',
    'blocked', // Ensure 'blocked' is included in the list
  ];

  // Ensure 'blocked' is always at the end
  const reorderedStatuses = allStatuses.filter((status) => status !== 'blocked').concat('blocked');

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Customize Status</h2>
        {reorderedStatuses.map((status) => (
          <div key={status} id="status">
            <label>
              <input
                type="checkbox"
                checked={taskStates.includes(status)}
                disabled={['Enquiry', 'Won', 'Lost'].includes(status)} 
                onChange={(e) => onStatusChange(status, e.target.checked)}
              />
              {status}
            </label>
          </div>
        ))}
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomizeStatusModal;
