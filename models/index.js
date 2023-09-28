const { User, Thought } = require('../models');

const getThought = {

    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .populate({
            path: 'reactions',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No with that ID' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

      createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user with that ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'No thought with that ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
        .then((thought) => {
            if(!thought){
                res.status(404).json({message: 'No thought with that ID'}) 
    
    
            }      
            
            return User.findOneAndUpdate(
                {_id:req.body.userID},
                {$pull:{thoughts:thought._id}},
                {new:true}
     
            )
       }).then(() => res.json({message: 'Thought Deleted'})
       ).catch((err) => res.status(500).json(err));
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'No with that id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    deleteReaction(req, res) {

      
          Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId} } },
            { runValidators: true, new: true }
          )
          .then((dbUserData) => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that ID' });
                return;
            }
            res.json({message: 'Reaction deleted'});
        })
        .catch(err => res.json(err));
    }
};

module.exports = getThought;