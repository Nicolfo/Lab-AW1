"use strict"
const dayjs = require('dayjs');
function Film (id,title,favorites=false,date,rating){
    this.id=id;
    this.title=title;
    this.date=date;
    this.rating=rating;
    this.favorites=favorites;
}

let FilmLibrary={
    filmati : [],
    addNewFilm : (film)=>{FilmLibrary.filmati.push(film)},
    sortByDate : () => {
        FilmLibrary.filmati.sort((x,y)=>{
            if(x.date==undefined)
                return 1;
            if(y.date==undefined)
                return -1;
            return x.date.diff(y.date);
        });
    },
    printer: (type=true)=>{
        if(type)
            console.log("***** List of films *****");
        for(const a of FilmLibrary.filmati){
           if(a.date!=undefined)
            console.log(`Id: ${a.id}, Title: ${a.title}, Favorite: ${a.favorites}, Whatch Date: ${a.date.format("DD-MM-YY")}, Rating: ${a.rating||"<not assigned>"}`);
            else 
            console.log(`Id: ${a.id}, Title: ${a.title}, Favorite: ${a.favorites}, Whatch Date: <not defined>, Rating: ${a.rating||"<not assigned>"}`);
        }
    },
    deleteFilm : (f_id)=>{
        let pos=0;
        
        for(let f of FilmLibrary.filmati){
            if(f_id==f.id)
                break;
            pos++;
        }
        FilmLibrary.filmati.splice(pos,1);
    },
    resetWatchedFilms : () => {
        for(let f of FilmLibrary.filmati){
            f.date=undefined;
        }
    },
    getRated : ()=>{
        let copy=[...FilmLibrary.filmati];
        console.log("***** Films filtered, only the rated ones *****");
        for(let i=0; i<FilmLibrary.filmati.length;i++){
            if(FilmLibrary.filmati[i].rating===undefined){
                FilmLibrary.filmati.splice(i,1);
                i--;
            }
        }
        FilmLibrary.filmati.sort((x,y)=>(x.rating-y.rating));
        FilmLibrary.printer(false);
        let copy2=[...FilmLibrary.filmati];                         //si poteva evitare lavorando su copy direttamente ma non
        FilmLibrary.filmati=[...copy];                              //volevo rifare il metodo di stampa
        return copy2;
    }

}

FilmLibrary.addNewFilm(new Film(1,"Pulp Fiction",true,new dayjs('10 March 2022'),5));
FilmLibrary.addNewFilm(new Film(2,"21 Gram",true,new dayjs('17 March 2022'),4));
FilmLibrary.addNewFilm(new Film(3,"Star Wars",false));
FilmLibrary.addNewFilm(new Film(4,"Matrix",false));
FilmLibrary.addNewFilm(new Film(5,"Shrek",false,new dayjs('21 March 2022'),3));

//FilmLibrary.printer();
FilmLibrary.printer();
FilmLibrary.getRated();
