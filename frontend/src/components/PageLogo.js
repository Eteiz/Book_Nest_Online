import React from 'react';
import Icon from '@mui/material/Icon';

export function PageLogo({ sx, ...other }) {
  return (
    <Icon
      component="a"
      href="/"
      sx={{
        fontSize: 35,
        ...sx,
      }}
      {...other}
    >
      <img src={`${process.env.PUBLIC_URL}/LibraNet_logo.png`} alt="BookNest Logo" width={35} height={35} />
    </Icon>
  );
}

export default PageLogo;
