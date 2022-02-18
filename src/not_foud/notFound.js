/**
 * 
 * @param {*} req - incomming request object 
 * @param {*} res - response object
 * @returns 
 */
const notFoundController = (req, res) => {
    res.status(404)
    return res.json({ status: 404, data: 'Enpoint not found' })
}

module.exports = {
    notFoundController
}