import React, { useContext, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from "moment";
import { AuthContext } from '../context/authContext'

const Single = () => {

  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  //split tuc bao nhieu "/" vd:localhost:3000/post/1
  const postId = location.pathname.split("/")[2]

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div>
      <div className='single'>
        <div className="content">
          <img src={`../upload/${post.img}`} alt="" />

          <div className="user">
            {post.userImg && <img src={post.userImg} 
            alt="" />}

            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            
            {currentUser.username === post.username && (
              <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <EditIcon />
              </Link>
              <DeleteIcon onClick={handleDelete}/>
              </div>
              )}
          </div>
          <h1>{post.title}</h1>
          {getText(post.desc)}
        </div>
        <Menu cat={post.cat}/>
      </div>
    </div>
  )
}

export default Single
