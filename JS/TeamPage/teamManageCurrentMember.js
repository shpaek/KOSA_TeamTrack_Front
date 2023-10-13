$(() => {

    // 현재 팀원 목록 가져오기
    function getMemberList() {
        $.ajax({
            url: `http://localhost:8888/KOSA_TeamTrack_Back/teamdismiss`,
            type: 'GET',
            data: {
                teamNo: teamNo,
            },
            success: (responseJSONObj) => {
                console.log("현재 팀원 출력용 ajax 호출 성공!!");
                console.log(responseJSONObj)
                console.log('----------------')

                showMemberList(responseJSONObj);
            },
            error: (jqXHR, textStatus) => {
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText);
                console.error(jqXHR);
            }
        })
    } // getReqList()

    // 현재 팀원 목록 보여주기
    function showMemberList(data) {
        if (data && data.reqList) {
            console.log("현재 팀원 정보를 찾았습니다!");

            const list = data.currMemberList
            const $currMemberList = $('div.memberList').first()

            list.forEach((info, index) => {
                const id = info.ID
                const nickname = info.NICKNAME
                const $currMemberListClone = $currMemberList.clone()

                $currMemberListClone.find('span[class=memberId]').text(id)
                $currMemberListClone.find('span[class=memberNickname]').text(nickname)

                $currMemberList.parent().append($waitListClone);
            })

            $currMemberList.hide();

        } else {
            console.log("현재 팀원 정보가 없습니다!");
        } // if-else

    } // showReqList()

    // 방출하기
    function dismiss(id) {
        $.ajax({
            url: `http://localhost:8888/KOSA_TeamTrack_Back/teamdismiss`,
            type: 'GET',
            data: {
                teamNo: teamNo,
                id: id,
                action: 'memberDismiss'
            },
            success: function(responseJSONObj) {
                location.reload(); // 페이지 리로드
            },
            error: function(jqXHR, textStatus) {
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText);
                console.error(jqXHR);
            }
        });
    }

    // 방출 버튼 클릭 이벤트
    $(document).on('click', '.dismissBtn', function() {
        const id = $(this).parent().siblings('.customerId').text();
        dismiss(id);
    });

    // 페이지가 로드될 때 팀원 목록을 가져옵니다.
    getMemberList();

});
