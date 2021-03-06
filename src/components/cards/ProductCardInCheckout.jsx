import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CloseCircleOutlined } from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
    const colors = ["Black", "Brown", "Silver", "White", "Blue"];
    let dispatch = useDispatch();

    const handleColorChange = (e) => {
        let cart = [];
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === p._id) {
                cart[i].color = e.target.value;
            }
        });

        //  console.log('cart udpate color', cart)
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: "ADD_TO_CART",
            payload: cart,
        });
    };

    const handleQuantityChange = e => {
        let count = e.target.value < 1 ? 1 : e.target.value

        if (count > p.quantity) {
            return toast.error(`${p.title} is out of stock for the moment`)
        }

        let cart = []
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product, i) => {
            if (product._id == p._id) {
                cart[i].count = count
            }
        })

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: "ADD_TO_CART",
            payload: cart,
        });
    }

    const handleRemove = () => {
        let cart = []
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product, i) => {
            if (product._id === p._id) {
                cart.splice(i, 1)
            }
        })

        cart.filter(product => product._id !== p._id)
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: "ADD_TO_CART",
            payload: cart,
        });
    }
    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", height: "auto" }}>
                        {p.images.length ? (
                            <ModalImage small={p.images[0].url} large={p.images[0].url} />
                        ) : (
                            <ModalImage small={laptop} large={laptop} />
                        )}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select
                        onChange={handleColorChange}
                        name="color"
                        className="form-control"
                    >
                        {p.color ? (
                            <option value={p.color}>{p.color}</option>
                        ) : (
                            <option>Select</option>
                        )}
                        {colors
                            .filter((c) => c !== p.color) // ko bi lap lai trong select
                            .map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                    </select>
                </td>
                <td className="text-center">
                    <input
                        type="number"
                        className="form-control"
                        value={p.count}
                        onChange={handleQuantityChange}
                    />
                </td>
                <td className="text-center">
                    <CloseCircleOutlined onClick={handleRemove} className="text-danger" style={{ cursor: "pointer" }} />
                </td>
            </tr>
        </tbody>
    );
};

export default ProductCardInCheckout;
