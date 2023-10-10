$(() => {
    const frontURL = 'http://127.0.0.1:5500/HTML'
    const teamNo = new URLSearchParams(window.location.search).get('teamNo');
    const qnaNo = new URLSearchParams(window.location.search).get('qnaNo');

    const url = `http://127.0.0.1:8888/KOSA/qnaboarddetail?teamNo=${teamNo}&qnaNo=${qnaNo}`;

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: url,
        method: 'get',
        success: (responseJSONObj) => {
            const data = responseJSONObj; // 반환된 JSON 데이터

            console.log(data);

            // HTML 테이블의 각 td 엘리먼트에 데이터를 추가
            $('#title').text(data.title);
            $('#regadte').text(data.regdate);
            $('#id').text(data.id);
            $('#content').text(data.content);
        },
        error: (error) => {
            console.error("Error:", error);
        }
    });

    
    //---- 수정버튼 클릭 시 발생 이벤트 ----
    $('div.detailbuttons>button.edit').on('click',(e)=>{
        $('div.boarddetail').hide()
        $('div.editdetail').show()
        $('div.detailbuttons>button.edit1').show()
        $('div.detailbuttons>button.edit').hide()

        $.ajax({
            url: url,
            method : 'get',
            data : `teamNo=${teamNo}&qnaNo=${qnaNo}`,
            success: (responseJSONObj)=>{            
                const data = responseJSONObj;

                $('div.modifytitleline>input[name=title]').attr('value',data.title);
                $('div.modifycontent>input[name=content]').attr('value',data.content);
            },
            error:(jqXHR, textStatus)=>{
                alert(jqXHR.readyState+":"+jqXHR.status+":"+jqXHR.statusText)
                console.log(jqXHR)
            }
        })
    })

        //---- 수정 완료버튼 클릭 시 발생 이벤트 ----
        $('div.editdetail>form>div.submitbuttons>button[type=submit]').on('click',(e)=>{
            const $formObj = $('form')
    
            $formObj.submit((e) => {
                const fd = new FormData(e.target)
                fd.append("teamNo", teamNo)
                fd.append("qnaNo", qnaNo  )
    
                $.ajax({
                    xhrFields:{
                    withCredentials : true
                    },
                    url: `http://127.0.0.1:8888/KOSA/qnaboardmodify`,
                    method : 'post',
                    contentType: false, //파일첨부용 프로퍼티
                    processData : false, //파일첨부용 프로퍼티
                    data : fd,
                    success : (responseJSONObj)=>{
                        if(responseJSONObj.status==1){
                            alert(responseJSONObj.msg)
                            // history.pushState(teamNo ,null, `${frontURL}/qnaboard.html?teamNo=${teamNo}`)
                            location.href=`${frontURL}/qnaboard.html?teamNo=${teamNo}`
                            // ajaxHandler('GET', `${frontURL}/qnaboard.html?teamNo=${teamNo}`, $sectionObj )
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

});