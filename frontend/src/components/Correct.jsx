import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material';
import Navbar from './Navbar';

const Correct = () => {
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [credits, setCredits] = useState({ used: 0, remaining: 0 });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        });
        setCredits({
          used: response.data.credits_used,
          remaining: response.data.credits,
        });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleCorrect = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:8090/api/users/grammarly',
        {
          prompt: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        }
      );
      setCorrectedText(response.data.correctedText);
      setCredits((prevCredits) => ({
        ...prevCredits,
        used: prevCredits.used + 1,
        remaining: prevCredits.remaining - 1,
      }));
    } catch (err) {
      setError('Failed to correct text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-16">
        <Container maxWidth="md">
          <Paper elevation={3} className="p-6">
            <Typography variant="h4" className="text-center mb-6">
              Grammar Correction
            </Typography>
            <Typography variant="body1" className="text-center mb-4">
            Remaining Credits: {credits.remaining}
            </Typography>
            <TextField
              label="Enter text to correct"
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mb-4"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCorrect}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Correcting...' : 'Correct Text'}
            </Button>
            {error && (
              <Typography color="error" className="mt-4 text-center">
                {error}
              </Typography>
            )}
            {correctedText && (
              <Box className="mt-6">
                <Typography variant="h6">Corrected Text:</Typography>
                <Typography>{correctedText}</Typography>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Correct;