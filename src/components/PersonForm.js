import React from 'react'

const PersonForm = ({addPerson, handleNameChange, newName, handleNumberChange, newNumber}) => {
    return (
        <form onSubmit={addPerson}>
          <div>
            <label>
              Name:
              <input onChange={handleNameChange} value={newName} type="text" />
            </label>
            <div>
              <label>
                Number:
                <input
                  onChange={handleNumberChange}
                  value={newNumber}
                  type="text"
                />
              </label>
            </div>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
}

export default PersonForm
