"use strict";

let func= (v)=> {
    
    for(let s of v){
        let out="";
        if(s.length>=4){
            out=`${s.substring(0, 2)}${s.substring(s.length-2,s.length)}`;

        }
        if(s.length==3){
            out=`${s.substring(0, 2)}${s.substring(1,3)}`;
        }
        if(s.length==2){
            out=`${s.substring(0, 2)}${s.substring(0,2)}`;
        }

        console.log(out);
    }
};

let a=["ciaof","franco","ci"];
func(a);
console.log("prova");
