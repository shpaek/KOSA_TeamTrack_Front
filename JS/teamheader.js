const backURL = "http://192.168.1.20:8888/teamtrack"
const frontURL = "http://192.168.1.20:5500/HTML"
const id = sessionStorage.getItem("loginedId")
const teamNo = new URL(location.href).searchParams.get("teamNo")

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
                location.href = './teamMain.html?teamNo=' + teamNo
                break;

            case 'noticeBoard':
                location.href = `./notice.html?teamNo=${teamNo}&loginedId=${id}`
                break;

            case 'taskBoard':
                // const taskteamno=60
                // ajaxHandler('GET', './taskboard.html', $sectionObj)
                localStorage.setItem('taskteamno', teamNo)
                location.href = './taskboard.html?teamNo='+teamNo
                //location.href = './taskboard.html&teamNo='+teamNo
                break;

            case 'QnABoard':
                location.href = './qnaboard.html?teamNo=' + teamNo
                break;

            case 'attendencePage':
                location.href = './teamAttendance.html?teamNo=' + teamNo
                break;

            case 'rankPage':
                location.href=`./rank.html?teamNo=${teamNo}`
                break;

            case 'manageTeamProperties':
                // const urlParams = new URL(location.href).searchParams;
                // const teamNo = urlParams.get('teamNo');
                location.href = './teammanage.html?teamNo=' + teamNo
                break;

            case 'manageTeamCurrentMember':
                location.href = './teamManageCurrentMember.html?teamNo=' + teamNo
                break;

            case 'manageTeamApproval':
                location.href = './teamManageApproval.html?teamNo=' + teamNo
                break;

            case 'manageTeamExaminer':
                location.href = './teamManageExaminer.html?teamNo=' + teamNo
                break;
        } // switch(e.target.class)()
        e.preventDefault()

    }) // menu.addEventListener()
    // 〓〓 메뉴 객체에서 클릭이벤트가 발생했을 때 할 일 END 〓〓)

    // 팀 메인에서 필요한 정보 불러오기!
    $.ajax({
        url: backURL + "/teammain",
        type: 'GET',
        data: {
            teamNo: teamNo,
            id: id
        },
        success: (responseJSONObj) => {
            // alert('현재 teamNo = ' + teamNo)
            // alert('현재 id = ' + id)

            // 사용자 유형 구분하기
            handleUserRole(responseJSONObj.userRole)

            // 사용자 유형 구분하기
            handleUserRole(responseJSONObj.userRole)

            // 프로필


            // 팀명
            if (responseJSONObj.teamList != null) {
                const teamName = responseJSONObj.teamList.teamName
                const $teamNameDiv = $('div.teamNameDiv').first()

                $teamNameDiv.find('p.teamNameShow').text(teamName)
            } // if

            if (responseJSONObj.teamViewCnt != null) {
                const viewCnt = responseJSONObj.teamViewCnt;
                $('span.teamCntViewSpan2').text(viewCnt);
            }

            

        },
        error: (jqXHR, textStatus) => {
            alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText)
            console.log(jqXHR)
        }
    }) // ajax

    // 권한
    function handleUserRole(userRole) {
        if (userRole === 'customer') {                                                              // 일반 사용자
            $(".attendencePage").closest("li").hide(); // 출석하러가기 숨기기
            $("#exitTeam").hide(); // 팀 나가기 숨기기
            $(".teamProfileEdit").hide(); // 편집 숨기기
            $(".manageTeam").closest("li").hide(); // 팀 관리 (하위 메뉴 포함) 숨기기
        } else if (userRole === 'teamLeader') {                                                     // 팀장 사용자
            $("#exitTeam").hide(); // 팀 나가기 숨기기
            $("#JoinTeamBtn").hide(); // 팀 가입 숨기기
        } else if (userRole === 'teamMember') {                                                     // 팀원 사용자
            $(".manageTeam").closest("li").hide(); // 팀 관리 (하위 메뉴 포함) 숨기기
            $("#JoinTeamBtn").hide(); // 팀 가입 숨기기
        }
    }

    

}) // $(() {})