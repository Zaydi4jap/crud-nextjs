import {Schema, model, models} from "mongoose"

const FormSchema = new Schema({
    id: {
        type: String,
        required: [true, "The form ID is required"],
        unique: true,
        trim: true,
        maxlength: [40, "ID cannot be greater than 40 characters"]
    },
    first: {
        type: String,
        required: [true, "The form first name is required"],
        trim: true,
        maxlength: [40, "first name cannot be greater than 40 characters"]
    },
    last: {
        type: String,
        required: [true, "The form last name is required"],
        trim: true,
        maxlength: [40, "last name cannot be greater than 40 characters"]
    },
    email: {
        type: String,
        required: [true, "The form email is required"],
        trim: true,
        maxlength: [40, "email cannot be greater than 40 characters"]
    },
    phone: {
        type: Number,
        required: [true, "The form phone is required"],
        trim: true,
        maxlength: [40, "phone cannot be greater than 40 characters"]
    },
    address: {
        type: String,
        required: [true, "The form address is required"],
        trim: true,
        maxlength: [100, "address cannot be greater than 100 characters"]
    },
},
{
    timestamps: true,
    versionKey: false,
}
);

export default models.Form || model("Form", FormSchema);