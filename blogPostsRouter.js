const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

function harry() {
  return 'Harry James Potter was a half-blood wizard, the only child  ' +
    'and son of the late James and Lily Potter, and one of the most famous, '
    'wizards of modern times. In what proved to be a vain attempt to circumvent a ' +
    'prophecy that stated that a boy born at the end of July of 1980 could be able to ' +
    'defeat him, Lord Voldemort tried to murder him when he was a year and three ' +
    'months old. Voldemort murdered Harry\'s parents as they tried to protect him, shortly before attacking Harry.'
}

BlogPosts.create(
  'NFL Greats', harry(), 'Joe');
BlogPosts.create(
  'Top Movies', harry(), 'Lil Wayne');


router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});



router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(
  	req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});


router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = [
  	'id', 'title', 'content', 'author', 'publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post with id \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).json(updatedItem);
});


router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post with id \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = router;