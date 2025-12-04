import { useState, useCallback } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (e) {
      console.error("loadUsers error:", e);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(async (userData) => {
    await createUser(userData);
    await loadUsers();
  }, [loadUsers]);

  const editUser = useCallback(async (id, userData) => {
    await updateUser(id, userData);
    await loadUsers();
  }, [loadUsers]);

  const removeUser = useCallback(async (id) => {
    await deleteUser(id);
    await loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    loadUsers,
    createUser: addUser,
    updateUser: editUser,
    removeUser,
  };
}