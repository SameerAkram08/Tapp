import React from 'react';
import './App.css'; 
import LandingPage from './components/LandingPage/LandingPage';
import Todo from './components/todo/Todo';

import { Element, scroller } from 'react-scroll';

const App = () => {
  const scrollToTodo = () => {
    scroller.scrollTo('todo', {
      duration: 10, 
      delay: 0,
      smooth: 'ease-in',
    });
  };

  return (
    <div className="app">
      <Element name="landingPage">
        <div className="component landing-page">
          <LandingPage />
        </div>
      </Element>
      <Element name="todo">
        <div className="component todo">
          <Todo />
        </div>
      </Element>
      <button onClick={scrollToTodo}>Scroll to Todo</button>
    </div>
  );
};

export default App;
