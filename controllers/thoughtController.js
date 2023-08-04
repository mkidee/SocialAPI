const { User, Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find({})
            .then(thought => res.json(thought))
            .catch(err => res.status(400).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'No thought was found using this id.' })
                    : res.json(thought))
            .catch(err => res.status(400).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _Id } },
                    { new: true }
                );
            })
            .then((thought) => 
                !thought ? res.status(404).json({message: 'No thought was found using this id.'})
                    : res.json(thought))
                .catch(err => res.status(400).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user ? res.status(404).json({ message: 'No thought was found using this id.' })
                    : res.json(user))
                .catch(err => res.status(400).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'No thought was found using this id.' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    ))
                .then((user) =>
                    !user
                    ? res.status(404).json({ message: 'Thought deleted, but no user was found' })
                    : res.json({ message: 'Thought was successfully deleted.' })
                )
                .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'No thought was found using this id' })
                    : res.json(thought))
            .catch(err => res.status(400).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'No thought was found using this id' })
                    : res.json(thought))
            .catch(err => res.status(400).json(err));
    }
};