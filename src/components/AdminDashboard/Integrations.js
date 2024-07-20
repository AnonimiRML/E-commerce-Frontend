import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, FormControlLabel, Switch, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ZapierIntegration = () => {
  const [zapierWebhook, setZapierWebhook] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Fetch existing integration settings on mount
    const fetchIntegrationSettings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/preferences`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const integration = response.data.zapier.purchase;
        setZapierWebhook(integration.url || '');
        setIsEnabled(integration.enabled || false);
        setInitialLoading(false);
      } catch (error) {
        console.error('Error fetching Zapier integration settings:', error);
        setInitialLoading(false);
      }
    };

    fetchIntegrationSettings();
  }, [token]);

  const handleWebhookChange = (e) => {
    setZapierWebhook(e.target.value);
  };

  const handleSwitchChange = async (event) => {
    const newIsEnabled = event.target.checked;
    setIsEnabled(newIsEnabled);

    if (!newIsEnabled) {
      setLoading(true);
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/admin/preferences`, {
          zapier: {
            purchase: {
              enabled: false,
              url: zapierWebhook,
            },
          },
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        alert('Zapier integration disabled successfully');
      } catch (error) {
        console.error('Error updating Zapier integration:', error);
        alert('Failed to update Zapier integration');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/admin/preferences`, {
        zapier: {
          purchase: {
            enabled: isEnabled,
            url: zapierWebhook,
          },
        },
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Zapier integration updated successfully');
    } catch (error) {
      console.error('Error updating Zapier integration:', error);
      alert('Failed to update Zapier integration');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Paper style={{ padding: '16px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>Connect Zapier when Order Arrived</Typography>
        <FormControlLabel
          control={<Switch checked={isEnabled} onChange={handleSwitchChange} />}
          label="Enable Zapier Integration"
        />
        {isEnabled && (
          <form onSubmit={handleSubmit}>
            <TextField
              required
              id="zapierWebhook"
              name="zapierWebhook"
              label="Zapier Webhook URL"
              fullWidth
              variant="outlined"
              margin="normal"
              value={zapierWebhook}
              onChange={handleWebhookChange}
            />
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default ZapierIntegration;
