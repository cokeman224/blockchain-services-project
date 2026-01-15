import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorerPage from './pages/ExplorerPage';

/**
 * Main application component with routing
 * Provides navigation between home and blockchain explorer pages
 */
function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route path="/explorer">
          <ExplorerPage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
