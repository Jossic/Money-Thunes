import './App.css';
//react router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserAuth from './components/HOC/UserAuth';
import DesktopHeader from './components/Layout/Header/DesktopHeader';
import AccountScreen from './screens/AccountScreen';
import HomeScreen from './screens/HomeScreen';
import StateScreen from './screens/StateScreen';
import CategoryScreen from './screens/CategoryScreen';
import DeadlinesScreen from './screens/DeadlinesScreen';
import Footer from './components/Layout/Footer';
import Container from './components/Layout/Container';
import Error404 from './screens/404';
import Infos from './screens/Infos';
import SigninScreen from './screens/SigninScreen';
import EntryScreen from './screens/EntryScreen';
import FallbackScreen from './screens/FallbackScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Container texte="texte">
          {/* <MobileHeader /> */}
          <DesktopHeader />
          <Routes>
            <Route
              path="/"
              element={
                <UserAuth>
                  <HomeScreen />
                </UserAuth>
              }></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/Fallback" element={<FallbackScreen />} />
            <Route path="/categories" element={<HomeScreen />}></Route>
            <Route path="/shortcuts" element={<HomeScreen />}></Route>
            <Route
              path="/account"
              element={
                <UserAuth>
                  <AccountScreen />
                </UserAuth>
              }
            />
            <Route
              path="/account/list"
              element={
                <UserAuth>
                  <AccountScreen />
                </UserAuth>
              }
            />
            <Route
              path="/account/add"
              element={
                <UserAuth>
                  <AccountScreen />
                </UserAuth>
              }
            />
            <Route
              path="/account/solds"
              element={
                <UserAuth>
                  <AccountScreen />
                </UserAuth>
              }
            />
            <Route
              path="/account/:id"
              element={
                <UserAuth>
                  <EntryScreen />
                </UserAuth>
              }
            />
            <Route
              path="/transactions/account/:id"
              element={
                <UserAuth>
                  <EntryScreen />
                </UserAuth>
              }
            />
            <Route
              path="/state"
              element={
                <UserAuth>
                  <StateScreen />
                </UserAuth>
              }
            />
            <Route
              path="/category"
              element={
                <UserAuth>
                  <CategoryScreen />
                </UserAuth>
              }
            />
            <Route
              path="/dealines"
              element={
                <UserAuth>
                  <DeadlinesScreen />
                </UserAuth>
              }
            />
            <Route
              path="/infos"
              element={
                <UserAuth>
                  <Infos />
                </UserAuth>
              }
            />
            {/* <Route path="/budget" element={<Budget />}></Route> */}
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
