import Maincategories from "../../maincategories";


export default function Man() {

    const path = window.location.pathname;
    console.log(path);
    const category = path.split("/")[1];
    const subcategory = path.split("/")[2];


    return (
       <Maincategories category={category} subcategory={subcategory} /> 
    );
}
