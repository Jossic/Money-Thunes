import './App.css';
//react router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import AccountScreen from './screens/AccountScreen';
import HomeScreen from './screens/HomeScreen';
import StateScreen from './screens/StateScreen';
import CategoryScreen from './screens/CategoryScreen';
import DeadlinesScreen from './screens/DeadlinesScreen';
import Footer from './components/Layout/Footer';
import Container from './components/Layout/Container';
import Error404 from './screens/404';
import Infos from './screens/Infos';
import Budget from './screens/BudgetScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Container texte="texte">
          <Header />
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/account" element={<AccountScreen />}></Route>
            <Route path="/state" element={<StateScreen />}></Route>
            <Route path="/category" element={<CategoryScreen />}></Route>
            <Route path="/dealines" element={<DeadlinesScreen />}></Route>
            <Route path="/infos" element={<Infos />}></Route>
            <Route path="/budget" element={<Budget />}></Route>
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
