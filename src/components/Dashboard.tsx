import React, { useState } from 'react';
import { Container, Table, Badge, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faTimes, faClock, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import AddWebsiteModal from './AddWebsiteModal';
import type { Website, NewWebsite } from '../types/website';

const Dashboard: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([
    {
      id: 1,
      url: 'example.com',
      status: 'up',
      latency: 245,
      sslExpiry: '2024-12-31',
      domainExpiry: '2025-12-31',
      uptimeData: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        value: Math.random() * 100
      }))
    },
    {
      id: 2,
      url: 'test.com',
      status: 'down',
      latency: 0,
      sslExpiry: '2024-10-15',
      domainExpiry: '2025-10-15',
      uptimeData: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        value: Math.random() * 100
      }))
    }
  ]);

  const handleAddWebsite = (newWebsite: NewWebsite) => {
    const website: Website = {
      id: websites.length + 1,
      url: newWebsite.url.replace(/^https?:\/\//, ''),
      status: 'up',
      latency: 0,
      sslExpiry: '2025-12-31',
      domainExpiry: '2026-12-31',
      uptimeData: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        value: 100
      }))
    };
    setWebsites([...websites, website]);
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Website Monitoring</h1>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add New Website
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Status</th>
                <th>Website</th>
                <th>Latency</th>
                <th>SSL Expiry</th>
                <th>Domain Expiry</th>
                <th>24h Uptime</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((site) => (
                <tr key={site.id}>
                  <td>
                    <Badge bg={site.status === 'up' ? 'success' : 'danger'}>
                      <FontAwesomeIcon icon={site.status === 'up' ? faCheck : faTimes} />
                      {' '}
                      {site.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td>{site.url}</td>
                  <td>
                    {site.status === 'up' ? (
                      <span className="text-success">{site.latency}ms</span>
                    ) : (
                      <span className="text-danger">-</span>
                    )}
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faClock} className="me-2" />
                    {site.sslExpiry}
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faClock} className="me-2" />
                    {site.domainExpiry}
                  </td>
                  <td style={{ width: '200px', height: '50px' }}>
                    <ResponsiveContainer width="100%" height={50}>
                      <LineChart data={site.uptimeData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={site.status === 'up' ? '#198754' : '#dc3545'}
                          strokeWidth={2}
                          dot={false}
                        />
                        <XAxis hide={true} />
                        <YAxis hide={true} />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  </td>
                  <td>
                    <Link
                      to={`/website/${site.url}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="me-1" />
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <div className="text-muted text-center">
        <small>Front-End Node: NODE-001</small>
      </div>

      <AddWebsiteModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdd={handleAddWebsite}
      />
    </Container>
  );
};

export default Dashboard; 