import React, { useState, useEffect, useCallback } from 'react';
import './todo.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg, BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { format, isAfter, isBefore } from 'date-fns';

function Todo() {
    const [allTodos, setAllTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newExpectedTime, setNewExpectedTime] = useState('');
    const [completedTodos, setCompletedTodos] = useState([]);
    const [isCompletedScreen, setIsCompletedScreen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUpdateMenuVisible, setIsUpdateMenuVisible] = useState(false);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // useCallback to memoize handleSearch
    const handleSearch = useCallback(() => {
        let filteredTodos = allTodos.filter((todo) =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (startTime ? isAfter(new Date(todo.expectedTime), new Date(startTime)) : true) &&
            (endTime ? isBefore(new Date(todo.expectedTime), new Date(endTime)) : true)
        );

        // Sort tasks by expected time
        filteredTodos.sort((a, b) => new Date(a.expectedTime) - new Date(b.expectedTime));

        setFilteredTodos(filteredTodos);
    }, [allTodos, searchTerm, startTime, endTime]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    const handleAddNewToDo = () => {
        if (isUpdateMenuVisible) {
            handleUpdate();
        } else {
            if (newDescription.trim() !== '' && newExpectedTime !== '') {
                let newToDoObj = {
                    title: newTodoTitle,
                    description: newDescription,
                    expectedTime: newExpectedTime,
                };

                let updatedTodoArr = [...allTodos, newToDoObj];
                setAllTodos(updatedTodoArr);
                localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
                setNewDescription('');
                setNewTodoTitle('');
                setNewExpectedTime('');
                setSearchTerm('');
            } else {
                alert('Title, Description, and Expected Time cannot be empty.');
            }
        }
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
        const formattedDate = format(new Date(), "dd-MM-yyyy 'at' HH:mm:ss");

        let completedTodo = {
            ...filteredTodos[index],
            completedOn: formattedDate,
        };

        let updatedCompletedList = [...completedTodos, completedTodo];
        setCompletedTodos(updatedCompletedList);
        localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedList));

        handleToDoDelete(index);
    };

    const handleUpdate = () => {
        setNewDescription('');
        setNewTodoTitle('');
        setIsUpdateMenuVisible(false);
    };

    const handleUpdateClick = (index) => {
        if (filteredTodos[index]) {
            setNewTodoTitle(filteredTodos[index].title);
            setNewDescription(filteredTodos[index].description);
            setNewExpectedTime(filteredTodos[index].expectedTime);
            setIsUpdateMenuVisible(true);
        } else {
            console.error('Todo item not found at index:', index);
            alert('Todo item not found. Please select an existing item to update.');
        }
    };

    const handleMoveUp = (index) => {
        if (index > 0) {
            const updatedTodos = [...allTodos];
            const temp = updatedTodos[index];
            updatedTodos[index] = updatedTodos[index - 1];
            updatedTodos[index - 1] = temp;
            setAllTodos(updatedTodos);
        }
    };

    const handleMoveDown = (index) => {
        if (index < allTodos.length - 1) {
            const updatedTodos = [...allTodos];
            const temp = updatedTodos[index];
            updatedTodos[index] = updatedTodos[index + 1];
            updatedTodos[index + 1] = temp;
            setAllTodos(updatedTodos);
        }
    };

    return (
        <div className=" bg1 ">
            <h1 className='todo-title'>SAMEER's TODO APP</h1>

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
                        <input className='out'
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="What's the description of your To Do?"
                        />
                    </div>
                    <div className="todo-input-item">
                        <label>Expected Time:</label>
                        <input className='out'
                            type="time"
                            value={newExpectedTime}
                            onChange={(e) => setNewExpectedTime(e.target.value)}
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
                        <input className='out'
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
                        />
                    </div>
                    <div className="todo-input-item">
                        <label>Start Time:</label>
                        <input className='out'
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
                    <div className="todo-input-item">
                        <label>End Time:</label>
                        <input className='out'
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
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
                                        <p>Expected Time: {item.expectedTime}</p>
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
                                        <p>Expected Time: {item.expectedTime}</p>
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

export default Todo;
