import axios from 'axios';
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import './conversation.css';

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios('/users?userId=' + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  console.log(user, 'user4444');

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + 'person/noAvatar.png'
        }
        alt=""
      />
      <span className="conversationName">
        {user && user
          ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
          : ''}
      </span>
      <span className="conversationTime">{format(user?.createdAt)}</span>
    </div>
  );
}
