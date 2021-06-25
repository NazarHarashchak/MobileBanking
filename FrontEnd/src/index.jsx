import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import configureStore from "./store/configureStore";

import Banner from './Common/Banner';
import logo from "./SiteFiles/banner.webp";

import HomePage from './HomePage/HomePage';
import Header from './Header & Footer/Header';
import Footer from './Header & Footer/Footer';
import Login from './LoginPage/Login';
import Registration from './LoginPage/Registration';
import Contact from './Contact/Contact';
import MyPage from './MyPage/MyPage';
import AddUser from './Admin/AddUser/AddUser';
import Users from "./Admin/Users/Users";
import Accounts from "./Worker/Accounts/Accounts";
import Clients from "./Worker/Clients/Clients";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const history = createBrowserHistory({ basename: baseUrl });

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

class MainComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserLogined: false,
      roleID: 0
    }
  }

  componentDidMount() {
    let user = localStorage.getItem("BankingUser");
    if (!user) {
      user = sessionStorage.getItem("BankingUser");
    }
    if (user) {
      let u = JSON.parse(user);
      this.setState({ isUserLogined: true, roleID: u.roleID });
    }
    else {
      this.setState({ isUserLogined: false, roleID: 0 });
    }
  }

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <Header />
          <main>
            <Banner image={logo} title={"Найкращий банк для тебе"} description={"Обирай для себе та приводь друзів"} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/contact" component={Contact} />

              {
                this.state.isUserLogined ?
                  <Route path="/registration" exact component={NoAccess} />
                  :
                  <Route path="/registration" exact component={Registration} />
              }
              {
                this.state.isUserLogined ?
                  <Route path="/login" exact component={NoAccess} />
                  :
                  <Route path="/login" exact component={Login} />
              }

              {
                this.state.isUserLogined && this.state.roleID === 3 ?
                  <Route path="/mypage" exact component={MyPage} />
                  :
                  null
              }

              {
                this.state.isUserLogined && this.state.roleID === 1 ?
                  <Route path="/adduser" exact component={AddUser} />
                  :
                  <Route path="/adduser" exact component={NoAccess} />
              }
              {
                this.state.isUserLogined && this.state.roleID === 1 ?
                  <Route path="/users" exact component={Users} />
                  :
                  <Route path="/users" exact component={NoAccess} />
              }
              {
                this.state.isUserLogined && this.state.roleID === 2 ?
                  <Route path="/allaccounts" exact component={Accounts} />
                  :
                  <Route path="/allaccounts" exact component={NoAccess} />
              }
              {
                this.state.isUserLogined && this.state.roleID === 2 ?
                  <Route path="/allclients" exact component={Clients} />
                  :
                  <Route path="/allclients" exact component={NoAccess} />
              }
              <Route component={NoMatch} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}
function NoMatch({ location }) {
  return (
    <div>
      <h1>HTTP 404 page not found</h1>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
function NoAccess({ location }) {
  return (
    <div>
      <h1>You do not have permissions to this page</h1>
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <MainComponent />
  </Provider>,

  document.getElementById("root")
);