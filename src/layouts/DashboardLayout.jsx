import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-blue-600 text-white text-center py-4 text-xl font-semibold shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Panel - CRUD Usuarios</h1>
          <nav className="space-x-4">
            <Link to="/users" className="ml-2">Usuarios</Link>
            <Link to="/create" className="ml-2">Crear</Link>
          </nav>
        </div>
      </header>

      <main className="w-full max-w-3xl mt-10 px-4">
        <Outlet />
      </main>

      <footer className="mt-20 text-gray-500 text-sm pb-5">
        Taller CRUD — React + Vite + Tailwind
      </footer>
    </div>
  );
}
