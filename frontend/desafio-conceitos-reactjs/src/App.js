import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  //LISTANDO REPO

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositories(response.data)
    })
  },[repositories])

  async function handleAddRepository() {
    
    //ADD REPO

    const response = await api.post('repositories',{
      title: `Novo Repo ${Date.now()}`
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    
    //REMOVE REPO

    await api.delete(`repositories/${id}`)

    setRepositories([])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}
          <button 
          onClick={() => handleRemoveRepository(repository.id)}>
          Remover
          </button>
          </li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
