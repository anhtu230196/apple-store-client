import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import Rating from "../home/Rating";
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import StarRatings from 'react-star-ratings'

const { Meta } = Card;

const ProductCard = ({ product }) => {
    // destructure
    const { images, title, description, slug, price } = product;

    const [tooltip, setTooltip] = useState("Click to add")
    // let cart = useSelector(state => state.cart)

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

    return (
        <>
            {product.ratings?.length > 0 ? <Rating ratings={product.ratings} /> : <span>
                <StarRatings
                    starDimension="20px"
                    starSpacing="2px"
                    numberOfStar={5}
                />
                    (0)
            </span>}
            <Card
                cover={
                    <img
                        src={images && images.length ? images[0].url : laptop}
                        style={{ height: "400px", objectFit: "cover" }}
                        className="p-1"
                    />
                }
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" /> <br /> View Product
                    </Link>,
                    <Tooltip title={product.quantity < 1 ? "Out of stock" : tooltip}>
                        <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                            <ShoppingCartOutlined className="text-danger" /> <br />
                            {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
                        </a>,
                    </Tooltip>
                ]}
            >
                <Meta
                    title={`${title} - $${price}`}
                    description={`${description && description.substring(0, 40)}...`}
                />
            </Card>
        </>
    );
};

export default ProductCard;
