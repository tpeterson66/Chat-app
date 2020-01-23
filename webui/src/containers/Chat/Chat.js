import React, { useState, useEffect } from 'react';
import Board from '../../components/Board/Board'
import Channels from '../../components/Channels/Channels'
import NewMessage from '../../components/NewMessage/NewMessage'
import axios from 'axios';


export default () => {
  const [apiData, setApiData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [channel, setChannel] = useState('general');
  const [apiError, setApiError] = useState(false);
  const [noMessages, setNoMessages] = useState(false);
  const [channels, setChannels ] = useState([]);

  useEffect(() => {
    console.log('Get messages from server - ' + channel)
    async function fetchData() {
      await axios.post(`${process.env.REACT_APP_CHAT_API}/messages`, {
        channel: channel
      }).then((result) => {
        if (result.data.length <= 0) setNoMessages(true)
        setApiData(result.data);
      }).catch((err) => {
        setApiError(true);
      })
    }
    fetchData();
  }, [channel]);

  useEffect(() => {
    // WIP
    // Make API call for Channels List
    // Use setChannels with list of channels for user...
    // for now, just return static channels
    setChannels([
      {channel: 'general', icon: "fa-home", id: 100},
      {channel: 'javascript', icon: "fa-envelope", id: 101}])
  },[]);

  const newMessageOnChangeHandler = (event) => {
    if (event.keyCode === 13) console.log('enter!')
    setNewMessage(event.target.value)
  }

  const sendMessageHandler = () => {
    console.log('Send Message to Server')
    async function fetchData() {
      await axios.post(`${process.env.REACT_APP_CHAT_API}/incoming`, {
        channel: channel,
        avatar: "https://www.w3schools.com/w3css/img_avatar2.png",
        username: "TopEter",
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
      <div style={{ marginLeft: "200px"}}>
        <Board channel={channel} messages={apiData} />
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