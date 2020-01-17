import React, { useState, useEffect, refs } from 'react';
import Board from '../../components/Board/Board'
import Channels from '../../components/Channels/Channels'
import NewMessage from '../../components/NewMessage/NewMessage'
import axios from 'axios';

export default (props) => {

  const [apiData, setApiData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [channel, setChannel] = useState('general')

  useEffect(() => {
    console.log('Get messages from server - ' + channel)
    async function fetchData() {
      const result = await axios.post('http://10.172.192.72:3000/messages', {
        channel: channel
      });
      setApiData(result.data);
    }
    fetchData();
  }, [channel]);

  const newMessageOnChangeHandler = (event) => {
    if (event.keyCode === 13) console.log('enter!')
    setNewMessage(event.target.value)
  }

  const sendMessageHandler = () => {
    console.log('Send Message to Server')
    async function fetchData() {
      const result = await axios.post('http://10.172.192.72:3000/incoming', {
        channel: channel,
        avatar: "https://www.w3schools.com/w3css/img_avatar2.png",
        username: "TopEter",
        message: newMessage
      });

      let messagesCopy = [...apiData];
      messagesCopy.push(result.data[0]);
      setApiData(messagesCopy);
      setNewMessage('');
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

  return (
    <div className="w3-row">
      <div> <Channels currentChannel={channel} changeChannel={changeChannelHandler} /> </div>
      <div className="w3-container" style={{ marginLeft: "180px" }}>
        <Board channel={channel} messages={apiData} />
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