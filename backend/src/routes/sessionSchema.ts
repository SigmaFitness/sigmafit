import { prisma } from '../db';
import { Router } from 'express'
import { sendErrorResponse } from '../utils/sendErrorResponse';
import { isAuthenticated } from '../utils/authMiddlewares';
import * as yup from 'yup'
import { addSessionSchemaPayloadValidator } from '../validators/sessionSchema';
import { v4 } from 'uuid';
import { session_schema } from '@prisma/client';
import { isValidUUID } from '../validators/isValidUUID';

const router = Router();

/**
 * Route to get the complete details of the sessionSchema
 */
router.get('/details/:id', isAuthenticated, async (req, res) => {
    try {

        const { id } = req.params
        const validationResult = await isValidUUID(id)
        if (!validationResult) throw { message: `Given id ${id} is not a valid UUID` }

        // check if the session owner is this user is done automatically as we added owner_id
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
            },
        })

        if (!data) throw { message: 'Invalid Id or permissions' };

        res.send({
            error: false,
            data: {
                schema_blocks: [...data.workout_schema.map(e => ({...e, type: 'workout_schema_block'})), ...data.superset_schema.map(e => ({...e, type: 'superset_schema_block'}))],
                session_name: data.name
            }
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

        const sessionSchemaId = v4();
        // perform check to ensure that all workout ids are correct
        const workoutIdsToSchemaBlock: { [K in string]: any[] } = {}


        validatedData.schema_blocks.forEach(currSchemaBlock => {
            if (currSchemaBlock.type === 'workout_schema_block') {
                // workout block
                if (!workoutIdsToSchemaBlock[currSchemaBlock.workout_id]) workoutIdsToSchemaBlock[currSchemaBlock.workout_id] = []
                workoutIdsToSchemaBlock[currSchemaBlock.workout_id].push(currSchemaBlock)
            } else {
                // superset block
                currSchemaBlock.superset_workout_schema.map((workout: any) => {
                    if (!workoutIdsToSchemaBlock[workout.workout_id]) workoutIdsToSchemaBlock[workout.workout_id] = []
                    workoutIdsToSchemaBlock[workout.workout_id].push(workout)
                })
            }
        })


        const uniqueWorkoutIdsArr = Object.keys(workoutIdsToSchemaBlock)
        const validWorkouts = (await prisma.workout.findMany({
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
                id: true,
                category: true
            }
        }));

        uniqueWorkoutIdsArr.forEach(e => {
            const workout = validWorkouts.find(f => f.id === e)
            if (!workout) throw { message: `Invalid Workout Id ${e}` }

            const toAddSchemaBlocks = workoutIdsToSchemaBlock[e]
            if (workout.category === 'WEIGHT_AND_REPS' || workout.category === 'REPS') {
                // only integer allowed
                toAddSchemaBlocks.forEach(block => {
                    const res = yup.array().of(yup.number().required().integer()).isValidSync(block.default_target)
                    if (!res) throw { message: `${JSON.stringify(block)} is invalid. ${workout.category} should have all integers as target.` }
                })
            }


        })



        // we don't need to validate the workout_id, thanks to the referential integrity (but we don't have it in prod for perf reasons)
        const response = await prisma.$transaction(
            async (prisma) => {

                const returnData: {
                    session_schema: session_schema,
                    blocks: any[],
                } = {
                    session_schema: null,
                    blocks: []
                }
                returnData.session_schema = await prisma.session_schema.create({
                    data: {
                        id: sessionSchemaId,
                        name: validatedData.session_name,
                        owner_id: req.user.id
                    }
                });

                // handle superset
                const handleSuperset = async (supersetSchema: any) => {
                    const supersetId = v4();
                    let supersetSchemaRet: any = {};
                    // create superset
                    const createdSupersetDoc = await prisma.superset_schema.create({
                        data: {
                            id: supersetId,
                            name: supersetSchema.name,
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

                    returnData.blocks.push({
                        ...supersetSchemaRet,
                        type: 'superset_schema_block'
                    })
                }

                // add workout
                const handleWorkout = async (workout: any) => {
                    const doc = await prisma.workout_schema.create({
                        data: {
                            default_target: workout.default_target,
                            id: v4(),
                            session_schema_id: sessionSchemaId,
                            order: workout.order,
                            workout_id: workout.workout_id
                        }
                    })
                    returnData.blocks.push({
                        ...doc,
                        type: 'workout_schema_block'
                    })
                }

                for(const block of validatedData.schema_blocks){
                    if(block.type==='workout_schema_block'){
                        await handleWorkout(block)
                    }else{
                        await handleSuperset(block)
                    }
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
    try {
        // TODO: maybe we can merge it with endpoint to create/; Since we anyhow want both modify and create to give the whole
        // data in one go!
        // But how do we remove the removed items and all?
        throw { message: "Editing schema is disabled for now." }
    } catch (err) {
        return sendErrorResponse(res, err);
    }
})


/**
 * Route to get all sessionSchema owned by the user
 */
router.get('/all/', isAuthenticated, async (req, res) => {
    try {
        let schemas: any = await prisma.$queryRaw`SELECT session_schema.id, session_schema.name,  max(start_timestamp) as last_attempted_at
        FROM session_schema
        LEFT JOIN session_instance ON session_instance.session_schema_id = session_schema.id
        WHERE session_schema.owner_id=${req.user.id}
        GROUP BY session_schema.id, session_schema.name`

        const ids = schemas.map((e: any) => e.id);

        const activeIds = await prisma.session_instance.findMany({
            where: {
                end_timestamp: null,
            },
            select: {
                id: true,
                session_schema_id: true,
                end_timestamp: true
            }
        })

        schemas = schemas.map((e: any) => {
            const found = activeIds.find(sessionInstance => {
                return sessionInstance.session_schema_id === e.id
            })

            if (found) return { ...e, end_timestamp: found.end_timestamp }
            return e;
        })

        res.send({ error: false, schemas })
    } catch (err) {
        return sendErrorResponse(res, err);
    }
})

export default router
