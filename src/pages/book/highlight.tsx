import React from 'react';

import { IHighlightt } from '../../interfases';
import { searchInputSelector } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';

export const Higlight = ({ text }: IHighlightt) => {
  const { query } = useAppSelector(searchInputSelector);
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  const result =
    query === '' ? (
      <span>{text}</span>
    ) : (
      parts.map((el, i) =>
        regex.test(el) ? (
          // eslint-disable-next-line react/no-array-index-key
          <mark key={`${el}- ${i}`} data-test-id='highlight-matches'>
            {el}
          </mark>
        ) : (
          // eslint-disable-next-line react/no-array-index-key
          <span key={`${el}- ${i}`}>{el}</span>
        )
      )
    );

  return <React.Fragment> {result} </React.Fragment>;
};
