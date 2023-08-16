import TransactionSchema from "./TransactionSchema.js";

export const addTransaction = (obj) => {
    return TransactionSchema(obj).save()
}

//make sure filter is an object
export const getTransaction = (obj) => {
    return TransactionSchema.find(obj)
}

export const deleteTransaction = (filter) => {
    return TransactionSchema.findOneAndDelete(filter)
}