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
    const $sectionObj = $(`section.section`)
    // DOM Tree에서 nav>ul>li>a 객체들 찾기
    const $menus = $(`nav>ul>li>a, nav>ul>li>ul>li>a`)

        // 〓〓 메뉴 객체에서 클릭이벤트가 발생했을 때 할 일 START 〓〓
        $menus.click((e) => {
            console.log(e.target.className)
            // menu
            switch (e.target.className) { // 화살표 함수 내부에서의 this는 윈도우 객체이기 때문에 e.target 사용!
                case 'teamMainPage':
                    location.href='./teamMain.html'
                    break;

                case 'noticeBoard':
                    const teamNo = 9999
                    location.href='./notice.html?teamNo=${teamNo}'
                    break;

                case 'taskBoard':
                    // ajaxHandler('GET', './taskboard.html', $sectionObj)
                    location.href='./taskboard.html'
                    break;

                case 'QnABoard':
                    ajaxHandler('GET', '#', $sectionObj)
                    break;

                case 'attendencePage':
                    location.href='./teamAttendance.html'
                    break;

                case 'rankPage':
                    // const teamNo = 9999;
                    const teamNo1 = 9999;
                    const month=10;
                    location.href=`./rank.html?teamNo=${teamNo1}&month=${month}`
                    // ajaxHandler('GET', `./rank.html?teamNo=${teamNo}&month=${month}`, $sectionObj)
                    break;

                case 'manageTeamProperties':
                    ajaxHandler('GET', '#', $sectionObj)
                    break;

                case 'manageTeamCurrentMember':
                    location.href='./teamManageCurrentMember.html'
                    break;

                case 'manageTeamApproval':
                    location.href='./teamManageApproval.html'
                    break;

                case 'manageTeamExaminer':
                    location.href='./teamManageExaminer.html'
                    break;
            } // switch(e.target.class)()
            e.preventDefault()
    
        }) // menu.addEventListener()
        // 〓〓 메뉴 객체에서 클릭이벤트가 발생했을 때 할 일 END 〓〓)

});

$(document).ready(function() {
    // 팀 가입하기 버튼 클릭 이벤트
    $('#JoinTeamBtn').click(function() {
        $('#teamJoin').show();  // 팝업창 표시
    });

    // 가입요청 버튼 클릭 이벤트
    $('#closeJoinTeamBtn').click(function() {
        $('#poteamJoinpUp').hide();  // 팝업창 숨김
        // 추가적인 로직 작성하기. (서버로 데이터 전송할거)
    });
});