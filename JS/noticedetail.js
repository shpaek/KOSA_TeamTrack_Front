const backURL = 'http://localhost:8888/KOSA_Project2'
const frontURL = 'http://localhost:5500/HTML'

$(()=>{
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')
    const noticeNo = urlParams.get('noticeNo')

    $.ajax({
        url: backURL+'/noticedetail',
        method : 'get',
        data : `teamNo=${teamNo}&noticeNo=${noticeNo}`,
        success: (responseJSONObj)=>{
            const noticeTitle = responseJSONObj.noticeTitle
            const noticeContent = responseJSONObj.noticeContent
            const regDate = responseJSONObj.regDate

            $('div.titleline>h4').html(noticeTitle)
            $('div.titleline>span').text(regDate)
            $('div.content>p').html(noticeContent)
        },
        error:(jqXHR, textStatus)=>{
            alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
            console.log(jqXHR)
        }
    })

    $('div.buttons>button.remove').on('click',(e)=>{
        var result = confirm("삭제하시겠습니까?")
        if(result == true){
            $.ajax({
                url: backURL+'/deletenotice',
                method : 'get',
                data : `teamNo=${teamNo}&noticeNo=${noticeNo}`,
                success: (responseJSONObj)=>{
                    if(responseJSONObj.status==1){
                        alert(responseJSONObj.msg)
                        location.href = `${frontURL}/notice.html?teamNo=${teamNo}`
                    }else{
                        alert(responseJSONObj.msg)
                    }
                },
                error:(jqXHR)=>{
                    alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                    console.log(jqXHR)
                }
            })
        }else{
            return false
        }
        return false
    })
})