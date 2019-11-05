
import React from "react";

const Listed = ({ reply, postid, delcom }) => {

    return (
        <div>
            <ul className="list-group">
                {
                    reply.filter(i => i.pid == postid)
                        .map(i => {
                            return (
                                <li key={i.id} className="list-group-item">

                                    <span>{i.command}</span>
                                    <span className="float-right btn btn-outline-primary" onClick={() => { delcom(i.id); }}>Remove</span>
                                </li>
                            );
                        })

                }
            </ul>
        </div >
    );
}

export default Listed;