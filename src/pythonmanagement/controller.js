const util = require('node:util');
const exec  = util.promisify(require('child_process').exec);
const fs = require('fs/promises');
const cuid = require('cuid');

const compilePython = async (req, res) => {
    const {code} = req.body;
    const filename = cuid.slug();
    const path = `${__dirname}/temp/${filename}.py`
    try{
    
        await fs.writeFile(path, code);
        const command = `python ${path}`;
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
        throw new Error(err)
    }finally{
        console.log(`INFO: ${filename}.py successfully deleted!`);
        await fs.unlink(path)
    }
}

const compilePythonWithInput = async (req, res) => {
    const {code ,input} = req.body;
    // try{
    //     var filename = cuid.slug();
    //     path = './temp/';
    
    //     fs.writeFile( path  +  filename +'.py' , code  , function(err ){			
    //         if(exports.stats)
    //         {
    //             if(err)
    //             console.log('ERROR: '.red + err);
    //             else
    //             console.log('INFO: '.green + filename +'.py created');	
    //         }
    //         if(!err)
    //         {
    
    //             fs.writeFile(path + filename + 'input.txt' , input , function(err){
    //                 if(exports.stats)
    //                 {
    //                     if(err)
    //                     console.log('ERROR: '.red + err);
    //                     else
    //                     console.log('INFO: '.green + filename +'input.txt created');	
    //                 }
    //                 if(!err)
    //                 {
    //                     var command = 'python ' + path + filename +'.py < ' + path + filename +'input.txt ' ;
    //                     exec( command , function ( error , stdout , stderr ){
    //                         if(error)
    //                         {
    //                             if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
    //                             {
    //                                 var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
    //                                 res.status(400).json(out);
    //                             }
    //                             else
    //                             {
    //                                 if(exports.stats)
    //                                 {
    //                                     console.log('INFO: '.green + filename + '.py contained an error while executing');
    //                                 }
    //                                 var out = { error : stderr };
    //                                 res.status(400).json(out);
    //                             }													
    //                         }
    //                         else
    //                         {
    //                             if(exports.stats)
    //                             {
    //                                 console.log('INFO: '.green + filename + '.py successfully executed !');
    //                             }
    //                             var out = { output : stdout};
    //                             res.status(200).json(out);
    //                         }
    //                     });						
    //                 }
    //             });
    //         }
    //     });
    // }catch(err){
    //     throw new Error(err);
    // }
}

module.exports = {
    compilePython,
    compilePythonWithInput
}