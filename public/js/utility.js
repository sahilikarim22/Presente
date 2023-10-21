//funciones comunes para la base de datos

var dbPromise = idb.open('usuarios-store',1,function(db){
    if(!db.objectStoreNames.contains('usuarios')){
        db.createObjectStore('usuarios', {keyPath: 'id'});
    }
});


function escribeData(data){

}