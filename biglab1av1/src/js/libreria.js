"use strict"

export const dayjs = require('dayjs');
export function Film (id,title,favorites=false,date,rating){
    this.id=id;
    this.title=title;
    this.date=date;
    this.rating=rating;
    this.favorites=favorites;
}

export function FilmLibrary(){
    this.filmati = [];
    this.addNewFilm =(film)=>{
        this.filmati.push(film);
    };
    this.sortByDate = () => {
        this.filmati.sort((x,y)=>{
            if(x.date===undefined)
                return 1;
            if(y.date===undefined)
                return -1;
            return -x.date.diff(y.date);
        });
    };
    this.printer=(type=true)=>{
        if(type)
            console.log("***** List of films *****");
        for(const a of this.filmati){
           if(a && a.date)
            console.log(`Id: ${a.id}, Title: ${a.title}, Favorite: ${a.favorites}, Whatch Date: ${a.date.format("DD-MM-YY")}, Rating: ${a.rating||"<not assigned>"}`);
            else 
            console.log(`Id: ${a.id}, Title: ${a.title}, Favorite: ${a.favorites}, Whatch Date: <not defined>, Rating: ${a.rating||"<not assigned>"}`);
        }
    };
    this.deleteFilm =(f_id)=>{
        let pos=0;
        
        for(let f of this.filmati){
            if(f_id===f.id)
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
        //this.printer(false);
        let copy2=[...this.filmati];                         //si poteva evitare lavorando su copy direttamente ma non
        this.filmati=[...copy];                              //volevo rifare il metodo di stampa
        return copy2;
    }

}
export default function checkbox(id, name) {
    let checkBox = document.getElementById(id);
    let text = document.getElementById(name);
    if (checkBox.checked === true) {
        text.style.color = "red";
    } else {
        text.style.color = "black";
    }
}


//FilmLibrary.printer();
//fl.printer();
//fl.getRated();
/*let fav=document.getElementById("fav");
let all=document.getElementById("all");
let best=document.getElementById("best");
let last=document.getElementById("last");
let lastMonth=document.getElementById("seenLastMonth");
let tit=document.getElementById("tit");
window.addEventListener('load', event => {

    let text="";
    let count=0;
    for (const row of fl.filmati) {
        
        text=text.concat(`<tr>

        <td style="width: 40%">
            <div id="name${count}" style="${row.favorites?'color:red"':'"'}>${row.title}</div>
        </td>

        <td style="width: 20%"><input type="checkbox" id="check${count}" onclick="checkbox(id,'name${count}')" ${row.favorites?"checked":""}> Favorite</td>
        <td style="width: 20%">${row.date?row.date.format("MMMM DD, YYYY"):""}</td>
        <td style="width: 20%">`);
        for(let i=0;i<row.rating;i++){
            text=text.concat('<img src="img/star-fill.svg" alt="" width="30" height="24">');
        }
        for(let i=row.rating;i<5;i++)
            text=text.concat('<img src="img/star.svg" alt="" width="30" height="24">');
        text=text.concat('</td></tr>');

         
            count ++;
        
    }
    let tab=document.getElementById("tab");
    tab.innerHTML=text;

})

fav.addEventListener('click',event =>{
    event.preventDefault();
    all.classList.remove("active");
    best.classList.remove("active");
    last.classList.remove("active");
    lastMonth.classList.remove("active");
    fav.classList.add("active");
    tit.innerHTML="Favorites";
    let text="";
    let count=0;
    for (const row of fl.filmati) {
        if(row.favorites){
        text=text.concat(`<tr>

        <td style="width: 40%">
            <div id="name${count}" style="${row.favorites?'color:red"':'"'}>${row.title}</div>
        </td>

        <td style="width: 20%"><input type="checkbox" id="check${count}" onclick="checkbox(id,'name${count}')" ${row.favorites?"checked":""}> Favorite</td>
        <td style="width: 20%">${row.date?row.date.format("MMMM DD, YYYY"):""}</td>
        <td style="width: 20%">`);
        for(let i=0;i<row.rating;i++){
            text=text.concat('<img src="img/star-fill.svg" alt="" width="30" height="24">');
        }
        for(let i=row.rating;i<5;i++)
            text=text.concat('<img src="img/star.svg" alt="" width="30" height="24">');
        text=text.concat('</td></tr>');

         
            count ++;
    }
    }
    let tab=document.getElementById("tab");
    tab.innerHTML=text;

});

all.addEventListener('click',event =>{
    event.preventDefault();
    all.classList.add("active");
    best.classList.remove("active");
    last.classList.remove("active");
    lastMonth.classList.remove("active");
    fav.classList.remove("active");
    tit.innerHTML="All";
    let text="";
    let count=0;
    for (const row of fl.filmati) {
       
        text=text.concat(`<tr>

        <td style="width: 40%">
            <div id="name${count}" style="${row.favorites?'color:red"':'"'}>${row.title}</div>
        </td>

        <td style="width: 20%"><input type="checkbox" id="check${count}" onclick="checkbox(id,'name${count}')" ${row.favorites?"checked":""}> Favorite</td>
        <td style="width: 20%">${row.date?row.date.format("MMMM DD, YYYY"):""}</td>
        <td style="width: 20%">`);
        for(let i=0;i<row.rating;i++){
            text=text.concat('<img src="img/star-fill.svg" alt="" width="30" height="24">');
        }
        for(let i=row.rating;i<5;i++)
            text=text.concat('<img src="img/star.svg" alt="" width="30" height="24">');
        text=text.concat('</td></tr>');

         
            count ++;
    }
    
    let tab=document.getElementById("tab");
    tab.innerHTML=text;

});

best.addEventListener('click',event =>{
    event.preventDefault();
    all.classList.remove("active");
    best.classList.add("active");
    last.classList.remove("active");
    lastMonth.classList.remove("active");
    fav.classList.remove("active");
    tit.innerHTML="Best";
    let text="";
    let count=0;
    for (const row of fl.filmati) {
        if(row.rating==5){
        text=text.concat(`<tr>

        <td style="width: 40%">
            <div id="name${count}" style="${row.favorites?'color:red"':'"'}>${row.title}</div>
        </td>

        <td style="width: 20%"><input type="checkbox" id="check${count}" onclick="checkbox(id,'name${count}')" ${row.favorites?"checked":""}> Favorite</td>
        <td style="width: 20%">${row.date?row.date.format("MMMM DD, YYYY"):""}</td>
        <td style="width: 20%">`);
        for(let i=0;i<row.rating;i++){
            text=text.concat('<img src="img/star-fill.svg" alt="" width="30" height="24">');
        }
        for(let i=row.rating;i<5;i++)
            text=text.concat('<img src="img/star.svg" alt="" width="30" height="24">');
        text=text.concat('</td></tr>');

         
            count ++;
    }
    }
    let tab=document.getElementById("tab");
    tab.innerHTML=text;

});

last.addEventListener('click',event =>{
    event.preventDefault();
    all.classList.remove("active");
    best.classList.remove("active");
    last.classList.add("active");
    lastMonth.classList.remove("active");
    fav.classList.remove("active");
    tit.innerHTML="Last Seen";
    let text="";
    let count=0;
    fl.sortByDate()
    for (const row of fl.filmati) {
      if(row.date==undefined)
        break;
        text=text.concat(`<tr>

        <td style="width: 40%">
            <div id="name${count}" style="${row.favorites?'color:red"':'"'}>${row.title}</div>
        </td>

        <td style="width: 20%"><input type="checkbox" id="check${count}" onclick="checkbox(id,'name${count}')" ${row.favorites?"checked":""}> Favorite</td>
        <td style="width: 20%">${row.date?row.date.format("MMMM DD, YYYY"):""}</td>
        <td style="width: 20%">`);
        for(let i=0;i<row.rating;i++){
            text=text.concat('<img src="img/star-fill.svg" alt="" width="30" height="24">');
        }
        for(let i=row.rating;i<5;i++)
            text=text.concat('<img src="img/star.svg" alt="" width="30" height="24">');
        text=text.concat('</td></tr>');

        break;
            count ++;
    }
    
    let tab=document.getElementById("tab");
    tab.innerHTML=text;

});

lastMonth.addEventListener('click',event =>{
    event.preventDefault();
    all.classList.remove("active");
    best.classList.remove("active");
    last.classList.remove("active");
    lastMonth.classList.add("active");
    fav.classList.remove("active");
    tit.innerHTML="Last Month";
    let text="";
    let count=0;
    for (const row of fl.filmati) {
        if(row.date && row.date.diff(dayjs(),'month')<=1){
        text=text.concat(`<tr>

        <td style="width: 40%">
            <div id="name${count}" style="${row.favorites?'color:red"':'"'}>${row.title}</div>
        </td>

        <td style="width: 20%"><input type="checkbox" id="check${count}" onclick="checkbox(id,'name${count}')" ${row.favorites?"checked":""}> Favorite</td>
        <td style="width: 20%">${row.date?row.date.format("MMMM DD, YYYY"):""}</td>
        <td style="width: 20%">`);
        for(let i=0;i<row.rating;i++){
            text=text.concat('<img src="img/star-fill.svg" alt="" width="30" height="24">');
        }
        for(let i=row.rating;i<5;i++)
            text=text.concat('<img src="img/star.svg" alt="" width="30" height="24">');
        text=text.concat('</td></tr>');

         
            count ++;
    }
    }
    let tab=document.getElementById("tab");
    tab.innerHTML=text;

});*/



