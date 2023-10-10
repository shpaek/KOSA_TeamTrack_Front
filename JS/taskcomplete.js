$(() => {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/completetasklist`,
        method: 'get',
        success: (responseJSONObj) => {
            if(responseJSONObj.msg != undefined){
                alert('과제가 존재하지 않습니다.')
                return
            }

            const $originTrObj = $('div.completeboard>div.completecontent>table>thead>tr')
            $originTrObj.addClass('completetask')
            const $tbodyObj = $('div.completeboard>div.completecontent>table>tbody')
            const $completetasklist = responseJSONObj.list
            
            $completetasklist.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.nickname
                const r = element.hwScore
                const s = element.submitDate
                
                const $nicknameTdObj = $('<td>')
                $nicknameTdObj.addClass('nickname')
                $nicknameTdObj.append(q)                
                $copyTrObj.append($nicknameTdObj) 
                
                const $titleTdObj = $('<td>')
                $titleTdObj.addClass('title')
                $titleTdObj.append(p)
                $copyTrObj.append($titleTdObj) 

                const $hwscoreTdObj = $('<td>')
                $hwscoreTdObj.addClass('hwscore')
                $hwscoreTdObj.append(r+"점")                
                $copyTrObj.append($hwscoreTdObj) 

                const $submitdateTdObj = $('<td>')
                $submitdateTdObj.addClass('submitdate')
                $submitdateTdObj.append(s)
                $copyTrObj.append($submitdateTdObj)

                $tbodyObj.append($copyTrObj)
            });

            const $copyTrObj = $originTrObj.clone()
            $copyTrObj.empty()
            
            $tbodyObj.append($copyTrObj)

        }
    })

    $('section.taskboard>div.completeboard>div.completecontent>table').on('click', 'tbody tr.completetask', function() {
        location.href='./taskview.html'
    });
})