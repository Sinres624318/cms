const mongoose = require('../db/database').mongoose;

const Job = mongoose.model('job', {
    companyName: String,
    positionName: String,
    eduClaim: String,
    positionSalary: String,
    positionTechnology: String,
    positionClaim: String,
    mainWork: String,
    companyLogo: String,
    publishDate: String
});

const save = (info, func) => {
    const job = new Job(info);
    job.save().then((result) => {
        func(result);
    });
};
const del = (info, func) => {
    Job.remove(info).then((result) => {
        func(result);
    });
};
const update = (id, info, func) => {
    Job.update(id, {$set: info}).then((result) => {
        func(result);
    });
};
const select = (info, func) => {
    if (info) {
        Job.find(info).then((result) => {
            func(result);
        });
    } else {
        Job.find().then((result) => {
            func(result);
        });
    }

};


module.exports = {
    save,
    del,
    update,
    select
};