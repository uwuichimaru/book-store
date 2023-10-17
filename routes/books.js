import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();
router.post('/', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message: "Send all required fields: title, author, publishYear"})
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(200).json(book)
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

router.get('/', async (req, res) => {
    try{
      
        const book = await Book.find();
        return res.status(200).json({
            count: book.length,
            data: book
        });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

router.get('/:id', async (req,res) => {
    try{
        const book = await Book.findById(req.params.id);
        if(book) return res.status(200).json(book)
        else return res.status(400).send({message: "Book not found"});
    }catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

router.put('/:id', async(req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message: "Send all required fields: title, author, publishYear"})
        }

        const result = await Book.findByIdAndUpdate(req.params.id, req.body);
        if(!result) {
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(200).send({message: "Book updated successfully"})
    
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

router.delete("/:id", async(req, res) => {
    try{
        const result = await Book.findByIdAndDelete(req.params.id);
        if(!result) {
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(200).send({message: "Book deleted successfully"})
    
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

export default router;