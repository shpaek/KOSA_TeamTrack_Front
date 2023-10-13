//const backURL = 'http://localhost:8888/KOSA_TeamTrack_Back'
const backURL = 'http://127.0.0.1:8888/teamtrack'
const frontURL = 'http://localhost:5500/HTML'
// const teamNo = location.search.substring(1).split('=')[1]

const teamNo = 9999;
// const id = 'psh2023';

function ajaxHandler(method, u, target) {
    console.log(u)

    if (method == 'GET') {
        target.load(u, function (response, status, xhr) { // jQuery용 메소드 load()
            if (status == "error") {
                alert(xhr.status + xhr.statusText);
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
                    // ajaxHandler('GET', '#', $sectionObj)
                    ajaxHandler('GET', './qnaboard.html', $sectionObj)
                    break;

                case 'attendencePage':
                    location.href='./teamAttendance.html'
                    break;

                case 'rankPage':
                    ajaxHandler('GET', '#', $sectionObj)
                    break;

                // 이 아래로는 memStatus = 1이어야 댐
                case 'manageTeamProperties':
                    const urlParams = new URL(location.href).searchParams;
                    const teamNo2 = urlParams.get('teamNo');
                    location.href = './teammanage.html?teamNo='+teamNo2
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

    // 요청 파라미터 보내기
    $.ajax({
        url: `${backURL}/teammain`,
        type: 'GET',
        data: `teamNo=${teamNo}`,
        success: (responseJSONObj) => {

            // 프로필

            // 조회수
            if (responseJSONObj.teamViewCnt != null) {

                const viewCnt = responseJSONObj.teamViewCnt
                const $teamViewCntDiv = $('div.teamViewCnt').first()

                $teamViewCntDiv.find('span[class=teamCntViewSpan2]').text(viewCnt)
            } // if

            // 팀원 목록
            if (responseJSONObj.nicknameList != null) {
                const nickList = responseJSONObj.nicknameList;
                const $nickSpan = $('span.teamMemberListSpan2');

                nickList.forEach((nickName, index) => {
                    const $nickCloneSpan = $nickSpan.clone();
                    $nickCloneSpan.text(nickName);
                    $nickSpan.parent().append($nickCloneSpan);
                });
            }

            // 팀 소개글
            if (responseJSONObj.teamInfo != null) {

                const info = responseJSONObj.teamInfo
                const $infoDiv = $('div.teamMainIntroductionDiv').first()

                $infoDiv.find('p[class=teamMainIntroductionP]').text(info)

            } // if

            // 공지사항
            if (responseJSONObj.noticeList != null) {

                const list = responseJSONObj.noticeList
                const $noticeDiv = $('div.teamMainNoticeDiv').first()

                list.forEach((notice, index) => {
                    const noticeNo = notice.noticeNo
                    const noticeTitle = notice.noticeTitle // 이거 제목 누르면 공지사항 게시판에 그 게시물로 이동해야댐!!
                    const noticeContent = notice.noticeContent
                    const regDate = notice.regDate

                    const $noticeCloneDiv = $noticeDiv.clone() // 복제본 만들기

                    $noticeCloneDiv.find('span[class=noticeNo]').text(noticeNo)
                    $noticeCloneDiv.find('a[class=noticeTitle]').text(noticeTitle)
                    $noticeCloneDiv.find('span[class=noticeContent]').text(noticeContent)
                    $noticeCloneDiv.find('span[class=regDate]').text(regDate)

                    $noticeDiv.parent().append($noticeCloneDiv) // 복제본 추가

                }) // forEach
            } // if

        },
        error: (jqXHR, textStatus) => {
            alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText)
            console.log(jqXHR)
        }
    }) // ajax

    // 공지 게시글 제목 클릭 시 해당 게시글로 이동
    // const noticeTitle = $('div.teamMainNoticeDiv>a.noticeTitle')
    $('div.teamMainNoticeDiv>a.noticeTitle').on('click', (e) => {
        location.href = `${frontURL}/noticedetail.html?teamNo=${teamNo}&noticeNo=${noticeNo}`
    })

}) // $(() {})

$(document).ready(function () {
    // 팀 가입하기 버튼 클릭 이벤트
    $('#JoinTeamBtn').click(function () {
        $('#teamJoin').show();  // 팝업창 표시
    });

    // 가입요청 버튼 클릭 이벤트
    $('#closeJoinTeamBtn').click(function () {
        $('#poteamJoinpUp').hide();  // 팝업창 숨김
        // 추가적인 로직 작성하기. (서버로 데이터 전송할거)
    });
})
