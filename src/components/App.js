import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";

import personService from "../services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [newSearch, setNewSearch] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const namesToShow = showAll
    ? persons
    : persons.filter(
        (person) =>
          person.name.toLowerCase().search(newSearch.toLowerCase()) !== -1
      );

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleNameSearch = (e) => {
    setNewSearch(e.target.value);
    if (e.target.value) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  const removePerson = (id, person) => {
    const wannaDelete = window.confirm(`Delete ${person} ?`);
    if (wannaDelete) {
      personService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((err) => {
          setMessage(`${person} has already been deleted from server`);
          setTimeout(() => setMessage(null), 2000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    } else {
      return;
    }
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      const result = window.confirm(
        `${newName} has already been added to the phonebook, replace old number with new number?`
      );
      if (result) {
        const matchedPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const personToUpdate = { ...matchedPerson, number: newPerson.number };
        personService
          .updatePerson(matchedPerson.id, personToUpdate)
          .then(() =>
            setPersons(
              persons.map((person) =>
                person.id !== matchedPerson.id ? person : personToUpdate
              )
            )
          )
          .catch((err) => {
            setMessage(
              `${matchedPerson.name} has already been removed from server`
            );
            setTimeout(() => setMessage(null), 2000);
            setPersons(
              persons.filter((person) => person.id !== matchedPerson.id)
            );
          });
        setNewName("");
        setNewNumber("");
      } else if (!result) {
        setNewName("");
        setNewNumber("");
      }
    } else {
      personService.createPerson(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        console.log(newPerson.name);
        setMessage(`${returnedPerson.name} was added!`);
        setTimeout(() => setMessage(null), 2000);
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <div>
        <Filter handleChange={handleNameSearch} newSearch={newSearch} />
      </div>
      <div>
        <h1>Add a new</h1>
        <PersonForm
          addPerson={addPerson}
          handleNameChange={handleNameChange}
          newName={newName}
          handleNumberChange={handleNumberChange}
          newNumber={newNumber}
        />
      </div>
      <h2>Numbers</h2>
      <Persons persons={namesToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
