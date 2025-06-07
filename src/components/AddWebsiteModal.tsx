import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import type { NewWebsite } from '../types/website';

interface AddWebsiteModalProps {
  show: boolean;
  onHide: () => void;
  onAdd: (website: NewWebsite) => void;
}

const AddWebsiteModal: React.FC<AddWebsiteModalProps> = ({ show, onHide, onAdd }) => {
  const [formData, setFormData] = useState<NewWebsite>({
    url: '',
    name: '',
    checkInterval: 5,
    monitorSSL: true,
    monitorDomain: true,
    alertThreshold: 200
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Website</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Website URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
            <Form.Text className="text-muted">
              Enter the full URL including http:// or https://
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="My Website"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Check Interval (minutes)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="60"
              value={formData.checkInterval}
              onChange={(e) => setFormData({ ...formData, checkInterval: parseInt(e.target.value) })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Response Time Alert Threshold (ms)</Form.Label>
            <Form.Control
              type="number"
              min="100"
              max="5000"
              step="100"
              value={formData.alertThreshold}
              onChange={(e) => setFormData({ ...formData, alertThreshold: parseInt(e.target.value) })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Monitor SSL Certificate"
              checked={formData.monitorSSL}
              onChange={(e) => setFormData({ ...formData, monitorSSL: e.target.checked })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Monitor Domain Expiry"
              checked={formData.monitorDomain}
              onChange={(e) => setFormData({ ...formData, monitorDomain: e.target.checked })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            <FontAwesomeIcon icon={faTimes} className="me-2" />
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon={faSave} className="me-2" />
            Add Website
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddWebsiteModal; 