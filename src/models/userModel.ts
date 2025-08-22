import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    createdat: Date,
    updatedat: Date
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
{timestamps: true}
)

const User = mongoose.model<IUser>("User", userSchema)

export default User