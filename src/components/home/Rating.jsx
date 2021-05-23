import React, { memo } from 'react'
import StarRatings from 'react-star-ratings'

function Rating({ ratings }) {
    const avg = ratings.reduce((total, rating) => total + rating.star, 0) / ratings.length
    return (
        <div className="text-center">
            <span>
                <StarRatings
                    starDimension="20px"
                    starSpacing="2px"
                    numberOfStar={5}
                    rating={avg}
                    starRatedColor="red"
                />
                    ({ratings.length})
            </span>
        </div>
    )
}

export default memo(Rating)
