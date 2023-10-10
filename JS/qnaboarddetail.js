$(() => {
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
            $('#title1').text(data.title);
            $('#regadte1').text(data.regdate);
            $('#id').text(data.id);
            $('#content1').text(data.content);
        },
        error: (error) => {
            console.error("Error:", error);
        }
    });

    
    //---- 수정버튼 클릭 시 발생 이벤트 ----
    $('div.detailbuttons>button.edit').on('click',(e)=>{
        $('div.editnotice').show()
        $('div.detailbuttons>button.edit1').show()
        $('div.detailbuttons>button.edit').hide()

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