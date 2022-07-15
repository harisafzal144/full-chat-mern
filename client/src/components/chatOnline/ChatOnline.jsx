import axios from 'axios';
import { useEffect, useState } from 'react';
import './chatOnline.css';
//import { Users } from '../../dummyData';
//import { AuthContext } from '../../context/AuthContext';

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [offlineFriends, setOfflineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const { user } = useContext(AuthContext);
  console.log(currentId, 'current user');

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get('/users/friends/' + currentId);
      console.log(res.data, 'friends of  this id ', currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    friends?.length >= 0
      ? setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
      : setOnlineFriends([{ id: 1, username: 'No users ' }]);
    // setOnlineFriends(
    //   friends?.length >= 0
    //     ? friends.filter((f) => onlineUsers.includes(f._id))
    //     : Users
    // );
    setOfflineFriends(friends.filter((f) => !onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);
  console.log(onlineFriends, 'online');
  const handleClick = async (user) => {
    console.log(user, `chat with ${user.username}`);
    try {
      const con_id = await axios.post('/conversations', {
        senderId: currentId,
        receiverId: user._id,
      });

      console.log(con_id, 'Conversation Id');

      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      console.log(res.data, 'find conversations');
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + 'person/noAvatar.png'
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
      {offlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + 'person/noAvatar.png'
              }
              alt=""
            />
            <div className="chatOfflineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
