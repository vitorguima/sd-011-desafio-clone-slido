import React, { Component } from 'react';
import '../Styles/QuestionForm.css';

export default class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      askMessage: '',
      authorName: '',
      receivedQuestions: [],
      isAnswered: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.handleVotes = this.handleVotes.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }));
  }

  handleQuestionSubmit() {
    const { askMessage, authorName, receivedQuestions, isAnswered } = this.state;
    const id = receivedQuestions.length + 1;

    this.setState((state) => ({
      receivedQuestions:
      [...state.receivedQuestions, ({ askMessage, authorName, isAnswered, id })],
      [id]: 0,
    }));
  }

  handleVotes(id) {
    this.setState((state) => ({
      [id]: state[id] + 1,
    }));
  }

  renderSubmitedQuestions() {
    const { receivedQuestions } = this.state;

    return (
      <div className="question-items-wrapper">
        {receivedQuestions.map(({ askMessage, authorName, id }) => {
          const { [id]: value } = this.state;
          return (
            <div className="question-item" key={ id } id={ id }>
              <p className="author">{ authorName }</p>
              <p className="message">{ askMessage }</p>
              <button
                id={ id }
                type="button"
                onClick={ () => this.handleVotes(id) }
              >
                { value }
              </button>
            </div>);
        })}
      </div>);
  }

  render() {
    const { askMessage, authorName } = this.state;

    return (
      <div className="form-wrapper">
        <form>
          <label htmlFor="askMessage">
            Digite sua dúvida
            <textarea
              type="text"
              name="askMessage"
              value={ askMessage }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="authorName">
            Digite seu nome
            <input
              type="text"
              name="authorName"
              value={ authorName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleQuestionSubmit }
          >
            Enviar
          </button>
        </form>
        <h2>Lista de perguntas</h2>
        <div className="questions-board">
          {this.renderSubmitedQuestions()}
        </div>
      </div>
    );
  }
}
