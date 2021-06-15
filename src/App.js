import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import QuestionForm from './Components/QuestionForm';
import AnsweredQuestions from './Components/AnsweredQuestions';
import './Styles/QuestionForm.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      questionMessage: '',
      authorName: '',
      receivedQuestions: {},
    };
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGotResponse = this.handleGotResponse.bind(this);
    this.handleVotes = this.handleVotes.bind(this);
  }

  handleQuestionSubmit() {
    const { questionMessage, authorName, id } = this.state;

    this.setState((state) => ({
      id: state.id + 1,
    }), () => this.setState((state) => ({
      receivedQuestions: {
        ...state.receivedQuestions,
        [id]: {
          questionMessage,
          authorName,
          votes: 0,
          id,
          gotResponse: false,
        },
      },
    })));
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }));
  }

  handleVotes({ target }) {
    const { id } = target;
    const { receivedQuestions } = this.state;
    const questionObject = receivedQuestions[id];
    questionObject.votes += 1;
    receivedQuestions[id] = questionObject;

    this.setState(() => ({
      receivedQuestions,
    }));
  }

  handleGotResponse({ target }) {
    const { id } = target;
    const { receivedQuestions } = this.state;
    const questionObject = receivedQuestions[id];
    questionObject.gotResponse = !questionObject.gotResponse;

    this.setState(() => ({
      receivedQuestions,
    }));
  }

  render() {
    const { receivedQuestions } = this.state;
    return (
      <div className="App">
        <h1>Sli.do Simulator</h1>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (<QuestionForm
                { ...props }
                receivedQuestions={ receivedQuestions }
                handleQuestionSubmit={ this.handleQuestionSubmit }
                handleChange={ this.handleChange }
                handleVotes={ this.handleVotes }
                handleGotResponse={ this.handleGotResponse }
              />) }
            />
            <Route
              path="/answers"
              render={ (props) => (<AnsweredQuestions
                { ...props }
                receivedQuestions={ receivedQuestions }
              />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
