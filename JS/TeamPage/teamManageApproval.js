$(() => {

    // 가입 요청 목록 가져오기
    function getReqList() {
        $.ajax({
            url: backURL + "/teamreqaccept",
            type: 'GET',
            data: {
                teamNo: teamNo,
            },
            success: (responseJSONObj) => {
                console.log("요청대기자 출력용 ajax 호출 성공!!");
                console.log(responseJSONObj)
                console.log('----------------')

                showReqList(responseJSONObj);
            },
            error: (jqXHR, textStatus) => {
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText);
                console.error(jqXHR);
            }
        })
    } // getReqList()

    // 가입 요청 목록 보여주기
    function showReqList(data) {
        if (data && data.reqList) {
            console.log("가입 요청자 정보를 찾았습니다!");

            const list = data.reqList
            const $waitList = $('div.waitList').first()

            list.forEach((info, index) => {
                const id = info.ID
                const nickname = info.NICKNAME
                const introduction = info.INTRODUCTION
                const $waitListClone = $waitList.clone()

                $waitListClone.find('span[class=customerId]').text(`아이디: ${id} [${nickname}], `);
                $waitListClone.find('span[class=customerIntroduction]').text("자기소개: " + introduction)

                $waitList.parent().append($waitListClone);
            })

            $waitList.hide();

        } else {
            console.log("요청자 정보가 없습니다!");
        } // if-else

    } // showReqList()

    // 승인하기
    function approve(id) {
        $.ajax({
            url: backURL + "/teamreqaccept",
            type: 'GET',
            data: {
                teamNo: teamNo,
                id: id,
                action: 'reqApprove'
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

    // 거절하기
    function reject(id) {
        $.ajax({
            url: backURL + "/teamreqaccept",
            type: 'GET',
            data: {
                teamNo: teamNo,
                id: id,
                action: 'reqReject'
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

    // 승인 버튼 클릭 이벤트
    $(document).on('click', '.approveBtn', function() {
        const id = $(this).parent().siblings('.customerId').text();
        approve(id);
    });

    // 거절 버튼 클릭 이벤트
    $(document).on('click', '.rejectBtn', function() {
        const id = $(this).parent().siblings('.customerId').text();
        reject(id);
    });

    // 페이지가 로드될 때 팀원 목록을 가져옵니다.
    getReqList();

});
