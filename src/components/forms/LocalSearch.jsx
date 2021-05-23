import React from 'react'

function LocalSearch({ keyword, setKeyword }) {
    const handleSearchChange = e => {
        setKeyword(e.target.value.toLowerCase())
    }

    return (
        <input
            type="text"
            placeholder="Filter"
            value={keyword}
            onChange={handleSearchChange}
            className="form-control mb-4"
        />
    )
}

export default LocalSearch
