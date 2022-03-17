"use strict"
const dayjs = require('dayjs');
const sqlite = require('sqlite3');

function Film (id,title,favorites=false,date,rating){
    this.id=id;
    this.title=title;
    this.date=date;
    this.rating=rating;
    this.favorites=favorites;
}

function FilmLibrary(){
    this.filmati = [];
    this.addNewFilm =(film)=>{this.filmati.push(film)};
    this.sortByDate = () => {
        FilmLibrary.filmati.sort((x,y)=>{
            if(x.date==undefined)
                return 1;
            if(y.date==undefined)
                return -1;
            return x.date.diff(y.date);
        });
    };
    this.printer=(type=true)=>{
        if(type)
            console.log("***** List of films *****");
        for(const a of this.filmati){
           if(a.date!=undefined)
            console.log(`Id: ${a.id}, Title: ${a.title}, Favorite: ${a.favorites}, Whatch Date: ${a.date.format("DD-MM-YY")}, Rating: ${a.rating||"<not assigned>"}`);
            else 
            console.log(`Id: ${a.id}, Title: ${a.title}, Favorite: ${a.favorites}, Whatch Date: <not defined>, Rating: ${a.rating||"<not assigned>"}`);
        }
    };
    this.deleteFilm =(f_id)=>{
        let pos=0;
        
        for(let f of this.filmati){
            if(f_id==f.id)
                break;
            pos++;
        }
        this.filmati.splice(pos,1);
    };
    this.resetWatchedFilms = () => {
        for(let f of this.filmati){
            f.date=undefined;
        }
    };
    this.getRated = ()=>{
        let copy=[...this.filmati];
        console.log("***** Films filtered, only the rated ones *****");
        for(let i=0; i<this.filmati.length;i++){
            if(this.filmati[i].rating===undefined){
                this.filmati.splice(i,1);
                i--;
            }
        }
        this.filmati.sort((x,y)=>(x.rating-y.rating));
        this.printer(false);
        let copy2=[...this.filmati];                         //si poteva evitare lavorando su copy direttamente ma non
        this.filmati=[...copy];                              //volevo rifare il metodo di stampa
        return copy2;
    }

}
function promDB(dataBase){
    return new Promise((resolve,reject) =>{
        let query="SELECT * FROM films";
        dataBase.all(query,(err,rows)=>{
            if(err)
                reject(new Error("Errore DB"));
            else
                resolve(rows);
                    
        });
    });
}
let arrayFromDB=(db, fl)=>{
    
    promDB(db).then((rows)=>{
        for(let row of rows){
            fl.addNewFilm(new Film(row.id,row.title,row.favorites==1?true:false,row.whatchdate?new dayjs(row.watchdate):undefined,row.rating));
        }
        fl.printer();
    }).catch((Err)=>{
        console.log(Err.toString());
    }).finally(()=>{
        return fl.filmati;
    });
    
}


const db = new sqlite.Database('./LAB2-Nicolò/films.db',(err)=>{if(err) throw err;});
let fl1=new FilmLibrary();
let vett=arrayFromDB(db,fl1);



db.close();