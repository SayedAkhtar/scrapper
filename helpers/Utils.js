const sleep = async (seconds) => {
    if(seconds != '' || seconds != undefined){
        await new Promise((r) => setTimeout(r, seconds*1000));
    }else{
        await new Promise((r) => setTimeout(r, 2000));
    }
}

exports.sleep = sleep;