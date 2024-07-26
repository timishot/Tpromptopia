'use client'

import { useState, useEffect, useMemo } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  if (data.length === 0) {}
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const filterSearch = (data, searchText) => {
    return data.filter((post) => {
      const searchLower = searchText.toLowerCase();
      return (
        post.prompt.toLowerCase().includes(searchLower) || 
        post.tag.toLowerCase().includes(searchLower) ||
        post.creator.username.toLowerCase().includes(searchLower)
      );
    });
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterSearch(posts, tagName);
    setFilteredPosts(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setFilteredPosts(posts);
    } else {
      const searchResult = filterSearch(posts, searchText);
      setFilteredPosts(searchResult);
    }
  }, [searchText, posts]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag, username, or prompt'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed;
