$(() => {
    // JQuery사용 document ready함수로 html문서가 로드된 후 수행되도록

    // ----- 회원가입 버튼이 클릭되면 할 일 -----
    $("#signup_box1").click((e) => {
        e.preventDefault(); 
        window.location.href = "./signup.html";
    });

    // ----- 아이디 저장 버튼 -----
    const savedId = localStorage.getItem('savedId');

    if(savedId != null){ // savedId가 null이 아니라면
        // 해당 savedId를 이름이 id인 input필드에 설정
        $('input[name=id]').val(savedId)
    }

    // ----- form 객체에서 submit이벤트가 발생했을 대 할 일 START -----
    $('form').submit((e) => {

        // 체크박스 체크되어있으면 savedId 불러오기
        if($('input[type=checkbox]').prop('checked')) {
            localStorage.setItem('savedId', $('input[name=id]').val())

        } else {
            localStorage.removeItem('savedId')
        }

        // 아이디값과 비밀번호값 변수에 할당
        const idValue = $('input[name=id]').val()
        const pwdValue = $('input[name=pwd]').val()

        const idpwddata = `id=${idValue}&pwd=${pwdValue}`

        // alert(idpwddata)

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: 'http://192.168.1.20:8888/teamtrack/login',
            method: 'post',
            data: idpwddata,
            success: (responseJSONObj) => {
                // controller에서 받아온 응답에 대한 결과
                if(responseJSONObj.status === 0) {
                    console.log('성공')
                    Swal.fire({
						icon: 'success',
						text: responseJSONObj.msg
					}) .then((result)  => {
                    localStorage.setItem("loginedId", responseJSONObj.id);
                    sessionStorage.setItem("loginedId", responseJSONObj.id);
                    sessionStorage.setItem("nickname", responseJSONObj.nickname)
                    location.href = './main.html'
                    })
                } else if(responseJSONObj.status === 1) {
                    Swal.fire({
						icon: 'warning',
						text: responseJSONObj.msg
					})
                    localStorage.setItem("loginedId", responseJSONObj.id);
                    sessionStorage.setItem("loginedId", responseJSONObj.id);
                    sessionStorage.setItem("nickname", responseJSONObj.nickname)
                } else if(responseJSONObj.status === 2) {
                    Swal.fire({
						icon: 'warning',
						text: responseJSONObj.msg
					})
                }
            },
            error : (jqXHR, textStatus) => {
                // error가 로그인이 실패가 아니라 요청 응답에 문제가 있다는 것
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText)
            } 

        }) // ajax
        return false
    })
    
})