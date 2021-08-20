
const { v4: uuidv4} = require('uuid');

class Tarea {

    id = '';
    desc = '';
    competadoEn = null;

    constructor( desc ){

        this.id = uuidv4();
        this.desc = desc;
        this.competadoEn = null;

    }






}

module.exports = Tarea;