import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './index.css';

const Post = () => {

  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: { q: 'world', freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': 'd2b909b39emshca8209a7d8c3aa9p1f2000jsn16e8f798f2ff',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    setIsLoading(true);

    axios.request(options)
      .then(function (response) {
        console.log(response.data);
        setIsLoading(false);
        setData(response.data.value);
      }).catch(function (error) {
        console.error(error);
        setIsLoading(false);
      });

  }, []);

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getNews = (e) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: { q: query, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': 'd2b909b39emshca8209a7d8c3aa9p1f2000jsn16e8f798f2ff',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    setIsLoading(true);

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.value);
        setIsLoading(false);
        setData(response.data.value);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.error('error ', error);
      });

  }

  return (

    <div className="page">
      <h1>WORLD NEWS</h1>

      <form onSubmit={getNews}>
        <input type="text" placeholder="Enter any news topic" onChange={(e) => {
          setQuery(e.target.value);
        }} />
        <button type="submit">Click here</button>

      </form>
      <br />

      {(isLoading) ? "Loading..." : ""}

      {data?.map((eachPost) => (
        <div className="post" key={eachPost?.name}>

          {/* <div className="imgDiv"> */}
          <img src={eachPost?.image?.thumbnail?.contentUrl
            .replace("&pid=News", "")
            .replace("pid=News", "")
            .replace("pid=News&", "")
          } alt="" />
          {/* </div> */}

          <div className="textDiv">
            <p className='postDate'>{moment(eachPost?.datePublished).format('Do MMMM YYYY, h:mm a')}</p>
            <div className='postTitle'>{eachPost?.name}</div>
            <p className='postDescription'>{eachPost?.description}</p>
          </div>

        </div>
      ))}

    </div>
  )
}

export default Post
