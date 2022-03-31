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

function FilmLibrary(db){
    this.filmati = [];
    this.db=db;
    this.addNewFilm =(film)=>{this.filmati.push(film)};
    this.sortByDate = () => {
        this.filmati.sort((x,y)=>{
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
    this.deleteAll=()=>{this.filmati=[];};
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
    this.arrayFromDB=async (type=0,par)=>{
        let rows;
        this.deleteAll();
        if(type!=undefined && type<3)
            rows= await this.promDB(type);
        else
            rows= await this.promDB(type,par);
        for(let row of rows){
                this.addNewFilm(new Film(row.id,row.title,row.favorite==1?true:false,row.watchdate?new dayjs(row.watchdate):undefined,row.rating));
        }
        return [...this.filmati];  
    }
    this.promDB=function(type,par){
        return new Promise((resolve,reject) =>{
            let query;
            if(type==0)
                query="SELECT * FROM films";
            if(type==1)
                query="SELECT * FROM films WHERE favorite";
            if(type==2){
                query=`SELECT * FROM films WHERE watchdate=?`;
                par=dayjs().format("YYYY-MM-DD");
            }
            if(type==3)
                query=`SELECT * FROM films WHERE DATE(watchdate)<'?'`;
            if(type==4)
                query=`SELECT * FROM films WHERE rating>=?`;
            if(type==5)
                query=`SELECT * FROM films WHERE title=?`;
            
            this.db.all(query,par,(err,rows)=>{
                if(err)
                    reject(new Error("Errore DB"));
                else
                    resolve(rows);
                        
            });
        });
    }

    this.storeInDB= async function(filmo){
        return new Promise((resolve,reject)=>{
            if(filmo && filmo instanceof Film)
                this.addNewFilm(filmo);
            else
                reject(new Error("errore input FILM"));
            let query="INSERT INTO films (id,title,watchdate,favorite,rating) VALUES(?,?,?,?,?)"
            this.db.run(query,filmo.id,filmo.title,filmo.date,filmo.favorites,filmo.rating,(err)=>{
                if(err)
                    reject(err);
                else
                    resolve();
                        
            });
    
        })
    
    
    }
    this.deleteMovieDB=async (id) => new Promise((resolve, reject) => {
        let query = "DELETE FROM films WHERE id=?";
        this.deleteFilm(id);
        this.db.run(query, id, function (err) {
            if (err)
                reject(err);
            else {
                if (this.changes > 0)
                    resolve();
                else {
                    reject(new Error("Non è stato trovato nessun ID corrispondente"));
                }
            }

        });
    })
    this.deleteWatchedDateDB=async () => new Promise((resolve, reject) => {
        let query = "UPDATE films SET watchdate=null";
        this.resetWatchedFilms();
        this.db.run(query, (err) => {
            if (err)
                reject(err);
            else {
                resolve();
            }

        });
    })

}




async function main(){
    const db = new sqlite.Database('./LAB2-Nicolò/films.db',(err)=>{if(err) throw err;});
    let fl1=new FilmLibrary(db);
    let vett=await fl1.arrayFromDB(0);
    let filmBackup;
    await fl1.deleteMovieDB(vett[0].id);
    filmBackup=vett[0];
    vett=await fl1.arrayFromDB(0);
    fl1.printer();
    await fl1.storeInDB(filmBackup);
    vett=await fl1.arrayFromDB(0);
    fl1.printer();
    await fl1.deleteWatchedDateDB(db);
    vett=await fl1.arrayFromDB(0);
    fl1.printer();
    db.close();
}

main();