import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductCard from '../components/cards/ProductCard';
import SingleProduct from '../components/cards/SingleProduct';
import { getProduct, getRelated, productStar } from '../services/product';

function ProductDetail({ match }) {
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0)
    const [related, setRelated] = useState([])
    const user = useSelector(state => state.user)
    const { slug } = match.params;

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);
    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find(rating => rating.postedBy == user._id)
            if (existingRatingObject) {
                setStar(existingRatingObject.star)
            }
        }
    })

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data);
            getRelated(res.data._id).then(related => {
                setRelated(related.data)
            })
        })
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating)
        productStar(name, newRating, user.token)
            .then(res => {
                toast.success("Thank for your review.")
            })
    }

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct
                    product={product}
                    onStarClick={onStarClick}
                    star={star}
                />
            </div>

            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <div>Related products</div>
                    <hr />
                </div>
            </div>

            <div className="row pb-5">
                {related.length > 0 && related.map(p => (
                    <div className="col-lg-3 col-md-4 col-12 p-4" key={p._id}>
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ProductDetail
