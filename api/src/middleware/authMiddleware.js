import { getOneUser } from "../modles/userModle/UserModel.js"

export const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (authorization) {
            const user = await getOneUser({ _id: authorization })
            if (user?._id) {
                req.userInfo = user;
                return next();
            }
        }
        res.status(403).json({
            status: 'error',
            message: 'Unauthorised'
        });
    } catch (error) {
        next(error)
    }
}