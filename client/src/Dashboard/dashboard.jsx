import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Row, Col, Form, Input, Container, Button } from "reactstrap";
import "./dashboard.css";
import TextArea from "react-textarea-autosize";
import $ from "jquery";

var array = ["general", "random"];

const socket = io.connect("http://localhost:3000/chat");

function Dashboard(props) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  useEffect(() => {
    socket.on("message", msg => {
      setMessage(prevState => [...prevState, msg]);
    });
    return () => socket.off("message");
  }, [message]);
  const sendMessageToServer = () => {
    console.log("hello");
    setMessage(prevState => [...prevState, input]);
    socket.emit("input", input);
    setInput("");
  };
  const createLinks = () => {
    var navlinks = array.map((channel, index) => {
      return (
        <li className="channels" key={index}>
          {channel}
        </li>
      );
    });
    return navlinks;
  };
  const messageLayout = () => {
    var messages = message.map((msg, index) => {
      return (
        <div className="message" key={index}>
          {msg}
        </div>
      );
    });
    return messages;
  };
  return (
    <div id="main">
      <nav id="sidebar">
        <ul id="channelList">
          <h5 id="channelTitle">Channels</h5>
          {createLinks()}
        </ul>
      </nav>
      <div id="messageBox">
        <div id="chat">{messageLayout()}</div>
        <div id="footer">
          <div id="formbox">
            <Form>
              <TextArea
                name="message"
                id="textbox"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    e.preventDefault();
                    sendMessageToServer();
                  }
                }}
              />
            </Form>
            <button id="button" onClick={sendMessageToServer}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       input: "",
//       messages: []
//     };
//     socket.on("message", msg => {
//       this.setState(
//         {
//           messages: [...this.state.messages, msg]
//         },
//         () => {
//           console.log(this.state.messages);
//           console.log(this.state.input);
//         }
//       );
//     });
//   }
//   componentDidMount() {
//     const { teamId } = this.props.match.params.teamId;
//     console.log(teamId);
//   }
//   handleEnter(e) {
//     if (e.keyCode === 13) {
//       e.preventDefault();
//       this.setState(
//         {
//           messages: [...this.state.messages, this.state.input]
//         },
//         () => {
//           socket.emit("input", this.state.input);
//         }
//       );
//     }
//   }
//   handleChange(e) {
//     this.setState({
//       input: e.target.value
//     });
//   }
//   handleSubmit() {
//     socket.emit("input", this.state.input);
//   }
//   render() {
//     var navlinks = array.map((channel, index) => {
//       return (
//         <li className="channels" key={index}>
//           {channel}
//         </li>
//       );
//     });
//     var messages = this.state.messages.map((message, index) => {
//       return <div className="message">{message}</div>;
//     });
//     return (
//       <div id="main">
//         <nav id="sidebar">
//           <ul id="channelList">
//             <h5 id="channelTitle">Channels</h5>
//             {navlinks}
//           </ul>
//         </nav>
//         <div id="messageBox">
//           <div id="chat">{messages}</div>
//           <div id="footer">
//             <div id="formbox">
//               <Form>
//                 <TextArea
//                   name="message"
//                   id="textbox"
//                   onChange={this.handleChange.bind(this)}
//                   onKeyDown={this.handleEnter.bind(this)}
//                 />
//               </Form>
//               <button id = "button" onClick={this.handleSubmit.bind(this)}>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default Dashboard;
