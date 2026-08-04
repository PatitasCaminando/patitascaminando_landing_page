import React from 'react';
import { DateLabel } from '../atoms/DateLabel';
import { ShareActions } from './ShareActions';

interface ArticleMetaProps {
  date: string;
  title: string; // for sharing
  text: string; // for sharing
}

export const ArticleMeta: React.FC<ArticleMetaProps> = ({ date, title, text }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4">
      <DateLabel date={date} />
      <ShareActions title={title} text={text} />
    </div>
  );
};
