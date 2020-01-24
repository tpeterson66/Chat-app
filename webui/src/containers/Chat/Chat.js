import React, { useState, useEffect } from 'react';
import Board from '../../components/Board/Board'
import Channels from '../../components/Channels/Channels'
import NewMessage from '../../components/NewMessage/NewMessage'
import axios from 'axios';
import AuthGetUserDetails from '../../authentication-service/getUserDetails'

const Chat = (props) => {
  const [apiData, setApiData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [channel, setChannel] = useState('general');
  const [apiError, setApiError] = useState(false);
  const [noMessages, setNoMessages] = useState(false);
  const [channels, setChannels] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      await axios.post(`${process.env.REACT_APP_CHAT_API}/messages`, {
        channel: channel
      }).then((result) => {
        if (result.data.length <= 0) setNoMessages(true)
        setApiData(result.data);
        console.log(result.data)
      }).catch((err) => {
        setApiError(true);
      })
    }
    fetchData();
  }, [channel]);

  useEffect(() => {
    // get user info from Local Storage
    let jwtData = AuthGetUserDetails()
    if (jwtData === null) {
      console.log('No user details, need to login!')
      props.history.push('/login')
    } else {
      setUserDetails(AuthGetUserDetails())
    }
  }, [])

  useEffect(() => {
    // WIP
    // Make API call for Channels List
    // Use setChannels with list of channels for user...
    // for now, just return static channels
    setChannels([
      { channel: 'general', icon: "fa-home", id: 100 },
      { channel: 'javascript', icon: "fa-envelope", id: 101 }])
  }, []);

  const newMessageOnChangeHandler = (event) => {
    if (event.keyCode === 13) sendMessageHandler()
    setNewMessage(event.target.value)
  }

  const sendMessageHandler = () => {
    console.log(userDetails)
    async function fetchData() {
      await axios.post(`${process.env.REACT_APP_CHAT_API}/incoming`, {
        _id: userDetails._id,
        channel: channel,
        avatar: userDetails.avatar,
        username: userDetails.username,
        message: newMessage
      }).then((result) => {
        let messagesCopy = [...apiData];
        messagesCopy.push(result.data[0]);
        setApiData(messagesCopy);
        setNewMessage('');
        setNoMessages(false);
      }).catch((err) => {
        setApiError(true)
      })
    }
    fetchData();
  };

  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter' && newMessage) {
      sendMessageHandler();
    }
  }

  const changeChannelHandler = (channel) => {
    setChannel(channel)
  };


  let apiErrorMessage = (<div className="w3-panel w3-center w3-pale-red w3-round-xlarge">
    <p> Error loading data from the server, check internet connection and try again! </p>
  </div>)
  if (!apiError) {
    apiErrorMessage = null
  }

  let noMessagesWarning = (
    <div className="w3-panel w3-center w3-pale-yellow w3-round-xlarge">
      <p> There's no messages in this channel, start the conversation by sending the first message </p>
    </div>)
  if (!noMessages) noMessagesWarning = null

  return (

    <div className="w3-row">
      <div> <Channels channels={channels} currentChannel={channel} changeChannel={changeChannelHandler} /> </div>
      <div style={{ marginLeft: "200px" }}>
        <Board
          channel={channel}
          messages={apiData} />
        {apiErrorMessage}
        {noMessagesWarning}
        <NewMessage
          current={newMessage}
          changed={newMessageOnChangeHandler}
          sendMessage={() => sendMessageHandler()}
          disabled={newMessage ? true : false}
          keyPress={(e) => onKeyPressHandler(e)} />
      </div>
    </div>
  )
};

export default Chat;