//Guardar en el cache dinamico
function actualizaCacheDinamico( dynamicCache, req, res){

if( res.ok) {
    return caches.open( dynamicCache ).then( cache => {

        //Acá no entiendo porque se hace un hash.  Esto hay que profundizarlo
        cache.put( req, res.clone());
        return res.clone();
    });
} else {
    //Segun la lógica, si el flujo toma por aca
    //Ya no hay nada que hacer, puede presentarse con el 404
    return res;
}

}