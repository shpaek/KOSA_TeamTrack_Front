$(function () {
    // 현재 팀원 목록 가져오기
    function getMemberList() {
        $.ajax({
            url: backURL + "/teamdismiss",
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
        if (data && data.currMemberList) {
            console.log("현재 팀원 정보를 찾았습니다!");

            const list = data.currMemberList
            const $currMemberList = $('div.memberList').first()

            list.forEach((info, index) => {
                const id = info.ID
                const nickname = info.NICKNAME
                const $currMemberListClone = $currMemberList.clone()

                $currMemberListClone.find('span[class=memberId]').text(`아이디: ${id} [ ${nickname} ] `);
                // $currMemberListClone.find('span[class=memberNickname]').text(nickname + " ]");

                $currMemberList.parent().append($currMemberListClone);
            })

            $currMemberList.hide();

        } else {
            console.log("현재 팀원 정보가 없습니다!");
        } // if-else

    } // showReqList()

    // 방출하기
    function dismiss(id) {
        $.ajax({
            url: backURL + "/teamdismiss",
            type: 'GET',
            data: {
                teamNo: teamNo,
                id: id,
                action: 'memberDismiss'
            },
            success: function (responseJSONObj) {
                // 방출 성공 후의 메시지 표시
                swal.fire({
                    title: '멤버 방출',
                    text: '멤버 방출을 성공했습니다.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '확인'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            },
            error: function (jqXHR, textStatus) {
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText);
                console.error(jqXHR);
            }
        });
    }

    // 방출 버튼 클릭 이벤트
    $(document).on('click', '.dismissBtn', function () {
        const fullText = $(this).siblings('.memberId').text();
        const matches = fullText.match(/아이디: (\S+) \[/);
        const id = matches && matches[1] ? matches[1] : '';

        swal.fire({
            title: '멤버 방출',
            text: "멤버를 방출하시겠습니까? 해당 멤버는 팀 재가입이 불가능합니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '방출',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                // 확인 버튼을 눌렀을 때의 동작
                dismiss(id);
            }
        });
    });

    // 페이지가 로드될 때 팀원 목록을 가져옵니다.
    getMemberList();

});
