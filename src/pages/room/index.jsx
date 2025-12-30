import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();

    // State for the input field (only used if no roomId is present)
    const [inputRoomId, setInputRoomId] = useState('');

    // --- SCENARIO 1: VIDEO CALL (If roomId exists) ---
    const myMeeting = async (element) => {
        const appID = 521791573;
        const serverSecret = "2000fa5edde585e133908f54afacf447";
        
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            'Shazara' // Note: In a real app, you should let users enter their own name
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    // This creates a link compatible with your React Router
                    url: window.location.protocol + '//' + window.location.host + '/room/' + roomId,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        });
    };

    // --- SCENARIO 2: LOBBY FORM (If roomId is missing) ---
    const handleJoin = (e) => {
        e.preventDefault();
        if (inputRoomId.trim()) {
            // Navigate to the URL with the room ID (e.g., /room/123)
            navigate(`/room/${inputRoomId}`);
        }
    };

    // --- RENDER ---
    // If we don't have a roomId, show the input form
    if (!roomId) {
        return (
            <div className="room-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
                <h1>Enter Room Code</h1>
                <form onSubmit={handleJoin}>
                    <input 
                        type="text" 
                        placeholder="Enter Room ID" 
                        value={inputRoomId}
                        onChange={(e) => setInputRoomId(e.target.value)}
                        style={{ padding: '10px', fontSize: '16px' }}
                    />
                    <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', fontSize: '16px' }}>
                        Join
                    </button>
                </form>
            </div>
        );
    }

    // If we DO have a roomId, show the meeting
    return (
        <div className='room-page'>
           <div ref={myMeeting} style={{ width: '100vw', height: '100vh' }} />
        </div>
    );
}

export default RoomPage;