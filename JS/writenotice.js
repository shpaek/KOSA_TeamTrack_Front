

$(()=>{
    const backURL = 'http://localhost:8888/KOSA_Project2'
    const frontURL = 'http://localhost:5500/HTML'
    const $formObj = $('form.notice')
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')

    $formObj.submit((e) => {
        //alert("in submit")
        const fd = new FormData(e.target)
        fd.append("teamNo", teamNo)
        // fd.forEach((value, key)=>{
        //     console.log(key)
        //     console.log(value)
        //     console.log('------------------')
        // })
        // console.log(fd)
        
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: `${backURL}/writenotice`,
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
                    }).then(function(){
                        location.href=`${frontURL}/notice.html?teamNo=${teamNo}`
                    });
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