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
            success: (responseJSONObj) => {
                if(responseJSONObj.status == 3) {        // 실패
                    Swal.fire({
                        title: '팀 가입 요청 승인 실패',
                        text: responseJSONObj.msg,
                        icon: 'error',
                        confirmButtonText: '확인'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload(); // 페이지 리로드
                        }
                    });
                }else{
                Swal.fire({
                    title: '팀 가입 요청 승인 성공',
                    text: '요청이 승인되었습니다.',
                    icon: 'success',
                    confirmButtonText: '확인'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload(); // 페이지 리로드
                    }
                });
            }
            },
            error: function (jqXHR, textStatus) {
                Swal.fire({
                    title: '오류',
                    text: jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText,
                    icon: 'error',
                    confirmButtonText: '확인'
                });
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
            success: function (responseJSONObj) {
                Swal.fire({
                    title: '팀 가입 요청 거절 성공',
                    text: '요청이 거절되었습니다.',
                    icon: 'success',
                    confirmButtonText: '확인'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload(); // 페이지 리로드
                    }
                });
            },
            error: function (jqXHR, textStatus) {
                Swal.fire({
                    title: '오류',
                    text: jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText,
                    icon: 'error',
                    confirmButtonText: '확인'
                });
                console.error(jqXHR);
            }
        });
    }

    // 승인 버튼
    $(document).on('click', '.approveBtn', function () {
        const fullText = $(this).parent().siblings('.customerId').text();
        const matches = fullText.match(/아이디: (\S+) \[/);
        const id = matches && matches[1] ? matches[1] : '';

        Swal.fire({
            title: '팀 가입 요청 승인 확인',
            text: '이 요청을 승인하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '승인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.value) {
                approve(id);
            }
        });
    });

    // 거절 버튼
    $(document).on('click', '.rejectBtn', function () {
        const fullText = $(this).parent().siblings('.customerId').text();
        const matches = fullText.match(/아이디: (\S+) \[/);
        const id = matches && matches[1] ? matches[1] : '';

        Swal.fire({
            title: '팀 가입 요청 거절 확인',
            text: '이 요청을 거절하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '거절',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.value) {
                reject(id);
            }
        });
    });

    // 페이지가 로드될 때 팀원 목록을 가져옵니다.
    getReqList();

});