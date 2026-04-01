const API_BASE = '/api';

const request = async (method, path, body) => {
  const options = { method, headers: { 'Content-Type': 'application/json' } };
  if (body !== undefined) options.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
};

export const api = {
  invoices: {
    list: () => request('GET', '/invoices'),
    get: (id) => request('GET', `/invoices/${id}`),
    create: (data) => request('POST', '/invoices', data),
    update: (id, data) => request('PUT', `/invoices/${id}`, data),
    delete: (id) => request('DELETE', `/invoices/${id}`),
  },
  settings: {
    list: () => request('GET', '/settings'),
    create: (data) => request('POST', '/settings', data),
    update: (id, data) => request('PUT', `/settings/${id}`, data),
  },
  upload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Upload failed');
    return res.json();
  },
  email: {
    send: (data) => request('POST', '/email/send', data),
  },
};
