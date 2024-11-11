const express = require('express');
const router = express.Router();
const { createQuiz, getUserQuizzes, publishQuiz, getQuizByPermalink, deleteQuiz } = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect routes for authenticated users
router.post('/', authMiddleware, createQuiz);
router.get('/', authMiddleware, getUserQuizzes);
router.put('/:id/publish', authMiddleware, publishQuiz);
router.get('/:permalink', getQuizByPermalink);
router.delete('/:id', authMiddleware, deleteQuiz);

module.exports = router;
