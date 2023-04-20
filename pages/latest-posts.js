import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LatestPostsPage(props) {
  const [posts, setPosts] = useState(props.posts);

  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    (url) => {
      return fetch(url).then((res) => res.json());
    }
  );

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !posts) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {post.id} - {post.title}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  let data = [];
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (response.ok) {
    data = await response.json();
  }

  return { props: { posts: data } };
}

export default LatestPostsPage;
