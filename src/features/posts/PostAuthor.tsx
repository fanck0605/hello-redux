import React from 'react';
import { useAppSelector } from '../../app/hooks';

const PostAuthor: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const author = useAppSelector((rootState) =>
    rootState.users.find((user) => user.id === userId)
  );

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};

export default PostAuthor;
