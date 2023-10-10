
$(()=>{
    const backURL = 'http://localhost:8888/KOSA_Project2'
    const frontURL = 'http://localhost:5500/HTML'
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')
    const noticeNo = urlParams.get('noticeNo')
    console.log(noticeNo)


    $.ajax({
        url: backURL+'/noticedetail',
        method : 'get',
        data : `teamNo=${teamNo}&noticeNo=${noticeNo}`,
        success: (responseJSONObj)=>{
            if(responseJSONObj.memStatus == 0){
                $('div.noticedetail>div.setmainbutton>button').hide()
                $('div.noticedetail>div.detailbuttons>button.edit').hide()
                $('div.noticedetail>div.detailbuttons>button.remove').hide()
            }
            const noticeTitle = responseJSONObj.notice.noticeTitle
            const noticeContent = responseJSONObj.notice.noticeContent
            const regDate = responseJSONObj.notice.regDate
    
            $('div.detailtitleline>h4').html(noticeTitle)
            $('div.detailtitleline>span').text(regDate)
            $('div.detailcontent>p').html(noticeContent)
        },
        error:(jqXHR, textStatus)=>{
            alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
            console.log(jqXHR)
        }
    })

    // ---- 메인공지 등록 클릭 시 발생 이벤트 ----
    $('div.noticedetail>div.setmainbutton>button').on('click',(e)=>{
        $.ajax({
            url: backURL+'/setmainnotice',
            method : 'get',
            data : `teamNo=${teamNo}&noticeNo=${noticeNo}&mainStatus=1`,
            success: (responseJSONObj)=>{
                if(responseJSONObj.status==1){
                    history.pushState(teamNo ,null,`${frontURL}/notice.html?teamNo=${teamNo}`)
                    ajaxHandler('GET', `${frontURL}/notice.html?teamNo=${teamNo}`, $sectionObj )
                }else{
                    alert(responseJSONObj.msg)
                }
            },
            error:(jqXHR, textStatus)=>{
                alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                console.log(jqXHR)
            }
        })
    })

    //---- 수정버튼 클릭 시 발생 이벤트 ----
    $('div.noticedetail>div.detailbuttons>button.edit').on('click',(e)=>{
        $('div.noticedetail').hide()
        $('div.editnotice').show()

        $.ajax({
            url: backURL+'/noticedetail',
            method : 'get',
            data : `teamNo=${teamNo}&noticeNo=${noticeNo}`,
            success: (responseJSONObj)=>{
                const noticeTitle = responseJSONObj.noticeTitle
                const noticeContent = responseJSONObj.noticeContent
                const mainStatus = responseJSONObj.mainStatus
                
                $('div.mainnotice>input[name=status]').attr('value',mainStatus);
                $('div.modifytitleline>input[name=title]').attr('value',noticeTitle);
                $('div.modifycontent>input[name=content]').attr('value',noticeContent);
            },
            error:(jqXHR, textStatus)=>{
                alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                console.log(jqXHR)
            }
        })
    })

    //---- 완료버튼 클릭 시 발생 이벤트 ----
    $('div.editnotice>form>div.writebuttons>button[type=submit]').on('click',(e)=>{
        const $formObj = $('form')

        $formObj.submit((e) => {
            const fd = new FormData(e.target)
            fd.append("teamNo", teamNo)
            fd.append("noticeNo", noticeNo)

            $.ajax({
                xhrFields:{
                withCredentials : true
                },
                url: `${backURL}/editnotice`,
                method : 'post',
                contentType: false, //파일첨부용 프로퍼티
                processData : false, //파일첨부용 프로퍼티
                data : fd,
                success : (responseJSONObj)=>{
                    if(responseJSONObj.status==1){
                        alert(responseJSONObj.msg)
                        history.pushState(teamNo ,null,`${frontURL}/notice.html?teamNo=${teamNo}`)
                        ajaxHandler('GET', `${frontURL}/notice.html?teamNo=${teamNo}`, $sectionObj )
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

    //---- 취소버튼 클릭 시 발생 이벤트 ----
    $('div.editnotice>div.backbutton>button[name=back]').on('click',(e)=>{
        const state = {'teamNo':teamNo, 'noticeNo':noticeNo}
        history.pushState(state ,null,`${frontURL}/noticedetail.html?teamNo=${teamNo}&noticeNo=${noticeNo}`)
        ajaxHandler('GET', `${frontURL}/noticedetail.html?teamNo=${teamNo}&noticeNo=${noticeNo}`, $sectionObj )
    })

    //---- 삭제버튼 클릭 시 발생 이벤트 ----
    $('div.noticedetail>div.detailbuttons>button.remove').on('click',(e)=>{
        var result = confirm("삭제하시겠습니까?")
        if(result == true){
            $.ajax({
                url: backURL+'/deletenotice',
                method : 'get',
                data : `teamNo=${teamNo}&noticeNo=${noticeNo}`,
                success: (responseJSONObj)=>{
                    if(responseJSONObj.status==1){
                        alert(responseJSONObj.msg)
                        history.pushState(teamNo ,null,`${frontURL}/notice.html?teamNo=${teamNo}`)
                        ajaxHandler('GET', `${frontURL}/notice.html?teamNo=${teamNo}`, $sectionObj )
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