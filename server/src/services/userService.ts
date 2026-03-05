import User from '../models/User.js'; // L'extension .js est vitale ici

export const userService = {
    async getAllUsers() {
        return await User.findAll();
    },
    async createUser(data: any) {
        return await User.create(data);
    },
    async deleteUser(id: any) {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            return true;
        }
        return false;
    }
};