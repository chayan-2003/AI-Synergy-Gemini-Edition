import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Container, Typography, Paper, Grid, Avatar, Divider, List, ListItem, ListItemText,
    CircularProgress, Grow
} from '@mui/material';
import { AccountCircle, Assessment, Timeline, Description } from '@mui/icons-material';
import axios from 'axios';
import Navbar from './navbar';

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Automatically includes HttpOnly cookies
                const response = await axios({
                    method: 'get',
                    url: `${import.meta.env.VITE_API_URL}/api/users/profile`,
                    withCredentials: true, 
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },// Include cookies in requests
                });

                setProfile(response.data);
            } catch (err) {
                console.error('Error:', err);
                if (err.response?.status === 401) {
                    navigate('/login'); // Redirect to login if unauthorized
                }
                setError('Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
                <Typography mt={2}>Loading Dashboard...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <>
            <Navbar />
            <Grow in={!loading} timeout={600}>
                <Box
                    sx={{
                        minHeight: '100vh',
                        backgroundColor: '#f5f5f5',
                        pt: 4,
                        pb: 6,
                        background: 'linear-gradient(145deg, #f6f8fb 0%, #e9eef5 100%)'
                    }}
                >
                    <Container maxWidth="lg">
                        <Grid container spacing={3}>
                            {/* Profile Section */}
                            <Grid item xs={12} md={4}>
                                <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main' }}>
                                            <AccountCircle fontSize="large" />
                                        </Avatar>
                                        <Typography variant="h5">{profile?.name}</Typography>
                                        <Typography color="textSecondary">{profile?.email}</Typography>
                                        <Divider sx={{ my: 2, width: '100%' }} />
                                        <Typography variant="subtitle1">
                                            Subscription: {profile?.subscription || 'Free'}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Credits Status */}
                            <Grid item xs={12} md={4}>
                                <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                                    <Typography variant="h6" gutterBottom>
                                        Credits Status
                                    </Typography>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Typography variant="h3" color="primary">
                                            {profile?.credits || 0}
                                        </Typography>
                                        <Typography color="textSecondary">Credits Remaining</Typography>
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Account Status */}
                            <Grid item xs={12} md={4}>
                                <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                                    <Typography variant="h6" gutterBottom>
                                        Account Status
                                    </Typography>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Typography variant="h6" color="primary">
                                            {profile?.status || 'Active'}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Member since: {new Date(profile?.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Grow>
        </>
    );
};

export default Dashboard;
