$(function () {
    // 팀원 목록을 가져오는 함수
    function getMemberList() {
        $.ajax({
            url: backURL + "/teamselectexaminer",
            type: 'GET',
            data: {
                teamNo: teamNo,
                action: 'getMember'
            },
            success: (responseJSONObj) => {
                showMembers(responseJSONObj);
            },
            error: (jqXHR, textStatus) => {
                swal.fire('오류', '회원 목록을 가져오는데 실패했습니다.', 'error');
                console.error(jqXHR);
            }
        });
    }

    // 팀원 목록을 화면에 표시하는 함수
    function showMembers(data) {
        if (data && data.methodMap && data.methodMap.teamInfo) {
            const list = data.methodMap.teamInfo;
            const $memberDiv = $('div.memberDiv').first();

            list.forEach((info, index) => {
                const id = info.ID;
                const nickname = info.NICKNAME;
                const $memberCloneDiv = $memberDiv.clone();

                $memberCloneDiv.find('input[type="radio"]').val(id).attr('id', `memberId${index}`);
                $memberCloneDiv.find('span[class=memberId]').text("아이디: " + id + " [");
                $memberCloneDiv.find('span[class=memberNickname]').text(nickname + " ]");

                $memberDiv.parent().append($memberCloneDiv);
            });

            $memberDiv.hide();
        } else {
            console.log("팀원 정보가 없습니다!");
        }
    }

    // 폼 제출 이벤트 핸들러
    $("#examinerForm").submit(function (e) {
        e.preventDefault();

        const selectedId = $("input[name='checked']:checked").val();
        const startDate = $("#startDate").val();
        const endDate = $("#endDate").val();

        if (!selectedId) {
            swal.fire('오류', '회원을 선택해주세요.', 'error');
            return;
        }

        if (!startDate || !endDate) {
            swal.fire('오류', '시작 및 종료 날짜를 선택해주세요.', 'error');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            swal.fire('오류', '시작 날짜는 종료 날짜보다 이후일 수 없습니다.', 'error');
            return;
        }

        Swal.fire({
            title: '출제자 선정 확인',
            text: '출제자 선정은 취소할 수 없습니다. 계속하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '선정',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: backURL + "/teamselectexaminer",
                    type: 'POST',
                    data: {
                        teamNo: teamNo,
                        id: selectedId,
                        duedate1: startDate,
                        duedate2: endDate,
                        enddate: endDate,
                        action: 'selectExaminer'
                    },
                    success: (responseJSONObj) => {
                        swal.fire({
                            title: '출제자 선정',
                            text: '출제자 선정에 성공했습니다.',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '확인'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        });
                    },
                    error: (jqXHR, textStatus) => {
                        swal.fire('오류', '출제자 선정에 실패했습니다.', 'error');
                        console.error(jqXHR);
                    }
                });
            }
        });
    });

    // 페이지가 로드될 때 팀원 목록을 가져옵니다.
    getMemberList();
});
