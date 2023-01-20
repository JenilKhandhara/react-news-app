import './App.css';
import Home from './components/Home';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import BookmarkedNews from './components/BookmarkedNews';
import store from './redux/store';

function App() {
  return(
    <Provider store={store}>
      <>
        <Router>
          <div className='App'>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/bookmarked" component={BookmarkedNews}/>
            </Switch>
          </div>
        </Router>
      </>
    </Provider> 
  )
}

export default App;
