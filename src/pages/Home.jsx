import React from "react";
import NewArrivals from "../components/home/NewArrivals";
import CategoryList from "../components/category/CategoryList";

const Home = () => {
    return (
        <>
            <CategoryList />

            <h4 className="text-center p-2 my-4 display-4 jumbotron">
                All Products
            </h4>
            <NewArrivals />

            {/* <h4 className="text-center p-2 my-4 display-4 jumbotron">
                Best Sellers
            </h4>
            <BestSellers /> */}
        </>
    );
};

export default Home;
