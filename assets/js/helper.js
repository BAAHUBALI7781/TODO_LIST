var today = new Date().toJSON().split('T')[0];
// console.log(Date.parse(today));
document.getElementById('due_date').setAttribute("min",today);