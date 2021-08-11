/* eslint-disable react/prop-types */
import React from 'react';

import Post from '../../pages/post';

export default function PostsData({ users }) {
  const posts = [
    {
      commentCount: 2,
      content:
        '# Redux Basics\n- [Redux Docs](https://redux.org)\n- [Normalizing Redux](https://redux.org)',
      createdAt: '2020-04-02T19:31:26+0000',
      events: [
        {
          id: '53344bec-1fa5-48d8-a1da-75ec797d64cf',
          name: 'React',
        },
        {
          id: '5eb3d14c-4405-4a7d-825c-0b37a5b80a90',
          name: 'Redux',
        },
      ],
      id: '764ed248-9396-4536-b109-00481114dbd4',
      title: 'How to add redux to a react project',
      totalVotes: 1,
      user: {
        username: users[3].login.username,
      },
      votes: [
        {
          direction: 1,
          userId: users[3].login.uuid,
        },
      ],
    },
    {
      commentCount: 49,
      createdAt: '2020-04-01T19:31:26+0000',
      events: [
        {
          id: '53344bec-1fa5-48d8-a1da-75ec797d64cf',
          name: 'React',
        },
        {
          id: '4bd99c12-b936-4d96-800e-6693a052b787',
          name: 'es6',
        },
      ],
      id: '5cca3c5c-bb63-4024-98c7-9a4f44760130',
      title:
        'Just trying to make this a really long title to see what happens on overflow',
      totalVotes: 1,
      user: {
        username: users[0].login.username,
      },
      votes: [
        {
          direction: 1,
          userId: users[16].login.uuid,
        },
        {
          direction: 1,
          userId: users[13].login.uuid,
        },
      ],
    },
    {
      commentCount: 13,
      createdAt: '2020-03-31T19:31:26+0000',
      events: [
        {
          id: '53344bec-1fa5-48d8-a1da-75ec797d64cf',
          name: 'React',
        },
        {
          id: '4bd99c12-b936-4d96-800e-6693a052b787',
          name: 'es6',
        },
      ],
      id: '75667663-18ab-4ec3-b22c-860abebfe218',
      title: 'How does routing work in express?',
      totalVotes: 1,
      user: {
        username: users[16].login.username,
      },
      votes: [
        {
          direction: -1,
          userId: users[11].login.uuid,
        },
      ],
    },
    {
      commentCount: 23,
      createdAt: '2020-03-23T19:31:26+0000',
      events: [
        {
          id: '4bd99c12-b936-4d96-800e-6693a052b787',
          name: 'es6',
        },
      ],
      id: '84e89cc1-5981-44af-87b2-a1518217785d',
      title: 'How do you destructure an array?',
      totalVotes: 1,
      user: {
        username: users[1].login.username,
      },
      votes: [
        {
          direction: 1,
          userId: users[10].login.uuid,
        },
      ],
    },
  ];

  return (
    <>
      <Post posts={posts} />
    </>
  );
}
