const { User, Role } = require('../../db/models');

checkDuplicateEmail = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        res.status(422).send({
            title: 'Validation Error',
            errors: {
                email: "Email has already been registered!"
            }
        });
        return;
    }
    next();
}

checkRoleExists = async (req, res, next) => {
    if (req.body.roles) {
        const rolesData = await Role.findAll({ attributes: ['name']});
        let roles = [];
        rolesData.forEach((role) => roles.push(role.name));
        console.log(roles);
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!roles.includes(req.body.roles[i])) {
                res.status(422).send({
                    title: 'Validation Error',
                    errors:{
                        roles: `Role "${req.body.roles[i]}" does not exist!`
                    }
                });
                return;
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRoleExists: checkRoleExists
}

module.exports = verifySignUp;