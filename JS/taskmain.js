$(() => {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/maintasklist`,
        method: 'get',
        success: (responseJSONObj) => {
            if(responseJSONObj.msg != undefined){
                alert('과제가 존재하지 않습니다.')
                return
            }

            const $originTrObj = $('div.mainboard>div.maincontent>table>thead>tr')
            $originTrObj.addClass('maintask')
            const $tbodyObj = $('div.mainboard>div.maincontent>table>tbody')
            
            responseJSONObj.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.nickname
                const s = element.enddate
                // console.log(q)
                
                const $nicknameTdObj = $('<td>')
                $nicknameTdObj.addClass('nickname')
                $nicknameTdObj.append(q)                
                $copyTrObj.append($nicknameTdObj)  
                
                const $titleTdObj = $('<td>')
                $titleTdObj.addClass('title')
                $titleTdObj.append(p)
                $copyTrObj.append($titleTdObj)

                const $enddateTdObj = $('<td>')
                $enddateTdObj.addClass('enddate')
                $enddateTdObj.append(s)
                $copyTrObj.append($enddateTdObj)

                $tbodyObj.append($copyTrObj)
            });

            const $copyTrObj = $originTrObj.clone()
            $copyTrObj.empty()
            
            $tbodyObj.append($copyTrObj)

        }
    })

    const $createtaskmenu = $('section.taskboard>div.mainboard>div.maincontent>table>tbody td.createtd>div.createbox')
    const $tasksectionObj=$('section.taskboard')
    $createtaskmenu.click((e) =>{
        ajaxHandler('GET', './taskcreate.html', $tasksectionObj)
    })

    $('section.taskboard>div.mainboard>div.maincontent>table').on('click', 'tbody tr.maintask', function() {
        ajaxHandler('GET', './taskexam.html', $tasksectionObj);
    });
})