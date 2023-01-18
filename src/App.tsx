import { useState } from 'react';
import './App.css';
import NewsList from './components/NewsList';

function App() {
  const [search, setSearch] = useState("")
  return (
    <div className="App">
      <label htmlFor='search'> Search Headlines:
        <input id="search" type="text" value={search} onChange={(event) =>  setSearch(event.target.value)}></input>
      </label>
      <NewsList searchNews={search}/>
    </div>
  );
}

export default App;
