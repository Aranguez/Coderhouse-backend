import { Router } from 'express';
import { ChatDao } from '../dao/index.js';

const chatRouter = Router();

// get messages
chatRouter.get('/', async (req, res) => {
  try {
    const messages = await ChatDao.getAll();
    res.json(messages);
  } catch (error) {
    console.log('error al cargar los chats', error);
  }
});

// add chat message
chatRouter.post('/', async (req, res) => {
  try {
    const message = {
      author: req.body.author,
      message: req.body.message
    }
    await ChatDao.save(message)
    res.json({ success: 'mensaje agregado exitosamente' })
  } catch (error) {
    console.log('error al guardar chat', error);
  }
});

export { chatRouter };