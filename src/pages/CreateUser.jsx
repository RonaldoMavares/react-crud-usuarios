import UserForm from "../components/UserForm";
import { createUser } from "../services/api";

export default function CreateUser() {
  async function handleCreate(data) {
    await createUser(data);
    window.location.href = "/users";
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Crear Usuario</h1>
      <UserForm onSubmit={handleCreate} />
    </div>
  );
}