import { prisma } from '../db';
import { Router } from 'express'
import { sendErrorResponse } from '../utils/sendErrorResponse';
import { isAuthenticated } from '../utils/authMiddlewares';
import { body_part, intensity_levels, workout, workout_type } from '@prisma/client';
import { addWorkoutPayloadValidator, modifyWorkoutPayloadValidator } from '../validators/workout';
import { v4 } from 'uuid';

const router = Router()


/**
 * Route to list all workouts
 */
router.get('/list/', isAuthenticated, async (req, res) => {
    try {
        const workouts = await prisma.workout.findMany({
            where: {
                OR: [
                    {
                        owner_id: req.user.id
                    },
                    {
                        is_public: true
                    }
                ]
            }
        })

        const publicWorkouts: workout[] = []
        const myWorkouts: workout[] = []
        workouts.forEach(e => {
            if (e.owner_id === req.user.id) myWorkouts.push(e)
            else publicWorkouts.push(e)
        })

        res.send({
            error: false,
            publicWorkouts,
            myWorkouts
        })
    } catch (err) {
        return sendErrorResponse(res, err)
    }
})

/**
 * Route to add a workout
 * The workout will be private to the user
 */
router.post('/add/', isAuthenticated, async (req, res) => {
    try {
        const data = req.body
        await addWorkoutPayloadValidator.validate(data)
        // TODO: Think of a way to dynamically add a favicon; Maybe we just consider the body type to have one?

        // Create Mode
        const workout = await prisma.workout.create({
            data: {
                category: data.category,
                id: v4(),
                name: data.name,
                intensity: data.intensity,
                owner_id: req.user.id,
                target_body_part: data.target_body_part
            }
        })

        res.send({
            error: false,
            data: workout
        })

    } catch (err) {
        return sendErrorResponse(res, err)
    }

})

/**
 * Route to modify a workout added by the user
 * 
 */
router.post('/modify/', isAuthenticated, async (req, res) => {
    try {
        const data = req.body
        if (data.category) {
            // category cannot be changed
            throw { status: 400, message: 'Category cannot be changed! Please consider adding new workout' }
        }
        await modifyWorkoutPayloadValidator.validate(data)
        // TODO: Think of a way to dynamically add a favicon; Maybe we just consider the body type to have one?

        const result = await prisma.workout.updateMany({
            where: {
                owner_id: req.user.id,
                id: data.id,
            },
            data: {
                name: data.name,
                // Note: No category here
                intensity: data.intensity,
                target_body_part: data.target_body_part
            },
        })

        if (result.count > 1) throw { status: 400, message: 'Logic Error. The developers needs to be fired!' }
        else if (result.count == 0) throw { status: 400, message: 'Invalid workout id or permission' }

        const workout = await prisma.workout.findFirst({
            where: {
                id: data.id,
                owner_id: req.user.id
            }
        })

        res.send({
            error: false,
            data: workout
        })

    } catch (err) {
        return sendErrorResponse(res, err)
    }
})


/**
 * Route to delete a workout added by user
 */
router.post('/delete/', isAuthenticated, async (req, res) => {
    try {

        throw {"message": "Route not supported for now. Need to check with referential integrity and all!"}
        const { id } = req.body;
        if (!id) throw { status: 400, message: 'Id is needed' }

        const { count } = await prisma.workout.deleteMany({
            where: {
                id,
                owner_id: req.user.id
            }
        })
        if (count > 1) throw { status: 400, message: 'Logic Error. The developers needs to be fired!' }
        else if (count == 0) throw { status: 400, message: 'Invalid workout id or permission' }


        res.send({
            error: false,
            message: 'Workout Deleted successfully.'
        })
    } catch (err) {
        return sendErrorResponse(res, err)
    }
})


/**
 * Route to send all the form options to add a new form
 */
router.get('/formOptions/', isAuthenticated, (req, res) => {
    res.send({
        error: false,
        category: Object.keys(workout_type),
        target_body_part: Object.keys(body_part),
        intensity: Object.keys(intensity_levels),
    })
})

export default router
