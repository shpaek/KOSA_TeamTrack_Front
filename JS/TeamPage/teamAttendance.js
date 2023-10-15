$(() => {

    function refreshAttendanceList() {
        $.ajax({
            url: backURL + "/teamattendance",
            type: 'GET',
            data: {
                id: id,
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

    function checkAttendance(callback) {
        $.ajax({
            url: backURL + "/teamattendance",
            data: {
                id: id,
                teamNo: teamNo,
                action: 'attendChk'
            },
            success: (responseJSONObj) => {
                const statusResponse = responseJSONObj.statusMap;

                if (statusResponse && statusResponse.status === 2) {
                    Swal.fire({
                        title: '출석',
                        text: '오늘 이미 출석하셨습니다!',
                        icon: 'info',
                        confirmButtonText: '확인'
                    });
                    callback(false);
                } else {
                    callback(true);
                }
            }
        });
    }

    $(".attendanceBtn").click(function () {
        checkAttendance((canAttend) => {
            if (canAttend) {
                $.ajax({
                    url: backURL + "/teamattendance",
                    type: 'GET',
                    data: {
                        id: id,
                        teamNo: teamNo,
                        action: 'attend'
                    },
                    success: (responseJSONObj) => {
                        refreshAttendanceList();
                        Swal.fire({
                            title: '출석',
                            text: '출석을 완료했습니다!',
                            icon: 'success',
                            confirmButtonText: '확인'
                        });
                    },
                    error: (jqXHR, textStatus) => {
                        Swal.fire({
                            title: '오류',
                            text: jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText,
                            icon: 'error',
                            confirmButtonText: '확인'
                        });
                        console.log(jqXHR);
                    }
                });
            } else {
                refreshAttendanceList();
            }
        });
    });

    // 페이지 로드 시 출석 내역 초기화
    refreshAttendanceList();
});
