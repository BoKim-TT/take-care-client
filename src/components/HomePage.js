import styled from 'styled-components';
import React, { useState } from 'react';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
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
      <Box
        sx={{
          width: '60%',
          height: '70%',
          maxWidth: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="iframe"
          control
          sx={{
            width: '100%',
            height: '100%',
            p: 0,
            m: 0,
          }}
          src="https://github-production-user-asset-6210df.s3.amazonaws.com/25041649/256994595-df91b392-3672-46b8-bff4-f537cc9790db.mp4"
        />
        <CardContent
          sx={{
            flex: '1 0 auto',
            bgcolor: '#3F2E3E',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Typography component="div" variant="subtitle1">
            Take Care App Demo
          </Typography>
        </CardContent>
      </Box>

      {/* {news.length > 0 ? (
        <List sx={{ width: '80%', mt: '3%' }}>
          {news.map((el) => (
            <>
              <ListItem key={el.title} sx={{ bgcolor: 'white' }}>
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
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
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
      )} */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 66px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const News = styled.div`
//   width: 84%;
//   max-width: 1000px;
//   padding: 2px;
//   padding-bottom: none;
//   margin: 50px auto;
//   display: flex;
//   flex-direction: column;
// `;

// const List = styled.li`
//   width: 100%;
//   margin-bottom: 2px;
//   display: flex;
//   background-color: var(--color-white);
// `;
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
  border-bottom: 1px dotted var(--color-purple-gray);
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
