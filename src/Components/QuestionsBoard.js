import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Styles/QuestionForm.css';

export default class QuestionsBoard extends Component {
  render() {
    const { receivedQuestions, renderQuestions } = this.props;
    return (
      <>
        <h2>Lista de perguntas</h2>
        <div className="questions-board">
          {renderQuestions(receivedQuestions)}
        </div>
      </>
    );
  }
}

QuestionsBoard.propTypes = {
  receivedQuestions: PropTypes.array,
  renderQuestions: PropTypes.func,
}.isRequired;
