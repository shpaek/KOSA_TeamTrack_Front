$(() => {
    // 가입하기 버튼, id입력란 객체 찾기
    const $btSignup = $('form.signup>button[type=submit]')
    const $id = $('form.signup>input[name=id]')
    const $btDupchk = $('form.signup>button[type=button]')

    // ----- 중복확인 버튼 클릭했을대 할 일 START -----

    $btDupchk.click((e) => {

        e.preventDefault();

        // alert('버튼클릭 확인')

        // 입력 아이디 확인
        const idValue = $("#id").val();
        if (!idValue) {
            alert('아이디를 입력하세요.');
            return;
        }

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url : 'http://127.0.0.1:8888/KOSA/iddupcheck',
            method : 'get',
            // data : `id=${$id.val()}`,
            data: `id=${idValue}`,
            success : (responseJSONObj) => {
                if(responseJSONObj.status == 0) {
                    alert('이미 사용중인 아이디입니다.')
                } else {
                    alert('사용 가능한 아이디 입니다')
                    $btSignup.show()
                } // if-else
            },
            error: (jqxhr) => {
                alert(jqxhr.status) // 정상처리가 되지 않으면 status = 0
            }
        })
    }) // $btDupChk.click
    // ----- 중복확인 버튼 클릭했을대 할 일 END -----

    // form객체 찾기
    const $form = $('div>form.signup')

    // ----- submit 이벤트 발생했을 때 할 일 START -----
    $form.submit((e) => {
        // form태그 내부의 객체 찾기
        const $pwdArr = $('form.signup>input[type=password]')
        const $nickname = $('form.signup>input[name=nickname]')
        const $name = $('form.signup>input[name=name]')
        const $birthday = $('form.signup>input[name=birth]')
        const $phone = $('form.signup>input[name=phone]')
        const $email = $('form.signup>input[name=email]')

        // alert($nickname.val())

        if ($pwdArr.eq(0).val() != $pwdArr.eq(1).val()) {
            alert('비밀번호를 다시 입력하세요')
            $pwdArr.eq(0).focus()
            $pwdArr.eq(0).select()
        } else {
            // const formData = new FormData(e.target)

            $.ajax({
                // xhrFields: {
                //     withCredentials: true
                // },
                url: 'http://127.0.0.1:8888/KOSA/signup',
                method: 'post',
                // data: formData,
                data: $form.serialize(),
                success: (responseJSONObj) => {
                    console.log(responseJSONObj)
                    alert(responseJSONObj.msg);

                    if(responseJSONObj.status == 1) {
                        location.href = './Intro.html'
                    }
                },
                error: (jqxhr) => {
                    alert(jqxhr.status) // 정상처리가 되지 않으면 status = 0
                }

            }) // ajax

        } // if-esle

        return false // 기본 이벤트 핸들러를 막는 것과 같은 효과 발생
     
    }) //
    // ----- submit 이벤트 발생했을 때 할 일 END -----


})