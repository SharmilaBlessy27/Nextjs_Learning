"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const BlogHome = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome to Our Blog</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </header>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          className="searchInput"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="searchButton">Search</button>
      </div>

      <div className="posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link href={`/posts/${post._id}`} key={post._id}>
              <div className="post">
                <img src={post.image} alt={post.title} className="postImage" />
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogHome;
