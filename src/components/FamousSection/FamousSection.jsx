import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './FamousSection.css';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function

  const fetchPeople = () => {
    axios({
      method: 'GET',
      url: '/people'
    })
    .then((response) => {
      setPeopleArray(response.data)
    }) 
    .catch((error) => {
      console.log("Error in GET:", error)
    })
  }

  useEffect(fetchPeople, [])

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    
    // TODO: create POST request to add this new person to the database
    axios({
      method: 'POST',
      url: '/people',
      data: {
        name: famousPersonName,
        role: famousPersonRole
      }
    })
    .then((response) => {
      fetchPeople()
      setPersonName('')
      setPersonRole('')
    }) 
    .catch((error) => {
      console.log("Error in POST:", error)
    })
    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property
  
  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <ul>
          {famousPeopleArray.map((person)=> {
            return <li key={person.id}>{person.name} is famous for "{person.role}"</li>
          })}
        </ul>
      </section>
    );
}

export default FamousSection;
