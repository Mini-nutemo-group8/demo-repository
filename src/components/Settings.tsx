import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faBell, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';

interface NotificationSettings {
  email: boolean;
  webhook: boolean;
  downtime: boolean;
  ssl: boolean;
  domain: boolean;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    webhook: false,
    downtime: true,
    ssl: true,
    domain: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings update
    console.log('Settings updated:', settings);
  };

  return (
    <Container>
      <h1 className="mb-4">Settings</h1>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faBell} className="me-2" />
                Notification Preferences
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <h6 className="mb-3">Notification Methods</h6>
                <Form.Group className="mb-4">
                  <Form.Check
                    type="switch"
                    id="email-notifications"
                    label={
                      <span>
                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                        Email Notifications
                      </span>
                    }
                    checked={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.checked })}
                  />
                  {settings.email && (
                    <Form.Control
                      type="email"
                      placeholder="Enter email address"
                      className="mt-2"
                      defaultValue="user@example.com"
                    />
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="switch"
                    id="webhook-notifications"
                    label={
                      <span>
                        <FontAwesomeIcon icon={faGlobe} className="me-2" />
                        Webhook Notifications
                      </span>
                    }
                    checked={settings.webhook}
                    onChange={(e) => setSettings({ ...settings, webhook: e.target.checked })}
                  />
                  {settings.webhook && (
                    <Form.Control
                      type="url"
                      placeholder="Enter webhook URL"
                      className="mt-2"
                    />
                  )}
                </Form.Group>

                <h6 className="mb-3">Alert Types</h6>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="downtime-alerts"
                    label="Downtime Alerts"
                    checked={settings.downtime}
                    onChange={(e) => setSettings({ ...settings, downtime: e.target.checked })}
                  />
                  <Form.Check
                    type="checkbox"
                    id="ssl-alerts"
                    label="SSL Certificate Expiry"
                    checked={settings.ssl}
                    onChange={(e) => setSettings({ ...settings, ssl: e.target.checked })}
                  />
                  <Form.Check
                    type="checkbox"
                    id="domain-alerts"
                    label="Domain Expiry"
                    checked={settings.domain}
                    onChange={(e) => setSettings({ ...settings, domain: e.target.checked })}
                  />
                </Form.Group>

                <Button type="submit" variant="primary">
                  <FontAwesomeIcon icon={faSave} className="me-2" />
                  Save Settings
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">System Information</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-2">
                <strong>Front-End Node:</strong> NODE-001
              </p>
              <p className="mb-2">
                <strong>Version:</strong> 1.0.0
              </p>
              <p className="mb-0">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings; 