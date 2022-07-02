import { prisma } from '../db';
import { Router } from 'express'
import { sendErrorResponse } from '../utils/sendErrorResponse';
import { signInPayloadValidator, signUpPayloadValidator } from '../validators/auth';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import { setAuthTokenAsCookie } from '../utils/setAuthTokenAsCookie';
import { isAuthenticated } from '../utils/authMiddlewares';

const router = Router()

/**
 * Router to signIn user to platform
 */
router.post('/signIn/', async (req, res) => {

    try {
        const data = req.body;
        signInPayloadValidator.validateSync(data)
        // login user

        const user = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        })

        if(!user) throw {status: 400, message: 'Invalid username or pwd'}

        const { hashed_password, ...userDetailsWithoutPwd } = user

        // compare pwd
        const isValidPwd = await bcrypt.compare(data.password, hashed_password)
        if(!isValidPwd) throw {status: 400, message: 'Invalid username or pwd'}

        // setting auth cookie
        setAuthTokenAsCookie(res, user)

        res.send({
            error: false,
            user: userDetailsWithoutPwd
        })
    } catch (err) {
        return sendErrorResponse(res, err)
    }




})

/**
 * Router to signUp user to platform
 */
router.post('/signUp/', async (req, res) => {
    try {
        const data = req.body;
        signUpPayloadValidator.validateSync(data)

        const uuid = uuidv4()
        const hashedPassword = await bcrypt.hash(data.password, 10)
        // create user
        const user = await prisma.user.create({
            // id: uuid,
            data: {
                id: uuid,
                first_name: data.first_name,
                last_name: data.first_name,
                email: data.email,
                hashed_password: hashedPassword,
            }
        })

        const { hashed_password, ...userDetailsWithoutPwd } = user
        setAuthTokenAsCookie(res, user)

        res.send({
            error: false,
            user: userDetailsWithoutPwd
        })

    } catch (err) {
        console.log(err)
        return sendErrorResponse(res, err)
    }
})


/**
 * Route to check if the user is authenticated or not
 */
router.get('/status/', isAuthenticated, (req, res) => {
    // If I'm inside this route handler
    // it means that I'm authenticated
    res.send({
        error: false,
        status: 'AUTHENTICATED'
    })
})


export default router
