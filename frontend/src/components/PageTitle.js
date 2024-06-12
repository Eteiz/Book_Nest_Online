import React from 'react';
import Icon from '@mui/material/Icon';

export function PageTitle({ sx, ...other }) {
  return (
    <Icon
      component="a"
      href="/"
      sx={{
        width: '100px',
        ...sx,
      }}
      {...other}
    >
      <img src={`${process.env.PUBLIC_URL}/LibraNet_title.png`} alt="BookNest Title" width={100} />
    </Icon>
  );
}

export default PageTitle;
