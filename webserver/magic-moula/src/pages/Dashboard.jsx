import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";

function Dashboard() {
    const navigate = useNavigate();


    return (
    <>
    <Header />
    <Footer />
    </>
    )

}

export default Dashboard;