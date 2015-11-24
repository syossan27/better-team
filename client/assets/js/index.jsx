var React    = require('react');
var ReactDOM = require('react-dom');
var SocketIO = require("socket.io-client");

var socket = SocketIO.connect(`http://localhost:3000`);

// メッセージ親コンポーネント
var MessageComponent = React.createClass({
  render: function() {
    return (
      <div>
        <MessageSendForm />
        <MessageArea />
      </div>
    )
  }
});

// メッセージ入力フォーム
var MessageSendForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    socket.emit('message', this.refs.message.value.trim());
    this.refs.message.value = '';
    return false;
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input autoComplete="off" ref="message"/>
        <MessageSendFormButton />
      </form>
    )
  }
});

// メッセージ送信ボタン
var MessageSendFormButton = React.createClass({
  render: function() {
    return <button>Send</button>;
  }
});

// メッセージ表示エリア
var MessageArea = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    };
  },
  componentDidMount: function() {
    // socket内の
    var that = this;
    socket.on('message', function(msg) {
      var message = {
        "body": msg
      }
      that.setState({ messages: that.state.messages.concat([message]) });
    });
  },
  render: function() {
    return  (
      <ul id="messages">
      {
        this.state.messages.map(function(message, index) {
          return <Message key={index} body={message.body} />
        })
      }
      </ul>
    )
  }
});

// 表示メッセージ
var Message = React.createClass({
  propTypes: {
    body: React.PropTypes.string.isRequired
  },
  render: function() {
    return <li>{this.props.body}</li>
  }
});

ReactDOM.render(
  <MessageComponent />,
  document.getElementById('container')
);
