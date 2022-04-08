import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
//import './js/libreria.js'


function App() {
  return (
<html>

<head>
   
</head>
<title>
    AW1 LAB3
</title>

<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" style={{color:'white'}} href="#">
                    <img src="img/file-earmark-play.svg" alt="" width="25" height="25"/> Film Library
                </a>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                </form>
                <a class="navbar-brand" style={{color:'white'}} href="#">
                    <img src="img/person-circle.svg" alt="" width="30" height="24"/>
                </a>
            </div>
        </nav>
    </header>
    <div class="container-fluid" style={{height:'1000px'}}>
        <div class="row align-items-start">

            <div class="d-flex flex-column flex-shrink-0 bg-light col-3 p-2" style={{width: '280px',height: '1000px'}}>
                <aside>
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li class="nav-item">
                            <a id="all" href="#" class="nav-link active link-dark" aria-current="page"
                                style={{borderRadius: '0px;'}}>
                                All
                            </a>
                        </li>
                        <li>
                            <a id="fav" href="#" class="nav-link link-dark">

                                Favorites
                            </a>
                        </li>
                        <li>
                            <a id="best" href="#" class="nav-link link-dark">

                                Best Rated
                            </a>
                        </li>
                        <li>
                            <a id="last" href="#" class="nav-link link-dark">

                                Last Seen
                            </a>
                        </li>
                        <li>
                            <a id="seenLastMonth" href="#" class="nav-link link-dark">

                                Seen Last Month
                            </a>
                        </li>
                    </ul>
                </aside>

            </div>

            <div class="col-9">
                <div class="row">
                    <main>
                        <h1 id="tit">All</h1>
                        <table class="table table-hover table-fixed">
                            <tbody id="tab">

                            </tbody>
                        </table>
                    </main>
                </div>
                <div class="row justify-content-end">
                    <div class="col-1">
                        <img src="img/plus-circle-fill.svg" alt="" width="30" height="24"/>
                    </div>

                </div>
            </div>
        </div>

    </div>
    </body>
    </html>
  );
}

export default App;
