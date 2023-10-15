$(()=>{
    const backURL = 'http://localhost:8888/teamtrack'
    const frontURL = 'http://localhost:5500/HTML'

    var status = 1

    function ajaxHandler(url){
        $.ajax({
            xhrFields: {
                responseType: "blob",
            },
            url: url,
            method: 'get',
            contentType: false, //파일첨부용 프로퍼티
            processData : false, //파일첨부용 프로퍼티
            success: (responseData)=>{
                console.log(responseData)
                console.log(responseData.URL)
                if(responseData.size > 0){
                    const imgurl = URL.createObjectURL(responseData)
                    $('div.imgbox>form>img').attr('src', imgurl)
                }
            },
            error: (jqxhr)=>{
                Swal.fire({
                    icon: 'error',
                    text: '다시 한번 시도해주세요🙏'
                })
            }
        })
    }
    
    ajaxHandler(`${backURL}/userprofiledownload`)

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
            
            $('form.info>div>label>input[name=id]').attr('value',id);
            $('div.nicknameeditline>label>input[name=nickname]').attr('value',nickname);
            $('form.info>div>label>input[name=username]').attr('value',name);
            $('form.info>div>label>input[name=birthday]').attr('value',birthday);
            $('form.info>div>label>input[name=phone]').attr('value',phone);
            $('form.info>div>label>input[name=email]').attr('value',email);
        },
        error:(jqXHR, textStatus)=>{
            Swal.fire({
                icon: 'error',
                text: '다시 한번 시도해주세요🙏'
            })
        }
    })

    $('div.imgbox>form').submit((e)=>{
        const fd = new FormData(e.target)
        
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: `${backURL}/uploaduserprofile`,
            method : 'post',
            contentType: false, //파일첨부용 프로퍼티
            processData : false, //파일첨부용 프로퍼티
            data : fd,
            success : (responseJSONObj)=>{
                console.log(responseJSONObj)
                if(responseJSONObj.status==1){
                    Swal.fire({
                        icon: 'success',
                        text: responseJSONObj.msg
                    }).then(result=>{
                        location.href=`${frontURL}/myinfo.html`
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        text: '다시 한번 시도해주세요🙏'
                    })
                }
            },
            error: (jqxhr)=>{
                Swal.fire({
                    icon: 'error',
                    text: '다시 한번 시도해주세요🙏'
                })
            }
        })
        return false
    })


    //---- 닉네임 중복확인 ----

    $('div.nicknameeditline>button[name=check]').click(() => {
        $.ajax({
            url: backURL+'/nicknamedupchk',
            method : 'get',
            data : `nickname=${$('div.nicknameeditline>label>input[name=nickname]').val()}`,
            success : (responseJSONObj)=>{
                console.log($('div.nicknamebox>label>input[name=nickname]').val())
                console.log(responseJSONObj.status)
                if(responseJSONObj.status == 1){
                    $('div.nicknameeditline>button[type=submit]').show()
                    $('div.dupchkmsg>span[name=requiremsg]').hide()
                    $('div.dupchkmsg>span[name=okmsg]').show()
                }else{
                    Swal.fire({
                        icon: 'warning',
                        text: '이미 사용중인 닉네임입니다'
                    }).then(result=>{
                        $('div.nicknameeditline>>button[type=submit]').hide()
                        $('div.dupchkmsg>span[name=okmsg]').hide()
                        $('div.dupchkmsg>span[name=requiremsg]').show()
                    })
                }
            }
        })
        return false
    })


    //---- 닉네임 저장 ----

    $('div.nicknamebox>form').submit((e)=>{
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: `${backURL}/editnickname`,
            method : 'post',
            contentType: false, //파일첨부용 프로퍼티
            processData : false, //파일첨부용 프로퍼티
            data : `nickname=${$('div.nicknameeditline>label>input[name=nickname]').val()}`,
            success : (responseJSONObj)=>{
                console.log(responseJSONObj)
                if(responseJSONObj.status==1){
                    Swal.fire({
                        icon: 'success',
                        text: responseJSONObj.msg
                    }).then(result=>{
                        location.href=`${frontURL}/myinfo.html`
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        text: '다시 한번 시도해주세요🙏'
                    })
                }
            },
            error: (jqxhr)=>{
                Swal.fire({
                    icon: 'error',
                    text: '다시 한번 시도해주세요🙏'
                })
            }
        })
        return false
    })

    // ---- 아이디, 비밀번호, 닉네임 제외 정보 수정 ----

    $('form.info').submit((e)=>{
        console.log($('form.info').serialize())
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: `${backURL}/editmyinfo`,
            method : 'post',
            contentType: false, //파일첨부용 프로퍼티
            processData : false, //파일첨부용 프로퍼티
            data : $('form.info').serialize(),
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success : (responseJSONObj)=>{
                console.log(responseJSONObj)
                if(responseJSONObj.status==1){
                    Swal.fire({
                        icon: 'success',
                        text: responseJSONObj.msg
                    }).then(result=>{
                        location.href=`${frontURL}/myinfo.html`
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        text: '다시 한번 시도해주세요🙏'
                    })
                }
            },
            error: (jqxhr)=>{
                Swal.fire({
                    icon: 'error',
                    text: '다시 한번 시도해주세요🙏'
                })
            }
        })
        return false
    })



})