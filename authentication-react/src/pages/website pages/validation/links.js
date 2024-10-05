import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Mycontext } from "../../authentication/regester & login/context";

export default function Links() {
    const { params, setparams } = useContext(Mycontext);
    const location = useLocation();
    const path = location.pathname;
    const category = path.split("/")[1];

    useEffect(() => {
        fetch("http://localhost:2004/api/category")
            .then(res => res.json())
            .then(data => setparams(data.filter(item => item.name === category)))
            .catch(err => console.error("Error fetching categories:", err));
    }, [location.pathname, setparams]);

    useEffect(() => {
       

        if (params && params.length > 0) {
            setparams(path); 
        } else {
            setparams(null);
        }
    }, [params, path, setparams]);

    console.log(category);

    return null;
}
