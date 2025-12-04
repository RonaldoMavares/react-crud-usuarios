import { useEffect, useState } from "react";
import { getUser, updateUser } from "../services/api";
import UserForm from "../components/UserForm";
import { useParams } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(id).then((u) => setUser(u)).catch((e) => console.error(e));
  }, [id]);

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Editar Usuario</h1>
      <UserForm initialValues={user} onSubmit={async (data) => {
        await updateUser(id, data);
        window.location.href = "/users";
      }} />
    </div>
  );
}