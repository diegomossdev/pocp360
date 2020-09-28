import React from 'react';
import {SafeAreaView, FlatList, StyleSheet, StatusBar} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import PostRow from '~/components/PostRow';

interface Props {
  posts: any;
  onEdit: any;
  onDelete: any;
  syncData: any;
}

const PostList = ({posts, onEdit, onDelete}: Props) => {
  console.log('POSTS>', posts);
  const renderItem = ({item}) => {
    return (
      <PostRow
        // key={post._raw.id}
        post={item}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingBottom: 15,
  },
});

export default withDatabase(
  withObservables([], ({database}: any) => ({
    posts: database.collections.get('posts').query().observe(),
  }))(PostList),
);
