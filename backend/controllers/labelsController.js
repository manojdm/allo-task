import data from "../data.js";

export const getLabels = (req, res) => {

    try {
        res.json(data["labels"])

    } catch(e) {
        throw new Error(e.message)
    }

}