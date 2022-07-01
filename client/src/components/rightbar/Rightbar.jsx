import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, CardGroup, Container, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
//import { Add, Remove } from '@material-ui/icons';

export default function Rightbar({ user }) {
  let history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(user, 'user as a prop');
  const [friends, setFriends] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );
  console.log(currentUser, 'current user');

  useEffect(() => {
    console.log('1 useeffect');
    //get all users
    const getusers = async () => {
      try {
        const all_users = await axios.get('/users/all');
        setAllUsers(all_users.data);
        console.log(allUsers.data, 'all users');
      } catch (err) {
        console.log(err);
      }
    };
    getusers();
  }, []);

  //
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get('/users/friends/' + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  console.log(friends, 'friendsList');
  console.log(followed, 'followed');

  const handleClick = async () => {
    console.log(user, 'user we want to follow');
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'UNFOLLOW', payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'FOLLOW', payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const HomeRightbar = ({ currentUser }) => {
    return (
      <>
        <>
          <Card>
            <Card.Img variant="top" src={PF + '/person/noCover.png'} />
            <Card.Body>
              <Card.Text
                style={{
                  textAlign: 'center',
                  color: 'red',
                  fontFamily: 'cursive',
                }}
              >
                <h1
                  style={{
                    fontFamily: 'cursive',
                  }}
                >
                  {' '}
                  {`Hi welcome in  ikonic chat ${
                    currentUser.username.charAt(0).toUpperCase() +
                    currentUser.username.slice(1)
                  }`}
                </h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </>
        {/* <div className="container">
          <div className="row"></div>
          <div className="col-4">Online Friends</div>
          <div className="col-4">Online Friends</div>
          <div className="col-4">Online Friends</div>
        </div> */}
        {/* <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div> */}
        {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
        <h4 className="rightbarTitle">All Ikonic Users</h4>
        {/* <ul className="rightbarFriendList"> */}
        <Container>
          <Row>
            {allUsers.map((u) => (
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={PF + '/person/6.jpeg'} />
                  <Card.Body>
                    <Card.Title>
                      {u.username.charAt(0).toUpperCase() + u.username.slice(1)}
                    </Card.Title>
                    <Card.Text>
                      {' '}
                      My email is <span style={{}}></span>
                      {u.email}
                    </Card.Text>
                    <Button
                      onClick={() => history.push(`/profile/${u.username}`)}
                      variant="primary"
                    >
                      view profile
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        ;{/* </ul> */}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? 'Unfollow' : 'Follow'}
            {/* {followed ? <Remove /> : <Add />} */}
          </button>
        )}

        <h4 className="rightbarTitle">User Followings</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={'/profile/' + friend.username}
              style={{ textDecoration: 'none' }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + 'person/noAvatar.png'
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? (
          <ProfileRightbar />
        ) : (
          <HomeRightbar currentUser={currentUser} />
        )}
      </div>
    </div>
  );
}
