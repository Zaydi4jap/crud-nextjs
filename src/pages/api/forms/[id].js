import Form from "../../../model/Form";
import {dbConnect, runMidleware} from "../../../utils/index";
import Morgan from "morgan";

dbConnect();

export default async(req, res) => {
    const { method, body, query: {id} } = req;
    const morgan = Morgan("dev");

    switch(method){
        case "GET":
            try{
                const form = await Form.findById(id);
                if(!form) return res.status(404).json({msg: "Form doesn't exists"});
                await runMidleware(req, res, morgan);
                return res.status(200).json(form);
            }   catch (err) {
                return res.status(400).json({ msg: err.message});
            }
        case "DELETE":
            try {
                const deletedForm = await Form.findByIdAndDelete(id);
                if(!deletedForm) return res.status(404).json({msg: "Form doesn't exists"});
                await runMidleware(req, res, morgan);
                return res.status(204).json();
            }   catch (err) {
                return res.status(400).json({ msg: err.message});
            }
        case "PUT":
            try {
                const updateForm = await Form.findByIdAndUpdate(id, body, {
                    new: true,
                    runValidators: true,
                });

                if(!updateForm) return res.status(404).json({msg: "Form doesn't exists"});
                return res.status(200).json(updateForm);
            }   catch (err) {
                return res.status(400).json({ msg: err.message});
            }
        default:
            return res.status(400).json({msg: "This method is not supported"});
    }
};