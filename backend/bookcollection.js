require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./schemas');
mongoose.connect(process.env.ATLAS_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch(err => console.error('Could not connect to MongoDB Atlas', err));

const bookCollection = 
[
    {
        Title:"The Great Gatsby", Author:"F. Scott Fitzgerald", Publisher:"Charles Scribner's Sons", ISBN:"9780743273565", Status:"Available", CheckedOutBy:"", DueDate:""
    },
    {
        Title:"To Kill a Mockingbird", Author:"Harper Lee", Publisher:"J.B. Lippincott & Co.", ISBN:"9780060935467", Status:"Available", CheckedOutBy:"", DueDate:""
    },
    {
        Title:"The Hobbit", Author:"J.R.R. Tolkien", Publisher:"Allen & Unwin", ISBN:"9780618002214", Status:"Checked Out", CheckedOutBy:"Frodo", DueDate:"04-20-1969"
    },
    {
        Title:"The Fellowship of the Ring", Author:"J.R.R. Tolkien", Publisher:"Allen & Unwin", ISBN:"9780618346257", Status:"Available", CheckedOutBy:"", DueDate:""
    },
    {
        Title:"The Two Towers", Author:"J.R.R. Tolkien", Publisher:"Allen & Unwin", ISBN:"9780618346264", Status:"Available", CheckedOutBy:"", DueDate:""
    },
    {
        Title:"The Return of the King", Author:"J.R.R. Tolkien", Publisher:"Allen & Unwin", ISBN:"9780618346271", Status:"Available", CheckedOutBy:"", DueDate:""
    },
    {
        Title:"Twilight", Author:"Stephenie Meyer", Publisher:"Little, Brown and Company", ISBN:"9780316015844", Status:"Available", CheckedOutBy:"", DueDate:""
    },
    {
        Title:"New Moon", Author:"Stephenie Meyer", Publisher:"Little, Brown and Company", ISBN:"9780316024969", Status:"Available", CheckedOutBy:"", DueDate:""
    },
    {
        Title:"Eclipse", Author:"Stephenie Meyer", Publisher:"Little, Brown and Company", ISBN:"9780316160209", Status:"Available", CheckedOutBy:"", DueDate:""
    },
    {
        Title:"Breaking Dawn", Author:"Stephenie Meyer", Publisher:"Little, Brown and Company", ISBN:"9780316067928", Status:"Available", CheckedOutBy:"", DueDate:""
    }

];

async function seedDatabase()
{
    console.log("Seeding database...");
    try
    {
        console.log('Deleting existing books from database...')
        await Book.deleteMany({});
        console.log('Inserting books into database...');
        const result = await Book.insertMany(bookCollection);
        console.log('The following books were added: ', result);
        //console.log('Books have been updated in database!');
    } catch (err) 
    {
        console.error('Could not update database', err);
    }
    finally
    {
        mongoose.connection.close();
    }
}

seedDatabase();
