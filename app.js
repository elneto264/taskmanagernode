require('colors');

const { inquirerMenu,
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
 
}= require('./helpers/inquirer');
const { guardarDB, leeDB } = require('./helpers/savefile');
const Tareas = require('./models/tareas');


const main = async () => {


    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leeDB();

    if( tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }



    do {
        opt = await inquirerMenu();
        switch(opt){

            case '1':

                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc)

            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':// listar completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4'://listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':// completado | pendiente
               const ids = await mostrarListadoChecklist(tareas.listadoArr);
               tareas.toggleCompletadas(ids);
            break;

            case '6'://borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0'){
                    const ok = confirmar('¿Seguro que quieres borrarlo?');
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log('Eliminada');
                    }
                }
                
                
            break;
        }

        guardarDB( tareas.listadoArr);

        await pausa();

    }while(opt !== '0');
    


}

main();