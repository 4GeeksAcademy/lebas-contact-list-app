import { ContactCard } from "../components/ContactCard.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Contact = () => {

	const [listContacts, setListContacts] = useState([]);

    const urlAgenda ="https://playground.4geeks.com/contact/agendas/agenda_x1";        
    const createAgenda = () => {
        fetch(urlAgenda)
        .then((response) => {
            if(response.status === 404) {
                return fetch(urlAgenda, {
                    method: "POST",
                });
            }
        })
    };	

const getContacts = () => {
  fetch(`${urlAgenda}/contacts/`)
    .then(response => response.json())
    .then(data => {
      if (
        data &&
        Array.isArray(data.contacts) &&
        data.contacts.length === 0
      ) {
        return fetch(`${urlAgenda}/contacts/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: "Mike Anamendolla",
            phone: "(870) 288-4149",
            email: "mike.ana@example.com",
            address: "5842 Hillcrest Rd"
          })
        })
        .then(() => {
          return fetch(`${urlAgenda}/contacts/`).then(res => res.json());
        });
      } else {
        return data;
      }
    })
    .then(data => {
      setListContacts(data.contacts);
    })
};

	useEffect(() => {
	createAgenda();
    getContacts();
  }, []);
	
	return(
		<div className="container text-center mt-5">
			<div className="row">
				<div className=" text-end">
					<Link className="btn btn-success mb-3" to="/add_contact">Add new contact</Link>
				</div>
				{Array.isArray(listContacts) && listContacts.map((contact) => {
					return(
					<ContactCard 
					name={contact.name} 
					phone={contact.phone} 
					key={contact.id} 
					id={contact.id}
					address={contact.address} 
					email={contact.email}
					urlAgenda ="https://playground.4geeks.com/contact/agendas/agenda_x1"
					getContacts={getContacts}
					/>
				);
				})}
			
			</div>
		</div>
	);
}; 