import React from "react";

const Persons = ({ persons, removePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => removePerson(person.id, person.name)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
