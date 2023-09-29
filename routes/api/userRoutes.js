const router = require('express').Router();
const userController = require('../../controllers/userController');

router.get('/', async (req, res) => {
    res.json( userController.getAllUsers());
});

router.get('/:id', async (req, res) => {
    res.json( userController.getUserById(req.params.id));
});

router.post('/', async (req, res) => {
    res.json( userController.createUser(req.body));
});


router.put('/:id', async (req, res) => {
    res.json( userController.updateUser(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.json( userController.deleteUser(req.params.id));
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userWithNewFriend =  userController.addFriend(req.params.userId, req.params.friendId);
        res.json(userWithNewFriend);
    } catch (error) {
        res.status(500).json({ err});
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userWithoutFriend = await userController.removeFriend(req.params.userId, req.params.friendId);
        res.json(userWithoutFriend);
    } catch (error) {
        res.status(500).json({ err});
    }
});

module.exports = router;