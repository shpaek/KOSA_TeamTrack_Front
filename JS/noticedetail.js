
$(()=>{
    const backURL = 'http://192.168.1.20:8888/teamtrack'
    const frontURL = 'http://192.168.1.20:5500/HTML'
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')
    const noticeNo = urlParams.get('noticeNo')
    const loginedId = localStorage.getItem("loginedId");


    $.ajax({
        url: backURL+'/noticedetail',
        method : 'get',
        data : `teamNo=${teamNo}&noticeNo=${noticeNo}&id=${loginedId}`,
        success: (responseJSONObj)=>{
            if(responseJSONObj.memStatus == 0){
                $('div.noticedetail>div.setmainbutton>button').hide()
                $('div.detailbuttons>button.edit').hide()
                $('div.detailbuttons>button.remove').hide()
            }
            const noticeTitle = responseJSONObj.notice.noticeTitle
            const noticeContent = responseJSONObj.notice.noticeContent
            const regDate = responseJSONObj.notice.regDate

            if(responseJSONObj.fileName == 'null'){
                $('div.filezone>div').hide()
            }else{
                $('span.filename').text(responseJSONObj.fileName)
            }
    
            $('div.detailtitleline>h4').html(noticeTitle)
            $('div.detailtitleline>span').text(regDate)
            $('div.detailcontent>p').html(noticeContent)
        },
        error:(jqXHR, textStatus)=>{
            Swal.fire({
                icon: 'warning',
                text: '다시 한번 시도해주세요🙏'
            })
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
                    Swal.fire({
                        icon: 'success',
                        text: responseJSONObj.msg
                      }).then((result) => {
                        if (result.isConfirmed) location.href=`${frontURL}/notice.html?teamNo=${teamNo}`
                      })
                }else{
                    Swal.fire({
                        icon: 'warning',
                        text: responseJSONObj.msg
                      })
                }
            },
            error:(jqXHR, textStatus)=>{
                Swal.fire({
                    icon: 'warning',
                    text: '다시 한번 시도해주세요🙏'
                })
                console.log(jqXHR)
            }
        })
    })

    //---- 파일명 클릭 시 발생 이벤트 ----
    $('span.filename').click((e)=>{
        $.ajax({
            xhrFields: {
                responseType: "blob",
            },
            url: backURL+'/noticefiledownload',
            method: 'get',
            contentType: false, //파일첨부용 프로퍼티
            processData : false, //파일첨부용 프로퍼티
            data: `teamNo=${teamNo}&noticeNo=${noticeNo}`,
            success: (responseData)=>{
                console.log(responseData)
                console.log(responseData.URL)
                location.href = `${backURL}/noticefiledownload?teamNo=${teamNo}&noticeNo=${noticeNo}`
                Swal.fire({
                    icon: 'success',
                    text: '다운로드 성공하였습니다'
                })
            },
            error: (jqxhr)=>{
                Swal.fire({
                    icon: 'warning',
                    text: '다시 한번 시도해주세요🙏'
                })
            }
        })
    })

    //---- 수정버튼 클릭 시 발생 이벤트 ----
    $('button.edit').on('click',(e)=>{
        $('div.noticedetail').hide()
        $('div.detailbuttons').hide()
        $('div.editnotice').show()

        $.ajax({
            url: backURL+'/noticedetail',
            method : 'get',
            data : `teamNo=${teamNo}&noticeNo=${noticeNo}&loginedId=${loginedId}`,
            success: (responseJSONObj)=>{
                const noticeTitle = responseJSONObj.notice.noticeTitle
                const noticeContent = responseJSONObj.notice.noticeContent
                const mainStatus = responseJSONObj.notice.mainStatus

                console.log(noticeTitle)

                if(responseJSONObj.fileName == 'null'){
                    $('div.modifyfilezone').hide()
                }else{
                    $('div.modifyfilezone').show()
                    $('span.modifyfilename').text(responseJSONObj.fileName)
                }
                
                $('div.mainnotice>input[name=status]').attr('value',mainStatus);
                $('div.modifytitleline>input[name=title]').attr('value',noticeTitle);
                $('div.modifycontent>textarea[name=content]').html(noticeContent);
            },
            error:(jqXHR, textStatus)=>{
                Swal.fire({
                    icon: 'warning',
                    text: '다시 한번 시도해주세요🙏'
                })
                console.log(jqXHR)
            }
        })
    })

    $('span.modifyfilename').click((e)=>{
        $.ajax({
            xhrFields: {
                responseType: "blob",
            },
            url: backURL+'/noticefiledownload',
            method: 'get',
            contentType: false, //파일첨부용 프로퍼티
            processData : false, //파일첨부용 프로퍼티
            data: `teamNo=${teamNo}&noticeNo=${noticeNo}`,
            success: (responseData)=>{
                console.log(responseData)
                console.log(responseData.URL)
                location.href = `${backURL}/noticefiledownload?teamNo=${teamNo}&noticeNo=${noticeNo}`
                Swal.fire({
                    icon: 'success',
                    text: '다운로드 성공하였습니다'
                })
            },
            error: (jqxhr)=>{
                Swal.fire({
                    icon: 'warning',
                    text: '다시 한번 시도해주세요🙏'
                })
            }
        })
    })

    //---- 완료버튼 클릭 시 발생 이벤트 ----
    $('form>div.writebuttons>button[type=submit]').on('click',(e)=>{
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
                        if(responseJSONObj.mainstatus==0){
                            Swal.fire({
                                icon: 'success',
                                title: responseJSONObj.msg,
                                text: responseJSONObj.mainmsg
                            }).then(result=>{
                                location.href=`${frontURL}/notice.html?teamNo=${teamNo}&loginedId=${loginedId}`
                            })
                        }else{
                            Swal.fire({
                                icon: 'success',
                                text: responseJSONObj.msg
                            }).then(result=>{
                                location.href=`${frontURL}/notice.html?teamNo=${teamNo}&loginedId=${loginedId}`
                            })
                        }
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

    //---- 취소버튼 클릭 시 발생 이벤트 ----
    $('button[name=back]').on('click',(e)=>{
        $('div.editnotice').hide()
        $('div.noticedetail').show()
    })

    //---- 삭제버튼 클릭 시 발생 이벤트 ----
    $('button.remove').on('click',(e)=>{
        Swal.fire({
            icon: 'question',
            text: '삭제하시겠습니까?',

            showCancelButton: true,
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            confirmButtonText: '승인', // confirm 버튼 텍스트 지정
            cancelButtonText: '취소',
        }).then(result => {
            if (result.isConfirmed) { 
                $.ajax({
                    url: backURL+'/deletenotice',
                    method : 'get',
                    data : `teamNo=${teamNo}&noticeNo=${noticeNo}`,
                    success: (responseJSONObj)=>{
                        if(responseJSONObj.status==1){
                            Swal.fire({
                                icon: 'success',
                                text: responseJSONObj.msg
                            }).then(result=>{
                                location.href=`${frontURL}/notice.html?teamNo=${teamNo}&loginedId=${loginedId}`
                            })
                        }else{
                            alert(responseJSONObj.msg)
                        }
                    },
                    error:(jqXHR)=>{
                        Swal.fire({
                            icon: 'warning',
                            text: '다시 한번 시도해주세요🙏'
                        })
                        console.log(jqXHR)
                    }
                })
            }else{
                return false
            }
         })
        return false
    })


})
