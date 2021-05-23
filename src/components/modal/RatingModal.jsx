import { Modal, Button } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom'

function RatingModal({ children }) {
    const user = useSelector(state => state.user)
    const [modalVisible, setModalVisible] = useState(false)
    const history = useHistory()
    const { slug } = useParams()

    const handleModal = () => {
        if (user && user.token) {
            setModalVisible(true)
        } else {
            history.push({
                pathname: "/login",
                state: { from: `/product/${slug}` }
            })
        }
    }

    return (
        <>
            <div onClick={handleModal}>
                <StarOutlined className="text-danger" /> <br /> {" "}
                {user ? "Leave rating" : "Login to leave rating"}
            </div>
            <Modal
                title="Leave your rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false)
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>
        </>
    )
}

export default RatingModal
