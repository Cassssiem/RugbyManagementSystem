import React from 'react';
import '../styles/AdminPlayers.css';

export const AdminUsers = ({ users, inquiries, onDeleteUser, onReviewInquiry }) => {
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
        <thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Reviewed</th><th></th></tr></thead>
        <tbody>
          {inquiries.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>{i.message}</td>
              <td>{i.reviewed ? 'Yes' : 'No'}</td>
              <td>
                {!i.reviewed && (
                  <button className="admin-row-btn edit" onClick={() => onReviewInquiry(i.id)}>Mark Reviewed</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};