const API_URL = "http://localhost:8080/api/users";

function extractArray(json) {
  if (Array.isArray(json)) return json;
  if (json && Array.isArray(json.data)) return json.data;
  if (json && Array.isArray(json.users)) return json.users;
  if (json && json._embedded) {
    // soporta HAL-like responses
    const first = Object.values(json._embedded).find(Array.isArray);
    if (Array.isArray(first)) return first;
  }
  return [];
}

export async function getUsers() {
  const res = await fetch(API_URL);
  const json = await res.json();
  return extractArray(json);
}

export async function getUser(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

export async function createUser(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}