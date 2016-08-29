"use strict";

export default function(msg){
    if(NODE_ENV == 'development'){
        console.log(msg);
    }

    alert(msg);
}
