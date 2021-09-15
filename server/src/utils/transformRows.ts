const transformRows = (rows: { name: string }[]) => {
  return rows.map((row) => row.name);
};
export default transformRows;
