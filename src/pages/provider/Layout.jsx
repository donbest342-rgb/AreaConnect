// Upgraded ProviderLayout.jsx

import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import { LogOut, PanelBottomCloseIcon } from 'lucide-react';

const links = [
  { to: '/provider', label: 'Dashboard', icon: <DashboardIcon /> },
  { to: '/provider/services', label: 'My Services', icon: <BuildIcon /> },
  { to: '/provider/portfolio', label: 'Portfolio', icon: <ImageIcon /> },
  { to: '/provider/profile', label: 'Profile', icon: <PersonIcon /> },
];

export default function ProviderLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const [logoutDialog, setLogoutDialog] = useState(false);

  const location = useLocation();
   const { logout } = useAuth()
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const handleLogout = async () => {
      await logout()
      navigate('/login')
      toast.success('Logged out')
    }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: isMobile ? 240 : 260,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? 240 : 260,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >

        {/* Header / User Info */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={user?.avatar || ''}
            sx={{ width: 40, height: 40 }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {user?.name || 'Provider'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Service Provider
            </Typography>
          </Box>

          {isMobile && (
            <IconButton onClick={() => setOpen(false)}>
              <PanelBottomCloseIcon size={18} />
            </IconButton>
          )}
        </Box>

        <Divider />

        {/* Navigation Links */}
        <List sx={{ flexGrow: 1 }}>
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <ListItem key={link.to} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.to}
                  selected={active}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'action.selected',
                      borderRight: '4px solid',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider />

        {/* Logout Button */}
        <div style={{ padding:'12px 10px', borderTop:'1px solid var(--border)' }}>
        <button onClick={handleLogout} style={{
          display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
          borderRadius:8, fontSize:14, fontWeight:500, color:'var(--muted)',
          background:'none', border:'none', width:'100%', cursor:'pointer',
          transition:'all .15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--red-lt)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <LogOut size={17} />
          Logout
        </button>
      </div>

      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        {isMobile && (
          <IconButton onClick={() => setOpen(true)} sx={{ mb: 2 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Outlet />
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}