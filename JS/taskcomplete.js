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
            const $tbodyObj = $('div.completeboard>div.completecontent>table>tbody')
            const $completetasklist = responseJSONObj.list
            
            $completetasklist.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.id
                const r = element.hwScore
                const s = element.submitDate
                
                const $titleTdObj = $('<td>')
                $titleTdObj.addClass('title')
                $titleTdObj.append(p)
                $copyTrObj.append($titleTdObj)

                const $idTdObj = $('<td>')
                $idTdObj.addClass('id')
                $idTdObj.append(q)                
                $copyTrObj.append($idTdObj)  

                const $hwscoreTdObj = $('<td>')
                $hwscoreTdObj.addClass('hwscore')
                $hwscoreTdObj.append(r)                
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
})