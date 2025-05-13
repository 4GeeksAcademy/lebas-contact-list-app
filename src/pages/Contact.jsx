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
		fetch(`${urlAgenda}/contacts`)
		.then((response) => {
			return response.json()		
		})
		.then((data) => {
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