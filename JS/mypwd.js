$(()=>{
    const backURL = 'http://192.168.1.20:8888/teamtrack'
    const frontURL = 'http://192.168.1.20:5500/HTML'
    const loginedId = sessionStorage.getItem("loginedId");
    

    //---- 비밀번호 일치 여부 확인 ----

    $('form.mypwd>div.old>button[name=check]').click(() => {
        const pwd = $('form.mypwd>div.old>label>input[name=oldpwd]').val()
        console.log(pwd)
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: backURL+'/pwdcheck',
            method : 'post',
            data : `loginedId=${loginedId}&pwd=${pwd}`,
            success : (responseJSONObj)=>{
                if(responseJSONObj.status==1){
                    Swal.fire({
                        icon: 'success',
                        text: responseJSONObj.msg
                    })
                    $('form.mypwd>div.new>label[name=newpwdlabel]').show()
                    $('form.mypwd>div.pwdsave>button[type=submit]').show()
                }else{
                    Swal.fire({
                        icon: 'error',
                        text: '다시 한번 시도해주세요🙏'
                    })
                }
            }
        })
        return false
    })


    //---- 비밀번호 변경 ----

    $('form.mypwd').submit((e)=>{
        const pwd = $('input[name=newpwd]').val()
        const pwd2 = $('input[name=newpwd2]').val()

        if(pwd==pwd2){
            $('span[name=alert]').hide()
        }else{
            $('span[name=alert]').show()
        }

        if (!strongPassword($('input[name=newpwd]').val())) {
			Swal.fire({
				icon: 'warning',
				text: '비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.'
			})
			$('input[name=newpwd]').focus();
			$('input[name=newpwd]').select();
		}else{
            $.ajax({
                xhrFields:{
                    withCredentials : true
                },
                url: `${backURL}/editmypwd`,
                method : 'post',
                data : `loginedId=${loginedId}&pwd=${pwd}`,
                success : (responseJSONObj)=>{
                    console.log(responseJSONObj)
                    if(responseJSONObj.status==1){
                        Swal.fire({
                            icon: 'success',
                            text: responseJSONObj.msg
                        })
                        location.href=`${frontURL}/mypwd.html`
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
        }
        return false
    })

})