const backURL = 'http://localhost:8888/KOSA_Project2'
const frontURL = 'http://localhost:5500/KOSA_Project2_Front/HTML'

function ajaxHandler(method, u, target) {
    console.log(u)
    
    if(method == 'GET'){
        target.load(u,  function( response, status, xhr ) {
            if ( status == "error" ) {
                alert(xhr.status + xhr.statusText)
            }
        })
    }
}

$(()=> {
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

            const $originTrObj = $('div.board>div.content>table>thead>tr')
            const $tbodyObj = $('div.board>div.content>table>tbody')
            
            responseJSONObj.forEach(element => {
                const $copyTrObj = $originTrObj.clone()
                $copyTrObj.empty()
                const p = element.title
                const q = element.id
                const r = element.regdate
                const s = element.enddate
                // console.log(q)
                
                const $titleTdObj = $('<td>')
                $titleTdObj.addClass('title')
                $titleTdObj.append(p)
                $copyTrObj.append($titleTdObj)

                const $idTdObj = $('<td>')
                $idTdObj.addClass('id')
                $idTdObj.append(q)                
                $copyTrObj.append($idTdObj)  

                const $regdateTdObj = $('<td>')
                $regdateTdObj.addClass('regdate')
                $regdateTdObj.append(r)
                $copyTrObj.append($regdateTdObj)

                const $enddateTdObj = $('<td>')
                $enddateTdObj.addClass('enddate')
                $enddateTdObj.append(r)
                $copyTrObj.append($enddateTdObj)

                $tbodyObj.append($copyTrObj)
            });

            const $copyTrObj = $originTrObj.clone()
            $copyTrObj.empty()
            
            $tbodyObj.append($copyTrObj)

        }
    })

    const $tasksectionObj=$('section.taskboard')
    const $menus = $('div.taskboardmenu>ul>li>a')

    $menus.click((e) => {
        switch (e.target.className) {
            case 'maintask':
                ajaxHandler('GET', './taskmain.html', $tasksectionObj)
                break
            case 'alltask':
                ajaxHandler('GET', './taskall.html', $tasksectionObj)
                break
            case 'completetask': 
                ajaxHandler('GET', './taskcomplete.html', $tasksectionObj)
                break
            case 'mytask':
                ajaxHandler('GET', './taskmy.html', $tasksectionObj)
                break;
        }
        e.preventDefault()
    })
})