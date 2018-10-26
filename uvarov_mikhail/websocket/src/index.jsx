import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io';

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
    this.socket = io('http://192.168.0.10:3000');
    this.socket.on('message', (message) => {
      this.setState((prevState) => ({
    	...prevState,
        messages: prevState.messages.concat([message]),
      }))
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
    this.setState({ username: '', messageText: ''});
    event.preventDefault();
  }
  
  render() {
	  
    const { messages, messageText, username } = this.state;
    return (
      <div className="chat">
        <ul>
          {messages.map((message) => <li>{message.username}:) {message.message}</li>)}
        </ul>
        <form>
          <input onChange={this.handleChange} type="text" placeholder="username" name="username" /><br/>
          <textarea onChange={this.handleChange} name="messageText" placeholder="Message text" /><br/>
          <button onClick={this.handleSend}>Send</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));