/*
function ajaxHandler(method, url, target) {
    console.log(url)

    const xhttp = new XMLHttpRequest()
    xhttp.addEventListener('readystatechange', function () {
        // alert(this.readyState + ":" + this.status)

        if (this.readyState == 4) {
            if (this.status == 200) {
                target.innerHTML = this.responseText
            } else if (this.status == 404) {
                alert('자원이 없습니다.')
            } else if (this.status == 500) {
                alert('서버 실행시 오류가 발생했습니다.')
            } else {
                alert(this.responseText)
            } // if-else
        } // if
    }) // xhttp.addEventListener()
    xhttp.open(method, url)
    xhttp.send()
} // ajaxHandler
*/

function ajaxHandler(method, u, target) {
    console.log(u)

    if (method == 'GET') {
        target.load(u, function (response, status, xhr) { // jQuery용 메소드 load()
            if (status == "error") {
                alert(xhr.status + ShadowRoot.statusText)
            } // inner-if
        })  // .load()
    } // outer-if

} // ajaxHandler

$(() => {

    // DOM Tree에서 section 객체 찾기
    const $sectionObj = $(`section`)
    // DOM Tree에서 nav>ul>li>a 객체들 찾기
    const $menus = $(`nav>ul>li>a, nav>ul>li>ul>li>a`)

        // 〓〓 메뉴 객체에서 클릭이벤트가 발생했을 때 할 일 START 〓〓
        $menus.click((e) => {
            console.log(e.target.className)
            // menu
            switch (e.target.className) { // 화살표 함수 내부에서의 this는 윈도우 객체이기 때문에 e.target 사용!
                case 'noticeBoard':
                    ajaxHandler('GET', './notice.html', $sectionObj) // sectionObj = 결과를 보여줄 영역
                    break;

                case 'taskBoard':
                    ajaxHandler('GET', './taskmain.html', $sectionObj)
                    break;

                case 'QnABoard':
                    ajaxHandler('GET', '#', $sectionObj)
                    break;

                case 'attendencePage':
                    ajaxHandler('GET', '#', $sectionObj)
                    break;

                case 'rankPage':
                    ajaxHandler('GET', '#', $sectionObj)
                    break;

                case 'manageTeamProperties':
                    ajaxHandler('GET', '#', $sectionObj)
                    break;

                case 'manageTeamCurrentMember':
                    ajaxHandler('GET', './teamManageCurrentMember.html', $sectionObj)
                    break;

                case 'manageTeamApproval':
                    ajaxHandler('GET', './teamManageApproval.html', $sectionObj)
                    break;

                case 'manageTeamExaminer':
                    ajaxHandler('GET', './teamManageExaminer.html', $sectionObj)
                    break;
            } // switch(e.target.class)()
            e.preventDefault()
    
        }) // menu.addEventListener()
        // 〓〓 메뉴 객체에서 클릭이벤트가 발생했을 때 할 일 END 〓〓)
    
        // 〓〓 로고 img 객체에서 클릭이벤트가 발생했을 때 할 일 START 〓〓)
        // const $logo = $(`header>img`)
    
        //$logo.click((e) => {
        //    location.href = `./main.html`
        //})
        // 〓〓 로고 img 객체에서 클릭이벤트가 발생했을 때 할 일 END 〓〓)

});