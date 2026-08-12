import React from 'react';
import '../styles/AdminPlayers.css';

export const AdminUsers = ({ users, inquiries, onUpdateUser, onDeleteUser, onReviewInquiry, onDeleteInquiry }) => {
  const openGmailDraft = (inquiry) => {
    const subject = encodeURIComponent(`Re: Sponsorship Inquiry — Titans Rugby Club`);
    const body = encodeURIComponent(
      `Hi ${inquiry.name},\n\n` +
      `Thank you for your interest in sponsoring the Titans! We'd love to discuss this further.\n\n` +
      `We received your message:\n"${inquiry.message}"\n\n` +
      `Looking forward to hearing from you.\n\n` +
      `Best regards,\nTitans Rugby Club`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(inquiry.email)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleApprove = async (inquiry) => {
    openGmailDraft(inquiry);
    if (!inquiry.reviewed) {
      await onReviewInquiry(inquiry.id);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this sponsor inquiry? This cannot be undone.')) return;
    await onDeleteInquiry(id);
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Users</h1>
      <table className="admin-table">
        <thead><tr><th>Username</th><th>Role</th><th></th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                <button className="admin-row-btn delete" onClick={() => onDeleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="admin-page-title" style={{ marginTop: '2.5rem' }}>Sponsor Inquiries</h1>
      <table className="admin-table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Message</th><th>Reviewed</th><th></th></tr>
        </thead>
        <tbody>
          {inquiries.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>{i.message}</td>
              <td>{i.reviewed ? 'Yes' : 'No'}</td>
              <td>
                <button className="admin-row-btn edit" onClick={() => handleApprove(i)}>
                  Approve &amp; Reply
                </button>
                <button className="admin-row-btn delete" onClick={() => handleDeleteInquiry(i.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};