import { useContext, useEffect } from "react";
import Maincategories from "./maincategories";
import { useParams } from 'react-router-dom';
import { Mycontext } from "../../authentication/regester & login/context";

export default function Categorypages() {
    // const{ params , setparams} = useContext(Mycontext)
    const path = window.location.pathname;
    // console.log(path);
    const category = path.split("/")[1];
    const subcategory = path.split("/")[2];
    // useEffect(() => {
    // setparams(path)
    // }, [category, subcategory, setparams])


    return (
       <Maincategories category={category} subcategory={subcategory} />

    );
}
