
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Film,dayjs,FilmLibrary} from './js/libreria.js'
import React, {useState} from 'react';
let fl;
/*function checkbox(id) {
    let i;
    //lastClick=id;
    for(i=0; i<fl.filmati.length;i++)
    if(id===fl.filmati[i].id)
        break;
    fl.filmati[i].favorites=!fl.filmati[i].favorites;
    //lastState=fl.filmati[i].favorites;
   

}*/

function PrintStar(props){
    let rate=props.rate;
    let k =[];
    for(let i=0;i<rate;i++){
       k.push(<img key={i} src="img/star-fill.svg" alt="" width="30" height="24"/>);
    }
    for(let i=rate;i<5;i++)
        k.push(<img key={i} src="img/star.svg" alt="" width="30" height="24"/>);
    return k;
}
function FavoriteAndCheckBox(props){
    let defState=props.row.favorites;
    defState=defState!==undefined && defState!== null?defState:false;
    const [fav,setFav]=useState(defState);
    return (<>
        <td style={{width: '40%'}}>
                    <div style={fav?{color:'red'}:{}}>{props.row.title}</div>
                </td>
                <td style={{width: '20%'}}>
                    <input type="checkbox" id={"check"+props.row.id} defaultChecked={props.row.favorites} onClick={()=>  {setFav(!fav);props.row.favorites=fav}}/> Favorite</td>
                </>
    );
    
}
function ListItem(props){
    let list=props.lib.filmati.map(row=>{
      
       
        return <tr key={row.id}>
                <FavoriteAndCheckBox row={row}></FavoriteAndCheckBox>
        <td style={{width: '20%'}}>{row.date?row.date.format("MMMM DD, YYYY"):""}</td>
        <td style={{width: '20%'}}>
        <PrintStar rate={row.rating}></PrintStar>
                </td>
        </tr>;
    });
    return <tbody>{list}</tbody>;
}

function App() {
    fl = new FilmLibrary();
    fl.addNewFilm(new Film(1,"Pulp Fiction",true,new dayjs('10 March 2022'),5));
    fl.addNewFilm(new Film(2,"21 Gram",true,new dayjs('17 March 2022'),4));
    fl.addNewFilm(new Film(3,"Star Wars",false));
    fl.addNewFilm(new Film(4,"Matrix",false));
    fl.addNewFilm(new Film(5,"Shrek",false,new dayjs('21 March 2022'),3));
  return (
<div>
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" style={{color:'white'}} href="./index.html">
                    <img src="img/file-earmark-play.svg" alt="" width="25" height="25"/> Film Library
                </a>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                </form>
                <a className="navbar-brand" style={{color:'white'}} href="./index.html">
                    <img src="img/person-circle.svg" alt="" width="30" height="24"/>
                </a>
            </div>
        </nav>
    </header>
    <div className="container-fluid" style={{height:'1000px'}}>
        <div className="row align-items-start">

            <div className="d-flex flex-column flex-shrink-0 bg-light col-3 p-2" >
                <aside>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <a id="all" href="./index.html" className="nav-link active link-dark" aria-current="page"
                                style={{borderRadius: '0px'}}>
                                All
                            </a>
                        </li>
                        <li>
                            <a id="fav" href="./index.html" className="nav-link link-dark">

                                Favorites
                            </a>
                        </li>
                        <li>
                            <a id="best" href="./index.html" className="nav-link link-dark">

                                Best Rated
                            </a>
                        </li>
                        <li>
                            <a id="last" href="./index.html" className="nav-link link-dark">

                                Last Seen
                            </a>
                        </li>
                        <li>
                            <a id="seenLastMonth" href="./index.html" className="nav-link link-dark">

                                Seen Last Month
                            </a>
                        </li>
                    </ul>
                </aside>

            </div>

            <div className="col-9">
                <div className="row">
                    <main>
                        <h1 id="tit">All</h1>
                        <table className="table table-hover table-flex">
                            
                                <ListItem lib={fl}></ListItem>
                     
                        </table>
                    </main>
                </div>
                <div className="row justify-content-end">
                    <div className="col-1">
                        <img src="img/plus-circle-fill.svg" alt="" width="30" height="24"/>
                    </div>

                </div>
            </div>
        </div>

    </div>
    </div>
  );
}

export default App;
