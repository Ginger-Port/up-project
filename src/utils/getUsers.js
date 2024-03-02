export function getUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  return users;
}

export function addUser(user) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
}
