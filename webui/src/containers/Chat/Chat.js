import React, { useState, useEffect } from 'react';
import Board from '../../components/Board/Board'
import Channels from '../../components/Channels/Channels'
import NewMessage from '../../components/NewMessage/NewMessage'
import ChatGetMessages from '../../chat-service/getMessages'
import ChatPostMessage from '../../chat-service/postMessage'
import AuthGetUserDetails from '../../authentication-service/getUserDetails'
import Alert from '../../components/UI/Alert/Alert'

const Chat = (props) => {
  const [apiData, setApiData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [channel, setChannel] = useState('general');
  const [apiError, setApiError] = useState(false);
  const [channels, setChannels] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    // get user info from Local Storage
    let jwtData = AuthGetUserDetails()
    if (jwtData === null) {
      props.history.push('/login')
    } else {
      setUserDetails(jwtData)
    }
  }, [])

  // Get messages from DB
  useEffect(() => {
    ChatGetMessages(channel)
      .then((result) => {
        if (result === null) props.history.push('/login')
        setApiData(result);
        setApiError(false);
      }).catch((err) => {
        if (err === "no_token") props.history.push('/login');
        setApiError(true);
      })
  }, [channel]);

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
    ChatPostMessage({
      userID: userDetails._id,
      channel: channel,
      avatar: userDetails.avatar,
      username: userDetails.username,
      message: newMessage
    }).then((result) => {
      let messagesCopy = [...apiData];
      messagesCopy.push(result);
      setApiData(messagesCopy);
      setNewMessage('');
    }).catch((err) => {
      setApiError(true)
    })
  };

  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter' && newMessage) {
      sendMessageHandler();
    }
  }

  const changeChannelHandler = (channel) => {
    setChannel(channel)
  };

  return (
    <div className="w3-row">
      <div> <Channels channels={channels} currentChannel={channel} changeChannel={changeChannelHandler} /> </div>
      <div style={{ marginLeft: "200px" }}>
        <Board
          channel={channel}
          messages={apiData} />
        <Alert isActive={apiError} type="error">Error loading data from the server, check internet connection and try again!</Alert>
        <Alert isActive={apiData.length === 0} type="warning">There's no messages in this channel, start the conversation by sending the first message</Alert>
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