const obligationService = require("./obligation");

exports.index = (req, res, next) => {
    const todo = obligationService.getObligations(req.query);
    res.status(200).json({ todo: todo});
};

index();