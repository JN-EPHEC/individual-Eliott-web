import Router from 'express';
import User from '../models/User.js';

const router = Router();


router.get('/', async (req : Request, res : Response) => {
    const fullUsers = await User.findAll();
    res.json(fullUsers);
});

router.post('/', async (req : Request, res : Response) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
});

router.delete('/:id', async (req : Request, res : Response) => {
    const deletUser = await User.findByPk(req.params.id);
    if (!deletUser) return res.status(404).json({error : "aucun ustilisateur trouvé avec cet id"});
    await deletUser.destroy();
    res.json({message: `User ${req.params.id} a été supprimé de la base de données`});
});

export default router;