$(() => {


    // 가입 요청 목록 가져오기
    function getReqList() {
        $.ajax({
            url: `http://localhost:8888/KOSA_TeamTrack_Back/teamreqaccept`,
            type: 'GET',
            data: {
                teamNo: teamNo,
            },
            success: (responseJSONObj) => {
                console.log("요청대기자 출력용 ajax 호출 성공!!");
                console.log(responseJSONObj)
                console.log('----------------')
                // showMembers(responseJSONObj);
            },
            error: (jqXHR, textStatus) => {
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText);
                console.error(jqXHR);
            }
        })
    } // getReqList()

    // 가입 요청 목록 보여주기
    function showReqList(data) {
        if(data && data.methodMap && data.methodMap.reqList) {
        console.log("가입 요청자 정보를 찾았습니다!");

        const list = data.methodMap.reqList
        const $waitList = $('div.waitList').first()

        list.forEach((info, index) => {
            const id =
            const nickname
            const introduction
        })

    }
    
}


    /*
    console.log("팀원 정보를 찾았습니다!");

    const list = data.methodMap.teamInfo;
    const $memberDiv = $('div.memberDiv').first();

    list.forEach((info, index) => {
        const id = info.ID;
        const nickname = info.NICKNAME;
        const $memberCloneDiv = $memberDiv.clone();

        $memberCloneDiv.find('input[type="radio"]').val(id).attr('id', `memberId${index}`);
        $memberCloneDiv.find('span[class=memberId]').text(id);
        $memberCloneDiv.find('span[class=memberNickname]').text(nickname);

        $memberDiv.parent().append($memberCloneDiv);
    });

    $memberDiv.hide();
} else {
    console.log("팀원 정보가 없습니다!");
}
*/


    /*
    // 승인하기
    function getMemberList() {
        $.ajax({
            url: `http://localhost:8888/KOSA_TeamTrack_Back/teamselectexaminer`,
            type: 'GET',
            data: {
                teamNo: teamNo,
                action: 'getMember'
            },
            success: (responseJSONObj) => {
                console.log("회원 목록 출력용 ajax 호출 성공!!");
                console.log(responseJSONObj)
                console.log('----------------')
                showMembers(responseJSONObj);
            },
            error: (jqXHR, textStatus) => {
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText);
                console.error(jqXHR);
            }
        });
    }

    // 거절하기
    function showMembers(data) {
        if (data && data.methodMap && data.methodMap.teamInfo) {
            console.log("팀원 정보를 찾았습니다!");

            const list = data.methodMap.teamInfo;
            const $memberDiv = $('div.memberDiv').first();

            list.forEach((info, index) => {
                const id = info.ID;
                const nickname = info.NICKNAME;
                const $memberCloneDiv = $memberDiv.clone();

                $memberCloneDiv.find('input[type="radio"]').val(id).attr('id', `memberId${index}`);
                $memberCloneDiv.find('span[class=memberId]').text(id);
                $memberCloneDiv.find('span[class=memberNickname]').text(nickname);

                $memberDiv.parent().append($memberCloneDiv);
            });

            $memberDiv.hide();
        } else {
            console.log("팀원 정보가 없습니다!");
        }
    }

    // 폼 제출 이벤트 핸들러
    $("#examinerForm").submit(function(e) {
        e.preventDefault(); // 기본 제출 동작 방지

        const selectedId = $("input[name='checked']:checked").val();
        const startDate = $("#startDate").val();
        const endDate = $("#endDate").val();

        // 날짜와 라디오 버튼 선택 유효성 검사
        if (!selectedId) {
            alert("회원을 선택해주세요.");
            return;
        }

        if (!startDate || !endDate) {
            alert("시작 및 종료 날짜를 선택해주세요.");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert("시작 날짜는 종료 날짜보다 이후일 수 없습니다.");
            return;
        }

        $.ajax({
            url: `http://localhost:8888/KOSA_TeamTrack_Back/teamselectexaminer`,
            type: 'GET',
            data: {
                teamNo: teamNo,
                id: selectedId,
                duedate1: startDate,
                duedate2: endDate,
                enddate: endDate,
                action: 'selectExaminer'
            },
            success: (responseJSONObj) => {
                // 성공 시 수행할 로직
                alert("출제자 선정 성공");
                location.reload(); // 페이지 리로드
            },
            error: (jqXHR, textStatus) => {
                // 오류 처리
                alert("출제자 선정 실패: " + textStatus);
                console.error(jqXHR);
            }
        });
    });

    // 페이지가 로드될 때 팀원 목록을 가져옵니다.
    getMemberList();
    */
});
