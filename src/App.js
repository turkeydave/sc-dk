import './App.css';
import { UsersComponent} from './UsersComponent.js'
import { UsersProvider } from './userContext.js';

function App() {
  return (
    <UsersProvider>
      <div className="App">
        <header className="App-header">
          <p>Dave K - SC Submission</p>
        </header>
        <UsersComponent />
      </div>
      
    </UsersProvider>
    
  );
}

export default App;
