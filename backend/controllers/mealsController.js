import data from "../data.js"

export const getMeals = (req, res) => {
    
    try {
        res.json(data["meals"])

    } catch(e) {
        throw new Error(e.message)
    }

}