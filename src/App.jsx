import { useState, useEffect } from 'react'
import useSocket from 'use-socket.io-client'
import './App.css'
import { useImmer } from 'use-immer';

function App() {
  const [id, setId] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [room, setRoom] = useState('');
  const [socket] = useSocket('<https://open-chat-naostsaecf.now.sh>');
  const [data, setData] = useImmer(default_value)

  const [messages, setMessages] = useImmer([]);
  useEffect(() => {
    socket.on('update', message => setMessages(draft => {
      draft.push(['', message])
    }))

    socket.on('message que', (nick, message) => {
      setMessages(draft => {
        draft.push([nick, message])
      })
    })
  })

  socket.connect();
  console.log(socket);

  setData(draft => newState);

  const handleSubmit = e => {
    e.preventDefault();
    if (!nameInput) {
      return alert('Name Cant Be Empty');
    }
    setId(name);
    socket.emit('join', name, room);
  }

  const Messages = props => props.data.map(m => m[0] !== '' ? 
  (<li key={m[0]}><strong>{m[0]}</strong> : <div className="innermsg">{m[1]}</div></li>) 
  : (<li key={m[1]} className="update">{m[1]}</li>) );

  return id !== '' ? (
    <section style={{ display: "flex", flexDirection: "row" }}>
      <ul id="messages">
        <Messages data={messages} />
      </ul>
      <ul id="online">
        {" "}
        &#x1f310; : <Online data={online} />{" "}
      </ul>
      <div id="sendform">
        <form onSubmit={e => handleSend(e)} style={{ display: "flex" }}>
          <input id="m" onChange={e => setInput(e.target.value.trim())} />
          <button style={{ width: "75px" }} type="submit">
            Send
          </button>
        </form>
      </div>
    </section>
  ) : (
    <div style={{textAlign: 'center', margin: '30vh auto', width: '70%'}}>
      <form onSubmit={event => handleSubmit(event)}>
        <input id='name' onChange={e => setNameInput(e.target.value.trim())} required placeholder='What is your name ?' />
        <br />
        <input id='room' onChange={e => setRoom(e.target.value.trim())} placeholder='What is your room ?' />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App
