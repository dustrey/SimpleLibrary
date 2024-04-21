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

router.put('/checkout/:_id', async (req,res) => 
{
    const book = await Book.findByIdAndUpdate(req.params._id, {Status: "Checked Out"}, 
        { new: true });
    if (!book) return res.status(404).send('The book with the given ID was not found.')
    res.send(book);
})

router.put('/checkin/:_id', async (req,res) =>
{
    const book = await Book.findByIdAndUpdate(req.params._id, {Status: "Available"}, 
        { new: true });
        if (!book) return res.status(404).send('The book with the given ID was not found.')
        return res.send(book);
})

module.exports = router;