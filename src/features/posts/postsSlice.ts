import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: string;
  title: string;
  content: string;
  isEditing?: boolean;
}

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action: PayloadAction<typeof initialState[number]>) {
      state.push(action.payload);
    },
    postEditing(state, action: PayloadAction<string>) {
      const postId = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.isEditing = true;
      }
    },
    postUpdated(state, action: PayloadAction<typeof initialState[number]>) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.isEditing = false;
      }
    },
  },
});

export type { Post };

export const { postAdded, postUpdated, postEditing } = postsSlice.actions;

export default postsSlice.reducer;
