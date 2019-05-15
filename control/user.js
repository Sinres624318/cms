var userModel = require('../model/user');
var crypto = require('crypto');
const reg = (req, res) => {
    let {username, password} = req.body;
    userModel.select({username}, (result) => {
        if (result) {
            res.json({
                state: false,
                info: '用户已存在'
            });
        } else {
            const hash = crypto.createHash('sha256');
            hash.update(password);
            userModel.save({username, password: hash.digest('hex')}, (result) => {
                res.json({
                    state: true,
                    info: '注册成功'
                });
            });
        }
    })
};

const login = (req, res) => {
    let {username, password} = req.body;
    console.log(username, password);
    userModel.select({username}, (result) => {
        if (result) {
            const hash = crypto.createHash('sha256');
            hash.update(password);
            console.log(result, result.password);
            if (result.password == hash.digest('hex')) {
                res.json({
                    state: true,
                    info: '登录成功'
                });
            } else {
                res.json({
                    state: false,
                    info: '用户名与密码不匹配'
                });
            }

        } else {
            res.json({
                state: false,
                info: '用户不存在'
            });
        }
    });
};

module.exports = {
    reg,
    login
};