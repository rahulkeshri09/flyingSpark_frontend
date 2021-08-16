import Home from './Home';
import Dashboard from './Dashboard'
import {useState} from'react';
function App(props) {
  const [isLoggedin,setIsLoggedin]=useState(props.store.getState.user);
  return (
    <div className="App font-sans-serif">
      {
        isLoggedin?
          <Dashboard store={props.store} setIsLoggedin={setIsLoggedin}/>
        :
          <Home store={props.store} setIsLoggedin={setIsLoggedin}/>
      }
    </div>
  );
}

export default App;
