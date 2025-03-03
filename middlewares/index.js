const fs = require('fs');

function logReqRes(fileName){
    return (req, res, next)=>{
        fs.appendFile(
            fileName,
            `\n${Date.now()}:${req.id} ${req.method}:${req.path}\n`,
            (err, data)=>{
                next()
            }
        )
    }
}

module.exports = {logReqRes}