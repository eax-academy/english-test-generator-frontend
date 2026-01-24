import { useEffect, useState } from "react";
import { fetchAllUsers, deleteUser } from "../../api/users.api";
import type { User } from "../../types/types";


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
      <div className="flex items-center justify-center min-h-screen text-white text-lg font-semibold">
        Loading users...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg font-semibold">
        {error}
      </div>
    );


  return (
    <div className="flex-1 p-6 flex flex-col items-center min-w-0">
      <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 text-center">
        All Users
      </h1>

      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[800px] bg-[#1f1f1f] shadow-xl divide-y divide-gray-700 rounded-lg">
          <thead>
            <tr className="text-center text-gray-400 uppercase text-xs md:text-xl">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-800 transition-colors duration-300 text-center"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {user.name} {user.surname}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === "admin"
                        ? "bg-red-600 text-white"
                        : "bg-gray-600 text-white"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 flex justify-center gap-2">

                    <button
                      className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
