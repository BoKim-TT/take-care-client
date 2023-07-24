import styled from 'styled-components';
import React, { useState } from 'react';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const HomePage = () => {
  const [news, setNews] = useState([]);

  // fetch health news from mediastack api
  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/news`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          //filter news with image source
          const newsData = data.data.filter((el) => el.image !== null);
          setNews(newsData);
        }
      });
  }, []);

  return (
    <Wrapper>
      {news.length > 0 ? (
        <News>
          {news.map((el) => (
            <List key={el.title}>
              <ImgContainer>
                <Img src={el.image} />
              </ImgContainer>
              <Content>
                <Title>{el.title}</Title>
                <Article>{el.description}</Article>
                <Source>{el.source}</Source>
                <Span> {el.published_at.slice(0, 10)}</Span>
                <Url href={el.url}>{el.url}</Url>
              </Content>
            </List>
          ))}
        </News>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '700px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const News = styled.div`
  width: 84%;
  max-width: 1000px;
  padding: 2px;
  padding-bottom: none;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  /* border-radius: 7px; */
  background-color: #434242;
`;
const List = styled.li`
  width: 100%;
  margin-bottom: 2px;
  display: flex;
  /* border-radius: 7px; */
  background-color: var(--color-white);
`;
const ImgContainer = styled.div`
  width: 25%;
  padding: 2%;
`;
const Img = styled.img`
  width: 100%;
  border-radius: 5px;
`;
const Content = styled.div`
  width: 80%;
  padding: 2%;
`;
const Title = styled.h3`
  font-size: 18px;
  border-bottom: 1px solid var(--color-light-gray);
  padding-bottom: 10px;
`;
const Article = styled.p`
  padding: 20px 0;
`;
const Url = styled.a`
  display: block;
  color: var(--color-dark-gray);
  padding: 10px 0;
  font-style: italic;
  font-size: 14px;
  text-decoration: underline;
  :hover {
    color: var(--color-cyan);
  }
`;
const Source = styled.p`
  font-size: 13px;
  padding: 5px 0;
`;
const Span = styled.span`
  font-size: 13px;
`;
export default HomePage;
