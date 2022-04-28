import './App.css';
//react router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import AccountScreen from './screens/AccountScreen';
import HomeScreen from './screens/HomeScreen';
import StateScreen from './screens/StateScreen';
import CategoryScreen from './screens/CategoryScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/account" element={<AccountScreen />}></Route>
          <Route path="/state" element={<StateScreen />}></Route>
          <Route path="/category" element={<CategoryScreen />}></Route>
          {/* <Route
      path="*" element={error}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
