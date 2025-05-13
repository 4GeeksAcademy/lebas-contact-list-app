import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const AddContact = () => {

    const urlAgenda ="https://playground.4geeks.com/contact/agendas/agenda_x1";  
    const [contact, setContact] = useState({  name: "",
                                            phone: "",
                                            email: "",
                                            address: ""
        })

   
    const saveContact = () => {
        const method = id ? "PUT" : "POST"; 
    const url = id ? `${urlAgenda}/contacts/${id}` : `${urlAgenda}/contacts`;

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        })
        .then(() => {
            setContact({name: "", phone: "", email: "", address: ""});
        })
        .then(() => {
            navigate("/"); 
        })	
    }

    const { id } = useParams();
    const navigate = useNavigate(); 

    useEffect(() => { 

        if (id) {
           	fetch(`${urlAgenda}/contacts/`)
   		.then((response) => {
			return response.json()		
		})
        .then((data) => { 
            const contact = data.contacts.find((contact) => contact.id === parseInt(id));
        if (contact) {
            setContact({
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              address: contact.address,
            });
          }
        })
        }
    }, [id]);

 
    


    return(<div className="container mt-5">
           <h1 className="text-center">{id ? "Update a contact" : "Add a new contact"}</h1>
           <div className="row">
            <div className="col-12">
                <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-control" 
                            name="name" 
                            value={contact.name}   
                            placeholder="Full Name" 
                            onChange={(e) => setContact({
                                ...contact,
                                name: e.target.value,
                            })}
                            />
                        </div>
                            <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" 
                            placeholder="Enter email"
                            name="email"
                            value={contact.email}
                            onChange={(e) => setContact({
                                ...contact,
                                email: e.target.value,
                            })}
                            />
                            </div>
                            <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="text" className="form-control" 
                            placeholder="Enter phone" 
                            name="phone"
                            value={contact.phone}
                            onChange={(e) => setContact({
                                ...contact,
                                phone: e.target.value,
                            })}
                            />
                            </div>
                            <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control"
                            placeholder="Enter address" 
                            name="address"
                            value={contact.address}
                            onChange={(e) => setContact({
                                ...contact,
                                address: e.target.value,
                            })}
                            />
                        </div>
        
                        <button type="submit" className="btn btn-primary w-100" onClick={saveContact}>{id ? "Update" : "Save"}</button>
                    </form>
                    <Link to="/">or get back to contacts</Link>
            </div>  
        </div>  
    </div> 
 
 
      
    )
}