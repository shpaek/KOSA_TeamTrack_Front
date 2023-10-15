$(() => {

    const $formObj = $('form.qnaboard')
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')

    $formObj.submit((e) => {
        e.preventDefault(); // 기본 제출 동작을 중지합니다.

        alert("in submit")
        const formData = new FormData(e.target);
        formData.append("teamNo", teamNo);

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: `http://localhost:8888/teamtrack/qnaboardcreate`,
            method: 'post',
            contentType: false,
            processData: false,
            data: formData,
            success: (responseJSONObj) => {
                console.log(responseJSONObj)
                if (responseJSONObj.status == 1) {
                    alert(responseJSONObj.msg)
                    location.href = `http://localhost:5500/HTML/qnaboard.html?teamNo=${teamNo}`
                } else {
                    alert(responseJSONObj.msg)
                }
            },
            error: (jqxhr) => {
                alert(jqxhr.status)
            }
        })
        // return false
    })
})

