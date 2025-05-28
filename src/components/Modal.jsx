export const Modal = ({ id, onClose, onDeleteSuccess, showModal }) => {
  const urlAgenda = "https://playground.4geeks.com/contact/agendas/agenda_x1";

  const deleteContact = () => {
    fetch(`${urlAgenda}/contacts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        onDeleteSuccess();  
      })
  };

  return (
   <div className={`modal ${showModal ? "modal-show" : ""}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are you sure?</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>If you delete this contact, it will be gone forever!</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}  
            >Oh no!</button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={deleteContact} 
            >Yes baby!</button>
          </div>
        </div>
      </div>
    </div>
  );
};
