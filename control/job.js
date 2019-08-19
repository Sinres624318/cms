const path = require('path');
const jobModel = require('../model/job');
const Cookie = require('../utils/getCookie');
const JwtToken = require('../utils/token');
const dateString = require('../utils/date');


const addJob = (req, res) => {
    const token = Cookie.getCookie(req, "token");
    JwtToken.tokenVerify(token, 'verification', (err) => {
        if (err) {
            res.json({
                state: false,
                info: '请重新登录'
            });
        } else {
            const {companyName, positionName, eduClaim, positionSalary, positionTechnology, positionClaim, mainWork} = req.body;
            const companyLogo = req.files.companyLogo[0].path;
            const logoPath = 'img/' + path.parse(companyLogo).base;
            const publishDate = dateString(new Date(), '-');
            jobModel.save({
                companyName,
                positionName,
                eduClaim,
                positionSalary,
                positionTechnology,
                positionClaim,
                mainWork,
                companyLogo: logoPath,
                publishDate
            }, (result) => {
                console.log(result);
                res.json({
                    state: true,
                    info: '保存成功'
                });
            });
        }
    });
};

const selectJob = (req, res) => {
    const token = Cookie.getCookie(req, 'token');
    JwtToken.tokenVerify(token, 'verification', (err) => {
        // Object.keys(req.query).length === 0 ||JSON.stringify(req.query) === '{}'
        let selectCondition = Object.keys(req.query).length === 0 ? undefined : req.query;
        console.log(selectCondition);
        if (!err) {
            jobModel.select(selectCondition, (data) => {
                res.json({
                    state: true,
                    data,
                    info: 'OK'
                });
            });
        }
    });
};

const deleteJob = (req, res) => {
    const token = Cookie.getCookie(req, 'token');
    JwtToken.tokenVerify(token, 'verification', (err) => {
        if (!err) {
            let _id = req.query;
            jobModel.del({_id}, (data) => {
                res.json({
                    state: true,
                    info: '删除成功'
                });
            });
        }
    });
};
const updateJob = (req, res) => {
    const token = Cookie.getCookie(req, 'token');
    JwtToken.tokenVerify(token, 'verification', (err) => {
        if (!err) {
            const {_id, companyName, positionName, eduClaim, positionSalary, positionTechnology, positionClaim, mainWork} = req.body;
            const companyLogo = req.files.companyLogo[0].path;
            const logoPath = 'img/' + path.parse(companyLogo).base;
            const publishDate = dateString(new Date(), '-');
            jobModel.update({_id}, {
                companyName,
                positionName,
                eduClaim,
                positionSalary,
                positionTechnology,
                positionClaim,
                mainWork,
                companyLogo: logoPath,
                publishDate
            }, (data) => {
                res.json({
                    state: true,
                    info: '修改成功'
                });
            });
        }
    });
};
module.exports = {
    addJob,
    selectJob,
    deleteJob,
    updateJob
};
