$(()=>{
    const backURL = 'http://192.168.1.20:8888/teamtrack'
    const frontURL = 'http://192.168.1.20:5500/HTML'
    const loginedId = sessionStorage.getItem("loginedId");
    


    function ajaxHandler(url){
        $.ajax({
            xhrFields: {
                responseType: "blob",
            },
            url: url,
            method: 'get',
            data: `loginedId=${loginedId}`,
            contentType: false, //파일첨부용 프로퍼티
            processData : false, //파일첨부용 프로퍼티
            success: (responseData)=>{
                console.log(responseData)
                console.log(responseData.URL)
                if(responseData.size > 0){
                    const imgurl = URL.createObjectURL(responseData)
                    $('div.imgshow>img').attr('src', imgurl)
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
        data : `loginedId=${loginedId}`,
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


    $("form.userprofile input[name=f1]").on("change", (e) => {
        console.log(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        $("form.userprofile img.userprofileimg").attr("src", url);
      });

    $('form.userprofile').submit((e)=>{
        //const fd = new FormData(e.target)
        const fd = new FormData()
        const files = $('input[type="file"]');
        for (let i = 0; i < files.length; i++) {
        fd.append("f1", files[i].files[0]); // 각 파일 필드의 첫 번째 파일을 추가
        }
        fd.append("loginedId", loginedId);
        
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
                        location.href=`${frontURL}/myinfo.html?id=${loginedId}`
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
        const nickname = $('div.nicknameeditline>label>input[name=nickname]').val()
        $.ajax({
            url: backURL+'/nicknamedupchk',
            method : 'get',
            data : `nickname=${nickname}&loginedId=${loginedId}`,
            success : (responseJSONObj)=>{
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
        const nickname = $('div.nicknameeditline>label>input[name=nickname]').val()
        
 
            $.ajax({
                xhrFields:{
                    withCredentials : true
                },
                url: `${backURL}/editnickname`,
                method : 'post',
                data : `nickname=${nickname}&loginedId=${loginedId}`,
                success : (responseJSONObj)=>{
                    console.log(responseJSONObj)
                    if(responseJSONObj.status==1){
                        Swal.fire({
                            icon: 'success',
                            text: responseJSONObj.msg
                        }).then(result=>{
                            location.href=`${frontURL}/myinfo.html?loginedId=${loginedId}`
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
        const $name = $('form.info>div>label>input[name=username]')
		const $birthday = $('form.info>div>label>input[name=birthday]')
		const $phone = $('form.info>div>label>input[name=phone]')
        const $email = $('form.info>div>label>input[name=email]')

        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!/^\d{11}$/.test($phone.val())) {
			Swal.fire({
				icon: 'warning',
				text: '휴대폰 번호는 11자리의 숫자여야 합니다.'
			});
			$phone.focus();
			$phone.select();
		} else if (/[^0-9]/.test($phone.val())) {
			Swal.fire({
				icon: 'warning',
				text: '휴대폰 번호에는 숫자만 입력하세요.'
			});
			$phone.focus();
			$phone.select();
		}else if (specialCharacters.test($name.val())) {
			Swal.fire({
				icon: 'warning',
				text: '이름에 특수문자를 포함할 수 없습니다.'
			});
		} else if (!emailPattern.test($email.val())) {
			Swal.fire({
			  icon: 'warning',
			  text: '유효한 이메일 주소를 입력하세요.'
			});
		}  else {

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
        }
        return false
    })

    // ---- 메뉴 클릭 시 발생 이벤트 ----

    $('nav>ul>li>a[name=myinfo]').click(()=>{
        location.href=`${frontURL}/myinfo.html?loginedId=${loginedId}`
    })

    $('nav>ul>li>a[name=myteam]').click(()=>{
        location.href=`${frontURL}/myteamlist.html?loginedId=${loginedId}`
    })

    $('nav>ul>li>a[name=withdrawl]').click(()=>{
        location.href=`${frontURL}/deleteaccount.html?loginedId=${loginedId}`
    })
})