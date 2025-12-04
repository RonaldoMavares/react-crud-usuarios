import { useState } from "react";

export default function UserForm({ initialValues, onSubmit }) {
  const [form, setForm] = useState(initialValues || { name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!form.name?.trim()) newErrors.name = "Nombre obligatorio";
    if (!form.email?.trim()) newErrors.email = "Email obligatorio";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Email inválido";
    if (!initialValues && (!form.password || form.password.length < 6)) newErrors.password = "Contraseña >= 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Nombre</label>
        <input className="w-full border p-2 rounded" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Email</label>
        <input className="w-full border p-2 rounded" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      {!initialValues && (
        <div>
          <label className="block font-medium mb-1">Contraseña</label>
          <input className="w-full border p-2 rounded" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>
      )}

      <div className="flex justify-end">
        <button className="btn btn-primary">Guardar</button>
      </div>
    </form>
  );
}