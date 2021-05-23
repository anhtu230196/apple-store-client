import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { getCategories } from "../../services/category";
import SubList from "../sub/SubList";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [categoryIdHover, setCategoryIdHover] = useState(null)

    useEffect(() => {
        getCategories().then((c) => {
            setCategories(c.data);
        });
    }, []);

    const handleBlur = (categoryId) => {
        setCategoryIdHover(categoryId)
    }

    const showCategories = () =>
        categories.map((c) => (
            <NavLink
                to={`/category/${c.slug}`}
                key={c._id}
                className="col btn btn-outlined-primary btn-raised m-3 button-category"
                onMouseOver={() => handleBlur(c)}
            >
                {c.name}
            </NavLink>
        ));

    return (
        <div className="container-fluid sticky-top background-nav">
            <div className="row">
                {showCategories()}
            </div>
            <div onMouseLeave={() => setCategoryIdHover(null)}>
                <SubList categoryIdHover={categoryIdHover} />
            </div>
        </div>
    );
};

export default CategoryList;
