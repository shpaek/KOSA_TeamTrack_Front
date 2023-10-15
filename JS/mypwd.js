$(()=>{
    const backURL = 'http://localhost:8888/teamtrack'
    const frontURL = 'http://localhost:5500/HTML'

    //---- 비밀번호 일치 여부 확인 ----

    $('form.mypwd>button[name=check]').click(() => {
        const pwd = $('form.mypwd>label>input[name=oldpwd]').val()
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: backURL+'/pwdcheck',
            method : 'post',
            data : `pwd=${pwd}`,
            success : (responseJSONObj)=>{
                if(responseJSONObj.status==1){
                    alert(responseJSONObj.msg)
                    $('form.mypwd>label[name=newpwdlabel]').show()
                    $('form.mypwd>button[type=submit]').show()
                }else{
                    alert(responseJSONObj.msg)
                }
            }
        })
        return false
    })


    //---- 비밀번호 변경 ----

    $('form.mypwd').submit((e)=>{
        const pwd = $('form.mypwd>label[name=newpwdlabel]>input[name=newpwd]').val()
        const pwd2 = $('form.mypwd>label[name=newpwdlabel]>input[name=newpwd2]').val()

        if(pwd==pwd2){
            $('form.mypwd>span[name=alert]').hide()
            $.ajax({
                xhrFields:{
                    withCredentials : true
                },
                url: `${backURL}/editmypwd`,
                method : 'post',
                data : `pwd=${pwd}`,
                success : (responseJSONObj)=>{
                    console.log(responseJSONObj)
                    if(responseJSONObj.status==1){
                        alert(responseJSONObj.msg)
                        location.href=`${frontURL}/mypwd.html`
                    }else{
                        alert(responseJSONObj.msg)
                    }
                },
                error: (jqxhr)=>{
                    alert(jqxhr.status)
                }
            })
        }else{
            $('form.mypwd>span[name=alert]').show()
        }
        return false
    })

})