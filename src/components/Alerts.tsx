import React from 'react';
import { Container, Card, Badge, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCertificate, faServer } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

interface Alert {
  id: number;
  type: 'downtime' | 'ssl' | 'domain';
  website: string;
  message: string;
  timestamp: Date;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    type: 'downtime',
    website: 'example.com',
    message: 'Website is down',
    timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  },
  {
    id: 2,
    type: 'ssl',
    website: 'test.com',
    message: 'SSL certificate expires in 7 days',
    timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
  }
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'downtime':
      return faServer;
    case 'ssl':
    case 'domain':
      return faCertificate;
    default:
      return faExclamationTriangle;
  }
};

const getAlertVariant = (type: string) => {
  switch (type) {
    case 'downtime':
      return 'danger';
    case 'ssl':
      return 'warning';
    case 'domain':
      return 'info';
    default:
      return 'secondary';
  }
};

const Alerts: React.FC = () => {
  return (
    <Container>
      <h1 className="mb-4">System Alerts</h1>
      
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Recent Alerts</h5>
            <Badge bg="danger">{mockAlerts.length} Active</Badge>
          </div>
        </Card.Header>
        
        <ListGroup variant="flush">
          {mockAlerts.map((alert) => (
            <ListGroup.Item key={alert.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Badge bg={getAlertVariant(alert.type)} className="me-2">
                    <FontAwesomeIcon icon={getAlertIcon(alert.type)} className="me-1" />
                    {alert.type.toUpperCase()}
                  </Badge>
                  <strong>{alert.website}</strong>
                  <p className="mb-0 mt-1 text-muted">{alert.message}</p>
                </div>
                <small className="text-muted">
                  {format(alert.timestamp, 'MMM d, yyyy HH:mm')}
                </small>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default Alerts; 