import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { getSubs } from "../../services/sub";

const SubList = ({ categoryIdHover }) => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs().then((res) => {
            setSubs(res.data);
            setLoading(false);
        });
    }, []);

    const showSubs = () =>
        subs.filter(s => s.parent === categoryIdHover?._id).map((s) => (
            <NavLink
                to={`/category/${categoryIdHover?.name}/${s.slug}`}
                key={s._id}
                className="col-2 btn btn-outlined-primary btn-raised m-3"
            >
                {s.name}
            </NavLink>
        ));

    return (
        <div className="row justify-content-center">
            {showSubs()}
        </div>
    );
};

export default SubList;
