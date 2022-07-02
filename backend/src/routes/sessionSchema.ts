import { prisma } from '../db';
import { Router } from 'express'
import { sendErrorResponse } from '../utils/sendErrorResponse';
import { isAuthenticated } from '../utils/authMiddlewares';
import * as yup from 'yup'
import { addSessionSchemaPayloadValidator } from '../validators/sessionSchema';
import { v4 } from 'uuid';
import { Prisma, PrismaClient, session_schema, superset_schema, workout_schema } from '@prisma/client';

const router = Router();

/**
 * Route to get the complete details of the sessionSchema
 */
router.get('/details/:id', isAuthenticated, async (req, res) => {
    try {

        // check if the session owner is this user
        // prisma.
        const { id } = req.params
        const validationResult = await yup.string().uuid().required().isValid(id)
        if (!validationResult) throw { message: `Given id ${id} is not a valid UUID` }

        const data = await prisma.session_schema.findFirst({
            where: {
                id,
                owner_id: req.user.id
            },
            include: {
                workout_schema: {},
                superset_schema: {
                    include: {
                        superset_workout_schema: {}
                    }
                }
            }
        })

        if(!data) throw {message: 'Invalid Id or permissions'}

        res.send({
            error: false,
            data
        })
    } catch (err) {
        return sendErrorResponse(res, err)
    }
})


/**
 * Route to create a new sessionSchema
 */
router.post('/create/', isAuthenticated, async (req, res) => {
    try {
        const data = req.body

        const validatedData = await addSessionSchemaPayloadValidator.validate(data)

        if ((Number(!data.superset_schema || data.superset_schema.length == 0)) + (Number(!data.workout_schema || data.workout_schema.length == 0)) == 2) throw { message: 'session must\'ve at least one workout or superset workout' }

        const sessionSchemaId = v4();

        // perform check to ensure that all workout ids are correct
        const uniqueWorkoutIds = new Set<string>()

        validatedData.superset_schema.forEach(e => {
            e.superset_workout_schema.forEach(f => uniqueWorkoutIds.add(f.workout_id))
        })
        validatedData.workout_schema.forEach(e => uniqueWorkoutIds.add(e.workout_id))

        const uniqueWorkoutIdsArr = Array.from(uniqueWorkoutIds)
        const validIds = (await prisma.workout.findMany({
            where: {
                // id: 
                AND: [
                    {
                        id: {
                            in: uniqueWorkoutIdsArr
                        },
                    },
                    {
                        OR: [
                            {
                                is_public: true
                            },
                            {
                                owner_id: req.user.id
                            }
                        ]
                    }
                ]
            },
            select: {
                id: true
            }
        })).flatMap(e => e.id);

        uniqueWorkoutIdsArr.forEach(e => {
            if (validIds.indexOf(e) === -1) throw { message: `Invalid Workout Id ${e}` }
        })

        // we don't need to validate the workout_id, thanks to the referential integrity
        const response = await prisma.$transaction(
            async (prisma) => {

                const returnData: {
                    session_schema: session_schema,
                    superset_schema: any[],
                    workout_schema: any[]
                } = {
                    session_schema: null,
                    superset_schema: [],
                    workout_schema: []
                }
                returnData.session_schema = await prisma.session_schema.create({
                    data: {
                        id: sessionSchemaId,
                        name: validatedData.session_name,
                        owner_id: req.user.id
                    }
                });

                returnData.superset_schema = []

                // handle superset
                for (let supersetSchema of validatedData.superset_schema) {
                    const supersetId = v4();
                    let supersetSchemaRet: any = {};
                    // create superset
                    const createdSupersetDoc = await prisma.superset_schema.create({
                        data: {
                            id: supersetId,
                            name: supersetSchema.name,
                            order: supersetSchema.order,
                            session_schema_id: sessionSchemaId
                        }
                    });

                    supersetSchemaRet = {
                        ...supersetSchemaRet,
                        createdSupersetDoc
                    }
                    supersetSchemaRet.superset_workout_schema = []

                    for (let workout of supersetSchema.superset_workout_schema) {
                        supersetSchemaRet.superset_workout_schema.push(await prisma.superset_workout_schema.create({
                            data: {
                                default_target: workout.default_target,
                                id: v4(),
                                order: workout.order,
                                superset_schema_id: supersetId,
                                workout_id: workout.workout_id
                            }
                        }))
                    }

                    returnData.superset_schema.push(supersetSchemaRet)
                }

                // add workout
                for (let workout of validatedData.workout_schema) {
                    const doc = await prisma.workout_schema.create({
                        data: {
                            default_target: workout.default_target,
                            id: v4(),
                            session_schema_id: sessionSchemaId,
                            order: workout.order,
                            workout_id: workout.workout_id
                        }
                    })
                    returnData.workout_schema.push(doc)
                }

                return returnData
            }

        )

        // create the schema


        res.send({
            error: false,
            data: response
        })
    } catch (err) {
        return sendErrorResponse(res, err)
    }
})

/**
 * Route to edit the sessionSchema
 */
router.post('/edit/', isAuthenticated, async (req, res) => {
    try{
        // TODO: maybe we can merge it with endpoint to create/; Since we anyhow want both modify and create to give the whole
        // data in one go!
        // But how do we remove the removed items and all?
        throw {message: "Editing schema is disabled for now."}
    }catch(err){
        return sendErrorResponse(res, err);
    }
})

export default router
