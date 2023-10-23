import User from '../../users/users.model.js'
import { Repair } from '../../repairs/repairs.model.js'

export const initModel = () => {
    User.hasMany(Repair, {foreignKey: 'created_By', as: 'userDataAndRepair'})
    Repair.belongsTo(User, {foreignKey: 'created_By'})
}
