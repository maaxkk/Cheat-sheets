import {useEffect, useState} from "react";

export function EditContact({savedContact, onSave}) {
    const [name, setName] = useState(savedContact.name);
    const [email, setEmail] = useState(savedContact.email);

    // Added
    // const [prevId, setPrevId] = useState(savedContact.id);
    const [id, setId] = useState(savedContact.id)

    // first render -> we see in console our first object(taylor) and her id(prevId) 0
    // second render -> we see in console our second object(we chose Alice) and there is should 1, but we got 0
    // third render -> we see Alice's data and her id = 1, correct id
    // On second render id state saved in memory as 0 after first render and changing props does not change child's state
    // only setId can change state of id, and that's what we did in 'IF body' and why we got correct id only on 3rd render
    console.log(savedContact)
    console.log(id)

    // we never change Id state, we dont use 'setter' for Id, so Id depends on savedContact props on the first render
    // at first render Id is 0, and when we change savedContact to 1, Id have not changed and still 0, we compare
    // 0 !== 1 and we update states. If you put props as initial value in state, you should also update state, otherwise
    // changing props WONT change state(if state initial value on the first render was props).

    // Added
    if (id !== savedContact.id) {
        setName(savedContact.name)
        setEmail(savedContact.email)
        setId(savedContact.id)
    }    return (
        <section>
            <label>
                Name:{' '}
                <input
                    type={'text'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
            </label>
            <label>
                Email:{' '}
                <input
                    type={'email'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            </label>
            <button onClick={() => {
                const updatedData = {
                    id: savedContact.id,
                    name: name,
                    email: email
                }
                onSave(updatedData)
            }}>
                Save</button>
            <button onClick={() => {
                setName(savedContact.name);
                setEmail(savedContact.email);
            }}> Reset</button>
        </section>
    )
}


export function ContactList({
                         contacts,
                         selectedId,
                         onSelect
                     }) {
    return (
        <section>
            <ul>
                {contacts.map(contact =>
                    <li key={contact.id}>
                        <button onClick={() => {
                            onSelect(contact.id);
                        }}>
                            {contact.id === selectedId ?
                                <b>{contact.name}</b> :
                                contact.name
                            }
                        </button>
                    </li>
                )}
            </ul>
        </section>
    );
}


export default function ContactManager() {
    const [
        contacts,
        setContacts
    ] = useState(initialContacts);
    const [
        selectedId,
        setSelectedId
    ] = useState(0);
    const selectedContact = contacts.find(c =>
        c.id === selectedId
    );

    function handleSave(updatedData) {
        const nextContacts = contacts.map(c => {
            if (c.id === updatedData.id) {
                return updatedData;
            } else {
                return c;
            }
        });
        setContacts(nextContacts);
    }

    return (
        <div>
            <ContactList
                contacts={contacts}
                selectedId={selectedId}
                onSelect={id => setSelectedId(id)}
            />
            <hr />
            <EditContact
                savedContact={selectedContact}
                onSave={handleSave}
            />
        </div>
    )
}

const initialContacts = [
    { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
