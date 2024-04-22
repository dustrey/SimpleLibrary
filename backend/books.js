const express = require('express');
const router = express.Router();
const Book = require('./schemas');

router.get('/available', async (req,res) => 
{
    const books = await Book.find({Status: "Available"});
    res.send(books);
}) 

router.get('/checkedout', async (req,res) => 
{
    const books = await Book.find({Status: "Checked Out"});
    res.send(books);
})

router.put('/checkout/:_id', async (req, res) => 
{
    const { checkedOutBy, dueDate } = req.body;
    try {
      const book = await Book.findByIdAndUpdate(req.params._id, 
        { Status: "Checked Out", CheckedOutBy: checkedOutBy, DueDate: dueDate },
        { new: true });
      if (!book) {
        return res.status(404).send('The book with the given ID was not found.');
      }
      res.send(book);
    } catch (error) {
      console.error('Error checking out book:', error);
      res.status(500).send('Server error');
    }
  });

  router.put('/checkin/:_id', async (req, res) => 
  {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params._id,
            {
                Status: "Available",
                CheckedOutBy: "", 
                DueDate: ""     
            },
            { new: true }  
        );
        if (!book) 
        {
            return res.status(404).send('The book with the given ID was not found.');
        }
        return res.send(book);
    } catch (error) 
    {
        console.error('Error checking in book:', error);
        res.status(500).send('Server error');
    }
});


module.exports = router;