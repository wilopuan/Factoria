//Así se incluyen los archivos externos
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

/**
 * Nota: Use siempre los "/" porque el otro es un caracter de escape
 */

const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

self.addEventListener('install', e =>{

    const cacheStatic = caches.open( STATIC_CACHE).then( cache => 
        cache.addAll( APP_SHELL));

    const cacheInmutable = caches.open( INMUTABLE_CACHE).then( cache => 
        cache.addAll( APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});

//Aca puede aplicar el borrado de versiones del cache.
//El heuristico.

self.addEventListener('fetch', e =>{

    const respuesta = caches.match( e.request ).then( res => {

        if ( res ){
            return res;
        } else {
            //Es probable que las referencias hagan referencia a otra url
            return fetch( e.request ).then( newRes => {
                //Invoca funcion en libreria
                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes)
            });
        }
    });

    e.respondWith(respuesta);
})