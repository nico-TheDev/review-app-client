const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];


export default function formatDate(date){
    date = date.substring(0,10)
    date = date.split('-')
    return `${months[date[1]]} ${date[2]}, ${date[0]}`
}
// 2020-10-06T00:00:50.260Z


