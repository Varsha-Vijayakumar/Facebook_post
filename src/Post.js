import React from "react";

const CreatePost = ({ addNewPost }) => {
    const [input, setInput] = React.useState("");

    return (
        <div>
            <textarea
                rows="5"
                cols="97"
                placeholder="Write Something..."
                onChange={e => setInput(e.target.value)}
                value={input}
            ></textarea>

            <button
                className="btn btn-outline-primary"
                onClick={() => addNewPost(input)}
            >
                POST
      </button>
        </div>
    );
};

// const add = () => {
//     if ({ input } === "") {
//         alert("U CAN'T POST AN EMPTY ")
//     }
//     else {
//         /*console.log("new item", value);
//         this.setState({
//             post: [...this.state.post, item]
//         })*/
//         axios.post("http://localhost:8070/post", { title: input })
//             .then(success => {
//                 setPost([...post, success.data])
//             })
//     }
// }

export default CreatePost;