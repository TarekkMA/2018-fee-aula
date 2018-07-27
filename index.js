const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');


let numa = 1300000

let arr = []

function doNum(num) {
    var j = rp.jar()
    return rp({
            uri: 'http://el-eng.ddns.net/',
            resolveWithFullResponse: true,
            simple: false,
            jar: j
        })
        .then((response) => {

            const $ = cheerio.load(response.body)
            let __VIEWSTATE = $("#__VIEWSTATE").val()
            let __SCROLLPOSITIONX = $("#__SCROLLPOSITIONX").val() || '0'
            let __SCROLLPOSITIONY = $("#__SCROLLPOSITIONY").val() || '0'
            let __EVENTVALIDATION = $("#__EVENTVALIDATION").val()
            let ctl00$cntphmaster$Academic_Num = num
            let ctl00$cntphmaster$btnGo = 'اضغط لبدء الاستبيان'


            var options = {
                method: 'POST',
                uri: 'http://el-eng.ddns.net/',
                formData: {
                    __VIEWSTATE: __VIEWSTATE,
                    __SCROLLPOSITIONX: __SCROLLPOSITIONX,
                    __SCROLLPOSITIONY: __SCROLLPOSITIONY,
                    __EVENTVALIDATION: __EVENTVALIDATION,
                    ctl00$cntphmaster$Academic_Num: ctl00$cntphmaster$Academic_Num,
                    ctl00$cntphmaster$btnGo: ctl00$cntphmaster$btnGo
                },
                resolveWithFullResponse: true,
                simple: false,
                jar: j,
                followAllRedirects: true
            };

            return rp(options)
        })
        .then((resp) => {
            if (resp.request.href == "http://el-eng.ddns.net/UI/studentInter/Result.aspx") {
                return rp({
                    uri: 'http://el-eng.ddns.net/UI/studentInter/Result.aspx',
                    resolveWithFullResponse: true,
                    simple: false,
                    jar: j
                })
            } else if (resp.request.href == "http://el-eng.ddns.net/UI/studentInter/ChooseCourseStaff.aspx") {
                throw new Error("Servay Not Found")
            } else {
                throw new Error("Not Found")
            }
        })
        .then((resp) => {
            const $ = cheerio.load(resp.body)

            function getTableContent(trs) {
                let o = {}
                if (trs.length != 1) {
                    for (var i = 2; i < trs.length; i += 2) {
                        o[$(trs.get(i)).text().replace("\n", "").trim()] = $(trs.get(i + 1)).text().replace("\n", "").trim()
                    }
                }
                return o
            }

            return {
                number: num,
                name: $("#ctl00_cntphmaster_StudentGradeFormView_Students_Total_Grade_IDLabel").text(),
                status: $("#ctl00_cntphmaster_StudentGradeFormView_ResultLabel").text(),
                grade: $("#ctl00_cntphmaster_StudentGradeFormView_GradeLabel").text(),
                percentage: $("#ctl00_cntphmaster_StudentGradeFormView_PercentLabel").text(),
                score: $("#ctl00_cntphmaster_StudentGradeFormView_SumLabel").text(),
                training: $("#ctl00_cntphmaster_StudentGradeFormView_TrainingLabel").text(),
                notes: $("#ctl00_cntphmaster_StudentGradeFormView_NotesLabel").text(),
                subjects: getTableContent($("#ctl00_cntphmaster_StudentGradeFormView_PrimaryGradesGridView1 td")),
                subjectsSecondary: getTableContent($("#ctl00_cntphmaster_StudentGradeFormView_GridView1 td")),
                subjectsT5lf: getTableContent($("#ctl00_cntphmaster_StudentGradeFormView_GridView2").find("td")),
                subjectsT5lf2: getTableContent($("#ctl00_cntphmaster_StudentGradeFormView_GridView3").find("td")),
            }
        })
        .then((a) => {
            arr.push(a)
            console.log(a.number, "OK")
        })
        .catch(function (err) {
            console.error("ERR", num, err.message)
        });
}


async function work(from, to) {
    for (var i = from; i < to; i++) {
        await doNum(numa + i)
    }
}


(async function () {
    await Promise.all([
        work(0, 100),
        work(100, 200),
        work(200, 300),
        work(300, 400),
        work(400, 500),
        work(500, 600),
    ]);
    console.log("DONE")
    fs.writeFileSync("./res_13.json",JSON.stringify(arr))
    console.log("RESULR SAVED")
})()