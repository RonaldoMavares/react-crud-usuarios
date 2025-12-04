import { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import UserList from "../components/UserList";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";

export default function Users() {
  const { users, loading, loadUsers, createUser, updateUser, removeUser } = useUsers();
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const seedSample = async () => {
    const samples = [
      { name: "María Pérez", email: "maria@example.com", password: "123456" },
      { name: "Carlos García", email: "carlos@example.com", password: "123456" },
      { name: "Ana López", email: "ana@example.com", password: "123456" },
    ];
    for (const s of samples) {
      try {
        await createUser(s);
      } catch (e) {
        console.error("Seed create error:", e);
      }
    }
    await loadUsers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Usuarios</h1>

        <div className="flex gap-3">
          <button onClick={seedSample} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition">Sembrar datos</button>
          <button onClick={() => { setSelected(null); setModal("create"); }} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition">+ Crear usuario</button>
        </div>
      </div>

      {loading ? <p>Cargando...</p> : <UserList users={users} onEdit={(u) => { setSelected(u); setModal("edit"); }} onDelete={(u) => { setSelected(u); setModal("delete"); }} />}

      {modal === "create" && (
        <Modal onClose={() => setModal(null)}>
          <h2 className="text-xl font-bold mb-4">Crear usuario</h2>
          <UserForm onSubmit={async (data) => { await createUser(data); await loadUsers(); setModal(null); }} />
        </Modal>
      )}

      {modal === "edit" && selected && (
        <Modal onClose={() => setModal(null)}>
          <h2 className="text-xl font-bold mb-4">Editar usuario</h2>
          <UserForm initialValues={selected} onSubmit={async (data) => { await updateUser(selected.id, data); await loadUsers(); setModal(null); }} />
        </Modal>
      )}

      {modal === "delete" && selected && (
        <Modal onClose={() => setModal(null)}>
          <p className="mb-4">¿Eliminar a <strong>{selected.name}</strong>?</p>
          <div className="flex justify-end gap-3">
            <button className="btn btn-primary bg-red-600" onClick={async () => { await removeUser(selected.id); await loadUsers(); setModal(null); }}>Eliminar</button>
            <button className="btn border" onClick={() => setModal(null)}>Cancelar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}