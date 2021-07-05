import './App.css';
import { Route, BrowserRouter, Switch} from "react-router-dom"; 
import { Header, Footer } from './component';
import routes from './config/routes';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {routes.map((route) => {
          return (
            <Route
              path={route.path} 
              exact component={route.component} 
              key={route.path}
            />
          )
        })}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
