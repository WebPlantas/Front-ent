// const bcrypt = require('bcryptjs');
// const { PASSWORD } = require('../../const/const');
// const helpers = {};

// helpers.encrytPassword = async (password)=>{
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     return hash;
// };

// helpers.matchPassword = async (password, savedPassword) =>{
//     try {
//         return await bcrypt.compare(password, savedPassword);
//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports = helpers;