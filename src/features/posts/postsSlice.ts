import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  isEditing?: boolean;
}

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', userId: '1' },
  { id: '2', title: 'Second Post', content: 'More text', userId: '2' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare({
        title,
        content,
        userId,
      }: Pick<Post, 'title' | 'content' | 'userId'>) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
          },
        };
      },
    },
    postEditing(state, action: PayloadAction<string>) {
      const postId = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.isEditing = true;
      }
    },
    postUpdated(state, action: PayloadAction<typeof initialState[number]>) {
      const { id, title, content, userId } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.userId = userId;
        existingPost.isEditing = false;
      }
    },
  },
});

export type { Post };

export const { postAdded, postUpdated, postEditing } = postsSlice.actions;

export default postsSlice.reducer;
