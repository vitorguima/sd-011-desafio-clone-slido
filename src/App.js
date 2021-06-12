import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import QuestionForm from './Components/QuestionForm';
import AnsweredQuestions from './Components/AnsweredQuestions';
import './Styles/QuestionForm.css';

function App() {
  return (
    <div className="App">
      <h1>Desafio Clone do Sli.do</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ QuestionForm } />
          <Route path="/answers" component={ AnsweredQuestions } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
