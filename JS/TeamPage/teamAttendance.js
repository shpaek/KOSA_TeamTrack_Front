$(() => {

    // 출석하기 버튼 클릭 이후 출석 내역 새로 반영하기
    function refreshAttendanceList() {
        $.ajax({
            url: backURL + "/teamattendance",
            type: 'GET',
            data: { 
                id : id,
                teamNo: teamNo
            },
            success: (responseJSONObj) => {
                const methodResponse = responseJSONObj.method;

                if (methodResponse && methodResponse.attendanceList) {
                    const list = methodResponse.attendanceList;
                    const $attendanceDiv = $('div.attendance2').first();
                    $('div.attendance2:not(:first)').remove();

                    list.forEach((attendance, index) => {
                        const attendanceDate = attendance.attendanceDate;
                        const dateOnly = attendanceDate.split(' ')[0];

                        const $attendanceCloneDiv = $attendanceDiv.clone();
                        $attendanceCloneDiv.find('div[class=attendanceCheck]').text(dateOnly);
                        $attendanceDiv.parent().append($attendanceCloneDiv);
                    });
                }
            },
            error: (jqXHR, textStatus) => {
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText);
                console.log(jqXHR);
            }
        });
    }

    // 출석 여부 확인
    function checkAttendance() {
        $.ajax({
            url: backURL + "/teamattendance",
            data: {
                id : id,
                teamNo: teamNo,
                action: 'attendChk'
            },
            success: (responseJSONObj) => {
                const statusResponse = responseJSONObj.statusMap;
                // console.log(responseJSONObj);

                // statusResponse.status 값이 2인 경우(즉, 이미 오늘 출석했다는 의미), 출석 버튼을 비활성화
                if (statusResponse && statusResponse.status === 2) {   
                    $(".attendanceBtn").prop("disabled", true);
                } else {    // 아직 출석 X
                    $(".attendanceBtn").prop("disabled", false);
                }
            }
        });
    }

    // 출석버튼 클릭 이벤트
    $(".attendanceBtn").click(function () {
        $.ajax({
            url: backURL + "/teamattendance",
            type: 'GET',
            data: {
                id : id,
                teamNo: teamNo,
                action: 'attend'
            },
            success: (responseJSONObj) => {
                const statusResponse = responseJSONObj.statusMap;
                // alert(statusResponse.msg);
                if (statusResponse && statusResponse.status === 2) {    // 이미 출석함
                    alert('오늘 이미 출석하셨습니다!');
                    $(".attendanceBtn").prop("disabled", true);
                } else {    // 안함!
                    refreshAttendanceList();
                }
            },
            error: (jqXHR, textStatus) => {
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText);
                console.log(jqXHR);
            }
        });
    });

    // 페이지 로드 시 출석 내역 초기화 및 출석 여부 확인
    refreshAttendanceList();
    checkAttendance();
});
