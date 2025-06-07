import React from 'react';
import { Container, Card, Row, Col, Badge, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faClock, faGlobe, faBolt } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format } from 'date-fns';

interface LogEntry {
  timestamp: Date;
  status: 'success' | 'failure';
  responseTime: number;
  statusCode: number;
  message: string;
}

// Mock data - replace with actual data fetching
const mockWebsiteData = {
  'example.com': {
    url: 'example.com',
    status: 'up',
    latency: 245,
    sslExpiry: '2024-12-31',
    domainExpiry: '2025-12-31',
    uptime: '99.9%',
    lastCheck: new Date(),
    logs: Array.from({ length: 10 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 1000 * 60 * 30),
      status: i % 3 === 0 ? 'failure' : 'success',
      responseTime: Math.random() * 500,
      statusCode: i % 3 === 0 ? 503 : 200,
      message: i % 3 === 0 ? 'Server Error' : 'OK'
    } as LogEntry)),
    uptimeData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: Math.random() * 100
    }))
  },
  'test.com': {
    url: 'test.com',
    status: 'down',
    latency: 0,
    sslExpiry: '2024-10-15',
    domainExpiry: '2025-10-15',
    uptime: '95.5%',
    lastCheck: new Date(),
    logs: Array.from({ length: 10 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 1000 * 60 * 30),
      status: 'failure',
      responseTime: 0,
      statusCode: 503,
      message: 'Connection Failed'
    } as LogEntry)),
    uptimeData: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: Math.random() * 100
    }))
  }
};

const WebsiteDetails: React.FC = () => {
  const { url } = useParams<{ url: string }>();
  const website = url ? mockWebsiteData[url] : null;

  if (!website) {
    return <Container><h1>Website not found</h1></Container>;
  }

  return (
    <Container>
      <h1 className="mb-4">
        <FontAwesomeIcon icon={faGlobe} className="me-2" />
        {website.url}
        <Badge bg={website.status === 'up' ? 'success' : 'danger'} className="ms-3">
          <FontAwesomeIcon icon={website.status === 'up' ? faCheck : faTimes} className="me-1" />
          {website.status.toUpperCase()}
        </Badge>
      </h1>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">24 Hour Uptime History</h5>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={website.uptimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0d6efd"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Logs</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Status</th>
                    <th>Response Time</th>
                    <th>Status Code</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {website.logs.map((log, index) => (
                    <tr key={index}>
                      <td>{format(log.timestamp, 'MMM d, HH:mm:ss')}</td>
                      <td>
                        <Badge bg={log.status === 'success' ? 'success' : 'danger'}>
                          <FontAwesomeIcon
                            icon={log.status === 'success' ? faCheck : faTimes}
                            className="me-1"
                          />
                          {log.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faBolt} className="me-1" />
                        {log.responseTime.toFixed(0)}ms
                      </td>
                      <td>{log.statusCode}</td>
                      <td>{log.message}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Website Information</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-2">
                <strong>Status:</strong>{' '}
                <Badge bg={website.status === 'up' ? 'success' : 'danger'}>
                  {website.status.toUpperCase()}
                </Badge>
              </p>
              <p className="mb-2">
                <strong>Current Latency:</strong>{' '}
                {website.status === 'up' ? `${website.latency}ms` : 'N/A'}
              </p>
              <p className="mb-2">
                <strong>Uptime:</strong> {website.uptime}
              </p>
              <p className="mb-2">
                <strong>SSL Expiry:</strong>{' '}
                <FontAwesomeIcon icon={faClock} className="me-1" />
                {website.sslExpiry}
              </p>
              <p className="mb-2">
                <strong>Domain Expiry:</strong>{' '}
                <FontAwesomeIcon icon={faClock} className="me-1" />
                {website.domainExpiry}
              </p>
              <p className="mb-0">
                <strong>Last Check:</strong>{' '}
                {format(website.lastCheck, 'MMM d, yyyy HH:mm:ss')}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WebsiteDetails; 