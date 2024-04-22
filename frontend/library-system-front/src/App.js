import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  useEffect(() => 
  {
    fetch(`http://localhost:3001/books/available`)
      .then((response) => response.json())
      .then((data) => setBooks(data));

    fetch(`http://localhost:3001/books/checkedout`)
      .then((response) => response.json())
      .then((data) => setCheckedOutBooks(data));
  }, []);

  const handleCheckOut = (book) =>
  {
    const checkedOutBy = prompt("Enter the name of the person checking out the book: ");
    const dueDate = prompt("Enter the due date for the book (MM-DD-YYYY): ");
    if(!checkedOutBy || !dueDate)
    {
      alert("Please enter a valid name and due date.");
      return;
    }
    fetch(`http://localhost:3001/books/checkout/${book._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ checkedOutBy, dueDate })
  })
    .then(response => response.json())
    .then(data => {
      if (data) {
        setBooks(books.filter((b) => b._id !== book._id));
        setCheckedOutBooks([...checkedOutBooks, { ...book, Status: "Checked Out", CheckedOutBy: checkedOutBy, DueDate: dueDate }]);
      }
    })
    .catch((error) => console.error('Error:', error));
  };

  const handleCheckIn = (book) =>
  {
    fetch(`http://localhost:3001/books/checkin/${book._id}`, {method: 'PUT'})
      .then(response =>
        {
          if (response.ok)
          {
            setCheckedOutBooks(checkedOutBooks.filter((b) => b._id !== book._id));
            setBooks([...books, { ...book, Status: "Available" }]);
          }
        })
        .catch((error) => console.error('Error:', error));
  };
  
  return (
    <div className="App">
      <h1>Library Management System</h1>
      <img src="https://i.pinimg.com/564x/4e/d5/a8/4ed5a810b1ca29491305494ccac97f00.jpg" alt="A very studious cat" />
      <h2>Books Available</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>Title:</strong> {book.Title} <strong>Author:</strong> {book.Author} <strong>Publisher:</strong> {book.Publisher} <strong>ISBN:</strong>  {book.ISBN}
            <button onClick={() => handleCheckOut(book)}>Check Out</button>
          </li>
        ))}
      </ul>
      <h2>Checked Out Books</h2>
      <ul>
        {checkedOutBooks.map((book) => (
          <li key={book._id}>
            <strong>Title:</strong> {book.Title} <strong>Author:</strong> {book.Author} <string>Publisher:</string> {book.Publisher} <strong>ISBN:</strong> {book.ISBN} <strong>Checked Out By:</strong> {book.CheckedOutBy} <strong>Due Date:</strong> {book.DueDate}
            <button onClick={() => handleCheckIn(book)}>Check In</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

