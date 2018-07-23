function pick(object,props){


    let newObject = {};

    props.forEach(prop=>{
		if(object[prop]!==undefined)
        	newObject[prop] = object[prop];
		else
			newObject[prop] = "";
    });

    return newObject;


}
module.exports = pick;