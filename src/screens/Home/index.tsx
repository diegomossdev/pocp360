import React, {useState} from 'react';
import {Button, View} from 'react-native';
import {useDatabase} from '@nozbe/watermelondb/hooks';
// import {v4 as uuidv4} from 'uuid';

import syncData from '~/sync/syncData';
import PostList from '~/components/PostList';
// import PostForm from './PostForm';

export default function Home() {
  const database = useDatabase();
  const [post, setPost] = useState();
  const postsCollection = database.collections.get('posts');

  // function clearPost() {
  //   setPost(undefined);
  // }

  function onEdit(selectedPost: any) {
    setPost(selectedPost);
  }

  async function onDelete(selectedPost: any) {
    await database.action(async () => {
      await selectedPost.markAsDeleted();
    });
  }

  async function createPost() {
    let numberRandom = Math.random() * (1000000 - 1) + 1;
    let idRandom = Math.ceil(numberRandom);

    await database.action(async () => {
      const newPost = await postsCollection.create((post) => {
        post._raw.id = JSON.stringify(idRandom);
        post.title = `Titulo ${JSON.stringify(idRandom)} test`;
        post.subtitle = `Subtitulo ${JSON.stringify(idRandom)} test`;
        post.body = `Body ${JSON.stringify(idRandom)} test`;
      });
    });
  }

  // async function updatePost(currentPost, inputtedForm) {
  //   await database.action(async () => {
  //     await currentPost.update((post) => {
  //       post.title = inputtedForm.title;
  //       post.content = inputtedForm.content;
  //       post.likes = inputtedForm.likes;
  //     });
  //   });
  // }

  return (
    <>
      {/* <PostForm
        post={post}
        clearPost={clearPost}
        createPost={createPost}
        updatePost={updatePost}
        syncData={() => syncData(database)}
      /> */}
      <Button title="criar novo post" onPress={() => createPost()} />
      <View style={{marginBottom: 15}} />
      <Button
        color="#26A65B"
        title="Sincronizar"
        onPress={() => syncData(database)}
      />
      <PostList onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}
