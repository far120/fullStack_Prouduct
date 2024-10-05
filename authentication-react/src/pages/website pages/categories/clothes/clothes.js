import Maincategories from "../maincategories";
import { useParams } from 'react-router-dom';

export default function Clothes() {
    // Access URL parameters
    const path = window.location.pathname;
    console.log(path);
    const category = path.split("/")[1];
    const subcategory = path.split("/")[2];

    return (
       <Maincategories category={category} subcategory={subcategory} /> 
    );
}
