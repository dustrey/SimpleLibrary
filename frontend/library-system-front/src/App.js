//import React from 'react';
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
    fetch(`http://localhost:3001/books/checkout/${book._id}`, {method: 'PUT'})
      .then(response =>
        {
          if (response.ok)
          {
            setBooks(books.filter((b) => b._id !== book._id));
            setCheckedOutBooks([...checkedOutBooks, { ...book, Status: "Checked Out" }]);
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
      <h2>Books Available</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.Title} by {book.Author}
            <button onClick={() => handleCheckOut(book)}>Check Out</button>
          </li>
        ))}
      </ul>
      <h2>Checked Out Books</h2>
      <ul>
        {checkedOutBooks.map((book) => (
          <li key={book._id}>
            {book.Title} by {book.Author}
            <button onClick={() => handleCheckIn(book)}>Check In</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

