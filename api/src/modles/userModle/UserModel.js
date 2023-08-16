import UserSchema from "./UserSchema.js";

export const insertUser = (obj) => {
    return UserSchema(obj).save()
}

//remember this filter should be an object
export const getOneUser = (filter) => {
    return UserSchema.findOne(filter)
}