import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Styles/QuestionForm.css';
import { Link } from 'react-router-dom';

export default class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.renderSubmitedQuestions = this.renderSubmitedQuestions.bind(this);
  }

  renderSubmitedQuestions() {
    const {
      receivedQuestions,
      handleVotes,
      handleGotResponse,
    } = this.props;

    return (
      <div className="question-items-wrapper">
        {Object.values(receivedQuestions)
          .filter(({ gotResponse }) => !gotResponse)
          .sort((questionA, questionB) => questionB.votes - questionA.votes)
          .map(({ questionMessage, authorName, id, votes, gotResponse }) => (
            <div className="question-item" key={ id } id={ id }>
              <div className="author-name-container">
                <span className="author">{ `@${authorName}` }</span>
              </div>
              <div className="question-container">
                <p className="message">{ questionMessage }</p>
              </div>
              <div className="upvote-answer-container">
                <div className="got-response-wrapper">
                  <label htmlFor="gotResponse">
                    Question was answered?
                    <input
                      type="checkbox"
                      name="gotResponse"
                      checked={ gotResponse }
                      onChange={ handleGotResponse }
                      id={ id }
                    />
                  </label>
                </div>
                <div className="upvote-wrapper">
                  <button
                    id={ id }
                    type="button"
                    onClick={ handleVotes }
                    className="upvote-button"
                  >
                    { votes === 1 ? `${votes} vote` : `${votes} votes` }
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>);
  }

  render() {
    const {
      questionMessage,
      authorName,
      handleChange,
      handleQuestionSubmit,
    } = this.props;

    return (
      <>
        <div>
          <form className="form-wrapper">
            <label htmlFor="questionMessage">
              <textarea
                type="text"
                name="questionMessage"
                value={ questionMessage }
                onChange={ handleChange }
                placeholder="Ask here..."
              />
            </label>
            <label htmlFor="authorName">
              <input
                type="text"
                name="authorName"
                value={ authorName }
                onChange={ handleChange }
                placeholder="Insert your name"
              />
            </label>
            <button
              type="button"
              onClick={ handleQuestionSubmit }
              className="send-question-button"
            >
              Send Question
            </button>
          </form>
        </div>
        <h2>Questions</h2>
        <div className="questions-board">
          {this.renderSubmitedQuestions()}
        </div>
        <Link to="/answers">Answers</Link>
      </>
    );
  }
}

QuestionForm.propTypes = {
  questions: PropTypes.shape({
    id: PropTypes.shape({
      questionMessage: PropTypes.string,
      authorName: PropTypes.string,
      votes: PropTypes.number,
      id: PropTypes.number,
      gotResponse: PropTypes.bool,
    }),
  }) }.isRequired;
