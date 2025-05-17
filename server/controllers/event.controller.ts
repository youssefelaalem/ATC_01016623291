import { Request, Response } from 'express';
import Event from "../models/event.model";
import asyncHandler from "express-async-handler";
import { CustomError } from '../utils/customError';

export const createEventFun = asyncHandler(async (req: Request, res: Response) => {
    let { name, description, category, date, venue, price, image } = req.body;


    if (!Array.isArray(category)) {
        category = typeof category === "string" ? [category] : [];
    }

    const newEvent = await Event.create({
        name,
        description,
        category,
        date,
        venue,
        price,
        image
    });

    res.status(201).json({ status: "success", data: newEvent });
});


export const getAllEventsFun = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const keyword = req.query.keyword
        ? {
            $or: [
                { name: { $regex: req.query.keyword, $options: "i" } },
                { description: { $regex: req.query.keyword, $options: "i" } },
            ],
        }
        : {};

    const categoryFilter = req.query.category
        ? {
            category: {
                $in: Array.isArray(req.query.category)
                    ? req.query.category
                    : [req.query.category],
            },
        }
        : {};

    const date = req.query.date
        ? { date: { $gte: new Date(req.query.date as string) } }
        : {};

    const filters = { ...keyword, ...categoryFilter, ...date };

    const total = await Event.countDocuments(filters);
    const events = await Event.find(filters).skip(skip).limit(limit);

    res.status(200).json({
        status: "success",
        results: events.length,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        events,
    });
});


export const getEventByIdFun = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
        throw new CustomError("Event not found", 404);

    }
    res.status(200).json({ status: "success", data: event })
})

export const updateEventFun = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedEvent) {
        throw new CustomError("Event not found", 404);
    }
    res.status(200).json({ status: "success", data: updatedEvent });
})

export const deleteEventFun = asyncHandler(async (req: Request, res: Response) => {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
        throw new CustomError("Event not found", 404);
    }

    res.status(204).json({ status: "success", message: "Event Is Dleted Successfully.", data: null });
});