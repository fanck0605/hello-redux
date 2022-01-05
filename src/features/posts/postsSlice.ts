import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

interface Post {
  id: string;
  date: string;
  title: string;
  content: string;
  userId: string;
  reactions: {
    like?: number;
    star?: number;
  };
  isEditing?: boolean;
}

const initialState: Post[] = [
  {
    id: '1',
    date: sub(Date.now(), { minutes: 10 }).toISOString(),
    title: 'First Post!',
    content: 'Hello!',
    userId: '1',
    reactions: {},
  },
  {
    id: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    title: 'Second Post',
    content: 'More text',
    userId: '2',
    reactions: {},
  },
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
            date: new Date().toISOString(),
            title,
            content,
            userId,
            reactions: {},
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
    reactionAdded(
      state,
      action: PayloadAction<{
        postId: string;
        reaction: keyof Post['reactions'];
      }>
    ) {
      const { postId, reaction } = action.payload;

      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        const lastCount = existingPost.reactions[reaction] ?? 0;
        existingPost.reactions[reaction] = lastCount + 1;
      }
    },
  },
});

export type { Post };

export const { postAdded, postUpdated, postEditing, reactionAdded } =
  postsSlice.actions;

export default postsSlice.reducer;
