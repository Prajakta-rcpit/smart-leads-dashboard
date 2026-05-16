import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { LeadStatus, LeadSource, type ILead } from '../../types';

interface LeadFormProps {
  lead?: ILead | null;
  onSubmit: (data: { name: string; email: string; status: string; source: string }) => void;
  isLoading: boolean;
  onCancel: () => void;
}

const statusOptions = Object.values(LeadStatus).map((s) => ({ label: s, value: s }));
const sourceOptions = Object.values(LeadSource).map((s) => ({ label: s, value: s }));

interface FormErrors {
  name?: string;
  email?: string;
  source?: string;
}

const LeadForm = ({ lead, onSubmit, isLoading, onCancel }: LeadFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<LeadStatus>(LeadStatus.New);
  const [source, setSource] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (lead) {
      setName(lead.name);
      setEmail(lead.email);
      setStatus(lead.status);
      setSource(lead.source);
    }
  }, [lead]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!source) {
      newErrors.source = 'Source is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name: name.trim(), email: email.trim(), status, source });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        placeholder="Enter lead name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter lead email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Select
        label="Status"
        options={statusOptions}
        value={status}
        onChange={(e) => setStatus(e.target.value as LeadStatus)}
      />
      <Select
        label="Source"
        options={[{ label: 'Select source', value: '' }, ...sourceOptions]}
        value={source}
        onChange={(e) => setSource(e.target.value)}
        error={errors.source}
      />
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {lead ? 'Update Lead' : 'Create Lead'}
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;
