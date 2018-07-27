const fs = require('fs');


function asd(filename,output){
    let a = ''

    fs.readFile(filename,(err,data)=>{
        let arr = JSON.parse(data)
    
        a += 'Number,Name,Status,Grade,%,Score,Physics 3,Electronics,Drawing,Electrical,Data,Envo,Math4,FineElc,Elctronics2,Power,Measurment,Orgnization,Project,Training,notes\n'
        arr.forEach((i)=>{
            if(i.subjects["فيزياء هندسية 3"] == undefined){
                console.log("NOT FIRST",i["number"])
            }else{
                a+=i.number + ',';
                a+=i.name + ',';
                a+=i.status + ',';
                a+=i.grade + ',';
                a+=i.percentage + ','; 
                a+=i.score + ','; 
    
                a+=i.subjects["فيزياء هندسية 3"] + ','; 
                a+=i.subjects["الكترونيات1"] + ','; 
                a+=i.subjects["رسم عناصر ودوائر الك"] + ','; 
                a+=i.subjects["هندسة كهربية"] + ','; 
                a+=i.subjects["هياكل بيانات وخوارزميات"] + ','; 
                a+=i.subjects["هندسة بيئية"] + ','; 
                a+=i.subjects["رياضيات هندسية 4"] + ','; 
                a+=i.subjects["تك الكترونيات دقيقة"] + ','; 
                a+=i.subjects["الكترونيات 2"] + ','; 
                a+=i.subjects["قوى كهربية"] + ','; 
                a+=i.subjects["قياسات كهربية"] + ','; 
                a+=i.subjects["تنظيم الحاسبات"] + ','; 
                a+=i.subjects["ادارة المشروعات"] + ','; 
    
                a+=i.training + ','; 
                a+=i.notes + '\n'; 
            }
            
        })
    
        fs.writeFileSync(output,a)
    
    })
}

asd("./res_15.json","./15.csv")
asd("./res_14.json","./14.csv")
asd("./res_13.json","./13.csv")