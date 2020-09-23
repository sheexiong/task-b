const { Quote } = require('../models/index');

exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        res.status(400).send({
            message: 'Content cannot be empty!',
        });
        return;
    }

    // Create new quote
    const quote = {
        content: req.body.content,
        author: req.body.author,
    };

    // Save to database
    Quote.create(quote)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
};

exports.findAll = (req, res) => {
    Quote.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Quote.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving quote with id=${id}`,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Quote.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: `Quote ${id} was updated successfully`,
                });
            } else {
                res.send({
                    message: `Failed to update quote ${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error updating quote with id=${id}`,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Quote.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: `Quote ${id} was deleted successfully`,
                });
            } else {
                res.send({
                    message: `Failed to delete quote ${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error deleting quote with id=${id}`,
            });
        });
};

exports.deleteAll = (req, res) => {
    Quote.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} quotes were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: err,
                message: 'Error occured while removing all quotes',
            });
        });
};
