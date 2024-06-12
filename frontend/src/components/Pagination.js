import React from 'react';
import { Box, Button, Typography, Pagination as MuiPagination } from '@mui/material';

const pageSizeValues = [5, 10, 15];

const Pagination = ({ data, pageSize, pageNumber, setPageSize, setPageNumber }) => {
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPageNumber(0);
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value - 1);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 0 } }}
    >
      <Typography variant="body2">
        Showing{' '}
        <b>
          {data.pageable.pageSize * data.pageable.pageNumber + 1} -{' '}
          {Math.min(data.pageable.pageSize * (data.pageable.pageNumber + 1), data.totalElements)}
        </b>{' '}
        of <b>{data.totalElements}</b> results
      </Typography>
      <MuiPagination
        count={Math.ceil(data.totalElements / pageSize) || 1} // Ensure count is at least 1
        color="primary"
        page={pageNumber + 1}
        onChange={handlePageChange}
      />
      <Box display="flex">
        {pageSizeValues.map((value) => (
          <Button
            key={value}
            variant="text"
            color="secondary"
            disabled={data.totalElements < value}
            onClick={() => handlePageSizeChange(value)}
            style={value === pageSize ? { textDecoration: 'underline' } : {}}
          >
            {value}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Pagination;
