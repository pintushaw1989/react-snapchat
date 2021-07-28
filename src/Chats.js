import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './Chats.css'
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { auth, db } from './firebase';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        db.collection("posts").orderBy("timestamp").onSnapshot((snapshot) => 
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
    }, [])

    const takeSnap = () => {
        dispatch(resetCameraImage());
        history.push("/")
    }

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar 
                    src={user.profilePic} 
                    className="chats__avatar"
                    onClick={() => auth.signOut()} />
                <div className="chats__search">
                    <SearchIcon className="chats_searchIcon"/>
                    <input placeholder="Friends" type="text" />
                </div>
                <ChatBubbleIcon className="chats__chatIcon"/>
            </div>
            <div className="chats__posts">
                {posts.map(
                    ({id, data: {profilePic, username, timestamp, read, imageUrl}}) => (
                        <Chat 
                            key={id}
                            id={id}
                            profilePic={profilePic}
                            username={username}
                            timestamp={timestamp}
                            read={read}
                            imageUrl={imageUrl}
                        />
                    ))}
            </div>

            <RadioButtonUncheckedIcon
                className="chats__takePicIcon"
                onClick={takeSnap}
                fontSize="large"
            />
        </div>
    )
}

export default Chats
