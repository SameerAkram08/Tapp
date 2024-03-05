import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg, BsArrowUp, BsArrowDown } from 'react-icons/bs';

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdateMenuVisible, setIsUpdateMenuVisible] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem('todolist')) || [];
    let savedCompletedToDos = JSON.parse(localStorage.getItem('completedTodos')) || [];
    setAllTodos(savedTodos);
    setCompletedTodos(savedCompletedToDos);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]); // Trigger search whenever searchTerm changes

  const handleAddNewToDo = () => {
    if (isUpdateMenuVisible) {
      handleUpdate();
    } else {
      let newToDoObj = {
        title: newTodoTitle,
        description: newDescription,
      };

      let updatedTodoArr = [...allTodos, newToDoObj];
      setAllTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
      setNewDescription('');
      setNewTodoTitle('');
      setSearchTerm('');
    }
  };

  const handleUpdate = () => {
    if (updateIndex !== null) {
      let updatedTodos = [...allTodos];
      updatedTodos[updateIndex].description = newDescription;

      setAllTodos(updatedTodos);
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));

      setNewDescription('');
      setUpdateIndex(null);
      setIsUpdateMenuVisible(false);
      setSearchTerm('');
    }
  };

  const handleUpdateTitle = () => {
    if (updateIndex !== null) {
      let updatedTodos = [...allTodos];
      updatedTodos[updateIndex].title = newTodoTitle;

      setAllTodos(updatedTodos);
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));

      setNewTodoTitle('');
      setUpdateIndex(null);
      setIsUpdateMenuVisible(false);
      setSearchTerm('');
    }
  };

  const handleSearch = () => {
    let filteredTodos = allTodos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTodos(filteredTodos);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredTodos([]);
  };

  const handleToDoDelete = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  const handleCompletedTodoDelete = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedCompletedTodos));
    setCompletedTodos(reducedCompletedTodos);
  };

  const handleComplete = (index) => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    let updatedCompletedList = [...completedTodos, filteredTodo];
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedList));

    handleToDoDelete(index);
  };

  const handleUpdateClick = (index) => {
    if (allTodos[index]) {
      setUpdateIndex(index);
      setNewDescription(allTodos[index].description);
      setNewTodoTitle(allTodos[index].title);
      setIsUpdateMenuVisible(true);
    } else {
      console.error('Todo item not found at index:', index);
      alert('Todo item not found. Please select an existing item to update.');
    }
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      let updatedTodos = [...allTodos];
      [updatedTodos[index - 1], updatedTodos[index]] = [updatedTodos[index], updatedTodos[index - 1]];
      setAllTodos(updatedTodos);
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    }
  };

  const handleMoveDown = (index) => {
    if (index < allTodos.length - 1) {
      let updatedTodos = [...allTodos];
      [updatedTodos[index], updatedTodos[index + 1]] = [updatedTodos[index + 1], updatedTodos[index]];
      setAllTodos(updatedTodos);
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    }
  };

  return (
    <div className="App">
      <h1>SAMEER's TODO APP</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="What's the title of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewToDo}
            >
              {isUpdateMenuVisible ? 'Update' : 'Add'}
            </button>
          </div>
        </div>

        <div className="todo-input">
          <div className="todo-input-item">
            <label>Search:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
            />
          </div>
          <div className="todo-input-item">
            <button className="primary-btn" type="button" onClick={handleSearch}>
              Search
            </button>
            <button className="primary-btn" type="button" onClick={handleClearSearch}>
              Clear Search
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={isCompletedScreen ? 'secondaryBtn' : 'secondaryBtn active'}
            onClick={() => setIsCompletedScreen(false)}
          >
            Incomplete
          </button>
          <button
            className={isCompletedScreen ? 'secondaryBtn active' : 'secondaryBtn'}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompletedScreen === false &&
            (filteredTodos.length > 0 ? (
              filteredTodos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="todo-icons">
                    <BsArrowUp
                      title="Move Up"
                      className="icon"
                      onClick={() => handleMoveUp(index)}
                    />
                    <BsArrowDown
                      title="Move Down"
                      className="icon"
                      onClick={() => handleMoveDown(index)}
                    />
                    <BsCheckLg
                      title="Completed?"
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                    />
                    <AiOutlineDelete
                      title="Delete?"
                      className="icon"
                      onClick={() => handleToDoDelete(index)}
                    />
                    <AiOutlineEdit
                      title="Update?"
                      className="icon"
                      onClick={() => handleUpdateClick(index)}
                    />
                  </div>
                </div>
              ))
            ) : (
              allTodos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="todo-icons">
                    <BsArrowUp
                      title="Move Up"
                      className="icon"
                      onClick={() => handleMoveUp(index)}
                    />
                    <BsArrowDown
                      title="Move Down"
                      className="icon"
                      onClick={() => handleMoveDown(index)}
                    />
                    <BsCheckLg
                      title="Completed?"
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                    />
                    <AiOutlineDelete
                      title="Delete?"
                      className="icon"
                      onClick={() => handleToDoDelete(index)}
                    />
                    <AiOutlineEdit
                      title="Update?"
                      className="icon"
                      onClick={() => handleUpdateClick(index)}
                    />
                  </div>
                </div>
              ))
            ))}
          {isCompletedScreen === true &&
            (completedTodos.length > 0 ? (
              completedTodos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>Completed On: {item.completedOn}</p>
                  </div>
                  <div className="todo-icons">
                    <AiOutlineDelete
                      title="Delete?"
                      className="icon"
                      onClick={() => handleCompletedTodoDelete(index)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No completed tasks yet!</p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
