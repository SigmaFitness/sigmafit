import * as yup from 'yup'


export const isValidUUID = (id: string) => {
    return yup.string().uuid().required().isValid(id)
}
