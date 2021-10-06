import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ProductDetails from './pages/ProductDetails';
import ProductsResults from './pages/ProductsResults';
import ProductsSearch from './pages/ProductsSearch';

function App() {
return (
<Router>
        <ProductsSearch/>
        <Switch>
          <Route exact path="/"/>
          <Route exact path="/item/:id"  component={ProductDetails}/>
          <Route exact path="/items/search/:searchprod" component={ProductsResults}/>          
        </Switch>
    </Router>
  );
}

export default App;
