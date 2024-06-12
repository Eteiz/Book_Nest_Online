import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Box,
  List,
  ListItem,
  Button,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';

const FilterDictComponent = ({ filterTitle, filterQuery, selectedFilterData, setSelectedFilterData }) => {
  const { data: filterData, error: filterError, isLoading: filterIsLoading } = filterQuery();
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">{filterTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {filterIsLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : filterError ? (
          <Typography color="error" fontSize={'12px'} fontFamily={'Roboto'} marginLeft="8px">
            Unable to load data: {filterError.message}
          </Typography>
        ) : filterData && filterData.length > 0 ? (
          <>
            <List
              sx={{
                paddingY: 0,
                maxHeight: { xs: '150px', md: '300px' },
                overflowY: 'auto',
                display: 'block',
              }}
            >
              {filterData.map((data) => (
                <ListItem key={data.id} sx={{ paddingY: 0, paddingX: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        disabled={data.bookCount === 0}
                        checked={selectedFilterData.includes(data.id) && data.bookCount !== 0}
                        onChange={(event) => {
                          if (event.target.checked && data.bookCount !== 0) {
                            setSelectedFilterData([...selectedFilterData, data.id]);
                          } else {
                            setSelectedFilterData(selectedFilterData.filter((id) => id !== data.id));
                          }
                        }}
                      />
                    }
                    label={<Typography>{data.name}</Typography>}
                  />
                  <Box sx={{ flexGrow: 1, visibility: 'hidden' }}></Box>
                  <Typography>
                    <strong>{data.bookCount}</strong>
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ paddingTop: 1 }} />
            <Box sx={{ paddingTop: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Button color="secondary" onClick={() => setSelectedFilterData(filterData.map((data) => data.id))}>
                Select all
              </Button>
              <Button color="secondary" onClick={() => setSelectedFilterData([])}>
                Clear
              </Button>
            </Box>
          </>
        ) : (
          <Typography fontSize={'12px'} fontFamily={'Roboto'} marginLeft="8px">
            No filters available
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
export default FilterDictComponent;
