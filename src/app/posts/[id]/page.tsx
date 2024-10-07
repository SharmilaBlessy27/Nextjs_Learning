'use client'; 

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  description: string;
  image: string;
  content: string;
}

const PostDetails = () => {
  const params = useParams();
  const id = params?.id as string; 

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

 
  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts?id=${id}`); 
      if (!response.ok) {
        throw new Error("Failed to fetch the post");
      }
      const data = await response.json();
      console.log(data);
      setPost(data);
    } catch (error) {
      console.error("Error fetching the post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost(); 
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <img src={post.image} alt={post.title} className="postImage" />
      <p>{post.description}</p>
      <div className="postContent">
        {post.content}
      </div>
    </div>
  );
};

export default PostDetails;
