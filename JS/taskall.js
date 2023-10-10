$(() => {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/alltasklist`,
        method: 'get',
        success: (responseJSONObj) => {
            if(responseJSONObj.msg != undefined){
                alert('과제가 존재하지 않습니다.')
                return
            }

            const $originTrObj = $('div.allboard>div.allcontent>table>thead>tr')
            $originTrObj.addClass('alltask')
            const $tbodyObj = $('div.allboard>div.allcontent>table>tbody')
            const $alltasklist = responseJSONObj.list
            
            $alltasklist.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.nickname
                const r=element.regdate
                const no=element.taskNo
                $copyTrObj.data('taskNo', no);
                

                const $nicknameTdObj = $('<td>')
                $nicknameTdObj.addClass('nickname')
                $nicknameTdObj.append(q)                
                $copyTrObj.append($nicknameTdObj)
                
                const $titleTdObj = $('<td>')
                $titleTdObj.addClass('title')
                $titleTdObj.append(p)
                $copyTrObj.append($titleTdObj)

                const $regdateTdObj = $('<td>')
                $regdateTdObj.addClass('regdate')
                $regdateTdObj.append(r)
                $copyTrObj.append($regdateTdObj)

                $tbodyObj.append($copyTrObj)
            });

            const $copyTrObj = $originTrObj.clone()
            $copyTrObj.empty()
            
            $tbodyObj.append($copyTrObj)

        }
    })

    $('section.taskboard>div.allboard>div.allcontent>table').on('click', 'tbody tr.alltask', function() {
        const taskNo = $(this).data('taskNo')
        localStorage.setItem("taskNo", taskNo)
        location.href='./taskview.html?taskNo='+taskNo
    });
})