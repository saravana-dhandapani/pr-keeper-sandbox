function fullName(user) {
  return user.first.trim() + ' ' + user.last.trim();
}
function city(user) {
  return user.address.city.toUpperCase();
}
function avgAge(users) {
  return users.reduce((s, u) => s + u.age, 0) / users.length;
}
module.exports = { fullName, city, avgAge };
