import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Boats from './pages/Boats';
import BoatDetails from './pages/BoatDetails';
import Account from './pages/Account';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/*"
                            element={
                                <PrivateRoute>
                                    <>
                                        <Navbar />
                                        <div className="main-content">
                                            <Routes>
                                                <Route path="/" element={<Home />} />
                                                <Route path="/home" element={<Home />} />
                                                <Route path="/about" element={<About />} />
                                                <Route path="/boats" element={<Boats />} />
                                                <Route path="/boats/:id" element={<BoatDetails />} />
                                                <Route path="/account" element={<Account />} />
                                            </Routes>
                                        </div>
                                        <Footer />
                                    </>
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
