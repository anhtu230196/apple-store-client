import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRatings from 'react-star-ratings'
import RatingModal from "../modal/RatingModal";
import Rating from "../home/Rating";
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from '../../services/user'
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
    const { title, images, description, _id } = product;
    const [tooltip, setTooltip] = useState("Click to add")
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    const handleAddToCart = () => {
        setTooltip("Added")
        let cart = []
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.push({
            ...product,
            count: 1
        })
        let unique = _.uniqWith(cart, _.isEqual) // remove duplicate
        localStorage.setItem('cart', JSON.stringify(unique))

        dispatch({
            type: "ADD_TO_CART",
            payload: unique
        })
        dispatch({
            type: "SET_VISIBLE",
            payload: true
        })
    }

    const handleAddToWishlist = () => {
        addWishlist(product._id, user.token).then(res => {
            console.log(res.data)
            toast.success("Added to Wishlist successful")
        })
    }

    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                    </Carousel>
                ) : (
                    <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
                )}

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call use on xxxx xxx xxx to learn more about this product.
                </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                {product.ratings?.length > 0 && <Rating ratings={product.ratings} />}
                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
                        </a>
                        </Tooltip>,
                        <Link onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-info" /> <br /> Add to Wishlist
                        </Link>,
                        <RatingModal>
                            <StarRatings
                                name={_id}
                                numberOfStar={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
