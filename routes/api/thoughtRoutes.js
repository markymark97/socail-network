const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController');

router.get('/', async (req, res) => {
    res.json( thoughtController.getAllThoughts());
});

router.get('/:id', async (req, res) => {
    res.json( thoughtController.getThoughtById(req.params.id));
});

router.post('/', async (req, res) => {
    res.json( thoughtController.createThought(req.body));
});

router.put('/:id', async (req, res) => {
    try {
        const updatedThought =  thoughtController.updateThought(req.params.id, req.body);
        res.json(updatedThought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    res.json( thoughtController.deleteThought(req.params.id));
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought =  thoughtController.addReaction(req.params.thoughtId, req.body);
        res.json(thought);
    } catch (err) {
        console.error(err);  
        res.status(500).json({err});  
    }
});


router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought =  thoughtController.removeReaction(req.params.thoughtId, req.params.reactionId);
        res.json(thought);
    } catch (error) {
        res.status(500).json({err});
    }
});

module.exports = router;