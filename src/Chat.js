import React, { useState, useEffect } from 'react';
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import Encrypt from './example';


function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [ciphers, setCiphers] =  useState([]);
    const [decrypt, setDecrypt] = useState(false);
    const [aes, setAES] = useState(true);
    // const [text, setText] = useState('');

    

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(
                snapshot => (setRoomName(snapshot.data().name))
            )
            db.collection('rooms').doc(roomId).collection("messages")
                .orderBy("timestamp", "asc").onSnapshot((snapshot) => {
                    setCiphers(snapshot.docs.map((doc) => ({
                        message: <Encrypt message={doc.data().message} ID={user.uid} algo={aes} />,
                        name : doc.data().name,
                        timestamp : doc.data().timestamp
                        })))
                })
            db.collection('rooms').doc(roomId).collection("messages")
                .orderBy("timestamp", "asc").onSnapshot((snapshot) => {
                    setMessages(snapshot.docs.map((doc) => ({
                        message: doc.data().message,
                        name : doc.data().name,
                        timestamp : doc.data().timestamp
                        })))
                })
            
        }

    }, [roomId, aes]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = async(e) => {
        e.preventDefault();
        console.log(input);
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput('');
    };

   const caesar = ()=>{
       if (decrypt) {
           setDecrypt(false);
       }
       else {
           setDecrypt(true);
       }
       setAES(false);
   }

   const AES = ()=>{
       if (decrypt) {
           setDecrypt(false);
       }
       else {
           setDecrypt(true);
       }
       setAES(true)
   }
    
    return ( <>
        <div className = 'chat' >

            <div className = 'chatHeader' >
            <Avatar src = { `https://avatars.dicebear.com/api/human/${seed}.svg` }
            />

            <div className = "chatHeaderInfo" >
            <h3> { roomName } </h3>
            <p> Last seen at {
                new Date(messages[messages.length - 1] ?.timestamp ?.toDate()).toUTCString()
            } </p>
            </div>

            <div className = "chatHeaderRight" >
                <IconButton >
                <SearchOutlined />
                </IconButton> 
                <IconButton onClick = {()=>AES()}>
                 <OfflineBoltIcon/>
                </IconButton> 
                <IconButton onClick = {()=>caesar()} >
                 <EnhancedEncryptionIcon />
                </IconButton> 
            </div>
        </div>

{/* https://97i6zt.deta.dev/caesarencrypt/{message}/{shift}/ */}
{/* `https://97i6zt.deta.dev/caesarencrypt/${message.message}/10` */}


        <div className = 'chatBody' >
            {decrypt ? 
            messages.map(message => ( 
            <p className = { `chatMessage ${
                        message.name === user.displayName && "chatReceiver"}` } >
                <span className = "chatName" > { message.name } 
                </span> {message.message}

                <span className = "chatTimestamp" > {
                    new Date(message.timestamp ?.toDate()).toUTCString()
                } </span> </p>
            )) :
            
            ciphers.map(cipher => ( 
            <p className = { `chatMessage ${
                        cipher.name === user.displayName && "chatReceiver"}` } >
                <span className = "chatName" > { cipher.name } 
                </span> {cipher.message}

                <span className = "chatTimestamp" > {
                    new Date(cipher.timestamp ?.toDate()).toUTCString()
                } </span> </p>
            ))
   

        }

        </div> <div className = 'chatFooter' >
        <InsertEmoticonIcon >
        </InsertEmoticonIcon> 
        <form >
        <input type = "text" value = {input} onChange = {(e) => setInput(e.target.value)}
        placeholder = 'Type your message here' />
        <button onClick = { sendMessage }
        type = "submit" > Send a Message </button> </form> 
        <MicIcon />
        </div> </div> 
        </>
    )
}

export default Chat;