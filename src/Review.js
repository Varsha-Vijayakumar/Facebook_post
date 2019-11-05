import React from "react";

const Review = ({ add, postid }) => {
    const [review, setreview] = React.useState("")


    return (
        <div>
            <span> COMMENT </span><br></br>
            <input type="text" onChange={(e) => {
                setreview(e.target.value)
            }} value={review} />
            <span className="btn btn-outline-primary" onClick={() => { add(review, postid) }}>Send</span>
        </div >
    );
};

export default Review;