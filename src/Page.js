import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from 'reactstrap';
import CreatePost from "./Post";
import PostList from "./Prev";

const Page = () => {
    const [posts, setPosts] = useState([]);
    const display = () => {
        axios.get("http://localhost:8070/post").then(res => {
            setPosts(res.data);
        });
    }

    useEffect(display, []);

    const addNewPost = name => {
        axios.post("http://localhost:8070/post", { title: name })
            .then(success => {
                setPosts([...posts, success.data])
            })
    }
    const handleDelete = (idd) => {

        axios.delete("http://localhost:8070/post/" + idd).then(success => {
            if (success.status === 200 && success.statusText === "OK") {
                setPosts(posts.filter(i => i.id !== idd));
            }
        });
    };
    const update = (post, id) => {
        axios.put("http://localhost:8070/post/" + id, { title: post })
            .then(success => {
                display();
            }).catch(err => console.log(err))
    }

    return (
        <div className="container">
            <h1 style={{ backgroundColor: "lightblue", borderRadius: "15px" }}>
                <img src="fb.png" alt="fb icon" style={{ padding: "0 0 7px 15px" }}></img>        Facebook Page
    </h1><br></br>
            <div className="row align-items-center">
                <div className="col-sm-8 offset-2  ">
                    <Header title={"Post"} />
                    <CreatePost addNewPost={addNewPost} /><br></br><br></br>
                    <PostList posts={posts} handleDelete={handleDelete} update={update} />
                </div>
            </div>
        </div>
    );
};

const Header = ({ title }) => (
    <nav className="navbar navbar-light bg-light">
        <h1><Badge className="primary">{title}</Badge></h1>
    </nav>
);



export default Page;