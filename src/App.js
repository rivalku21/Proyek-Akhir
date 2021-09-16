import './App.css';
import { Route, BrowserRouter, Switch, Redirect} from "react-router-dom"; 
import { Footer } from './component';
import routes from './config/routes';
import { isUserAuthenticated } from './utils/cookie';

const PrivateRoute = ({component:Component, ...rest}) => {
  return (
    <Route {...rest}
      render = {() => {
        if (isUserAuthenticated()) {
          return <Component />
        }
        else {
          return <Redirect to="/login" />
        }
      }}
    />
  )
}

const App = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        {routes.map((route) => {
          if(route.isPublic) {
            return (
              <Route
                path={route.path} 
                exact component={route.component} 
                key={route.path}
              />
            )
          } else {
            return (
              <PrivateRoute
                path={route.path}
                exact component={route.component}
                key={route.path}
              />
            )
          }
        })}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
