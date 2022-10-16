const util = require('node:util');
const exec  = util.promisify(require('child_process').exec);
const fs = require('fs/promises');
const cuid = require('cuid');

const compilePython = async (req, res) => {
    const {code} = req.body;
    const filename = cuid.slug();
    const path = `${__dirname}/temp/${filename}.py`
    try{
        console.log(path)
        await fs.writeFile(path, code);
        console.log("File Written")
        const command = `python ${path}`;
        console.log(command)
        const {stderr, stdout} = await exec(command);
        console.log("Command done")
        if(stderr){
            if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1){
                    const out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
                    res.status(400).json(out);
            }else{
                console.log(`INFO: ${filename}.py contained an error while executing`);
                const out = { error : stderr };
                res.status(200).json(out)								
            }
        }
        console.log(`INFO: ${filename}.py successfully executed !`);
        const out = { output : stdout};
        res.status(200).json(out);
    }catch(err){
        res.status(500).json(err);
    }finally{
        console.log(`INFO: ${filename}.py successfully deleted!`);
        await fs.unlink(path)
    }
}

const compilePythonWithInput = async (req, res) => {
    const {code, input} = req.body;
    const filename = cuid.slug();
    const path = `${__dirname}/temp/${filename}.py`
    const inputFilePath = `${__dirname}/temp/${filename}_input.txt`
    try{
        await fs.writeFile(path, code);
        await fs.writeFile(inputFilePath, input)
        const command =  `python ${path} < ${inputFilePath}`;
        const {stderr, stdout} = await exec(command);
        if(stderr){
            if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1){
                    const out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
                    res.status(400).json(out);
            }else{
                console.log(`INFO: ${filename}.py contained an error while executing`);
                const out = { error : stderr };
                res.status(200).json(out)								
            }
        }
        console.log(`INFO: ${filename}.py successfully executed !`);
        const out = { output : stdout};
        res.status(200).json(out);
    }catch(err){
        res.status(500).json(err);
    }finally{
        console.log(`INFO: ${filename}.py successfully deleted!`);
        await fs.unlink(path);
        console.log(`INFO: ${filename}_input.txt successfully deleted!`);
        await fs.unlink(inputFilePath);
    }
}

module.exports = {
    compilePython,
    compilePythonWithInput
}