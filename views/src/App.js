import logo from './logo.svg';
import './App.scss';
import Authorization from './pages/Authorization/Authorization'
import Navbar from './components/navbar/Navbar'
import Counter from './pages/Counter/Counter'
import Access from './pages/Access/Access'
import Customization from './pages/Customization/Customization'
import MnemonicDiagram from './pages/MnemonicDiagram/MnemonicDiagram'
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


const routing = [
  {path: '/', component: Authorization },
  {path: '/counter', component: Counter},
  {path: '/access', component: Access},
  {path: '/customization', component: Customization},
  {path: '/mnemonicDiagram', component: MnemonicDiagram}
]

function App() {
  return (
    <div className="App">
      <Router>
        {routing.map((content, index) => {
          return <Route key={index} exact path={content.path} component={content.component} />
        })}
        <Redirect from='*' to='/' />
      </Router>
      
    </div>
  );
}

export default App;
