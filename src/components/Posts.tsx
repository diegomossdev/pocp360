import React from 'react';
import {View, Text, Button} from 'react-native';
import withObservables from '@nozbe/with-observables';

const Posts = ({posts, database}: any) => {
  console.log('POSTS>', posts);
  // const [postsDb, setPostsDb] = React.useState<any>([]);
  const postsCollection = database.get('posts');
  const getAllPosts = async () => {
    const allPosts = await postsCollection.query().fetch();

    console.log('allPosts >>', allPosts);
  };

  React.useEffect(() => {
    getAllPosts();
  }, []);

  const addNewPost = async () => {
    await database.action(async () => {
      const newPost = await postsCollection.create((post) => {
        post.title = '80 New post';
        post.body = '80 Lorem ipsum...';
      });
    });
  };

  return (
    <>
      <View>
        {posts.map((post: any) => (
          <View key={post.id}>
            <Text>{post.title}</Text>
            <Text>{post.body}</Text>
            <Text>STATUS: {post.syncStatus}</Text>
          </View>
        ))}
      </View>
      <Button title="Add POST" onPress={() => addNewPost()} />
    </>
  );
};

const enhance = withObservables(['posts'], ({database}: any) => ({
  posts: database.get('posts').query(),
}));

export default enhance(Posts);
