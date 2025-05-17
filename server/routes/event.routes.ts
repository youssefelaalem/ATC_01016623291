import express from 'express';
import { createEventFun, getAllEventsFun, getEventByIdFun, updateEventFun, deleteEventFun } from '../controllers/event.controller';
import { protect, restrictToAdmin } from '../middlewares/auth.middelware';


const router = express.Router();

router.get('/all_events', getAllEventsFun);
router.get('/:id', getEventByIdFun);

router.post('/create', protect, restrictToAdmin, createEventFun);

router.put('/:id', protect, restrictToAdmin, updateEventFun);

router.delete('/:id', protect, restrictToAdmin, deleteEventFun);
export default router;
