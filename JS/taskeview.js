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
const backURL = 'http://localhost:8888/KOSA_Project2'
const taskNo=localStorage.getItem("taskNo")
$(()=>{
    
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: `${backURL}/viewtask`,
        method: 'get',
        data: `taskNo=${taskNo}`,
        success: (responseJSONObj) => {
           if(responseJSONObj.status==0) {
            alert(responseJSONObj.msg)
            return
           } else if(responseJSONObj.status==1) {
            const title=responseJSONObj.title
            const nickname=responseJSONObj.nickname
            const regdate=responseJSONObj.regdate

            const $origintitleObj=$('div.taskviewbox>div.tasktitle')
            const $titleObj=$('<h1>')
            $titleObj.append(title)
            $origintitleObj.append($titleObj)

            const $originnicknameObj=$('div.tasknickname')
            const $nicknameObj=$('<span>')
            $nicknameObj.append(nickname)
            $originnicknameObj.append($nicknameObj)
            console.log(taskNo)
           }

        }, error : (()=>{
            alert('error')
        })
    })
    const $menus = $('div.taskboardmenu>ul>li>a')

    $menus.click((e) => {
        switch (e.target.className) {
            case 'maintask':
                location.href='./taskboard.html'
                break
            case 'alltask':
                location.href='./taskall.html'
                break
            case 'completetask': 
                location.href='./taskcomplete.html'
                break
            case 'mytask':
                location.href='./taskmy.html'
                break
        }
        e.preventDefault()
    })
})