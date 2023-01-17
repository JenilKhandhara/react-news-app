import { useState } from 'react';
import './App.css';
import NewsList from './components/NewsList';

function App() {
  const [search, setSearch] = useState("")
  return (
    <div className="App">
      <label> Search Headlines:
        <input type="text" value={search} onChange={(event) =>  setSearch(event.target.value)}></input>
      </label>
      <NewsList searchNews={search}/>
    </div>
  );
}

export default App;
