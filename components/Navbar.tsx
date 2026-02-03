
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static" sx={{ backgroundColor: '#27272a', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', py: isMobile ? 1 : 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 300, letterSpacing: 1 }}>
          Cest Lamour Nail. Inc
        </Typography>
        <Box sx={{ display: 'flex', gap: isMobile ? 1 : 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {NAV_ITEMS.map((item) => (
            <Button 
              key={item} 
              sx={{ 
                color: item === 'MONTH' ? '#dc2626' : 'white', 
                fontWeight: item === 'MONTH' ? 700 : 300,
                fontSize: '0.75rem',
                minWidth: 'auto',
                '&:hover': { color: '#ef4444' }
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
