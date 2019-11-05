import React from "react";
import axios from "axios";

const Likes = ({ postId }) => {
    const [likes, setLikes] = React.useState([]);

    const fetch = () =>
        axios
            .get("http://localhost:8070/like")
            .then(res => res.data)
            .then(setLikes)
            .catch(err => console.log(err));

    React.useEffect(fetch, []);

    const LikePost = () => {
        const currentLikeObj = likes.filter(like => like.pid == postId).pop();

        axios
            .put(`http://localhost:8070/like/${currentLikeObj.id}`, {
                ...currentLikeObj,
                like: currentLikeObj.like + 1
            })
            .then(fetch);
    };

    return (
        <div>
            <span
                className="btn btn-primary "
                onClick={() =>
                    likes.filter(like => like.pid == postId).length
                        ? LikePost()
                        : console.like(":(")
                }
            >
                {likes.filter(like => like.pid == postId).length
                    ? likes.filter(like => like.pid == postId).pop().like
                    : ":("}{" "}
                <span className="glyphicon glyphicon-thumbs-up"></span>{" "}
            </span>
            {/* <span className="btn btn-primary " onClick={this.unlikes}>
        {this.state.uncount}{" "}
        <span className="glyphicon glyphicon-thumbs-down"></span>{" "}
      </span> */}
        </div>
    );

    // state = {
    //     like: [],
    //     count: 0,
    //     uncount: 0
    // }

    /*likes = () => {
          this.setState({
              count: this.state.count + 1
          })
      }
      unlikes = () => {
          this.setState({
              uncount: this.state.uncount + 1
          })
      }*/
    // componentDidMount() {

    //     axios.get("http://localhost:8070/like")
    //         .then(result => {
    //             console.log(result)
    //             this.setState({
    //                 like: result.data
    //             })
    //         }).catch(err => console.log(err))
    // }
    // likes = e => {
    //     //console.log("new item", item);
    //     axios.post("http://localhost:8070/like", { like: this.state.count + 1, pid: this.props.postid })
    //         .then(success => {
    //             console.log(success)
    //             this.setState({
    //                 count: this.state.count + 1
    //             })
    //         })
    // }
    // render() {
    //   return (
    //       <div>
    //           <span className="btn btn-primary " onClick={this.likes}>{this.state.count} <span className="glyphicon glyphicon-thumbs-up"></span> </span>
    //           <span className="btn btn-primary " onClick={this.unlikes}>{this.state.uncount} <span className="glyphicon glyphicon-thumbs-down"></span> </span>
    //       </div>
    //   )
    // }
};

export default Likes;