import Form from "../../../model/Form";
import {dbConnect, runMidleware} from "../../../utils/index";
import Morgan from "morgan";

dbConnect();

export default async(req, res) => {
    const { method, body } = req;
    const morgan = Morgan("dev");

    switch(method){
        case "GET":
            try{
                const forms = await Form.find();
                await runMidleware(req, res, morgan);
                return res.status(200).json(forms);
            }   catch (err) {
                return res.status(400).json({ msg: err.message});
            }
        case "POST":
            try {
                const newForm = new Form(body);
                const savedForm = await newForm.save();
                await runMidleware(req, res, morgan);
                return res.status(200).json(savedForm);
            }   catch (err) {
                return res.status(400).json({ msg: err.message});
            }
        default:
            return res.status(400).json({msg: "This method is not supported"});
    }
};