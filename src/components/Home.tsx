import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NewsList from './NewsList';

function Home() {
    const [search, setSearch] = useState("")
    return (
      <div>
        <NavLink to="/bookmarked">Bookmarked News</NavLink><br/>
        <label htmlFor='search'> Search Headlines:
          <input id="search" type="text" value={search} onChange={(event) =>  setSearch(event.target.value)}></input>
        </label>
        <NewsList searchNews={search}/>
      </div>
    );
}

export default Home