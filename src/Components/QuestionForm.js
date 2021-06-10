import React, { Component } from 'react';
import QuestionsBoard from './QuestionsBoard';
import '../Styles/QuestionForm.css';

export default class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      askMessage: '',
      authorName: '',
      receivedQuestions: [],
      isAnswered: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }));
  }

  handleQuestionSubmit() {
    const { askMessage, authorName, receivedQuestions, isAnswered } = this.state;
    const id = receivedQuestions.length;

    this.setState((state) => ({
      receivedQuestions:
      [...state.receivedQuestions, ({ askMessage, authorName, id, isAnswered })],
    }));
  }

  renderSubmitedQuestions(questions) {
    return (
      <div className="question-items-wrapper">
        {questions.map(({ askMessage, authorName }, index) => (
          <div className="question-item" key={ index }>
            <p className="author">{ authorName }</p>
            <p className="message">{ askMessage }</p>
            <label htmlFor="isAnswered">
              Respondida
              <input
                name="isAnswered"
                type="checkbox"
              />
            </label>
          </div>))}
      </div>);
  }

  render() {
    const { askMessage, authorName, receivedQuestions } = this.state;

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
        <QuestionsBoard
          receivedQuestions={ receivedQuestions }
          renderQuestions={ this.renderSubmitedQuestions }
        />
      </div>
    );
  }
}
