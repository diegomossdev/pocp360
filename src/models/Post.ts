import {Model} from '@nozbe/watermelondb';
import {field, date, readonly} from '@nozbe/watermelondb/decorators';

export default class Post extends Model {
  static table = 'posts';

  @field('title') title;
  @field('subtitle') subtitle;
  @field('body') body;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
