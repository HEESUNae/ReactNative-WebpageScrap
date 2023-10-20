import React from 'react';
import Typography from '../Typography';

const HeaderTitle = ({ title }) => {
  return (
    <Typography size={16} color={'white'}>
      {title}
    </Typography>
  );
};

export default HeaderTitle;
