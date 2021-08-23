import { useState, useEffect } from 'react';
import { v4 } from 'uuid';

import Container from './components/Container';
import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handlerFormSubmit = ({ name, number }) => {
    const contact = {
      id: v4(),
      name,
      number,
    };

    if (
      contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(prevState => [contact, ...prevState]);
    }
  };
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  const deleteContact = contactId => {
    setContacts(prevContacts => [
      ...prevContacts.filter(contact => contact.id !== contactId),
    ]);
  };
  const allVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handlerFormSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactsList contacts={allVisibleContacts()} onDelete={deleteContact} />
    </Container>
  );
}

export default App;
