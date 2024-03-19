import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";

function Dashboard() {
    const navigate = useNavigate();


    return (
    <>
    <Header />

    <h1 className="balance">0.00$</h1>

    </>
    )

}

export default Dashboard;