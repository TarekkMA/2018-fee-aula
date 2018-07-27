//@ts-check
const fs = require('fs');


function asd(filename) {
    return JSON.parse(fs.readFileSync(filename).toString())
}

function arrWork(arr, output) {
    let a = ''
    a += 'Number,Name,Status,Grade,%,Score,Physics 3,Electronics,Drawing,Electrical,Data,Envo,Math4,FineElc,Elctronics2,Power,Measurment,Orgnization,Project,Training,notes\n'
    arr.forEach((i) => {
        if (i.subjects["فيزياء هندسية 3"] == undefined) {
            console.log("NOT FIRST", i["number"])
        } else {
            a += i.number + ',';
            a += i.name + ',';
            a += i.status + ',';
            a += i.grade + ',';
            a += i.percentage + ',';
            a += i.score + ',';

            a += i.subjects["فيزياء هندسية 3"] + ',';
            a += i.subjects["فيزياء هندسية 3"] + ',';
            a += i.subjects["الكترونيات1"] + ',';
            a += i.subjects["رسم عناصر ودوائر الك"] + ',';
            a += i.subjects["هندسة كهربية"] + ',';
            a += i.subjects["هياكل بيانات وخوارزميات"] + ',';
            a += i.subjects["هندسة بيئية"] + ',';
            a += i.subjects["رياضيات هندسية 4"] + ',';
            a += i.subjects["تك الكترونيات دقيقة"] + ',';
            a += i.subjects["الكترونيات 2"] + ',';
            a += i.subjects["قوى كهربية"] + ',';
            a += i.subjects["قياسات كهربية"] + ',';
            a += i.subjects["تنظيم الحاسبات"] + ',';
            a += i.subjects["ادارة المشروعات"] + ',';

            a += i.training + ',';
            a += i.notes + '\n';
        }

    })

    fs.writeFileSync(output, a)
}

let arr = []
arr.push(...asd("./res1600000.json"))
arr.push(...asd("./res1500000.json"))
arr.push(...asd("./res1400000.json"))
arr.push(...asd("./res1300000.json"))
arr.push(...asd("./res1200000.json"))

console.log(arr.length,"items")

arrWork(arr,"./out.csv")