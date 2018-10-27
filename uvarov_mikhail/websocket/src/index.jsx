import './chat.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      username: '',
      messageText: '',
    }
  }

  componentDidMount() {
    fetch('http://tromart.ln:3000/messages')
      .then((response) => response.json())
      .then((messages) => {
        this.setState({messages});
        this.socket = io('http://tromart.ln:3000');
        this.socket.on('message', (message) => {
          this.setState((prevState) => ({
            ...prevState,
            messages: prevState.messages.concat([message]),
          }))
        });
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSend = (event) => {
    const { username, messageText } = this.state;
    this.socket.emit('message', {username, messageText});
    this.setState({ messageText: '' });
    event.preventDefault();
  }

  render() {
    const { messages, messageText, username } = this.state;

    return (
      <div className="chat">
        <ul>
          {messages.map((message) => <li>{message.username} ({moment(message.timestamp).format('MMM Do YY')}): {message.messageText}</li>)}
        </ul>
        <form>
          <input onChange={this.handleChange} value={username} type="text" placeholder="username" name="username" /><br/>
          <textarea onChange={this.handleChange} value={messageText} name="messageText" placeholder="Message text" /><br/>
          <button onClick={this.handleSend}>Send</button>
        </form>
      </div>
    )
  } 
}

ReactDOM.render(<App />, document.getElementById('root'));