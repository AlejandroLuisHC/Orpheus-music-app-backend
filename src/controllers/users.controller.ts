import mongoose from "mongoose";
import { User } from "../models";

const userController = {
    getAllUsers: async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const users: UserDocument[] = await User
                .find({})
                .populate("favGenres")
                .populate("favPlaylists")
                .populate("favAlbums")
                .populate("favTracks")
                .populate("followers")
                .populate("following")
                .lean();

            if (users.length < 1) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `The DB is currently empty`
                });
            }

            res.status(200).send(users);

        } catch (err) {
            res.status(400).send(err.message);
        }

    },
    getUserById: async (req: express.Request, res: express.Response): Promise<void> => {
        const { params: { id } } = req;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            });
        }

        try {
            const user: UserDocument | null = await User
                .findById(id)
                .populate("favGenres")
                .populate("favPlaylists")
                .populate("favAlbums")
                .populate("favTracks")
                .populate("followers")
                .populate("following")
                .lean();

            if (!user) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `User ${id} was not found`
                });
            }

            res.status(200).send(user);

        } catch (err) {
            res.status(400).send(err);

        }

    },
    postUser: async (req: express.Request, res: express.Response): Promise<void> => {
        const { body } = req;

        try {
            const userExists: UserDocument | null = await User.findOne({ email: body.email });
            if (userExists) {
                return res.status(400).send({
                    status: "false",
                    message: "User already stored in the DB"
                });
            }
            const user: UserDocument = await User.create({ ...body });
            res.status(201).send({
                status: "Created",
                data: user
            });

        } catch (err) {
            res.status(400).send(err.message);

        }

    },
    deleteUser: async (req: express.Request, res: express.Response): Promise<void> => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `User ${id} is invalid`
            })
        }

        try {
            const user = await User.findByIdAndDelete(id)

            if (!user) {
                res.status(404).send({
                    status: "FALSE",
                    message: `User ${id} was not found`
                })

            }

            res.status(200).send(user)

        } catch (err) {
            res.status(400).send(err)

        }

    },
    patchUser: async (req: express.Request, res: express.Response): Promise<void> => {
        const { params: { id }, body } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `User ${id} is invalid`
            })
        }

        try {
            const user = await User.findByIdAndUpdate(
                { _id: id },
                { ...body }
            )

            if (!user) {
                res.status(404).send({
                    status: "FALSE",
                    message: `User ${id} was not found`
                })

            }
            res.status(201).send({
                status: "OK",
                message: `User ${id} updated successfully`
            })

        } catch (err) {
            res.status(400).send(err)

        }

    }
}

module.exports = {
    getAllUsers: userController.getAllUsers,
    getUserById: userController.getUserById,
    postUser: userController.postUser,
    deleteUser: userController.deleteUser,
    patchUser: userController.patchUser
}