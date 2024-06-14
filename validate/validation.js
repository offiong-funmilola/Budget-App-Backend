const { body, checkExact} = require('express-validator')


module.exports = checkExact([
    body('email')
    .custom((value, {req}) => {
        User.findOne({email: value})
        .then(userDoc => {
            if(userDoc){
                return Promise.reject('E-mail address already exist')
            }
        })
    }),
    body('name').notEmpty().withMessage('This field is required'),
    body('password').notEmpty().withMessage('This field is required'),
    body('confirmPassword').notEmpty().withMessage('This field is required')
    ], 
    { locations: ['body'] }
)