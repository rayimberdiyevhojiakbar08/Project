import exportUsersToExcel from './exportsevice.js'
import order from './models/order.model.js'
const users = [
        await order.find()
];

const workSheetColumnName = [
    "Ism Familya",
    "Telefon nomer",
    "Manzil",
    "Kun",
    "Soat",
    "Ustaning Ismi",
    "cost",
    "Buyurtma nomi",
    "Buyurtma turi",
]

const workSheetName = 'Users';
const filePath = './Excell /excel-from-js.xlsx';

exportUsersToExcel(users, workSheetColumnName, workSheetName, filePath);