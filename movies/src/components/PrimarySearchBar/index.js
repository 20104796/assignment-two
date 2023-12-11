import React, {useContext, useEffect, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate} from 'react-router-dom';
import { AuthContext } from "../../contexts/authContext";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default function PrimarySearchAppBar({ handleSearchChange }) {

    const navigate = useNavigate();
    const userContext = useContext(AuthContext)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const userName = userContext.userName
    let name = false;

    useEffect(() => {
        setIsAuthenticated(userContext.isAuthenticated);
    }, [userContext.isAuthenticated]);
    // 新的事件处理函数来处理登录导航
    const navigateToLoginPage = () => {
        navigate('/user/login'); // '/login' 是登录页面的路径
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Search For Films
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchChange}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {isAuthenticated ? (
                            <Typography component="span">Hi {userName}</Typography>
                        ) : (
                            <IconButton color="inherit" onClick={navigateToLoginPage}>
                                <AccountCircle />
                            </IconButton>
                        )}

                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    );
}