export default function ConfirmModal({ visible, message, onConfirm, onCancel }) {
  if (!visible) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onConfirm} className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow">Eliminar</button>
          <button onClick={onCancel} className="px-3 py-2 border rounded hover:bg-gray-100">Cancelar</button>
        </div>
      </div>
    </div>
  );
}