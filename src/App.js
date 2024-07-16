import './App.css';
import Header from './components/templates/Header';
import Menu from './components/templates/Menu';
import Footer from './components/templates/Footer';
import Main from './components/templates/Main';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className='App'>
            <Menu />
            <div className='d-flex flex-column w-100'>
                <Header />
                <Main />
                <Footer />
            </div>
        </div>
    );
}

export default App;
