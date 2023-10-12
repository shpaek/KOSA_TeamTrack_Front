
$(()=>{
    const backURL = 'http://localhost:8888/KOSA_Project2'
    const frontURL = 'http://localhost:5500/HTML'

    
    //---- 확인버튼 클릭 시 발생 이벤트 ----
    $('form.agree').submit((e)=>{
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: `${backURL}/deleteaccount`,
            method : 'post',
            data : $('form.agree').serialize(),
            success : (responseJSONObj)=>{
                console.log(responseJSONObj)
                if(responseJSONObj.status==1){
                    alert(responseJSONObj.msg)
                    location.href=`${frontURL}/Intro.html`
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


})
