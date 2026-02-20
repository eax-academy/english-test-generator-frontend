
import { useEffect, useState } from "react";
import { fetchAllUsers, deleteUser } from "../../api/users.api";
import type { User } from "../../types/types";
import styles from "./AdminPage.module.css";


function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Handle user delete
  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch {
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading)
    return (
      <div className={styles.adminPageContainer}>Loading users...</div>
    );

  if (error)
    return (
      <div className={styles.adminPageContainer} style={{color:'#ff4d4d'}}>{error}</div>
    );

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.adminPageSection}>
        <h1 className={styles.adminPageTitle}>All Users</h1>
        <div style={{overflowX:'auto', width:'100%'}}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{textAlign:'center', color:'#888', padding:'2rem 0'}}>No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name} {user.surname}</td>
                    <td>{user.email}</td>
                    <td>
                      <span style={{padding:'0.3rem 1rem', borderRadius:'1rem', background:user.role==='admin'?'#e50914':'#444', color:'#fff', fontWeight:600, fontSize:'0.95rem'}}>{user.role}</span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                    <td>
                      <button className={styles.adminActionButton} onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
