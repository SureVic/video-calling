import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();

    const handleFormSubit = (ev) => {
        ev.preventDefault();
        navigate(`/room/${roomCode}`)
    }

    return (
        <div className="home-page">
            <form onSubmit={handleFormSubit} className="form" >
                <div style={{ marginTop: "240px" }}>
                    <label style={{ fontFamily: "sans-serif", fontWeight: "800", fontSize: "30px", color: "#0071FF" }} >Enter Room Code</label> <br />
                    <input
                    value={roomCode} 
                    onChange={e => setRoomCode(e.target.value)}
                    style={{ marginTop: "20px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "20px", paddingRight: "70px", alignItems: "center", borderRadius: "7px", border: "1px solid gray", outline: "none" }} type="text" placeholder="Enter Room Code" /> <br />
                    <button style={{ marginTop: "20px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "20px", paddingRight: "20px", borderRadius: "5px", border: "none", backgroundColor: "#0071FF", color: "White", cursor: "pointer" }} type="submit">Enter Room</button>
                </div>
            </form>
        </div>
    )
}

export default HomePage;