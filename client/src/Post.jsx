import React from 'react';
import {Link} from "react-router-dom"
import { formatISO9075 } from "date-fns";

const Post = ({_id, title, summary, content, cover, createdAt,author }) => {

  const convertToRelativePath = (path) => {
    return path.replace(/\\/g, '/').replace('C:/Users/chitteswaran/OneDrive/Desktop/PORTFOLIO-REACT/BLOGWEBSITE-MERN/api/uploads/', '/uploads/');
  };

  const coverImage = convertToRelativePath(cover);

  return (
    <div className='p-2 m-5 w-full h-auto border border-r-4'>
      <div className='grid my-5 grid-cols-[1fr] gap-5 screen:lg grid-cols-[0.9fr,1.1fr]'>
        <div>
          <Link to={`/post/${_id}`}>
          <img
            src={`http://localhost:4000${coverImage}`}
            alt="Image not found"
            className='w-full h-auto'
          />
          </Link>
        </div>

        <div>
          <Link to={`/post/${_id}`}>
          <h2 className='font-bold m-0 text-3xl'>
            {title}
          </h2>
          </Link>
          <p className="info mx-0 my-2.5 text-[#888] font-bold text-2xl">
            <a href="#" className='author text-[#333]'>{author.username}</a>
            <time> {formatISO9075(new Date(createdAt))}</time>
          </p>

          <p className='summary h-auto mx-0 font-xl my-2.5'>
            {summary}
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Post;
