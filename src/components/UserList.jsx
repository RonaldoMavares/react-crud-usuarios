import { Link } from "react-router-dom";

export default function UserList({ users, onDelete }) {
  if (!Array.isArray(users) || users.length === 0) {
    return <div className="card text-center">No hay usuarios.</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <ul className="divide-y">
        {users.map((u) => (
          <li key={u.id} className="flex justify-between py-3 border-b last:border-none">
            <div>
              <p className="font-semibold text-gray-800 text-lg">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>

            <div className="flex gap-2">
              <Link to={`/edit/${u.id}`}>
                <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">Editar</button>
              </Link>

              <button onClick={() => onDelete(u)} className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}