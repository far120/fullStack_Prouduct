import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {BackEnd_url}  from '../../../constance';
import './nav.css';
export default function Navlinks(){
    const [links , setlinks] = useState([])
    useEffect(() => {
        fetch(`${BackEnd_url}/api/category`)
        .then(res => res.json())
        .then(data => setlinks(data))
      },[]);
      console.log(links)

    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container d-flex align-items-center ">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav d-flex align-items-center justify-content-evenly mx-auto" >
        <li class="nav-item">
            <Link class="nav-link" to="/">Home</Link>
        </li>
        {Array.isArray(links) && links.length > 0 ? (
          links.map((item) => (
        <li class="nav-item dropdown" key={item._id}>
          <Link  to={`/${item.name}`} class="nav-link dropdown-toggle"  id={`${item.name}Dropdown`} role="button"  aria-expanded="false">
          {item.name}
          </Link>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          {item.subcategory.map((subcategory, index) => (
            <li><Link to={`/${item.name}/${subcategory}`} class="dropdown-item" >  {subcategory}</Link>
            </li>
))}
          </ul>
        </li>
          ))):
          (null)}
      </ul>
    </div>
  </div>
</nav>
    )
}