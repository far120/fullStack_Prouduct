import { useContext, useEffect } from "react";
import Maincategories from "./maincategories";
import { useParams } from 'react-router-dom';
import { Mycontext } from "../../authentication/regester & login/context";

export default function Categorypages() {
  
    const path = window.location.pathname;
    const category = path.split("/")[1];
    const subcategory = path.split("/")[2];



    return (
       <Maincategories category={category} subcategory={subcategory} />

    );
}
