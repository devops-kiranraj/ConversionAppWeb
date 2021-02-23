import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Home} from './Home';
import {CurrencyConversion} from './CurrencyConversion';
import CurrencyRateHistory from "./CurrencyRateHistory";
import {CurrencyTracker} from "./CurrencyTracker";
import { Navigation } from './Navigation';

import {BrowserRouter,Route,Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">Currency Conversion WebApp</h3>
        <Navigation/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/currencyConversion" component={CurrencyConversion}/>
          <Route path="/CurrencyTracker" component={CurrencyTracker}/> 
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
