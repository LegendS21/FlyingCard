
const waktu = (createAt) => {
   return createAt.slice(0, 5)
}
const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}
const date = (date) => {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(date);
}
// console.log(waktu);
module.exports = { waktu, rupiah ,date}