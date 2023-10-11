$(()=>{
    const backURL = 'http://localhost:8888/KOSA_Project2'
    const frontURL = 'http://localhost:5500/HTML'

    var status = 1

    $.ajax({
        url: backURL+'/myinfo',
        method : 'get',
        success: (responseJSONObj)=>{
            const id = responseJSONObj.id
            const nickname = responseJSONObj.nickname
            const name = responseJSONObj.name
            const birthday = responseJSONObj.birthday
            const phone = responseJSONObj.phone
            const email = responseJSONObj.email
                
            $('form.info>label>input[name=id]').attr('value',id);
            $('form.nicknamebox>label>input[name=nickname]').attr('value',nickname);
            $('form.info>label>input[name=name]').attr('value',name);
            $('form.info>label>input[name=birthday]').attr('value',birthday);
            $('form.info>label>input[name=phone]').attr('value',phone);
            $('form.info>label>input[name=email]').attr('value',email);
        },
        error:(jqXHR, textStatus)=>{
            alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
            console.log(jqXHR)
        }
    })


    //---- 닉네임 중복확인 ----

    $('form.nicknamebox>button[name=check]').click(() => {
        $.ajax({
            url: backURL+'/nicknamedupchk',
            method : 'get',
            data : `nickname=${$('form.nicknamebox>label>input[name=nickname]').val()}`,
            success : (responseJSONObj)=>{
                console.log($('form.nicknamebox>label>input[name=nickname]').val())
                console.log(responseJSONObj.status)
                if(responseJSONObj.status == 1){
                    $('form.nicknamebox>button[type=submit]').show()
                    $('form.nicknamebox>span[name=requiremsg]').hide()
                    $('form.nicknamebox>span[name=okmsg]').show()
                }else{
                    alert('이미 사용중인 닉네임입니다')
                    $('form.nicknamebox>button[type=submit]').hide()
                    $('form.nicknamebox>span[name=okmsg]').hide()
                    $('form.nicknamebox>span[name=requiremsg]').show()
                }
            }
        })
        return false
    })


    //---- 닉네임 저장 ----

    $('form.nicknamebox').submit((e)=>{
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: `${backURL}/editnickname`,
            method : 'post',
            data : `nickname=${$('form.nicknamebox>label>input[name=nickname]').val()}`,
            success : (responseJSONObj)=>{
                console.log(responseJSONObj)
                if(responseJSONObj.status==1){
                    alert(responseJSONObj.msg)
                    location.href=`${frontURL}/myinfo.html`
                }else{
                    alert(responseJSONObj.msg)
                }
            },
            error: (jqxhr)=>{
                alert(jqxhr.status)
            }
        })
        return false
    })

    // ---- 아이디, 비밀번호, 닉네임 제외 정보 수정 ----

    $('form.info').submit((e)=>{
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: `${backURL}/editmyinfo`,
            method : 'post',
            data : $('form.info').serialize(),
            success : (responseJSONObj)=>{
                console.log(responseJSONObj)
                if(responseJSONObj.status==1){
                    alert(responseJSONObj.msg)
                    location.href=`${frontURL}/myinfo.html`
                }else{
                    alert(responseJSONObj.msg)
                }
            },
            error: (jqxhr)=>{
                alert(jqxhr.status)
            }
        })
        return false
    })
    

    // ---- 회원 탈퇴하기 ----

    $('div.infomenu>a').click(()=>{
        location.href=`${frontURL}/deleteaccount.html`
    })



})