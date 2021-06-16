import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Styles/AnsweredQuestions.css';
import { Link } from 'react-router-dom';

export default class QuestionsBoard extends Component {
  render() {
    const { receivedQuestions } = this.props;
    return (
      <div>
        <h2>Lista de perguntas Respondidas</h2>
        <div className="question-items-wrapper">
          {Object.values(receivedQuestions)
            .filter(({ gotResponse }) => gotResponse)
            .sort((questionA, questionB) => questionB.votes - questionA.votes)
            .map(({ questionMessage, authorName, id }) => (
              <div className="question-item" key={ id } id={ id }>
                <div className="author-name-container">
                  <span className="author">{ authorName }</span>
                </div>
                <div className="question-container">
                  <p className="message">{ questionMessage }</p>
                </div>
              </div>
            ))}
        </div>
        <Link to="/">Opened questions</Link>
      </div>);
  }
}

QuestionsBoard.propTypes = {
  questions: PropTypes.shape({
    id: PropTypes.shape({
      questionMessage: PropTypes.string,
      authorName: PropTypes.string,
      votes: PropTypes.number,
      id: PropTypes.number,
      gotResponse: PropTypes.bool,
    }),
  }) }.isRequired;
