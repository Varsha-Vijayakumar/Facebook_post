import React from "react";
import Review from "./Review";
import Listed from "./Listed";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const PostList = ({ posts, handleDelete, update }) => {
    const [reply, setreply] = React.useState([])
    const [check, setcheck] = React.useState(false)
    const [dataid, setdataid] = React.useState("")
    const [pname, setpname] = React.useState("")



    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

    React.useEffect(() => {
        axios.get("http://localhost:8070/reply").then(res => {
            setreply(res.data);
        });
    }, []);


    const add = (name, idd) => {
        axios.post("http://localhost:8070/reply", { command: name, pid: idd })
            .then(success => {
                setreply([...reply, success.data])
            })
    }
    const delcom = idd => {
        axios.delete("http://localhost:8070/reply/" + idd).then(success => {
            if (success.status === 200 && success.statusText === "OK") {
                setreply(reply.filter(i => i.id !== idd))
            }
        });
    };

    return (
        <div>
            <ul className="list-group">
                {
                    posts.map(post => {
                        return (
                            <li key={post.id} className="list-group-item">
                                <span
                                    className="float-right btn btn-outline-primary"
                                    onClick={() => {
                                        handleDelete(post.id)
                                    }}
                                >
                                    Delete
            </span>{"  "}
                                <span className="float-right btn btn-outline-primary"
                                    onClick={() => {
                                        toggle();
                                        setcheck(true)
                                        setdataid(post.id)
                                    }}>Edit</span>

                                <p>
                                    <span> {post.title} </span>
                                </p>
                                <br></br>
                                {/* <span className="float-right btn btn-primary"> SHARE </span> */}
                                <li className="list-group-item">
                                    <Review add={add} postid={post.id} />
                                    <Listed
                                        delcom={delcom}
                                        reply={reply}
                                        postid={post.id}
                                    />
                                </li>
                            </li>
                        );
                    })}
                {check === true ? (<Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Update Post</ModalHeader>
                    <ModalBody>
                        <textarea type="text" rows="10" cols="50" onChange={(e) => { setpname(e.target.value) }}></textarea>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { toggle(); update(pname, dataid) }}>Save</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>) : null}

            </ul>
        </div>
    )
}

// class Prev extends React.Component {
//   state = {
//     reply: []
//   };
//   componentDidMount() {
//     axios
//       .get("http://localhost:8070/reply")
//       .then(result => {
//         console.log(result);
//         this.setState({
//           reply: result.data
//         });
//       })
//       .catch(err => console.log(err));
//   }
//   addcom = (ad, ppid) => {
//     if (ad === "") {
//       alert("YOU CANT SEND AN EMPTY COMMENT");
//     }
//     /*console.log("new item", value);
//         this.setState({
//             com: [...this.state.com, this.state.review],
//             review: ""
//         })*/
//     axios
//       .post("http://localhost:8070/reply", { command: ad, pid: ppid })
//       .then(success => {
//         console.log(ad);
//         this.setState({
//           reply: [...this.state.reply, success.data]
//         });
//       });
//   };
//   delcom = idd => {
//     /* this.setState({
//              com: this.state.com.filter(i => i !== item)
//          })*/
//     axios.delete("http://localhost:8070/reply/" + idd).then(success => {
//       if (success.status === 200 && success.statusText === "OK") {
//         this.setState({
//           reply: this.state.reply.filter(i => i.id !== idd)
//         });
//       }
//     });
//   };

//   render() {
//     return (
//       <div>
//         <ul className="list-group">
//                     {
//                         this.props.items.map(i => {
//                             return (
//                                 <li key={i.id} className="list-group-item">
//                                     <span className="float-right btn btn-outline-primary" onClick={this.props.handleDelete.bind(this, i.id)}>Delete</span>
//                                     <p><span> {i.title} </span></p><br></br>
//                                     <Likes postid={i.id} />
//                                     <span className="float-right btn btn-primary"> SHARE </span>
//                                     <li className="list-group-item">
//                                         <Review addcom={this.addcom} postid={i.id} />
//                                         <Listed delcom={this.delcom.bind(this)} reply={this.state.reply} postid={i.id} />
//                                     </li>
//                                 </li>
//                             );
//                         })
//                     }
//                 </ul>
//       </div>
//     );
//   }
// }
export default PostList;