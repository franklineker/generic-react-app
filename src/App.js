import './App.css';
import Header from './components/templates/Header';
import Menu from './components/templates/Menu';
import Footer from './components/templates/Footer';
import Main from './components/templates/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthProvider';

function App() {
    return (
        <div className='App'>
            <AuthProvider>
                <Menu />
                <div className='d-flex flex-column block2'>
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </AuthProvider>
        </div>
    )
}

export default App;
