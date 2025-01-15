function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function validID(id) {
  if(!id){
    return false
  }
  return !isNaN(id)
}

module.exports = {
  emptyOrRows,
  validID
}