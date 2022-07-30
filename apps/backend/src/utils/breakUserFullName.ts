export const breakUserFullName = (fullName: string) => {
  const chunks = fullName
    .split(" ")
    .map((e) => e.trim())
    .filter((e) => e.length);
  const first_name = chunks.splice(0, 1).join(" ");
  const last_name = chunks.length ? chunks.join(" ") : "_";
  return [first_name, last_name];
};
