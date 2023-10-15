const backURL = "http://localhost:8888/teamtrack"
const frontURL = "http://localhost:5500/HTML"
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
                location.href = `./notice.html?teamNo=${teamNo}`
                break;

            case 'taskBoard':
                const taskteamno=60
                // ajaxHandler('GET', './taskboard.html', $sectionObj)
                localStorage.setItem('taskteamno', taskteamno)
                location.href = './taskboard.html?teamNo='+taskteamno
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
                const urlParams = new URL(location.href).searchParams;
                // const teamNo = urlParams.get('teamNo');
                location.href = './teammanageproperties.html?teamNo=' + teamNo
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

            // 조회수
            if (responseJSONObj.teamViewCnt != null) {
                const viewCnt = responseJSONObj.teamViewCnt
                const $teamViewCntDiv = $('div.teamViewCnt').first()

                $teamViewCntDiv.find('span[class=teamCntViewSpan2]').text(viewCnt)
            } // if

            // 팀 멤버 닉네임
            if (responseJSONObj.nicknameList != null) {
                const nickList = responseJSONObj.nicknameList;
                const $nickSpan = $('span.teamMemberListSpan1');
                
                nickList.forEach((nickName, index) => {
                    const $nickCloneSpan = $nickSpan.clone();
                    $nickCloneSpan.text(nickName);
                    $nickCloneSpan.addClass('nickNameStyle'); // 스타일 클래스 추가
                    $nickSpan.parent().append($nickCloneSpan);
                }); // forEach
                
                $nickSpan.hide();  // 원본 span 숨기기
            } // if

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

                    $noticeCloneDiv.find('span[class=noticeNo]').text("No" + "(" + noticeNo + ")")
                    $noticeCloneDiv.find('span[class=regDate]').text("등록일: " + regDate)
                    $noticeCloneDiv.find('a[class=noticeTitle]').text("제목: " + noticeTitle)
                    $noticeCloneDiv.find('span[class=noticeContent]').text("내용: " + noticeContent)

                    $noticeDiv.parent().append($noticeCloneDiv) // 복제본 추가

                }) // forEach
                $noticeDiv.hide(); // 원본 숨기기
            } // if

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

    // 팀 가입하기 버튼 클릭 이벤트
    $('#JoinTeamBtn').click(function () {
        $('#teamJoin').show();
    })

    // 가입하기 버튼
    $('#requestJoinTeamBtn').click(function (e) {
        const $target = $(e.target);

        const introduction = $('#teamJoinIntroduction').val(); // 사용자가 입력한 자기소개
        console.log(introduction);

        $.ajax({
            url: backURL + "/teamjoin",
            type: 'GET',
            data: {
                teamNo: teamNo,
                id: id,
                introduction: introduction,
            },
            success: (responseJSONObj) => {
                location.href = './teamMain.html?teamNo=' + teamNo
            },
            error: (jqXHR, textStatus) => {
                // 오류 처리
                alert("팀 가입 실패: " + textStatus);
                console.log(textStatus)
                console.error(jqXHR);
            }
        });

    });

    // 팀 가입하기 버튼 클릭 이벤트
    $('#exitTeam').click(function () {
        alert('정말 팀을 나가시겠습니까?')

        $.ajax({
            url: backURL + "/teamleave",
            type: 'GET',
            data: {
                teamNo: teamNo,
                id: id
            },
            success: (responseJSONObj) => {
                location.href = './teamMain.html?teamNo=' + teamNo
            },
            error: (jqXHR, textStatus) => {
                // 오류 처리
                alert("팀 탈퇴 실패: " + textStatus);
                console.log(textStatus)
                console.error(jqXHR);
            }
        });
    })

    // 공지 게시글 제목 클릭 시 해당 게시글로 이동
    const noticeTitle = $('div.teamMainNoticeDiv>a.noticeTitle')
    $('div.teamMainNoticeDiv>a.noticeTitle').on('click', (e) => {
        location.href = `${frontURL}/noticedetail.html?teamNo=${teamNo}&noticeNo=${noticeNo}`
    })

    // 팀 가입 팝업창 바깥쪽을 클릭했을 때 팝업창 숨기기
    $(document).on('click', function (e) {
        const $target = $(e.target);
        if (!$target.closest('#teamJoin').length && !$target.closest('#JoinTeamBtn').length) {
            $('#teamJoin').hide();
        }
    });

}) // $(() {})