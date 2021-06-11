import React, { Component } from 'react';
import '../Styles/QuestionForm.css';

export default class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      questionMessage: '',
      authorName: '',
      receivedQuestions: {},
      // isAnswered: false,
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
    const { questionMessage, authorName, id } = this.state;

    this.setState((state) => ({
      id: state.id + 1,
    }), () => this.setState((state) => ({
      receivedQuestions: {
        ...state.receivedQuestions,
        [id]: { questionMessage, authorName, votes: 0, id },
      },
    })));
  }

  // dúvida sobre substituir a propriedade do objeto ou criar uma nova instância utilizando object assign.
  // O que fazer?
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

  renderSubmitedQuestions() {
    const { receivedQuestions } = this.state;

    return (
      <div className="question-items-wrapper">
        {Object.values(receivedQuestions)
          .sort((questionA, questionB) => questionB.votes - questionA.votes)
          .map(({ questionMessage, authorName, id, votes }) => (
            <div className="question-item" key={ id } id={ id }>
              <p className="author">{ authorName }</p>
              <p className="message">{ questionMessage }</p>
              <button
                id={ id }
                type="button"
                onClick={ this.handleVotes }
              >
                { votes }
              </button>
            </div>
          ))}
      </div>);
  }

  render() {
    const { questionMessage, authorName } = this.state;

    return (
      <div className="form-wrapper">
        <form>
          <label htmlFor="questionMessage">
            Digite sua dúvida
            <textarea
              type="text"
              name="questionMessage"
              value={ questionMessage }
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
