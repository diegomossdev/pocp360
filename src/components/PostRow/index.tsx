import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import withObservables from '@nozbe/with-observables';

interface Props {
  post: any;
  onEdit: any;
  onDelete: any;
  syncData: any;
}

const PostRow = ({post, onEdit, onDelete}: Props) => {
  const syncRender = (sync: string) => {
    if (sync === 'synced') {
      return (
        <View style={[styles.tagSyncView, {backgroundColor: '#26A65B'}]}>
          <Text style={styles.tagSync}>Sincronizado</Text>
        </View>
      );
    }
    if (sync === 'created') {
      return (
        <View style={[styles.tagSyncView, {backgroundColor: '#6C7A89'}]}>
          <Text style={styles.tagSync}>Criado</Text>
        </View>
      );
    }

    return (
      <View style={styles.tagSyncView}>
        <Text style={styles.tagSync}>{sync}</Text>
      </View>
    );
  };
  return (
    <View key={post._raw.id} style={styles.contentPost}>
      <View style={styles.titleStatusView}>
        <Text>{post.title}</Text>
        {syncRender(post.syncStatus)}
      </View>
      <Text>{post.subtitle}</Text>
      <Text>{post.body}</Text>
      <Text>{post.createdAt.toString()}</Text>
      <Text>{post.updatedAt.toString()}</Text>
      <View style={styles.actions}>
        <View style={styles.buttonsView}>
          <Button color="#6C7A89" title="Editar" onPress={(e) => {}} />
        </View>
        <View style={styles.buttonsView}>
          <Button
            color="#CF3A24"
            title="Deletar"
            onPress={(e) => {
              onDelete(post);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentPost: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleStatusView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tagSyncView: {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#c40',
  },
  tagSync: {
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonsView: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default withObservables(['post'], ({post}) => ({
  post: post.observe(),
}))(PostRow);
