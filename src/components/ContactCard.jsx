import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "./Modal";

export const ContactCard = ({ name, email, address, phone, id, getContacts }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteSuccess = () => {
    getContacts();  
    setShowModal(false);  
  };

  return (
    <div className="col-12 border d-inline-flex">
      <div className="col-4 p-2">
        <img
          src="https://xsgames.co/randomusers/assets/avatars/male/69.jpg"
          alt="contact"
          className="rounded-circle"
        />
      </div>
      <div className="col-5 text-start m-2">
        <div className="fs-4">{name}</div>
        <div>
          <i className="fa-solid fa-location-dot me-3 text-secondary"></i>
          <span className="text-secondary">{address}</span>
        </div>
        <div>
          <i className="fa-solid fa-phone-flip me-3 text-secondary"></i>
          <span className="tel text-secondary">{phone}</span>
        </div>
        <div>
          <i className="fa-solid fa-envelope me-3 text-secondary"></i>
          <span className="mail text-secondary">{email}</span>
        </div>
      </div>
      <div className="col-3 m-2">
        <Link to={`/add_contact/${id}`}>
          <i className="fa-solid fa-pen me-5"></i>
        </Link>
        <i
          className="fa-solid fa-trash"
          onClick={() => setShowModal(true)}  
        ></i>
      </div>

       {showModal && (
        <Modal
          id={id}  
          showModal={showModal} 
          onClose={() => setShowModal(false)}  
          onDeleteSuccess={handleDeleteSuccess} 
        />
      )}  
    </div>
  );
};
