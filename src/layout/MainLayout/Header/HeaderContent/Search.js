// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { Context } from 'context/index';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {
    const { setSearchValue } = useContext(Context);

    const [searchText, setSearchText] = useState('');

    return (
        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
            <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
                <OutlinedInput
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            setSearchValue(searchText);
                        }
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                    size="small"
                    id="header-search"
                    startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                            <SearchOutlined />
                        </InputAdornment>
                    }
                    aria-describedby="header-search-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                    placeholder="Search Products"
                />
            </FormControl>
        </Box>
    );
};

export default Search;
