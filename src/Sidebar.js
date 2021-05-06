import React, {useState, useEffect} from 'react';
import './sidebar.css';
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined} from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from "./firebase";
import {useStateValue} from './StateProvider';

function Sidebar(){
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
       const subs= db.collection('rooms').onSnapshot((snapshot) =>
        setRooms(snapshot.docs.map((doc)=> ({
            id: doc.id,
            data: doc.data(),
        }))
        
        ));
        return ()=>{
            subs();
        }
    },[]);
    return (
        <div className='sidebar'>
            <div className='sidebarHeader'>
                <Avatar src={user?.photoURL}/>
                <div className="sidebarHeaderRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    
                </div>
            </div>
            <div className='sidebarSearch'>
                <div className='sidebarSearchContainer'>
                    <SearchOutlined/>
                    <input placeholder='Search or Start a Chat'
                    type='text'>
                    </input>
                </div>
            </div>
            <div className='sidebarChats'>
                <SidebarChat addNewChat/>
                {rooms.map((room)=>
                    <SidebarChat key={room.id} id={room.id}
                    name={room.data.name}/>
                )}
            </div>
        </div>
    )
}

export default Sidebar;