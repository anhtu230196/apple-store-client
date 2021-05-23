import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'

function Search() {
    const { text } = useSelector(state => state.search)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = e => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        history.push(`/shop?${text}`)
    }

    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                className="form-control mr-sm-2"
                placeholder="Search..."
                onChange={handleChange}
            />
            <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
        </form>
    )
}

export default Search
