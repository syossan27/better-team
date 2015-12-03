import React    from 'react';
import ReactDOM from 'react-dom';
import SocketIO from 'socket.io-client';
import Mui      from 'material-ui';
import InjectTapEventPlugin from 'react-tap-event-plugin';
import {Grid, Row, Col} from 'react-bootstrap';

const socket = SocketIO.connect(`http://localhost:3000`);

// Reactでタップイベントを発生させるために必要
InjectTapEventPlugin();

// Material-UIから部品のデザインを読み込み
const Paper       = Mui.Paper;
const TextField   = Mui.TextField;
const Card        = Mui.Card;
const CardHeader  = Mui.CardHeader;
const CardActions = Mui.CardActions;
const FlatButton  = Mui.FlatButton;
const Avatar      = Mui.Avatar;

// KPT親コンポーネント
let KPTComponent = React.createClass({
  render: () => {
    return (
      <Grid>
        <Row>
          <Col md={4}><KeepPaper /></Col>
          <Col md={4}><ProblemPaper /></Col>
          <Col md={4}><TryPaper /></Col>
        </Row>
      </Grid>
    )
  }
});

// ===========Common===========

// 表示KPT内容
let Content = React.createClass({
  propTypes: {
    body: React.PropTypes.string.isRequired
  },
  render() {
    return  <Card>
              <CardHeader
                title={this.props.body}
                subtitle="Name"
                avatar={<Avatar>A</Avatar>} />
              <CardActions>
                <FlatButton label="OPEN" />
                <FlatButton label="DELETE" />
              </CardActions>
            </Card>
  }
});

// ===========Keep=============

// Keepの枠組み
let KeepPaper = React.createClass({
  render() {
    return <Paper
             zdepth={2}
             className="paper">
             <KeepSendForm />
             <KeepsArea />
           </Paper>
  }
});

// Keep内容入力フォーム
let KeepSendForm = React.createClass({
  getInitialState() {
    return {
      input_keep: ''
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    socket.emit('send keep', this.state.input_keep);
    this.setState({
      input_keep: ''
    });
    return false;
  },
  handleInputKeep(e) {
    this.setState({
      input_keep: e.target.value.trim()
    });
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          hintText="例.花に水をやる"
          floatingLabelText="Keepの入力"
          value={this.state.input_keep}
          onChange={this.handleInputKeep} />
      </form>
    )
  }
});

// Keep表示エリア
let KeepsArea = React.createClass({
  getInitialState() {
    return {
      keeps: []
    };
  },
  componentDidMount() {
    socket.on('send keep', receive_keep => {
      if (receive_keep != '') {
        let keep_contents = {
          "body": receive_keep
        }
        this.setState({ keeps: this.state.keeps.concat([keep_contents]) });
      }
    });
  },
  render() {
    return  (
      <div id="keeps">
      {
        this.state.keeps.map((keep_contents, index) => {
          return <Content key={index} body={keep_contents.body} />
        })
      }
      </div>
    )
  }
});

// ===========Problem=============

// Problemの枠組み
let ProblemPaper = React.createClass({
  render() {
    return  <div id="p-container">
              <Paper
                zdepth={2}
                className="paper">
                <ProblemSendForm />
                <ProblemsArea />
              </Paper>
            </div>
  }
});

// Problem内容入力フォーム
let ProblemSendForm = React.createClass({
  getInitialState() {
    return {
      input_problem: ''
    };
  },
  handleInputProblem(e) {
    this.setState({
      input_problem: e.target.value.trim()
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    socket.emit('send problem', this.state.input_problem);
    this.setState({
      input_problem: ''
    });
    return false;
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          hintText="例.花が枯れる"
          floatingLabelText="Problemの入力"
          value={this.state.input_problem}
          onChange={this.handleInputProblem} />
      </form>
    )
  }
});

// Problem表示エリア
let ProblemsArea = React.createClass({
  getInitialState() {
    return {
      problems: []
    };
  },
  componentDidMount() {
    // socket内でthisを使うために一旦thatに置き換える
    let that = this;
    socket.on('send problem', (receive_problem) => {
      if (receive_problem!= '') {
        let problem_contents = {
          "body": receive_problem
        }
        that.setState({ problems: that.state.problems.concat([problem_contents]) });
      }
    });
  },
  render() {
    return  (
      <div id="problems">
      {
        this.state.problems.map((problem_contents, index) => {
          return <Content key={index} body={problem_contents.body} />
        })
      }
      </div>
    )
  }
});

// ===========Try=============

// Tryの枠組み
let TryPaper = React.createClass({
  render() {
    return  <div id="t-container">
              <Paper
                zdepth={2}
                className="paper">
                <TrySendForm />
                <TrysArea />
              </Paper>
            </div>
  }
});

// Try内容入力フォーム
let TrySendForm = React.createClass({
  getInitialState() {
    return {
      input_try: ''
    };
  },
  handleInputTry(e) {
    this.setState({
      input_try: e.target.value.trim()
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    socket.emit('send try', this.state.input_try.trim());
    this.setState({
      input_try: ''
    });
    return false;
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          hintText="例.花に水をやる"
          floatingLabelText="Tryの入力"
          value={this.state.input_try}
          onChange={this.handleInputTry} />
      </form>
    )
  }
});

// Try表示エリア
let TrysArea = React.createClass({
  getInitialState() {
    return {
      trys: []
    };
  },
  componentDidMount() {
    // socket内でthisを使うために一旦thatに置き換える
    let that = this;
    socket.on('send try', (receive_try) => {
      if (receive_try!= '') {
        let try_contents = {
          "body": receive_try
        }
        that.setState({ trys: that.state.trys.concat([try_contents]) });
      }
    });
  },
  render() {
    return  (
      <div id="trys">
      {
        this.state.trys.map((try_contents, index) => {
          return <Content key={index} body={try_contents.body} />
        })
      }
      </div>
    )
  }
});

ReactDOM.render(
  <KPTComponent />,
  document.getElementById('container')
);
